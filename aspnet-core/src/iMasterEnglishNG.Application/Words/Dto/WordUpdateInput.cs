using System;
using System.Collections.Generic;
using System.Text;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using iMasterEnglishNG.Entities;

namespace iMasterEnglishNG.Words
{
    [AutoMapTo(typeof(WordEntity))]
    public class WordUpdateInput : IEntityDto<long>
    {
        /// <summary>
        /// PK
        /// </summary>
        public long Id { get; set; }

        public string Word { get; set; }

        public int Frequency { get; set; }

        public string PhoneticSymbol { get; set; }

        public string Definition { get; set; }

        public string Synonym { get; set; }

        public string Antonym { get; set; }

        public string Remarks { get; set; }
    }
}
