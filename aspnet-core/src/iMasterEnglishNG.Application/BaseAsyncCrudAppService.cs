using System;
using System.Collections.Generic;
using System.Text;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using iMasterEnglishNG.Entities;

namespace iMasterEnglishNG
{
    public abstract class BaseAsyncCrudAppService<TEntity, TEntityDto, TSearchInput, TCreateInput, TUpdateInput> : AsyncCrudAppService<TEntity, TEntityDto, long, TSearchInput, TCreateInput, TUpdateInput>, IBaseAsyncCrudAppService<TEntityDto, TSearchInput, TCreateInput, TUpdateInput>
        where TEntity : BaseEntity
        where TEntityDto : FullAuditedEntityDto<long>, new()
        where TSearchInput : PagedResultRequestDto
        where TCreateInput : class, new()
        where TUpdateInput : class, IEntityDto<long>
    {

        protected BaseAsyncCrudAppService(IRepository<TEntity, long> repository) : base(repository)
        {

        }
    }
}
