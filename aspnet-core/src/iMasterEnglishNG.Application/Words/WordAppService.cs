using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Extensions;
using Abp.Linq.Extensions;
using iMasterEnglishNG.Entities;
using iMasterEnglishNG.EntityFrameworkCore;

namespace iMasterEnglishNG.Words
{
    public class WordAppService : BaseAsyncCrudAppService<WordEntity, WordDto, WordPagedInput, WordCreateInput, WordUpdateInput>, IWordAppService
    {
        private IRepository<WordEntity> _repository;

        public WordAppService(IRepository<WordEntity> repository) : base(repository)
        {
            _repository = repository;
        }

        [UnitOfWork(isTransactional: false)]
        public async Task<PagedResultDto<WordDto>> GetFilteredQuery(WordPagedInput input)
        {
            //Sort by word by default 
            var sortInput = input as ISortedResultRequest;
            if (sortInput != null)
            {
                if (string.IsNullOrWhiteSpace(sortInput.Sorting))
                    sortInput.Sorting = "word asc";
                //handle FormattedCreationTime sorting
                else if (sortInput.Sorting.Contains("formattedCreationTime"))
                    sortInput.Sorting = sortInput.Sorting.Replace("formattedCreationTime", "CreationTime");
            }

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
                            Remarks = o.Remarks,
                            FormattedCreationTime = o.CreationTime.ToString("yyyy-MM-dd")
                        };

            var result = await GetPagedResult(query, input);

            return result;
        }

        protected override IQueryable<WordEntity> CreateFilteredQuery(WordPagedInput input)
        {
            return base.CreateFilteredQuery(input)
                .WhereIf(!input.Word.IsNullOrWhiteSpace(), x => x.Word.Contains(input.Word)
                        || x.PhoneticSymbol.Contains(input.Word)
                        || x.Definition.Contains(input.Word)
                        || iMasterEnglishNGDbContext.FormatDate(x.CreationTime).Contains(input.Word)
                        || (Regex.IsMatch(input.Word, @"^\d+$") && x.Frequency == int.Parse(input.Word.Trim())));

            //var query = (from w in _repository.GetAll()
            //             let createdDate = iMasterEnglishNGDbContext.FormatDate(w.CreationTime)
            //             where (input.Word.IsNullOrWhiteSpace()
            //                || (w.Word.Contains(input.Word)
            //                    || w.PhoneticSymbol.Contains(input.Word)
            //                    || w.Definition.Contains(input.Word)
            //                    || createdDate.Contains(input.Word)
            //                    || (Regex.IsMatch(input.Word, @"^\d+$") && w.Frequency == int.Parse(input.Word.Trim()))
            //                   ))
            //             select w);

            //return query;
        }
    }
}
