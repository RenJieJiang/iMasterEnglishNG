using System.ComponentModel.DataAnnotations;

namespace iMasterEnglishNG.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}