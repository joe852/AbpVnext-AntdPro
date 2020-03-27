import { PageRequestDto } from '../../../../services/data.d';

export interface SaasTenantDto {
  id: string;
  name: string;
}

export interface TenantQueryParams extends PageRequestDto {
  filter?: string;
  sorting?: string;
}

export interface TenantCreateDto {
  adminEmailAddress:string;
  adminPassword:string;
  name:string;
}

export interface TenantUpdateDto{
  id:string;
  name:string;
}
