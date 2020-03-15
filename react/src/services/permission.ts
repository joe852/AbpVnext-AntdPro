import request from "@/utils/request";
import { GetPermissionsInput } from "./data";

export async function getPermissions(params:GetPermissionsInput) {
  return request('api/abp/permissions', {
    method: 'GET',
    params,
  });
}
