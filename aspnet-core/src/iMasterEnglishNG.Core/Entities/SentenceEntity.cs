using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace iMasterEnglishNG.Entities
{
    [Table("Sentences")]
    public class SentenceEntity : BaseEntity
    {
        [StringLength(1000)]
        public string Sentence { get; set; }

        public int Difficulty { get; set; }

        [StringLength(200)]
        public string Word { get; set; }

        [StringLength(1000)]
        public string Translate { get; set; }

        [StringLength(500)]
        public string Remarks { get; set; }
    }
}
