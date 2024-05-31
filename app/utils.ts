import { headers } from "next/headers";
import { JSDOM } from 'jsdom';

export function currentURL(pathname: string): URL {
  const headersList = headers();
  const host = headersList.get("x-forwarded-host") || headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";

  try {
    return new URL(pathname, `${protocol}://${host}`);
  } catch (error) {
    return new URL(process.env.APP_URL ?? "http://localhost:3000");
  }
}

export async function subscribeToNewsletter(email: string) {
  const url = 'https://login.sendpulse.com/forms/simple/u/eyJ1c2VyX2lkIjo4MjUxNTM4LCJhZGRyZXNzX2Jvb2tfaWQiOjEwNDI3MSwibGFuZyI6ImVuIn0=';
  const formData = new URLSearchParams();
  formData.append('email', email);
  formData.append('sender', "support@devcon.org");

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Cache-Control': 'max-age=0',
        'Origin': 'https://devcon.org',
        'Referer': 'https://devcon.org/',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'cross-site',
        'Sec-Fetch-User': '?1',
        'Sec-Gpc': '1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text(); // Assuming the response is text/html as per the Accept header
    console.log('Subscription successful:', data);
    const isValid = isValidEmail(data);
    console.log(isValid, 'what is Isvalid+')
    return isValid

    return data;
  } catch (error) {
    console.error('Failed to subscribe:', error);
  }
}

export function isValidEmail(html: string) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const firstParagraph = document.querySelector("p");


  if (firstParagraph && firstParagraph.textContent) {
    const textContent = firstParagraph.textContent.trim();
    if (textContent.startsWith("You entered an invalid email")) {
      return false
    } else if (textContent.startsWith("An email with a link")) {
      console.log("The paragraph starts with 'An email with a link'");
      return true

    } else {
      console.log("The paragraph starts with something else");
    }
  } else {
    console.log("No <p> tag found");
  }
}


export function appURL() {
  if (process.env.APP_URL) {
    return process.env.APP_URL;
  } else {
    const url = process.env.APP_URL || vercelURL() || "http://localhost:3000";
    console.warn(
      `Warning: APP_URL environment variable is not set. Falling back to ${url}.`
    );
    return url;
  }
}

export function vercelURL() {
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined;
}
