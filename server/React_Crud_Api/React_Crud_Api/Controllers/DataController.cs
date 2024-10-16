using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using React_Crud_Api.Models;

namespace React_Crud_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly MyDbContext _context;
        private readonly IWebHostEnvironment _web;
        public DataController(MyDbContext context, IWebHostEnvironment web)
        {
            _context = context;
            _web = web;
        }

        [HttpGet("FetchData")]
        public List<dataModel> FetchData()
        {
            return _context.Students.ToList();
        }

        [HttpPost]
        [Route("InsertData")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> InsertData([FromForm] dataModel data)
        {
            if (data.file == null || data.file.Length == 0)
            {
                return BadRequest(new { message = "No image selected." });
            }

            var preEmail = await _context.Students
                .FromSqlRaw("SELECT * FROM Students WHERE email = {0}", data.email)
                .ToListAsync();
            if (preEmail != null && preEmail.Count > 0)
            {
                return BadRequest(new { message = "Email is Already Exists!" });
            }

            var imageName = Path.GetFileName(data.file.FileName);
            var ext = Path.GetExtension(data.file.FileName);
            var ds = DateTime.Now.Millisecond;
            string fileName = "img_" + ds + ext;
            var filePath = Path.Combine(_web.WebRootPath, "images", fileName);
            var directoryPath = Path.GetDirectoryName(filePath);
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await data.file.CopyToAsync(stream);
            }
            data.image = fileName;

            await _context.Students.AddAsync(data);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Data Insert SuccessFully" });
        }

        [HttpGet]
        [Route("FetchDataById")]
        public dataModel FetchDataById(int id)
        {
            var data = _context.Students.Find(id);

            if (data == null)
            {
                return null;
            }

            return data;
        }

        [HttpPost]
        [Route("UpdateData/{id}")]
        [Consumes("multipart/form-data")]
        public IActionResult UpdateData(int id, [FromForm] dataModel data)
        {
            if (data.file == null || data.file.Length == 0)
            {
                return BadRequest(new { message = "No image selected." });
            }

            var imageName = Path.GetFileName(data.file.FileName);
            var ext = Path.GetExtension(data.file.FileName);
            var ds = DateTime.Now.Millisecond;
            string fileName = "img_" + ds + ext;
            var filePath = Path.Combine(_web.WebRootPath, "images", fileName);
            var directoryPath = Path.GetDirectoryName(filePath);
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                data.file.CopyTo(stream);
            }
            data.image = fileName;

            var existingData = _context.Students.Find(id);

            if (existingData == null)
            {
                return NotFound(new { message = "Data not found." });
            }

            existingData.name = data.name;
            existingData.email = data.email;
            existingData.phone = data.phone;
            existingData.age = data.age;
            existingData.image = data.image;

            try
            {
                _context.SaveChanges();
                return Ok(new { message = "Data updated successfully." });
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict(new { message = "Concurrency error: data may have been modified or deleted." });
            }
        }

        [HttpDelete]
        [Route("DeleteData")]
        public IActionResult DeleteData(int id)
        {
            var data = _context.Students.Find(id);
            if (data == null)
            {
                return null;
            }
            _context.Remove(data);
            _context.SaveChanges();
            return Ok(new { message = "Data Delete!" });
        }

    }
}
