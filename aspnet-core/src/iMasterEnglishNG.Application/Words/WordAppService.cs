using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using iMasterEnglishNG.Entities;

namespace iMasterEnglishNG.Words
{
    public class WordAppService : BaseAsyncCrudAppService<WordEntity, WordDto, WordPagedInput, WordCreateInput, WordUpdateInput>, IWordAppService
    {
        public WordAppService(IRepository<WordEntity, long> repository) : base(repository)
        {

        }

        protected override IQueryable<WordEntity> CreateFilteredQuery(WordPagedInput input)
        {
            return Repository.GetAll()
                .WhereIf(!input.Word.IsNullOrWhiteSpace(), x => x.Word.Contains(input.Word));
        }
    }
}
