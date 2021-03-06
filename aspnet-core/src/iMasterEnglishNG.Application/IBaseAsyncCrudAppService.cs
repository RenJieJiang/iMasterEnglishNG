using System;
using System.Collections.Generic;
using System.Text;
using Abp.Application.Services;
using Abp.Application.Services.Dto;

namespace iMasterEnglishNG
{
    public interface IBaseAsyncCrudAppService<TEntityDto, TSearchInput, TCreateInput, TUpdateInput>
        : IAsyncCrudAppService<TEntityDto, int, TSearchInput, TCreateInput, TUpdateInput>
        where TEntityDto : FullAuditedEntityDto<int>
        where TSearchInput : PagedResultRequestDto
        where TCreateInput : class, new()
        where TUpdateInput : IEntityDto<int>
    {

    }
}
