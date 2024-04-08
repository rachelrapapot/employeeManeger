using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using System.Net.Mail;

namespace ServerManeger.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SendMailController : ControllerBase
    {
        // POST api/<SendMailController>
        [HttpPost]
        public IActionResult Post([FromBody] MailRequest request)
        {
            try
            {
                // יצירת הודעת המייל
                MailMessage message = new MailMessage();
                message.From = new MailAddress("rr0556788527@gmail.com"); // כתובת המייל שלך
                message.To.Add(request.To); // כתובת המייל של הנמען
                message.Subject = request.Subject;
                message.Body = request.Body;

                // הגדרת השרת היוצא
                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587); // כאן אתה יכול להשתמש בשרת המייל שלך

                // הגדרת אימות
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = new NetworkCredential("rr0556788527@gmail.com", "upvl wwnt pbhg vmng"); // פרטי ההתחברות שלך
                smtpClient.EnableSsl = true;

                // שליחת הודעת המייל
                smtpClient.Send(message);

                return Ok("Email sent successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error sending email: {ex.Message}");
            }
        }
    }

    // מודל לבקשת המייל
    public class MailRequest
    {
        public string To { get; set; } // כתובת המייל של הנמען
        public string Subject { get; set; } // נושא המייל
        public string Body { get; set; } // גוף המייל
    }
}
