import { apiclient } from "../config/api.config";
import { LoginBody, RegisterBody } from "../interfaces";

export async function register(body: RegisterBody) {
  const res = await apiclient.post("/auth/register", body); 
  return res.data 
  }
  
  export function login(body: LoginBody) {
  return apiclient.post("/auth/login", body); }