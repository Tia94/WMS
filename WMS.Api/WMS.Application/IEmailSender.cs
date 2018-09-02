using System.Net.Mail;

namespace WMS.Application
{
    public interface IEmailSender
    {
        void Send(MailMessage message);
    }
}