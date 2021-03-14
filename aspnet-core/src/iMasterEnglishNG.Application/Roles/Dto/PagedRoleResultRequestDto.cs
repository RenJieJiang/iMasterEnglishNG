using Abp.Application.Services.Dto;

namespace iMasterEnglishNG.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

