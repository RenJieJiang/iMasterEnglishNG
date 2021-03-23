using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
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

        protected async Task<PagedResultDto<WordDto>> GetFilteredQuery(WordPagedInput input)
        {
            var query = from o in ApplySorting(CreateFilteredQuery(input), input)
                        select new WordDto
                        {
                            Id = o.Id,
                            Word = o.Word,
                            Frequency = o.Frequency,
                            PhoneticSymbol = o.PhoneticSymbol,
                            Definition = o.Definition,
                            Synonym = o.Synonym,
                            Antonym = o.Antonym,
                            Remarks = o.Remarks
                        };

            return await GetPagedResult(query, input);
        }

        protected override IQueryable<WordEntity> CreateFilteredQuery(WordPagedInput input)
        {
            return base.CreateFilteredQuery(input)
                .WhereIf(!input.Word.IsNullOrWhiteSpace(), x => x.Word.Contains(input.Word));
        }
    }
}
