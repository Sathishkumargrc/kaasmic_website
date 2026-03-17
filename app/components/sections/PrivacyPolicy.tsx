"use client";

const sections = [
  {
    number: 1,
    title: "Collection of Information",
    content: [
      {
        subtitle: "Information You Provide to Us",
        items: [
          "During registration: name, mobile number, email address, password, date of birth, gender.",
          "We use contact information to authenticate accounts, secure services, prevent fraud/abuse, personalize Services, and send Service-related communications (e.g., order updates). You agree to receive SMS/WhatsApp/email from Kaasmic if you provide your number/email.",
          "For purchases: shipping address, billing address, and payment-related details (processed via third-party gateways).",
          "For high-value transactions or regulatory compliance (e.g., under PMLA or other laws): KYC details such as Aadhaar (voluntary), PAN, driving license, address proof, etc., solely for authentication and compliance.",
          "Financial information (e.g., bank details for refunds, UPI/card info) is processed by third-party payment providers (e.g., Razorpay, PayU, Google Pay). We do not store full card details.",
          "Feedback, messages, correspondence, or support queries.",
          "All information is provided voluntarily. You may edit, modify, or delete your information (subject to legal retention).",
        ],
      },
      {
        subtitle: "Automated Collected Information",
        items: [
          "Usage/log data: IP address, browser type, OS, device ID, visit time, pages viewed (for analytics, security, and improvement).",
          "Location data (if enabled on mobile for delivery estimates/personalization; disable anytime).",
          "Cookies and tracking: session/persistent cookies for functionality, performance, security, and limited advertising. Opt-out via browser settings.",
          "Third-party data: From analytics/tracking providers (governed by their policies).",
        ],
      },
    ],
  },
  {
    number: 2,
    title: "Use of Your Information",
    items: [
      "Provide and improve Services (e.g., process orders, deliver products).",
      "Authenticate, prevent fraud, resolve disputes, provide support.",
      "Send order updates and promotions (with consent where required).",
      "Comply with laws and enforce Terms.",
      "Internal research using aggregated or anonymized data.",
    ],
  },
  {
    number: 3,
    title: "Sharing of Information",
    items: [
      "With affiliates/partners for Services (e.g., logistics for delivery).",
      "Third-party vendors (e.g., payment gateways, couriers like Delhivery/Blue Dart, cloud providers like AWS) are bound by confidentiality.",
      "For compliance, legal requests, fraud prevention, or emergencies.",
      "No sharing for third-party marketing without explicit consent.",
    ],
  },
  {
    number: 4,
    title: "Links to Third-Party Sites",
    body: "The platform may link to third parties (e.g., payment gateways). We are not responsible for their privacy practices. Please review their policies independently.",
  },
  {
    number: 5,
    title: "Security",
    body: "We use reasonable measures (e.g., encryption for payments, secure servers) but cannot guarantee absolute security. You are responsible for protecting your credentials and account access.",
  },
  {
    number: 6,
    title: "Data Storage and Retention",
    body: "Data is stored on a secure cloud (e.g., AWS). It is retained as necessary for legal requirements and service purposes. Anonymized data may be retained for longer periods for analytical use.",
  },
  {
    number: 7,
    title: "Your Privacy Rights",
    body: "Consent is voluntary. You may withdraw consent by emailing support@kaasmic.in (this may limit certain Services). Your rights — including access, correction, and deletion — are subject to applicable law, including the DPDP Act.",
  },
  {
    number: 8,
    title: "Changes to Privacy Policy",
    body: "We may update this Policy at any time. Changes are effective immediately upon posting. We encourage you to review this page regularly. For any queries, contact us at support@kaasmic.in.",
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* Page Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-10 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">Privacy Policy</h1>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-12">

        {/* Intro */}
        <div className="mb-10">
          <p className="text-sm leading-7 text-gray-600">
            This Privacy Policy is incorporated by reference into Kaasmic Terms and Conditions (the &quot;Terms&quot;).
            The website{" "}
            <a href="https://kaasmic.in" className="text-blue-400 underline">
              https://kaasmic.in
            </a>{" "}
            and/or the mobile application <strong>&apos;Kaasmic&apos;</strong> (collectively referred to as the &quot;Platform&quot;)
            is owned and operated by{" "}
            <strong>KAASMIC TECHNOLOGIES PRIVATE LIMITED</strong>, a private limited company having its
            registered office at 67/1, Appasamy Road, Shevapet, Shevapet Bazaar, Salem - 636002, India
            (together referred to as &quot;Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot;).
          </p>
          <p className="mt-4 text-sm leading-7 text-gray-600">
            This Privacy Policy applies to all Users whose Personal Information has been processed by Us in
            the course of our business, mobile applications, forums, blogs, and other online or offline
            offerings. Please read this Privacy Policy carefully before using or registering on the Platform
            or accessing the Services, in relation to purchase of physical gold and silver products (such as
            coins, bars, or jewelry items) that are delivered via secure courier (&quot;Services&quot;).
          </p>
          <p className="mt-4 text-sm leading-7 text-gray-600">
            By visiting the Platform, You (&quot;You&quot; or &quot;Your&quot;) accept and agree to be bound by this Privacy
            Policy, which is incorporated into and subject to the Terms.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-2">
          {sections?.map((section) => (
            <div key={section.number}>
              {/* Section heading */}
              <h2 className="mb-4 text-base font-semibold uppercase tracking-wide text-gray-900">
                {section?.number}. {section?.title}
              </h2>

              {/* Nested blocks with subtitle */}
              {section?.content?.map((block, bi) => (
                <div key={bi} className="mb-5">
                  <h3 className="mb-2 text-sm font-semibold text-gray-800">
                    {block?.subtitle}
                  </h3>
                  <ul className="ml-4 list-disc space-y-2">
                    {block?.items?.map((item, ii) => (
                      <li key={ii} className="text-sm leading-7 text-gray-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Flat list */}
              {section?.items && (
                <ul className="ml-4 list-disc space-y-2">
                  {section?.items?.map((item, ii) => (
                    <li key={ii} className="text-sm leading-7 text-gray-600">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* Body paragraph */}
              {section?.body && (
                <p className="text-sm leading-7 text-gray-600">{section?.body}</p>
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-10 rounded-md border border-gray-200 bg-gray-50 px-6 py-5">
          <p className="text-sm text-gray-600">
            For any privacy-related queries or to exercise your rights, please contact us at:{" "}
            <a
              href="mailto:support@kaasmic.in"
              className="font-medium text-gray-900 underline"
            >
              support@kaasmic.in
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}