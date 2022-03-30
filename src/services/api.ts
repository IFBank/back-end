import axios, { AxiosError } from "axios";

const apiIF = axios.create({
  baseURL:
    "http://academico-testes.ifms.edu.br/administrativo/webservices/check_student",
});

export { apiIF };
