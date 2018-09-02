using System.Net;
using System.Net.Mail;
using WMS.Application;

namespace WMS.Infrastructure.Emailing
{
    public class SmtpEmailSender : IEmailSender
    {
        public void Send(MailMessage message)
        {
            using (SmtpClient)
            {
                SmtpClient.Send(message);
            }
        }

        private static SmtpClient SmtpClient => new SmtpClient
        {
            Host = "smtp.gmail.com",
            Port = 587,
            EnableSsl = true,
            DeliveryMethod = SmtpDeliveryMethod.Network,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential("licentaproject2018@gmail.com", "licenta1234")
        };
    }
}