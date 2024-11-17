import { NextResponse } from "next/server";
import { Resend } from "resend";

// Ensure the environment variable is set, and provide a default if not
const resend = new Resend(process.env.RESEND_API_KEY);

const fromEmail = process.env.FROM_EMAIL;
if (!fromEmail) {
  throw new Error("FROM_EMAIL environment variable is required");
}

export async function POST(req: Request) {
  try {
    // Parse the incoming JSON body
    const { email, subject, message } = await req.json();

    // Ensure all necessary fields are present
    if (!email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields (email, subject, message)' }, { status: 400 });
    }

    // Send the email using Resend
    const data = await resend.emails.send({
      from: fromEmail,  // This will no longer throw an error
      to: [fromEmail, email],  // Send email to both 'from' and the recipient
      subject: subject,
      html: `
        <h1>${subject}</h1>
        <p>Thank you for contacting us!</p>
        <p>New message submitted:</p>
        <p>${message}</p>
      `,
    });

    // Return the response from Resend
    return NextResponse.json(data);
  } catch (error) {
    // Return an error response
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An error occurred' }, { status: 500 });
  }
}
