using Abp.AutoMapper;
using iMasterEnglishNG.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace iMasterEnglishNG.Words
{
    [AutoMapTo(typeof(WordEntity))]
    public class WordCreateInput
    {
        public string Word { get; set; }

        public int Frequency { get; set; }

        public string PhoneticSymbol { get; set; }

        public string Definition { get; set; }

        public string Synonym { get; set; }

        public string Antonym { get; set; }

        public string Remarks { get; set; }
    }
}
