"use client";

import { useGetTermsQuery } from "@/app/redux/features/api/termsApi";

const staticSections = [
  {
    number: 1,
    title: "SERVICES",
    body: "We offer purchase of physical gold and silver products (e.g., coins, bars) displayed on the Platform. Products are delivered to your registered address via secure courier. No Kaasmic gold, investments, or demat services. Blog content is informational only.",
  },
  {
    number: 2,
    title: "USER ACCOUNT",
    items: [
      "You must be 18+ and provide accurate info.",
      "Maintain confidentiality of credentials. Notify us of unauthorized use.",
      "We may suspend/terminate accounts for violations.",
    ],
  },
  {
    number: 3,
    title: "ORDERS AND PAYMENT",
    items: [
      "Orders placed are offers; acceptance on confirmation/email.",
      "Prices include GST (where applicable); subject to change.",
      "Payment via third-party gateways (UPI, cards, etc.). All transactions are final once processed.",
      "We reserve the right to cancel orders (e.g., stock unavailability, fraud suspicion) with refund.",
    ],
  },
  {
    number: 4,
    title: "DELIVERY AND SHIPPING",
    items: [
      "Delivery to verified Indian addresses only (check serviceability).",
      "Estimated timelines provided; delays possible due to logistics/force majeure.",
      "Risk passes on delivery. Title transfers on full payment and delivery.",
      "Mandatory Video Recording for Unpacking (to prevent fraud): Record clear, uninterrupted video starting from unopened package (showing seals/labels), through opening, to contents display. No claims for missing/damaged items without this video. Submit with claim.",
    ],
  },
  {
    number: 5,
    title: "RETURNS, REFUNDS, AND CANCELLATIONS",
    items: [
      "Physical precious metals are non-returnable/non-exchangeable except for manufacturing defects/damage (reported within [e.g., 7 days] with video proof).",
      "Refunds (if approved) to original payment method (less charges).",
      "Cancellation before dispatch: possible with fees/deduction for market loss if price changes.",
    ],
  },
  {
    number: 6,
    title: "PRODUCT WARRANTY",
    body: "Products guaranteed against manufacturing defects as per supplier terms. Purity certified (e.g., hallmark for gold). No other warranties.",
  },
  {
    number: 7,
    title: "INTELLECTUAL PROPERTY",
    body: "All content (logos, text, images) owned by us or licensors. No unauthorized use.",
  },
  {
    number: 8,
    title: "LIMITATION OF LIABILITY",
    items: [
      "We are not liable for indirect losses, product misuse, or third-party actions.",
      "Max liability limited to order value.",
      "No liability for investment decisions based on blog content (informational only).",
    ],
  },
  {
    number: 9,
    title: "GOVERNING LAW AND DISPUTE RESOLUTION",
    body: "Governed by Indian laws. Disputes subject to arbitration in Salem or courts in Salem, Tamil Nadu.",
  },
  {
    number: 10,
    title: "CHANGES TO TERMS",
    body: "We may update Terms. Continued use constitutes acceptance.",
  },
  {
    number: 11,
    title: "CONTACT",
    body: "support@kaasmic.in",
  },
];

export default function TermsandConditions() {
  const { data, isLoading } = useGetTermsQuery();

  const apiContent = data?.data?.page?.content;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 pb-20">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-10 text-center">
        <h1 className="text-3xl font-semibold text-gray-900">
          {data?.data?.page?.title || "Terms and Conditions"}
        </h1>
      </div>

      {/* Content Area */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        {apiContent ? (
          <div
            className="
              [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-gray-900 [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:leading-tight
              [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-gray-800 [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:pb-1.5 [&_h2]:border-b [&_h2]:border-gray-200 [&_h2]:leading-snug
              [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-gray-700 [&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:leading-normal
              [&_p]:text-sm [&_p]:text-gray-600 [&_p]:leading-7 [&_p]:mb-3
              [&_ol]:ml-6 [&_ol]:mb-4
              [&_ul]:ml-6 [&_ul]:mb-4
              [&_li]:text-sm [&_li]:text-gray-600 [&_li]:leading-7 [&_li]:mb-1.5 [&_li]:list-disc
              [&_.ql-ui]:hidden
              [&_a]:text-amber-700 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-amber-900
            "
            dangerouslySetInnerHTML={{ __html: apiContent }}
          />
        ) : (
          <>
            {/* Intro Fallback */}
            <div className="mb-10">
              <p className="text-sm leading-7 text-gray-600">
                These Terms govern your access and use of the Platform (https://kaasmic.in and Kaasmic mobile app)
                operated by KAASMIC TECHNOLOGIES PRIVATE LIMITED (registered at 67/1, Appasamy Road,
                Shevapet, Shevapet Bazaar, Salem - 636002, India) ("Company", "We", "Us", "Our").
              </p>
              <p className="mt-4 text-sm leading-7 text-gray-600">
                By accessing/using the Platform or purchasing physical gold/silver products (delivered via secure courier),
                you agree to these Terms (and incorporate Privacy Policy). If you disagree, do not use the Platform.
              </p>
            </div>

            {/* Sections Fallback */}
            <div className="space-y-8">
              {staticSections.map((section: any) => (
                <div key={section.number}>
                  <h2 className="mb-3 text-base font-semibold uppercase text-gray-900">
                    {section.number}. {section.title}
                  </h2>

                  {section.body && (
                    <p className="text-sm leading-7 text-gray-600">{section.body}</p>
                  )}

                  {section.items && section.items.length > 0 && (
                    <ul className="ml-4 list-disc space-y-2 mt-2">
                      {section.items.map((item: string, i: number) => (
                        <li key={i} className="text-sm leading-7 text-gray-600">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}