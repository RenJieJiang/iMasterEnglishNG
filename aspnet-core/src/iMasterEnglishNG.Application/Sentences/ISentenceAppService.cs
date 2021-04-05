using Abp.Application.Services;
using iMasterEnglishNG.Sentences;
using System;
using System.Collections.Generic;
using System.Text;

namespace iMasterEnglishNG.Sentences
{
    public interface ISentenceAppService : IAsyncCrudAppService<SentenceDto, int, SentencePagedInput, SentenceCreateInput, SentenceUpdateInput>
    {

    }
}
