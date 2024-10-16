using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace React_Crud_Api.Models
{
    public class dataModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        public string? name { get; set; }
        [Required]
        [StringLength(50)]
        public string? email { get; set; }
        [Required]
        [StringLength(50)]
        public string? phone { get; set; }
        [Required]
        public int age { get; set; }
        public string? image { get; set; }
        [NotMapped]
        public IFormFile? file { get; set; }
    }
}
