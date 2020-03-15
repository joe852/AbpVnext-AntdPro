export interface PageRequestDto{
  skipCount?:nunber;
  maxResultCount?:number;
}
export interface GetPermissionsInput{

}
export interface GetPermissionListResultDto{
  entityDisplayName:string;
  groups:PermissionGroupDto[];
}

export interface PermissionGroupDto{
  name:string;
  displayName:string;
  permissions:PermissionGrantInfoDto[];
}
export interface PermissionGrantInfoDto{
  name:string;
  displayName:string;
  parentName:string;
  isGranted:boolean;
  allowedProviders:string[];
  grantedProviders:ProviderInfoDto[];
}
export interface ProviderInfoDto{
  providerName:string;
  providerKey:string;
}
