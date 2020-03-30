using Tudou.Abp.AuditLogging;
using Tudou.Abp.SettingManagement;
using Volo.Abp.Account;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Tudou.Abp.Saas;


namespace Tudou.Grace
{
    [DependsOn(
        typeof(GraceDomainSharedModule),
        typeof(AbpAccountApplicationContractsModule),
        typeof(AbpAuditLoggingApplicationContractsModule),
        typeof(AbpFeatureManagementApplicationContractsModule),
        typeof(AbpIdentityApplicationContractsModule),
        typeof(AbpPermissionManagementApplicationContractsModule),
        typeof(AbpSettingManagementApplicationContractsModule),
        typeof(AbpSaasApplicationContractsModule)
    )]
    public class GraceApplicationContractsModule : AbpModule
    {

    }
}
