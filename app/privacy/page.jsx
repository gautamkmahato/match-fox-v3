import React from "react";

const PrivacyPolicy = () => {
  return (
    <main className="max-w-4xl mx-auto p-6 sm:p-12 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4 font-semibold">Effective Date: [Insert Date]</p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">What Data We Collect</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            We only access the <strong>job description text</strong> from job
            listings on LinkedIn, Naukri, Indeed, and Peerlist.
          </li>
          <li>
            We do <strong>not</strong> collect or store any personally
            identifiable information (PII), health, financial, authentication,
            personal communication, location, web history, or user activity data.
          </li>
          <li>
            The job description text is temporarily stored <strong>locally in
            your browser's local storage</strong> to support the mock interview
            workflow.
          </li>
          <li>
            No personal information, browsing history, LinkedIn profile data, or
            network data is stored or transmitted.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">How We Use Your Data</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            The job description text is used solely to enable the mock interview
            functionality by sending this data to the HireNom website when you
            click the “Mock Interview” button.
          </li>
          <li>
            Data is processed locally and only shared with HireNom with your
            explicit action (clicking the button).
          </li>
          <li>
            We do not sell, share, or transfer any data to third parties beyond
            this purpose.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Permissions</h2>
        <p>
          The extension requires permissions to read job description content on
          supported sites to inject the button and facilitate the feature. No
          other permissions or data collection takes place.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>You can uninstall the extension at any time.</li>
          <li>
            If you have questions about your data or privacy, please contact us
            at <a href="hirenom.com" className="text-blue-600 underline">@hirenom.com</a>.
          </li>
        </ul>
      </section>

      <p>
        By using this extension, you agree to this Privacy Policy. We may update
        this policy occasionally; the latest version will always be available on
        our website.
      </p>
    </main>
  );
};

export default PrivacyPolicy;
