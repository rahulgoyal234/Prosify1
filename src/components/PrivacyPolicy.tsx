import React from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

const logo = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMTcwIDQxOHYtMjg4YzI0MCAwIDI0MCAxNzAgMCAxNzAiIHN0cm9rZT0iI2M5YTg0YyIgc3Ryb2tlLXdpZHRoPSI2MCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgPGNpcmNsZSBjeD0iNDAwIiBjeT0iMTI1IiByPSI0MCIgZmlsbD0iI2M5YTg0YyIvPgo8L3N2Zz4=";

interface PrivacyPolicyProps {
  onClose: () => void;
}

export default function PrivacyPolicy({ onClose }: PrivacyPolicyProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[2000] bg-[#fdfcfa] text-[#0d0d0d] overflow-y-auto font-sans selection:bg-[#b8903a]/20"
    >
      {/* Navigation */}
      <nav className="sticky top-0 left-0 right-0 z-[100] px-4 sm:px-6 md:px-12 py-4 sm:py-5 flex items-center justify-between bg-[#fdfcfa]/95 backdrop-blur-md border-b border-[#e0d9d0]">
        <div className="flex items-center gap-2 sm:gap-3">
          <img src={logo} alt="Logo" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
          <span className="font-bebas text-xl sm:text-2xl tracking-[0.2em] sm:tracking-[0.3em] text-[#b8903a]">PROSIFY</span>
        </div>
        <button 
          onClick={onClose}
          className="text-[10px] sm:text-[11px] tracking-[0.1em] sm:tracking-[0.12em] uppercase text-[#6b6560] hover:text-[#b8903a] transition-colors flex items-center gap-1.5 sm:gap-2"
        >
          <ArrowLeft size={12} className="sm:w-3.5 sm:h-3.5" />
          <span className="hidden xs:inline">Back to Home</span>
          <span className="xs:hidden">Back</span>
        </button>
      </nav>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-8 md:px-12">
        {/* Header */}
        <header className="pt-8 pb-4 border-b border-[#e0d9d0]">
          <h1 className="font-serif text-2xl sm:text-3xl font-light mb-1 text-[#0d0d0d]">Privacy Policy</h1>
          <p className="text-[#6b6560] text-xs sm:text-sm">Effective Date: 22 March 2026</p>
        </header>

        {/* Intro */}
        <div className="py-4 border-b border-[#e0d9d0] space-y-2 text-[#2a2620] leading-relaxed text-[13px] sm:text-[14px]">
          <p>
            Prosify is a premium virtual content and communication agency based in India, serving a global clientele. This policy explains what information we collect, why we collect it, and how we protect it.
          </p>
          <p>
            If you have questions, please contact us at <a href="mailto:contactprosify@gmail.com" className="text-[#b8903a] underline underline-offset-4">contactprosify@gmail.com</a>.
          </p>
        </div>

        {/* TOC */}
        <div className="py-4 border-b border-[#e0d9d0]">
          <h2 className="font-serif text-xl font-normal mb-2">Table of Contents</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-1">
            {[
              "Who We Are", "Scope & Application", "Information We Collect", "How We Use Your Information",
              "Legal Basis for Processing", "Sharing & Disclosure", "International Data Transfers",
              "Data Retention", "Security", "Cookies & Tracking", "Your Rights by Region",
              "Third-Party Links", "Children's Privacy", "Changes to This Policy", "Contact & Grievances"
            ].map((item, i) => (
              <li key={item}>
                <a href={`#s${i+1}`} className="text-[#6b6560] hover:text-[#b8903a] text-sm flex items-center gap-2">
                  <span className="text-[#b8903a] text-xs font-medium">{i+1}.</span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Sections */}
        <div className="space-y-0">
          <Section id="s1" num="01" title="Who We Are">
            <p>Prosify is a fully virtual premium content and communication agency. We provide content strategy, professional writing, ghostwriting, resume development, editing and proofreading, blogging, thought leadership, and premium website development services to brands and professionals worldwide.</p>
            <p>For the purposes of data protection law, Prosify acts as the <strong>data controller</strong> in respect of any personal data you share with us, meaning we determine the purposes and means of processing. Where we engage trusted collaborators to assist in delivering your project, those individuals act as <strong>data processors</strong>, operating strictly under our instruction and bound by confidentiality obligations.</p>
            <ul className="space-y-1 mt-3">
              <ListItem label="Business Name">Prosify</ListItem>
              <ListItem label="Nature">Virtual Agency, India-based, globally operating</ListItem>
              <ListItem label="Primary Contact">contactprosify@gmail.com</ListItem>
            </ul>
          </Section>

          <Section id="s2" num="02" title="Scope & Application">
            <p>This Privacy Policy applies to:</p>
            <ul className="space-y-1 my-3">
              <ListItem>All individuals who visit the Prosify website, regardless of their country of residence.</ListItem>
              <ListItem>All prospective clients who contact us via email to enquire about our services.</ListItem>
              <ListItem>All current and past clients who have engaged Prosify for any service.</ListItem>
              <ListItem>All individuals whose personal data is processed by Prosify in the course of delivering our services, for example, biographical or career information shared for resume, ghostwriting, or thought leadership projects.</ListItem>
            </ul>
            <p>This policy does not apply to third-party websites, social media platforms, or payment processors that may be linked from or used alongside our services. Those platforms operate under their own independent privacy policies.</p>
            <div className="bg-[#f0ece4] border-l-2 border-[#b8903a] p-4 mt-4 text-[13px]">
              Wherever you are in the world, if you interact with Prosify, this policy applies to you. We extend the same standard of care to every individual regardless of nationality or location.
            </div>
          </Section>

          <Section id="s3" num="03" title="Information We Collect">
            <p>We collect only what is strictly necessary to provide our services and communicate with you effectively. All information we receive comes directly from you, we use no automated collection systems, cookies, or trackers of any kind, and we do not purchase data from any third-party source.</p>
            
            <h4 className="font-serif text-lg font-medium mt-6 mb-2">Information you provide via email</h4>
            <ul className="space-y-1 mb-4">
              <ListItem>Your name and email address, shared when you first write to us.</ListItem>
              <ListItem>Your professional background, career history, qualifications, and achievements, shared when engaging resume, LinkedIn, or career narrative services.</ListItem>
              <ListItem>Your business details: brand name, industry, target audience, competitors, content objectives, and tone preferences, shared when onboarding for content strategy, writing, or website development.</ListItem>
              <ListItem>Draft manuscripts, articles, speeches, or other written materials you share for editing, ghostwriting, or proofreading purposes.</ListItem>
              <ListItem>Any other information you voluntarily include in your email correspondence with us.</ListItem>
            </ul>

            <h4 className="font-serif text-lg font-medium mt-6 mb-2">Information collected at the point of payment</h4>
            <ul className="space-y-1 mb-4">
              <ListItem>Your billing name and email address, used to issue and track invoices.</ListItem>
              <ListItem>Payment is processed exclusively through secure third-party payment platforms. Prosify does not receive, store, or have access to your payment card numbers, bank account details, or any other financial credentials.</ListItem>
            </ul>

            <h4 className="font-serif text-lg font-medium mt-6 mb-2">Information we do NOT collect</h4>
            <ul className="space-y-1">
              <ListItem>We do not collect data through cookies, tracking pixels, web beacons, analytics scripts, or any similar technologies.</ListItem>
              <ListItem>We do not collect sensitive personal data such as government-issued ID numbers, health records, religious beliefs, or biometric data.</ListItem>
              <ListItem>We do not collect data from third-party data brokers, social media APIs, or any other external data sources.</ListItem>
            </ul>
          </Section>

          <Section id="s4" num="04" title="How We Use Your Information">
            <p>We use the personal information you share with us for the following clearly defined and limited purposes only:</p>
            <ul className="space-y-1 my-3">
              <ListItem><strong>Service delivery:</strong> To draft, edit, strategise, and deliver the specific content or development service you have engaged us for.</ListItem>
              <ListItem><strong>Project communication:</strong> To correspond with you via email regarding your project.</ListItem>
              <ListItem><strong>Invoicing and payment:</strong> To issue invoices, track payment, and maintain accurate financial records.</ListItem>
              <ListItem><strong>Quality assurance:</strong> To review completed work internally and maintain consistent standards of output.</ListItem>
              <ListItem><strong>Dispute resolution:</strong> To reference project records in the event of a disagreement.</ListItem>
              <ListItem><strong>Legal compliance:</strong> To meet obligations under applicable law in India and other jurisdictions.</ListItem>
              <ListItem><strong>Marketing communications:</strong> Occasionally, to inform you of new services, but only with express consent and a clear opt-out.</ListItem>
            </ul>
            <div className="bg-[#f0ece4] border-l-2 border-[#b8903a] p-4 mt-4 text-[13px]">
              We will never use documents, drafts, career materials, business strategies, or any other content you share for the purpose of a project to train AI models, build datasets, or create derivative works.
            </div>
          </Section>

          <Section id="s5" num="05" title="Legal Basis for Processing">
            <p>We process personal data only where we have a clear and lawful basis to do so:</p>
            <ul className="space-y-1 mt-3">
              <ListItem><strong>Contractual necessity:</strong> Necessary to perform our agreement and deliver what we have committed to.</ListItem>
              <ListItem><strong>Legitimate interests:</strong> Maintaining records of correspondence and work, managing business operations.</ListItem>
              <ListItem><strong>Consent:</strong> For marketing communications, based on your freely given, specific, and informed consent.</ListItem>
              <ListItem><strong>Legal obligation:</strong> Required by applicable law, such as taxation regulations in India.</ListItem>
            </ul>
          </Section>

          <Section id="s6" num="06" title="Sharing & Disclosure">
            <p>Prosify does not sell, rent, trade, or share your personal information with any third party for commercial gain. The only limited circumstances under which we disclose your data are:</p>
            <ul className="space-y-1 mt-3">
              <ListItem><strong>Trusted project collaborators:</strong> Selected freelancers bound by written confidentiality agreements.</ListItem>
              <ListItem><strong>Payment processors:</strong> Secure platforms like Razorpay, PayPal, Wise, or similar, solely to process transactions.</ListItem>
              <ListItem><strong>Legal and regulatory authorities:</strong> Where required by law or in response to a valid and lawful request.</ListItem>
              <ListItem><strong>Business succession:</strong> In the event of a merger or acquisition, with advance notice and equivalent standards.</ListItem>
            </ul>
          </Section>

          <Section id="s7" num="07" title="International Data Transfers">
            <p>Prosify is headquartered in India. When you engage our services from another country, your personal data is transferred to and processed in India under the protections of the DPDPA 2023 and the IT Act 2000.</p>
            <ul className="space-y-1 mt-3">
              <ListItem><strong>EU / UK transfers:</strong> We rely on Standard Contractual Clauses (SCCs) or equivalent mechanisms.</ListItem>
              <ListItem><strong>Global transfers:</strong> We work only with providers maintaining recognised international standards.</ListItem>
            </ul>
            <div className="bg-[#f0ece4] border-l-2 border-[#b8903a] p-4 mt-4 text-[13px]">
              Regardless of where your data is processed, we apply the same privacy standards and protections described in this policy, at all times, without exception.
            </div>
          </Section>

          <Section id="s8" num="08" title="Data Retention">
            <p>We retain personal information only for as long as is necessary:</p>
            <ul className="space-y-1 mt-3">
              <ListItem><strong>Active client files:</strong> Duration of engagement plus three (3) years.</ListItem>
              <ListItem><strong>Email correspondence:</strong> Two (2) years from last communication.</ListItem>
              <ListItem><strong>Marketing consent records:</strong> Period of active consent plus one (1) year.</ListItem>
            </ul>
          </Section>

          <Section id="s9" num="09" title="Security">
            <p>We implement appropriate technical and organisational measures:</p>
            <ul className="space-y-1 mt-3">
              <ListItem>Access-controlled, password-protected storage environments.</ListItem>
              <ListItem>Encrypted email protocols (TLS).</ListItem>
              <ListItem>PCI-DSS compliant third-party payment processing.</ListItem>
            </ul>
          </Section>

          <Section id="s10" num="10" title="Cookies & Tracking">
            <div className="bg-[#f0ece4] border-l-2 border-[#b8903a] p-4 mb-4 text-[13px]">
              Prosify does not use cookies, tracking pixels, web beacons, analytics platforms, or any similar tracking technologies on our website.
            </div>
            <p>Your visit to the Prosify website generates no data collection on our part. The only personal data we ever receive from you is what you choose to send us directly via email.</p>
          </Section>

          <Section id="s11" num="11" title="Your Rights by Region">
            <p>We honour the following rights across all regions:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#e0d9d0] border border-[#e0d9d0] my-8">
              <RightCard title="Right to Access" desc="Request a copy of the personal data we hold about you." />
              <RightCard title="Right to Correction" desc="Request that inaccurate or incomplete data be corrected." />
              <RightCard title="Right to Erasure" desc="Request deletion of your personal data." />
              <RightCard title="Right to Object" desc="Object to processing or direct marketing at any time." />
            </div>

            <div className="overflow-x-auto my-8 sm:my-10 -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full text-left text-[13px] sm:text-[14px] border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b-2 border-[#0d0d0d]">
                    <th className="py-3 pr-4 text-[10px] sm:text-[11px] uppercase tracking-widest text-[#6b6560] font-medium">Region</th>
                    <th className="py-3 pr-4 text-[10px] sm:text-[11px] uppercase tracking-widest text-[#6b6560] font-medium">Applicable Law</th>
                    <th className="py-3 text-[10px] sm:text-[11px] uppercase tracking-widest text-[#6b6560] font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e0d9d0]">
                  <tr>
                    <td className="py-4 pr-4 font-medium whitespace-nowrap">EU / UK</td>
                    <td className="py-4 pr-4 whitespace-nowrap">GDPR</td>
                    <td className="py-4">Right to lodge a complaint with your national DPA.</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-medium whitespace-nowrap">California, USA</td>
                    <td className="py-4 pr-4 whitespace-nowrap">CCPA / CPRA</td>
                    <td className="py-4">Right to know, delete, and opt out of sale (we do not sell data).</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-4 font-medium whitespace-nowrap">India</td>
                    <td className="py-4 pr-4 whitespace-nowrap">DPDPA 2023</td>
                    <td className="py-4">Right to correction, erasure, nomination, and grievance redressal.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>To exercise any of these rights, email us at <a href="mailto:contactprosify@gmail.com" className="text-[#b8903a] border-b border-[#b8903a]/30">contactprosify@gmail.com</a> with the subject line "Privacy Request."</p>
          </Section>

          <Section id="s12" num="12" title="Third-Party Links">
            <p>The Prosify website may contain links to third-party platforms. This Privacy Policy applies solely to Prosify's own website and services. We are not responsible for the privacy practices of external sites.</p>
          </Section>

          <Section id="s13" num="13" title="Children's Privacy">
            <p>Prosify's services are intended exclusively for individuals who are 18 years of age or older. We do not knowingly collect personal information from anyone under this age.</p>
          </Section>

          <Section id="s14" num="14" title="Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. When we make material changes, we will update the "Last Revised" date and notify existing clients directly by email where significant.</p>
          </Section>

          <Section id="s15" num="15" title="Contact & Grievances">
            <p>If you have any questions or concerns, email us at <a href="mailto:contactprosify@gmail.com" className="text-[#b8903a] border-b border-[#b8903a]/30">contactprosify@gmail.com</a>. We will acknowledge your message within 48 hours and provide a substantive response within 30 days.</p>
          </Section>
        </div>

        {/* Footer */}
        <footer className="py-6 sm:py-8 border-t border-[#e0d9d0]">
          <div className="bg-[#0d0d0d] text-[#f5f0e8] p-5 sm:p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-light mb-1">Privacy Enquiries</h3>
              <p className="text-[12px] sm:text-[13px] text-[#a09890]">Get in touch with us for any questions regarding your personal data</p>
            </div>
            <a href="mailto:contactprosify@gmail.com" className="font-serif text-base sm:text-lg text-[#d4a84b] border-b border-[#d4a84b]/30 hover:border-[#d4a84b] transition-colors">
              contactprosify@gmail.com
            </a>
          </div>
          <div className="mt-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] sm:text-[11px] text-[#6b6560] tracking-wider">
            <div className="flex items-center gap-2 sm:gap-3">
              <img src={logo} alt="Logo" className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
              <span className="font-bebas text-xl sm:text-2xl tracking-[0.2em] sm:tracking-[0.3em] text-[#b8903a]">PROSIFY</span>
            </div>
            <span className="text-center sm:text-left">© 2026 PROSIFY · ALL RIGHTS RESERVED</span>
          </div>
        </footer>
      </div>
    </motion.div>
  );
}

function Section({ id, num, title, children }: { id: string, num: string, title: string, children: React.ReactNode }) {
  return (
    <div id={id} className="py-4 border-b border-[#e0d9d0] scroll-mt-24 last:border-0 block w-full min-h-0 h-auto relative">
      <div className="mb-2">
        <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#0d0d0d] flex items-baseline gap-3">
          <span className="text-[#b8903a] text-base sm:text-lg font-medium">{num}.</span>
          {title}
        </h2>
      </div>
      <div className="space-y-2 text-[14px] sm:text-[15px] leading-[1.6] text-[#2a2620]">
        {children}
      </div>
    </div>
  );
}

function SummaryItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="space-y-2">
      <h4 className="font-serif text-lg font-medium text-[#0d0d0d]">{title}</h4>
      <p className="text-[14px] text-[#6b6560] leading-relaxed">{desc}</p>
    </div>
  );
}

function ListItem({ label, children }: { label?: string, children: React.ReactNode }) {
  return (
    <li className="flex gap-2 sm:gap-3 py-1 sm:py-1.5 border-b border-[#e0d9d0] text-[13px] sm:text-[14px] leading-relaxed last:border-0">
      <span className="text-[#b8903a] shrink-0 mt-1">—</span>
      <div>
        {label && <strong className="text-[#0d0d0d] mr-1.5">{label}:</strong>}
        {children}
      </div>
    </li>
  );
}

function RightCard({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="bg-[#fdfcfa] p-6">
      <h4 className="font-serif text-lg font-medium mb-2">{title}</h4>
      <p className="text-[13px] text-[#6b6560] leading-relaxed">{desc}</p>
    </div>
  );
}
