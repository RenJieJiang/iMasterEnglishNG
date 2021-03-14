using System.Threading.Tasks;
using Abp.Application.Services;
using iMasterEnglishNG.Sessions.Dto;

namespace iMasterEnglishNG.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
