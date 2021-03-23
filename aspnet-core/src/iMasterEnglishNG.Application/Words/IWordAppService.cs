using System;
using System.Collections.Generic;
using System.Text;
using Abp.Application.Services;

namespace iMasterEnglishNG.Words
{
    public interface IWordAppService : IAsyncCrudAppService<WordDto, int, WordPagedInput, WordCreateInput, WordUpdateInput>
    {

    }
}
