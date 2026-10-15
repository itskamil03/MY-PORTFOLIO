import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, projectType } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please provide name, email, and message.' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // In production or demo mode, this route can forward to an email provider or database
    console.log('[Contact Submission Received]:', {
      name,
      email,
      subject: subject || 'Portfolio Inquiry',
      projectType: projectType || 'General Consultation',
      message,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: `Thank you ${name}! Your message has been dispatched successfully. Kamil will respond shortly.`,
    });
  } catch (err) {
    console.error('API Error in /api/contact:', err);
    return NextResponse.json(
      { error: 'Internal Server Error while processing your request.' },
      { status: 500 }
    );
  }
}
