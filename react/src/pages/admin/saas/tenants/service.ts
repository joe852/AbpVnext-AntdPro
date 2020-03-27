import request from "@/utils/request";
import { TenantQueryParams, TenantCreateDto, TenantUpdateDto } from "./data";


export async function queryTenants(params?: TenantQueryParams): Promise<any> {
  return request('api/multi-tenancy/tenants', {
    method: 'GET',
    params,
  });
}

export async function createTenant(data: TenantCreateDto): Promise<any> {
  return request('api/multi-tenancy/tenants', {
    method: 'POST',
    data,
  });
}

export async function updateTenant(input: TenantUpdateDto): Promise<any> {
  return request(`api/multi-tenancy/tenants/${input.id}`, {
    method: 'PUT',
    data:{
      name:input.name
    }
  });
}

export async function deleteTenant(id:string): Promise<any> {
  return request(`api/multi-tenancy/tenants/${id}`, {
    method: 'DELETE',
  });
}
