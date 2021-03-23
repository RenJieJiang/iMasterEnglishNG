using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using iMasterEnglishNG.Entities;

namespace iMasterEnglishNG
{
    public abstract class BaseAsyncCrudAppService<TEntity, TEntityDto, TSearchInput, TCreateInput, TUpdateInput> : AsyncCrudAppService<TEntity, TEntityDto, int, TSearchInput, TCreateInput, TUpdateInput>, IBaseAsyncCrudAppService<TEntityDto, TSearchInput, TCreateInput, TUpdateInput>
        where TEntity : BaseEntity
        where TEntityDto : FullAuditedEntityDto<int>, new()
        where TSearchInput : PagedResultRequestDto
        where TCreateInput : class, new()
        where TUpdateInput : class, IEntityDto<int>
    {

        protected BaseAsyncCrudAppService(IRepository<TEntity, int> repository) : base(repository)
        {

        }

        protected IQueryable<TOtherEntityDto> ApplySorting<TOtherSearchInput, TOtherEntityDto>(IQueryable<TOtherEntityDto> query, TOtherSearchInput input)
            where TOtherSearchInput : PagedResultRequestDto
            where TOtherEntityDto : class
        {
            var sortInput = input as ISortedResultRequest;
            if (sortInput != null)
            {
                if (!sortInput.Sorting.IsNullOrWhiteSpace())
                {
                    return query.OrderBy(sortInput.Sorting);
                }
                //Sort by word by default 
                else if (string.IsNullOrWhiteSpace(sortInput.Sorting))
                {
                    return query.OrderBy("word asc");
                }
            }

            //TODO: later can support this feature as a default sorting
            //var attr = typeof(TOtherSearchInput).GetCustomAttribute<SearchSortingAttribute>(true);
            //if (attr != null)
            //{
            //    var property = typeof(TEntityDto).GetProperty(attr.Name);
            //    if (property == null)
            //    {
            //        throw new Exception($"未找到({attr.Name})字段");
            //    }

            //    return query.OrderBy(attr.GetOrderBy());
            //}

            return query;
        }

        /// <summary>
        /// 排序和分页，并返回结果集
        /// </summary>
        /// <param name="query"></param>
        /// <param name="input"></param>
        /// <returns></returns>
        protected async Task<PagedResultDto<TEntityDto>> GetPagedResult(IQueryable<TEntityDto> query, TSearchInput input)
        {
            var totalCount = await AsyncQueryableExecuter.CountAsync(query);

            query = query.PageBy(input);

            var dtos = await AsyncQueryableExecuter.ToListAsync(query);

            var result = new PagedResultDto<TEntityDto>(totalCount, dtos);

            return result;
        }
    }
}
