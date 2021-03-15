using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace iMasterEnglishNG.Entities
{
    [Table("Words")]
    public class WordEntity : BaseEntity
    {
        [StringLength(100)]
        public string Word { get; set; }

        public int Frequency { get; set; }

        [StringLength(100)]
        public string PhoneticSymbol { get; set; }

        [StringLength(1000)]
        public string Definition { get; set; }

        [StringLength(200)]
        public string Synonym { get; set; }

        [StringLength(200)]
        public string Antonym { get; set; }

        [StringLength(500)]
        public string Remarks { get; set; }
    }
}
