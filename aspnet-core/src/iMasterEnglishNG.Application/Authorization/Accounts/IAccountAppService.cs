using System.Threading.Tasks;
using Abp.Application.Services;
using iMasterEnglishNG.Authorization.Accounts.Dto;

namespace iMasterEnglishNG.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
