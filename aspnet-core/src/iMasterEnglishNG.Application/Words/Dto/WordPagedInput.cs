using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace iMasterEnglishNG.Words
{
    public class WordPagedInput : PagedResultRequestDto
    {
        public string Word { get; set; }
    }
}
