import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex justify-center items-start">
      {/* Adjusted max-width to approximate A4 size (794px at 96 DPI) while keeping it responsive */}
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-[794px]">
        {/* Header */}
        <header className="text-center mb-4"> {/* Reduced mb-6 to mb-4 */}
          {/* Heading font size: 15px */}
          <h1 className="text-[15px] font-bold text-gray-800 mb-1">Gautam Kumar Mahato</h1> {/* Reduced mb-2 to mb-1 */}
          {/* Other text font size: 11px */}
          <div className="text-[11px] text-gray-600 flex flex-wrap justify-center items-center gap-x-4 gap-y-0.5"> {/* Reduced gap-y-1 to gap-y-0.5 */}
            <a href="https://gautamkmahato.site" className="text-blue-600 hover:underline">gautamkmahato.site</a>
            <span>|</span>
            <a href="https://linkedin.com/in/gautamkumarmahato" className="text-blue-600 hover:underline">Linkedin</a>
            <span>|</span>
            <a href="https://github.com/gautamkumarmahato" className="text-blue-600 hover:underline">Github</a>
          </div>
          {/* Other text font size: 11px */}
          <div className="text-[11px] text-gray-600 flex flex-wrap justify-center items-center gap-x-4 gap-y-0.5 mt-0.5"> {/* Reduced gap-y-1 to gap-y-0.5 and mt-1 to mt-0.5 */}
            <span>+91-8340605124</span>
            <span>|</span>
            <span>gautamkumarmahato104@gmail.com</span>
            <span>|</span>
            <span>Jamshedpur, India</span>
          </div>
        </header>

        {/* Work Experience */}
        <section className="mb-4"> {/* Reduced mb-6 to mb-4 */}
          {/* Heading font size: 15px */}
          <h2 className="text-[15px] font-semibold text-gray-700 border-b-2 border-gray-300 pb-1 mb-2">Work Experience</h2> {/* Reduced pb-2 to pb-1 and mb-4 to mb-2 */}
          <div className="mb-2"> {/* Reduced mb-4 to mb-2 */}
            <div className="flex justify-between items-center mb-0.5"> {/* Reduced mb-1 to mb-0.5 */}
              {/* Subheading font size: 13px */}
              <h3 className="text-[13px] font-medium text-gray-800">Project Engineer</h3>
              {/* Other text font size: 11px */}
              <span className="text-[11px] text-gray-600">July 2021-Present</span>
            </div>
            {/* Other text font size: 11px */}
            <p className="text-[11px] text-gray-700 mb-1">WIPRO, Hyderabad India</p> {/* Reduced mb-2 to mb-1 */}
            {/* Other text font size: 11px */}
            <ul className="list-disc list-inside text-[11px] text-gray-700 space-y-0.5"> {/* Reduced space-y-1 to space-y-0.5 */}
              <li>Developed and maintained an API documentation portal using JavaScript and React, allowing developers and stakeholders to easily explore and understand API specifications.</li>
              <li>Designed and implemented an Error messaging service using the MERN stack, ensuring consistent and seamless communication of error messages across multiple client services.</li>
              <li>Maintained and updated API specifications using Next.js, OpenAI, SwaggerHub, and integrated AI functionality into the documentation to enhance clarity, accuracy, and overall user experience across teams.</li>
              <li>Tech Stack used: Java, Spring boot, Node Js, Express Js, React, Next Js, Microservices</li>
            </ul>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-4"> {/* Reduced mb-6 to mb-4 */}
          {/* Heading font size: 15px */}
          <h2 className="text-[15px] font-semibold text-gray-700 border-b-2 border-gray-300 pb-1 mb-2">Skills</h2> {/* Reduced pb-2 to pb-1 and mb-4 to mb-2 */}
          {/* Other text font size: 11px */}
          <ul className="list-disc list-inside text-[11px] text-gray-700 space-y-0.5"> {/* Reduced space-y-1 to space-y-0.5 */}
            <li><span className="font-medium">Programming Languages:</span> Java, Python, JavaScript, Node Js, Typescript</li>
            <li><span className="font-medium">Frameworks & Libraries:</span> React.js, Next.js, Node.js, Express.js, Spring Boot, Redux, Tailwind CSS, Bootstrap, Jest, JUnit, React Testing Library</li>
            <li><span className="font-medium">Databases:</span> PostgreSQL, MySQL, Redis, Firebase Realtime DB, Supabase, SQLite</li>
            <li><span className="font-medium">Tools & Technologies:</span> Git & GitHub, Docker, CI/CD (GitHub Actions, Jenkins), REST & GraphQL APIs, Vite, Stripe API, Clerk API, Postman, Figma, Agile/Scrum</li>
          </ul>
        </section>

        {/* Projects */}
        <section className="mb-4"> {/* Reduced mb-6 to mb-4 */}
          {/* Heading font size: 15px */}
          <h2 className="text-[15px] font-semibold text-gray-700 border-b-2 border-gray-300 pb-1 mb-2">Projects</h2> {/* Reduced pb-2 to pb-1 and mb-4 to mb-2 */}
          <div className="mb-2"> {/* Reduced mb-4 to mb-2 */}
            <div className="flex justify-between items-center mb-0.5"> {/* Reduced mb-1 to mb-0.5 */}
              {/* Subheading font size: 13px */}
              <h3 className="text-[13px] font-medium text-gray-800">Weaver AI Documentation</h3>
              {/* Other text font size: 11px */}
              <a href="#" className="text-blue-600 hover:underline text-[11px]">Link</a>
            </div>
            {/* Other text font size: 11px */}
            <ul className="list-disc list-inside text-[11px] text-gray-700 space-y-0.5"> {/* Reduced space-y-1 to space-y-0.5 */}
              <li>An AI-powered documentation platform that transforms OpenAPI schemas into modern and interactive documentation.</li>
              <li>Includes automatic generation of input/output schemas, enhancing developer experience and integration speed.</li>
            </ul>
          </div>
          <div className="mb-2"> {/* Reduced mb-4 to mb-2 */}
            <div className="flex justify-between items-center mb-0.5"> {/* Reduced mb-1 to mb-0.5 */}
              {/* Subheading font size: 13px */}
              <h3 className="text-[13px] font-medium text-gray-800">EmailCraft AI</h3>
              {/* Other text font size: 11px */}
              <a href="#" className="text-blue-600 hover:underline text-[11px]">Link</a>
            </div>
            {/* Other text font size: 11px */}
            <ul className="list-disc list-inside text-[11px] text-gray-700 space-y-0.5"> {/* Reduced space-y-1 to space-y-0.5 */}
              <li>An AI-based email automation platform enabling users to create, edit, and send professional emails using prebuilt templates or natural language prompts.</li>
              <li>Supports exporting templates, ESP integration, analytics, and collaborative editing.</li>
            </ul>
          </div>
          <div>
            <div className="flex justify-between items-center mb-0.5"> {/* Reduced mb-1 to mb-0.5 */}
              {/* Subheading font size: 13px */}
              <h3 className="text-[13px] font-medium text-gray-800">VaaniWave AI</h3>
              {/* Other text font size: 11px */}
              <a href="#" className="text-blue-600 hover:underline text-[11px]">Link</a>
            </div>
            {/* Other text font size: 11px */}
            <ul className="list-disc list-inside text-[11px] text-gray-700 space-y-0.5"> {/* Reduced space-y-1 to space-y-0.5 */}
              <li>A realistic AI text-to-speech application offering voice generation, transcription, and cloning capabilities through a self-hosted platform.</li>
              <li>Integrated with Stripe for subscription plans, supporting multiple payment methods and Supabase for data handling.</li>
            </ul>
          </div>
        </section>

        {/* Education */}
        <section className="mb-4"> {/* Reduced mb-6 to mb-4 */}
          {/* Heading font size: 15px */}
          <h2 className="text-[15px] font-semibold text-gray-700 border-b-2 border-gray-300 pb-1 mb-2">Education</h2> {/* Reduced pb-2 to pb-1 and mb-4 to mb-2 */}
          {/* Other text font size: 11px */}
          <p className="text-[11px] text-gray-700">B.Tech in Electronics and Communication, VIT University Vellore, 2017-2021</p>
          {/* Other text font size: 11px */}
          <p className="text-[11px] text-gray-700">CGPA: 8.60</p>
        </section>

        {/* Extra Curricular Activities */}
        <section>
          {/* Heading font size: 15px */}
          <h2 className="text-[15px] font-semibold text-gray-700 border-b-2 border-gray-300 pb-1 mb-2">Extra Curricular Activities</h2> {/* Reduced pb-2 to pb-1 and mb-4 to mb-2 */}
          <div className="flex justify-between items-start mb-0.5"> {/* Reduced mb-1 to mb-0.5 */}
            {/* Other text font size: 11px */}
            <p className="text-[11px] text-gray-700">Leetcode: 200+ problems solved | 50 Days Badge 2022</p>
            {/* Other text font size: 11px */}
            <a href="#" className="text-blue-600 hover:underline text-[11px]">Link</a>
          </div>
          <div className="flex justify-between items-start">
            {/* Other text font size: 11px */}
            <p className="text-[11px] text-gray-700">CodeStudio: Level 5 (Champion)</p>
            {/* Other text font size: 11px */}
            <a href="#" className="text-blue-600 hover:underline text-[11px]">Link</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
