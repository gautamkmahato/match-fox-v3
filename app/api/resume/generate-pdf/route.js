// app/api/resume/generate-pdf/route.ts
import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  // const { searchParams } = new URL(req.url);
  // const resumeId = searchParams.get('id');

  const { htmlContent } = await req.json();

  if (!htmlContent) {
    return NextResponse.json({ state: false, error: 'Missing htmlContent',cmessage: 'Failed' }, { status: 400 });
  }

//   const htmlContent = `
// <html>
//   <head>
//     <style>
//       body {
//         background: white;
//         font-family: Arial, sans-serif;
//         padding: 40px;
//         color: #333;
//         max-width: 794px;
//         margin: auto;
//       }

//       .resume-wrapper {
//         background: white;
//         border-radius: 8px;
//         padding: 32px;
//         box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//       }

//       h1 {
//         font-size: 18px;
//         font-weight: bold;
//         color: #2b2b2b;
//         margin-bottom: 4px;
//         text-align: center;
//       }

//       h2 {
//         font-size: 15px;
//         font-weight: 600;
//         border-bottom: 2px solid #ccc;
//         padding-bottom: 4px;
//         margin-bottom: 8px;
//         margin-top: 20px;
//         color: #333;
//       }

//       h3 {
//         font-size: 13px;
//         font-weight: 500;
//         margin: 0;
//         color: #222;
//       }

//       p,
//       li,
//       span {
//         font-size: 11px;
//         color: #444;
//         margin: 0;
//       }

//       .section {
//         margin-bottom: 24px;
//       }

//       .header-contact,
//       .header-links {
//         display: flex;
//         flex-wrap: wrap;
//         justify-content: center;
//         gap: 8px;
//         font-size: 11px;
//         color: #666;
//         margin-top: 4px;
//         margin-bottom: 8px;
//       }

//       .header-contact span,
//       .header-links a {
//         text-decoration: none;
//         color: #1a73e8;
//       }

//       ul {
//         padding-left: 16px;
//       }

//       ul li {
//         margin-bottom: 4px;
//       }

//       .flex-between {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//       }
//     </style>
//   </head>

//   <body>
//     <div class="resume-wrapper">
//       <header class="section">
//         <h1>Gautam Kumar Mahato</h1>

//         <div class="header-links">
//           <a href="https://gautamkumarmahato.dev">gautamkumarmahato.dev</a> |
//           <a href="https://linkedin.com/in/gautamkumarmahato">linkedin.com/in/gautamkumarmahato</a> |
//           <a href="https://github.com/gautamkumarmahato">github.com/gautamkumarmahato</a>
//         </div>

//         <div class="header-contact">
//           <span>+91-9876543210</span> |
//           <span>gautam@example.com</span> |
//           <span>Bangalore, India</span>
//         </div>
//       </header>

//       <section class="section">
//         <h2>Work Experience</h2>

//         <div>
//           <div class="flex-between">
//             <h3>Software Engineer</h3>
//             <span>July 2021 - Present</span>
//           </div>
//           <p>ABC Technologies</p>
//           <ul>
//             <li>Developed scalable full-stack applications using React and Node.js</li>
//             <li>Led a team of 4 engineers to deliver new features</li>
//           </ul>
//         </div>
//       </section>

//       <section class="section">
//         <h2>Skills</h2>
//         <ul>
//           <li><strong>Programming Languages:</strong> JavaScript, TypeScript, Python</li>
//           <li><strong>Frameworks & Libraries:</strong> React, Next.js, Express</li>
//           <li><strong>Databases:</strong> MongoDB, PostgreSQL</li>
//           <li><strong>Tools & Technologies:</strong> Git, Docker, Supabase</li>
//           <li><strong>Other:</strong> Figma, Vercel, Notion</li>
//         </ul>
//       </section>

//       <section class="section">
//         <h2>Projects</h2>

//         <div>
//           <div class="flex-between">
//             <h3>AI Interview Assistant (Jina)</h3>
//           </div>
//           <ul>
//             <li>Voice-based AI interviewer built using Vapi + Gemini</li>
//             <li>Follows structured logic to evaluate candidate responses</li>
//             <li>Supports scheduling, candidate profiles, and evaluation metrics</li>
//           </ul>
//         </div>
//       </section>

//       <section class="section">
//         <h2>Education</h2>
//         <p><strong>B.Tech in Computer Science</strong></p>
//         <p>ABC University</p>
//         <p>2018 – 2022 | CGPA: 8.9</p>
//       </section>

//       <section class="section">
//         <h2>Extra Curricular Activities</h2>
//         <ul>
//           <li>Open Source Contributor at Harkirat's Repo</li>
//           <li>Tech Blogging and DevRel Evangelism</li>
//           <li>Volunteered at Developer Student Clubs</li>
//         </ul>
//       </section>
//     </div>
//   </body>
// </html>

//   `;

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
  status: 200,
  headers: {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename="resume.pdf"',
  },
});

  } catch (error) {
    return NextResponse.json({ state: false, error: 'PDF generation failed', message: error }, { status: 500 });
  }
}
