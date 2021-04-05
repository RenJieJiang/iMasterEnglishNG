using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace iMasterEnglishNG.Sentences
{
    public class SentencePagedInput : PagedAndSortedResultRequestDto
    {
        public string Sentence { get; set; }
    }
}
