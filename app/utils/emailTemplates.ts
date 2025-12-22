// Customer-facing email templates for Valdosta Fence Co.

interface AppointmentEmailData {
  name: string;
  scheduledDate: string;
  scheduledTime: string;
  address?: string;
  city?: string;
  fenceType?: string;
}

interface RequestEmailData {
  name: string;
  fenceType?: string;
}

// Format date nicely
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Customer confirmation for SCHEDULED appointment
export function getScheduledConfirmationEmail(data: AppointmentEmailData): string {
  const formattedDate = formatDate(data.scheduledDate);
  const location = data.address 
    ? `${data.address}${data.city ? `, ${data.city}` : ''}`
    : data.city || 'your property';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #8B2D32; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
                ✓ Appointment Confirmed!
              </h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Hi ${data.name},
              </p>
              
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                Great news! Your free fence estimate has been scheduled. Here are the details:
              </p>
              
              <!-- Appointment Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #8B2D32; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="color: #8B2D32; font-size: 14px; font-weight: 600; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.5px;">
                      📅 Your Appointment
                    </p>
                    <p style="color: #2d2d2d; font-size: 20px; font-weight: 600; margin: 0 0 4px;">
                      ${formattedDate}
                    </p>
                    <p style="color: #4a4a4a; font-size: 16px; margin: 0 0 16px;">
                      ${data.scheduledTime}
                    </p>
                    <p style="color: #666666; font-size: 14px; margin: 0;">
                      📍 ${location}
                    </p>
                    ${data.fenceType ? `<p style="color: #666666; font-size: 14px; margin: 8px 0 0;">🔨 ${data.fenceType}</p>` : ''}
                  </td>
                </tr>
              </table>
              
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                <strong>What to expect:</strong> Our estimator will arrive during your scheduled time window to measure your property, discuss your fencing options, and answer any questions you have.
              </p>
              
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                We'll send you a reminder before your appointment. If you need to reschedule, just give us a call.
              </p>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="tel:+12295636488" style="display: inline-block; background-color: #8B2D32; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 16px; font-weight: 600;">
                      📞 Call (229) 563-6488
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #2d2d2d; padding: 30px; text-align: center;">
              <p style="color: #ffffff; font-size: 18px; font-weight: 600; margin: 0 0 8px;">
                Valdosta Fence Co.
              </p>
              <p style="color: #969696; font-size: 14px; margin: 0 0 16px;">
                Your Local Fence Experts
              </p>
              <p style="color: #969696; font-size: 13px; margin: 0;">
                Serving Valdosta, GA & 25 Miles Surrounding
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Customer confirmation for NON-SCHEDULED request (we'll call them)
export function getRequestConfirmationEmail(data: RequestEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #8B2D32; padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
                ✓ Request Received!
              </h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                Hi ${data.name},
              </p>
              
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                Thanks for reaching out! We've received your free estimate request${data.fenceType ? ` for ${data.fenceType.toLowerCase()}` : ''}.
              </p>
              
              <!-- What's Next Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; border-left: 4px solid #8B2D32; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="color: #8B2D32; font-size: 14px; font-weight: 600; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 0.5px;">
                      📞 What Happens Next
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <p style="color: #2d2d2d; font-size: 15px; margin: 0;">
                            <strong>1.</strong> We'll call you within 24 hours to schedule
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <p style="color: #2d2d2d; font-size: 15px; margin: 0;">
                            <strong>2.</strong> On-site visit to measure & discuss options
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p style="color: #2d2d2d; font-size: 15px; margin: 0;">
                            <strong>3.</strong> Detailed quote within 24-48 hours of visit
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <p style="color: #4a4a4a; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                Need to talk sooner? Give us a call – we're happy to help!
              </p>
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="tel:+12295636488" style="display: inline-block; background-color: #8B2D32; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 16px; font-weight: 600;">
                      📞 Call (229) 563-6488
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #2d2d2d; padding: 30px; text-align: center;">
              <p style="color: #ffffff; font-size: 18px; font-weight: 600; margin: 0 0 8px;">
                Valdosta Fence Co.
              </p>
              <p style="color: #969696; font-size: 14px; margin: 0 0 16px;">
                Your Local Fence Experts
              </p>
              <p style="color: #969696; font-size: 13px; margin: 0;">
                Serving Valdosta, GA & 25 Miles Surrounding
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Subject lines
export function getCustomerSubject(hasAppointment: boolean, name: string): string {
  if (hasAppointment) {
    return `✓ Your Fence Estimate is Confirmed - Valdosta Fence Co.`;
  }
  return `✓ We Got Your Request, ${name}! - Valdosta Fence Co.`;
}

