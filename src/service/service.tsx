import { apiclient } from "../config/api.config";
import { LoginBody, RegisterBody } from "../interfaces";

export function register(body: RegisterBody) {
  return apiclient.post("/auth/register", body);
}

export function login(body: LoginBody) {
  return apiclient.post("/auth/login", body);
}
