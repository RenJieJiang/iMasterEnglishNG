using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Extensions;
using Abp.Linq.Extensions;
using iMasterEnglishNG.Entities;
using iMasterEnglishNG.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace iMasterEnglishNG.Sentences
{
    public class SentenceAppService : BaseAsyncCrudAppService<SentenceEntity, SentenceDto, SentencePagedInput, SentenceCreateInput, SentenceUpdateInput>, ISentenceAppService
    {
        private IRepository<SentenceEntity> _repository;

        public SentenceAppService(IRepository<SentenceEntity> repository) : base(repository)
        {
            _repository = repository;
        }

        [UnitOfWork(isTransactional: false)]
        public async Task<PagedResultDto<SentenceDto>> GetFilteredQuery(SentencePagedInput input)
        {
            //Sort by word by default 
            var sortInput = input as ISortedResultRequest;
            if (sortInput != null)
            {
                if (string.IsNullOrWhiteSpace(sortInput.Sorting))
                    sortInput.Sorting = "sentence asc";
                //handle FormattedCreationTime sorting
                else if (sortInput.Sorting.Contains("formattedCreationTime"))
                    sortInput.Sorting = sortInput.Sorting.Replace("formattedCreationTime", "CreationTime");
            }

            var query = from o in ApplySorting(CreateFilteredQuery(input), input)
                        select new SentenceDto
                        {
                            Id = o.Id,
                            Sentence = o.Sentence,
                            Difficulty = o.Difficulty,
                            Word = o.Word,
                            Translate = o.Translate,
                            Remarks = o.Remarks,
                            FormattedCreationTime = o.CreationTime.ToString("yyyy-MM-dd")
                        };

            var result = await GetPagedResult(query, input);

            return result;
        }

        protected override IQueryable<SentenceEntity> CreateFilteredQuery(SentencePagedInput input)
        {
            return base.CreateFilteredQuery(input)
                .WhereIf(!input.Sentence.IsNullOrWhiteSpace(), x => x.Word.Contains(input.Sentence)
                        || x.Word.Contains(input.Sentence)
                        || x.Translate.Contains(input.Sentence)
                        || iMasterEnglishNGDbContext.FormatDate(x.CreationTime).Contains(input.Sentence)
                        || (Regex.IsMatch(input.Sentence, @"^\d+$") && x.Difficulty == int.Parse(input.Sentence.Trim())));
        }
    }
}
