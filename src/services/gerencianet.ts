import fs from "fs";
import https from "https";
import { resolve } from "path";
import "dotenv/config";
import axios, { AxiosError } from "axios";

let isRefreshing = false;
let failedRequestsQueue = [];

var certPath = resolve(__dirname, "..", "cert", "homologacao-ifbank_cert.p12");
var certHomo = fs.readFileSync(certPath);
var authHomo = Buffer.from(
  `${process.env.CLIENT_ID_HOMO}:${process.env.CLIENT_SECRET_HOMO}`
).toString("base64");
var dataHomo = JSON.stringify({ grant_type: "client_credentials" });
var agentHomo = new https.Agent({
  pfx: certHomo,
  passphrase: "",
});

const apiPIXHomo = axios.create({
  baseURL: "https://api-pix-h.gerencianet.com.br",
  httpsAgent: agentHomo,
});

apiPIXHomo.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response.status === 401) {
      if (error.response.data.error === "invalid_token") {
        const originalConfig = error.config;

        if (!isRefreshing) {
          isRefreshing = true;

          apiPIXHomo
            .post("/oauth/token", dataHomo, {
              headers: {
                Authorization: `Basic ${authHomo}`,
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              const token = response.data.access_token;

              apiPIXHomo.defaults.headers["Authorization"] = `Bearer ${token}`;

              failedRequestsQueue.forEach((request) =>
                request.onSuccess(token)
              );
              failedRequestsQueue = [];
            })
            .catch((error) => {
              failedRequestsQueue.forEach((request) =>
                request.onFailure(error)
              );
              failedRequestsQueue = [];
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers["Authorization"] = `Bearer ${token}`;

              resolve(apiPIXHomo(originalConfig));
            },
            onFailure: (err: AxiosError) => {
              reject(err);
            },
          });
        });
      }
    }

    return Promise.reject(error);
  }
);
