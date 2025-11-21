import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  from,
  to,
  subject,
  template,
}: {
  from: string;
  to: string;
  subject: string;
  template: string;
}) {
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html: template,
  });
   console.log(data);
   console.log(error);
   return { data, error };
}