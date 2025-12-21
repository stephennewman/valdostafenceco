import { Metadata } from "next";
import HeroSection from "../components/HeroSection";
import FAQAccordion from "../components/FAQAccordion";
import CTAButton from "../components/CTAButton";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Common questions about fence installation, materials, pricing, and more. Get answers from Valdosta Fence Co.",
};

const faqCategories = [
  {
    title: "General Questions",
    faqs: [
      {
        question: "What areas do you serve?",
        answer:
          "We serve Valdosta, GA and all areas within a 25-mile radius. This includes Hahira, Lake Park, Remerton, Dasher, Quitman, Adel, Nashville, and Lakeland. If you're unsure whether you're in our service area, just give us a call!",
      },
      {
        question: "Are you licensed and insured?",
        answer:
          "Yes, we are fully licensed and insured for fence installation in Georgia. We carry both general liability insurance and workers' compensation coverage to protect you and our team.",
      },
      {
        question: "How long have you been in business?",
        answer:
          "Valdosta Fence Co is a family-owned business proudly serving South Georgia. We've completed hundreds of fence installations throughout the area and continue to grow through word-of-mouth referrals from satisfied customers.",
      },
      {
        question: "Do you offer free estimates?",
        answer:
          "Yes! We provide free, no-obligation estimates. We'll come to your property, take measurements, discuss your options, and provide a detailed written quote – all at no cost to you.",
      },
    ],
  },
  {
    title: "Pricing & Payment",
    faqs: [
      {
        question: "How much does a fence cost?",
        answer:
          "Fence pricing varies based on material, style, height, and linear footage. As a rough guide: chain link runs $15-25 per linear foot, wood fencing $20-35 per foot, and vinyl $25-45 per foot. We provide exact pricing in our free estimates.",
      },
      {
        question: "Do you require a deposit?",
        answer:
          "For most residential projects, we require a 50% deposit to schedule your installation, with the balance due upon completion. For larger commercial projects, we offer customized payment schedules.",
      },
      {
        question: "Do you offer financing?",
        answer:
          "We're currently exploring financing options for our customers. In the meantime, we accept cash, check, and all major credit cards. Contact us to discuss payment options for larger projects.",
      },
      {
        question: "What's included in your quote?",
        answer:
          "Our quotes include all materials, labor, equipment, post-installation cleanup, and any permits required. We don't have hidden fees – the price we quote is the price you pay (unless you request changes).",
      },
    ],
  },
  {
    title: "Materials & Options",
    faqs: [
      {
        question: "What type of fence is best for privacy?",
        answer:
          "For full privacy, we recommend 6-foot solid wood fencing (board-on-board style), vinyl privacy fencing, or composite fencing. All block visibility completely while still looking attractive.",
      },
      {
        question: "What fence material lasts longest?",
        answer:
          "Vinyl and aluminum fencing typically last 25-30+ years with minimal maintenance. Properly maintained wood fencing lasts 15-20 years. Chain link can last 20+ years. The best choice depends on your priorities and budget.",
      },
      {
        question: "What's the best fence for dogs?",
        answer:
          "For dogs, we typically recommend chain link (economical and durable), wood privacy fencing (blocks visual stimulation), or vinyl (no splinters, easy to clean). Height depends on your dog's jumping ability – we recommend at least 5-6 feet for most breeds.",
      },
      {
        question: "Can you match my existing fence?",
        answer:
          "In most cases, yes. We stock common fence materials and can source specialty items. For older fences with discontinued styles, we'll find the closest match possible or suggest complementary alternatives.",
      },
    ],
  },
  {
    title: "Installation Process",
    faqs: [
      {
        question: "Do I need a permit for a fence?",
        answer:
          "In most Valdosta and Lowndes County locations, yes – especially for fences over 6 feet tall. Good news: we handle the permit process for you as part of our service, including submitting applications and scheduling inspections.",
      },
      {
        question: "How long does fence installation take?",
        answer:
          "Most residential fence projects are completed in 1-3 days, depending on the size and complexity. We'll provide a specific timeline in your estimate. Weather can occasionally cause delays.",
      },
      {
        question: "What about underground utilities?",
        answer:
          "Before any digging, we call 811 to mark all underground utilities. This is required by law and protects both your property and our crew. We schedule this as part of our pre-installation process.",
      },
      {
        question: "Will you remove my old fence?",
        answer:
          "Yes, we offer old fence removal as an add-on service. We'll dispose of all materials properly. The cost depends on the fence size and material – we include this in your quote if needed.",
      },
    ],
  },
  {
    title: "Warranty & Maintenance",
    faqs: [
      {
        question: "Do you offer a warranty?",
        answer:
          "Yes! We stand behind our work with a workmanship warranty. Additionally, many of our fence materials come with manufacturer warranties (vinyl fencing often has lifetime warranties, for example). We'll explain all warranty details in your quote.",
      },
      {
        question: "How do I maintain my fence?",
        answer:
          "Maintenance varies by material. Wood fences benefit from staining/sealing every 2-3 years. Vinyl and aluminum need only occasional cleaning with soap and water. Chain link is essentially maintenance-free. We provide care instructions with every installation.",
      },
      {
        question: "What if my fence is damaged after installation?",
        answer:
          "We offer fence repair services for all types of damage – storm damage, accidents, normal wear. We prioritize repair calls from our installation customers. Just give us a call and we'll schedule an assessment.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <HeroSection
        subtitle="FAQ"
        title="Frequently Asked Questions"
        description="Find answers to common questions about our fencing services."
        size="sm"
      />

      <section className="py-16 lg:py-24 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqCategories.map((category, index) => (
            <div key={category.title} className={index > 0 ? "mt-12" : ""}>
              <h2 className="text-2xl font-[var(--font-serif)] text-[var(--forest-green)] mb-6">
                {category.title}
              </h2>
              <FAQAccordion items={category.faqs} />
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 lg:py-24 bg-[var(--background-alt)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-[var(--font-serif)] text-[var(--forest-green)] mb-4">
            Still Have Questions?
          </h2>
          <p className="text-[var(--foreground-muted)] mb-8">
            We&apos;re happy to answer any questions you have about your fencing
            project. Contact us for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton href="/contact" variant="primary">
              Contact Us
            </CTAButton>
            <CTAButton href="/free-estimate" variant="outline">
              Get Free Estimate
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Schema Markup for FAQ (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqCategories.flatMap((category) =>
              category.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              }))
            ),
          }),
        }}
      />
    </>
  );
}


