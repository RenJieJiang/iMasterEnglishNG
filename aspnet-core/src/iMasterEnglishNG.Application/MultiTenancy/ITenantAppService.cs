using Abp.Application.Services;
using iMasterEnglishNG.MultiTenancy.Dto;

namespace iMasterEnglishNG.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

