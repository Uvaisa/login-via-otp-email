import { Backend_url } from "./helper";
import { commonRequest } from "./Apicall";
export const registerFunction = async (data) => {
  return await commonRequest("POST", `${Backend_url}/user/register`, data);
};
export const sentOtpFunction = async (data) => {
  return await commonRequest("POST", `${Backend_url}/user/sendotp`, data);
};
export const userVerify = async (data) => {
  return await commonRequest("POST", `${Backend_url}/user/login`, data);
};
