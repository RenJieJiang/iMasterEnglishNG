using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using iMasterEnglishNG.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace iMasterEnglishNG.Sentences
{
    [AutoMapTo(typeof(WordEntity))]
    public class SentenceUpdateInput : IEntityDto<int>
    {
        /// <summary>
        /// PK
        /// </summary>
        public int Id { get; set; }

        public string Sentence { get; set; }

        public int Difficulty { get; set; }

        public string Word { get; set; }

        public string Translate { get; set; }

        public string Remarks { get; set; }
    }
}
