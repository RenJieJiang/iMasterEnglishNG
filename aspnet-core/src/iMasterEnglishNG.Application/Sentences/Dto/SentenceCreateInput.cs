using Abp.AutoMapper;
using iMasterEnglishNG.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace iMasterEnglishNG.Sentences
{
    [AutoMapTo(typeof(SentenceEntity))]
    public class SentenceCreateInput
    {
        public string Sentence { get; set; }

        public int Difficulty { get; set; }

        public string Word { get; set; }

        public string Translate { get; set; }

        public string Remarks { get; set; }
    }
}
