import axios from "axios";
import fs from "fs";
import https from "https";
import { resolve } from "path";

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

const apiIF = axios.create({
  baseURL:
    "http://academico-testes.ifms.edu.br/administrativo/webservices/check_student",
});

const apiPIXHomo = axios.create({
  baseURL: "https://api-pix-h.gerencianet.com.br",
  httpsAgent: agentHomo,
});

// apiPIXHomo
//   .post("/oauth/token", dataHomo, {
//     headers: {
//       Authorization: `Basic ${authHomo}`,
//       "Content-Type": "application/json",
//     },
//   })
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

export { apiIF, apiPIXHomo };
