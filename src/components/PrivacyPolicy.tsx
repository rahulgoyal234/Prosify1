import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

const logo = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMTcwIDQxOHYtMjg4YzI0MCAwIDI0MCAxNzAgMCAxNzAiIHN0cm9rZT0iI2M5YTg0YyIgc3Ryb2tlLXdpZHRoPSI2MCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgPGNpcmNsZSBjeD0iNDAwIiBjeT0iMTI1IiByPSI0MCIgZmlsbD0iI2M5YTg0YyIvPgo8L3N2Zz4=";

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-[#fdfcfa] overflow-y-auto font-sans text-[#0d0d0d] selection:bg-[#b8903a] selection:text-white"
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-4 flex items-center justify-between bg-[#fdfcfa]/93 backdrop-blur-md border-b border-[#e0d9d0]">
        <a href="/" onClick={(e) => { e.preventDefault(); onClose(); }} className="flex items-center gap-2.5 sm:gap-3.5 group no-underline">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-gold/5 rounded-full blur-md group-hover:bg-gold/15 transition-all" />
            <img src={logo} alt="Prosify Logo" className="relative w-6 h-6 sm:w-8 sm:h-8 object-contain" />
          </div>
          <span className="font-bebas text-xl sm:text-2xl tracking-[0.2em] sm:tracking-[0.3em] text-gold group-hover:text-gold-light transition-colors">PROSIFY</span>
        </a>
        <button 
          onClick={onClose}
          className="text-[0.78rem] tracking-[0.12em] uppercase text-[#6b6560] hover:text-[#b8903a] transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={14} />
          Back to Home
        </button>
      </nav>

      {/* Hero Section */}
      <header className="pt-24 pb-10 px-6 md:px-12 max-w-[900px] mx-auto border-b border-[#e0d9d0]">
        <h1 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-[#0d0d0d] mb-6">
          Privacy<br /><span className="italic text-[#b8903a]">Policy</span>
        </h1>
        <div className="flex flex-wrap gap-8">
          <MetaItem label="Effective Date" value="22 March 2026" />
          <MetaItem label="Last Revised" value="22 March 2026" />
          <MetaItem label="Applies To" value="Global Clients & Visitors" />
        </div>
      </header>

      <div className="max-w-[900px] mx-auto px-6 md:px-12">
        {/* Intro Statement */}
        <div className="py-8 border-b border-[#e0d9d0] space-y-4">
          <p className="text-[0.95rem] md:text-[0.98rem] leading-[1.8] text-[#2a2620]">
            Prosify is a premium virtual content and communication agency based in India, serving clients and collaborators across India, the European Union, the United Kingdom, the United States, Canada, Australia, the Gulf Cooperation Council region, and beyond. Because we work across borders, this Privacy Policy has been written to meet or exceed the standards required by the major data protection frameworks in the jurisdictions where our clients are based.
          </p>
          <p className="text-[0.95rem] md:text-[0.98rem] leading-[1.8] text-[#2a2620]">
            This policy explains in plain language what information we collect, why we collect it, how we use and protect it, how long we keep it, and what rights you have, regardless of where you are in the world. If you have questions, write to us at <a href="mailto:team@contactprosify.com" className="text-[#b8903a] border-b border-[#b8903a]/35 hover:border-[#b8903a] transition-all">team@contactprosify.com</a>.
          </p>

          <div className="bg-[#0d0d0d] text-[#f7f4ef] p-6 md:p-8 my-6 rounded-sm">
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#d4a84b] font-medium mb-2">Regulatory Frameworks Honoured</p>
            <h3 className="font-serif text-[1.25rem] font-light leading-[1.3] mb-4">This policy is aligned with the following global standards</h3>
            <div className="flex flex-wrap gap-2">
              {['GDPR, EU / UK', 'DPDPA 2023, India', 'CCPA / CPRA, California', 'PIPEDA, Canada', 'Privacy Act 1988, Australia', 'IT Act 2000, India'].map(tag => (
                <span key={tag} className="text-[0.65rem] tracking-[0.05em] px-2.5 py-1 border border-[#b8903a]/40 text-[#d4a84b] uppercase">{tag}</span>
              ))}
            </div>
          </div>

          <div className="bg-[#f0ece4] border-l-2 border-[#b8903a] p-5 my-6 text-[0.88rem] text-[#0d0d0d] leading-[1.7]">
            We do not sell, rent, trade, or broker your personal information to anyone, under any circumstances. Your data exists solely to enable us to serve you well.
          </div>
        </div>

        {/* Table of Contents */}
        <div className="py-10 border-b border-[#e0d9d0]">
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#6b6560] font-medium mb-4">Contents</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            {[
              'Who We Are', 'Scope & Application', 'Information We Collect', 'How We Use Your Information',
              'Legal Basis for Processing', 'Sharing & Disclosure', 'International Data Transfers', 'Data Retention',
              'Security', 'Cookies & Tracking', 'Your Rights by Region', 'Third-Party Links',
              'Children\'s Privacy', 'Changes to This Policy', 'Contact & Grievances'
            ].map((item, i) => (
              <a 
                key={item} 
                href={`#s${i + 1}`} 
                className="flex items-baseline gap-3 py-2 border-b border-[#e0d9d0] text-[0.85rem] text-[#0d0d0d] hover:text-[#b8903a] transition-colors group"
              >
                <span className="font-serif text-[0.7rem] text-[#b8903a] font-medium min-w-[1.2rem]">{(i + 1).toString().padStart(2, '0')}</span>
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Policy Sections */}
        <div className="space-y-10 py-10">
          <PolicySection id="s1" num="01" title="Who We Are">
            <p>Prosify is a fully virtual premium content and communication agency. We provide content strategy, professional writing, ghostwriting, resume development, editing and proofreading, blogging, thought leadership, and premium website development services to brands and professionals worldwide.</p>
            <p>For the purposes of data protection law, Prosify acts as the <strong>data controller</strong> in respect of any personal data you share with us, meaning we determine the purposes and means of processing. Where we engage trusted collaborators to assist in delivering your project, those individuals act as <strong>data processors</strong>, operating strictly under our instruction and bound by confidentiality obligations.</p>
            <ul className="mt-6 space-y-3">
              <DataListItem label="Business Name" value="Prosify" />
              <DataListItem label="Nature" value="Virtual Agency, India-based, globally operating" />
              <DataListItem label="Primary Contact" value="team@contactprosify.com" />
            </ul>
          </PolicySection>

          <PolicySection id="s2" num="02" title="Scope & Application">
            <p>This Privacy Policy applies to:</p>
            <ul className="mt-4 space-y-2">
              <BulletItem text="All individuals who visit the Prosify website, regardless of their country of residence." />
              <BulletItem text="All prospective clients who contact us via email to enquire about our services." />
              <BulletItem text="All current and past clients who have engaged Prosify for any service." />
              <BulletItem text="All individuals whose personal data is processed by Prosify in the course of delivering our services, for example, biographical or career information shared for resume, ghostwriting, or thought leadership projects." />
            </ul>
            <p className="mt-6">This policy does not apply to third-party websites, social media platforms, or payment processors that may be linked from or used alongside our services. Those platforms operate under their own independent privacy policies.</p>
            <div className="bg-[#f0ece4] border-l-2 border-[#b8903a] p-6 my-8 text-[0.9rem] text-[#0d0d0d] leading-[1.75]">
              Wherever you are in the world, if you interact with Prosify, this policy applies to you. We extend the same standard of care to every individual regardless of nationality or location.
            </div>
          </PolicySection>

          <PolicySection id="s3" num="03" title="Information We Collect">
            <p>We collect only what is strictly necessary to provide our services and communicate with you effectively. All information we receive comes directly from you, we use no automated collection systems, cookies, or trackers of any kind, and we do not purchase data from any third-party source.</p>
            
            <h4 className="font-serif text-[1.15rem] font-medium text-[#0d0d0d] mt-8 mb-2">Information you provide via email</h4>
            <ul className="space-y-2">
              <BulletItem text="Your name and email address, shared when you first write to us." />
              <BulletItem text="Your professional background, career history, qualifications, and achievements, shared when engaging resume, LinkedIn, or career narrative services." />
              <BulletItem text="Your business details: brand name, industry, target audience, competitors, content objectives, and tone preferences, shared when onboarding for content strategy, writing, or website development." />
              <BulletItem text="Draft manuscripts, articles, speeches, or other written materials you share for editing, ghostwriting, or proofreading purposes." />
              <BulletItem text="Any other information you voluntarily include in your email correspondence with us." />
            </ul>

            <h4 className="font-serif text-[1.15rem] font-medium text-[#0d0d0d] mt-8 mb-2">Information collected at the point of payment</h4>
            <ul className="space-y-2">
              <BulletItem text="Your billing name and email address, used to issue and track invoices." />
              <BulletItem text="Payment is processed exclusively through secure third-party payment platforms. Prosify does not receive, store, or have access to your payment card numbers, bank account details, or any other financial credentials." />
            </ul>

            <h4 className="font-serif text-[1.15rem] font-medium text-[#0d0d0d] mt-8 mb-2">Information we do NOT collect</h4>
            <ul className="space-y-2">
              <BulletItem text="We do not collect data through cookies, tracking pixels, web beacons, analytics scripts, or any similar technologies." />
              <BulletItem text="We do not collect sensitive personal data such as government-issued ID numbers, health records, religious beliefs, or biometric data. We ask that you do not share such information with us unless it is strictly necessary for a specific project." />
              <BulletItem text="We do not collect data from third-party data brokers, social media APIs, or any other external data sources." />
            </ul>
          </PolicySection>

          <PolicySection id="s4" num="04" title="How We Use Your Information">
            <p>We use the personal information you share with us for the following clearly defined and limited purposes only:</p>
            <ul className="mt-4 space-y-2">
              <BulletItem text={<strong>Service delivery:</strong>} subText="To draft, edit, strategise, and deliver the specific content or development service you have engaged us for." />
              <BulletItem text={<strong>Project communication:</strong>} subText="To correspond with you via email regarding your project, including clarifying requirements, sharing drafts, incorporating revisions, and delivering final work." />
              <BulletItem text={<strong>Invoicing and payment:</strong>} subText="To issue invoices, track payment, and maintain accurate financial records." />
              <BulletItem text={<strong>Quality assurance:</strong>} subText="To review completed work internally and maintain consistent standards of output." />
              <BulletItem text={<strong>Dispute resolution:</strong>} subText="To reference project records in the event of a disagreement regarding scope, delivery, or quality." />
              <BulletItem text={<strong>Legal compliance:</strong>} subText="To meet obligations under applicable law in India and, where relevant, other jurisdictions." />
              <BulletItem text={<strong>Marketing communications:</strong>} subText="Occasionally, to inform you of new services, offers, or relevant updates, but only where you have expressly consented, and with a clear opt-out in every message." />
            </ul>
            <div className="bg-[#f0ece4] border-l-2 border-[#b8903a] p-6 my-8 text-[0.9rem] text-[#0d0d0d] leading-[1.75]">
              We will never use documents, drafts, career materials, business strategies, or any other content you share for the purpose of a project to train AI models, build datasets, create derivative works, or for any purpose beyond delivering your specific engagement with Prosify.
            </div>
          </PolicySection>

          <PolicySection id="s5" num="05" title="Legal Basis for Processing">
            <p>We process personal data only where we have a clear and lawful basis to do so. The applicable basis depends on the nature of your interaction with us:</p>
            <ul className="mt-4 space-y-2">
              <BulletItem text={<strong>Contractual necessity:</strong>} subText="When you engage us for a service, processing your information is necessary to perform our agreement, to understand your requirements and deliver what we have committed to." />
              <BulletItem text={<strong>Legitimate interests:</strong>} subText="We have a legitimate interest in maintaining records of client correspondence and completed work, managing our business operations, and communicating with prospective clients who write to us. We ensure this interest does not override your fundamental rights and freedoms." />
              <BulletItem text={<strong>Consent:</strong>} subText="Where we send marketing communications, we do so only on the basis of your freely given, specific, and informed consent. You may withdraw consent at any time by replying 'unsubscribe' to any marketing email." />
              <BulletItem text={<strong>Legal obligation:</strong>} subText="We may process data where required by applicable law, for example, retaining financial records as mandated by Indian taxation regulations, or responding to lawful requests from competent authorities." />
            </ul>
            <p className="mt-6">For clients in the EU or UK, these bases correspond directly to Article 6 of the UK/EU GDPR. For clients in other jurisdictions, we apply the most equivalent applicable standard under local law.</p>
          </PolicySection>

          <PolicySection id="s6" num="06" title="Sharing & Disclosure">
            <p>Prosify does not sell, rent, trade, or share your personal information with any third party for commercial gain. The only limited circumstances under which we disclose your data are:</p>
            <ul className="mt-4 space-y-2">
              <BulletItem text={<strong>Trusted project collaborators:</strong>} subText="Prosify occasionally works with carefully selected freelance writers, editors, or developers to assist with specific projects. These individuals receive only the information necessary for their contribution, are bound by written confidentiality agreements, and are not permitted to use your data for any purpose beyond the work assigned." />
              <BulletItem text={<strong>Payment processors:</strong>} subText="Reputable, secure third-party platforms, such as Razorpay, PayPal, Wise, or similar, are used solely to process transactions. These processors receive only the billing information necessary to complete payment and operate under their own compliance frameworks, including PCI-DSS certification where applicable." />
              <BulletItem text={<strong>Legal and regulatory authorities:</strong>} subText="We may disclose your information to law enforcement agencies, courts, regulators, or government bodies where required by law, in response to a valid and lawful request, or to protect our legal rights and those of our clients." />
              <BulletItem text={<strong>Business succession:</strong>} subText="In the event of a merger, acquisition, restructuring, or sale of Prosify's business or assets, your data may transfer to the successor entity. We will notify affected clients by email in advance of any such transfer and ensure the recipient maintains equivalent privacy standards." />
            </ul>
            <p className="mt-6">In every instance of disclosure, we take reasonable contractual and technical steps to ensure that recipients maintain confidentiality and data protection standards consistent with this policy.</p>
          </PolicySection>

          <PolicySection id="s7" num="07" title="International Data Transfers">
            <p>Prosify is headquartered in India. When you engage our services from another country, your personal data is transferred to and processed in India under the protections of the Digital Personal Data Protection Act, 2023 (DPDPA) and the Information Technology Act, 2000.</p>
            <p>Where we engage collaborators or payment platforms based outside India, your data may also be processed in their respective jurisdictions. In all such cases, we apply the following safeguards:</p>
            <ul className="mt-4 space-y-2">
              <BulletItem text={<strong>EU / UK transfers:</strong>} subText="We rely on Standard Contractual Clauses (SCCs) or equivalent transfer mechanisms approved under the UK GDPR and EU GDPR, where applicable." />
              <BulletItem text={<strong>USA and other transfers:</strong>} subText="We work only with service providers who maintain recognised international data protection standards, and we apply written confidentiality obligations to all collaborators regardless of location." />
              <BulletItem text={<strong>All international recipients:</strong>} subText="Are required by contract to protect your data to a standard at least equivalent to the obligations set out in this policy." />
            </ul>
            <div className="bg-[#f0ece4] border-l-2 border-[#b8903a] p-6 my-8 text-[0.9rem] text-[#0d0d0d] leading-[1.75]">
              Regardless of where your data is processed, we apply the same privacy standards and protections described in this policy, at all times, without exception.
            </div>
          </PolicySection>

          <PolicySection id="s8" num="08" title="Data Retention">
            <p>We retain personal information only for as long as is necessary to fulfil the purposes set out in this policy, or as required by applicable law. Our retention periods are as follows:</p>
            <ul className="mt-4 space-y-2">
              <BulletItem text={<strong>Active client files and project materials:</strong>} subText="Retained for the duration of the engagement, plus three (3) years after conclusion, for quality assurance and dispute resolution purposes." />
              <BulletItem text={<strong>Email correspondence:</strong>} subText="Retained for two (2) years from the date of last communication." />
              <BulletItem text={<strong>Marketing consent records:</strong>} subText="Retained for the period during which consent is active, plus one (1) year thereafter as a record of the consent given and its withdrawal." />
            </ul>
            <p className="mt-6">When data is no longer required, we permanently delete it or render it irreversibly anonymised. We do not archive or retain data indefinitely.</p>
          </PolicySection>

          <PolicySection id="s9" num="09" title="Security">
            <p>We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, accidental loss, alteration, or disclosure. Our security practices include:</p>
            <ul className="mt-4 space-y-2">
              <BulletItem text="Client project files and communications are stored in access-controlled, password-protected environments. Access is restricted to individuals who need it to deliver your specific project." />
              <BulletItem text="All email correspondence is conducted over standard encrypted protocols (TLS). For particularly sensitive materials, we recommend the use of secure file-sharing methods and can advise on this upon request." />
              <BulletItem text="Payments are processed exclusively by PCI-DSS compliant third-party processors. Prosify never receives, stores, or handles payment card numbers, bank credentials, or similar financial data." />
              <BulletItem text="We periodically review our security practices and update them in line with evolving industry standards and applicable regulatory guidance." />
            </ul>
            <div className="bg-[#f0ece4] border-l-2 border-[#b8903a] p-6 my-8 text-[0.9rem] text-[#0d0d0d] leading-[1.75]">
              No method of data transmission or storage over the internet can be guaranteed completely secure. In the unlikely event of a data breach that poses a high risk to your rights or freedoms, we will notify you and, where required by applicable law, the relevant supervisory authority, without undue delay and within the timeframes prescribed by law.
            </div>
          </PolicySection>

          <PolicySection id="s10" num="10" title="Cookies & Tracking">
            <div className="bg-[#f0ece4] border-l-2 border-[#b8903a] p-6 my-8 text-[0.9rem] text-[#0d0d0d] leading-[1.75]">
              Prosify does not use cookies, tracking pixels, web beacons, session recording tools, fingerprinting scripts, analytics platforms, or any similar tracking technologies on our website. We do not monitor visitor behaviour, record browsing patterns, or build any profile of individuals who visit our site.
            </div>
            <p>Your visit to the Prosify website generates no data collection on our part. The only personal data we ever receive from you is what you choose to send us directly via email.</p>
            <p className="mt-4">Please note that our web hosting provider may generate standard server access logs, recording, for example, IP addresses and pages requested, as a routine technical function of operating any website. Prosify does not actively access, use, or analyse these logs, and they are not processed by us for any business purpose.</p>
            <p className="mt-4">Because we do not use cookies, no cookie consent banner is presented. There is nothing to consent to on our end.</p>
          </PolicySection>

          <PolicySection id="s11" num="11" title="Your Rights">
            <p>Your rights over your personal data are important to us. We honour the following rights for all clients globally, ensuring transparency and control over your information:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e0d9d0] border border-[#e0d9d0] my-10">
              {[
                { t: 'Right to Access', d: 'Request a copy of the personal data we hold about you, free of charge.' },
                { t: 'Right to Correction', d: 'Request that inaccurate, outdated, or incomplete data be corrected promptly.' },
                { t: 'Right to Erasure', d: 'Request deletion of your personal data, subject to our lawful retention obligations.' },
                { t: 'Right to Restrict Processing', d: 'Request that we limit how we use your data in certain prescribed circumstances.' },
                { t: 'Right to Object', d: 'Object to processing based on legitimate interests, or to direct marketing, at any time.' },
                { t: 'Right to Portability', d: 'Receive your data in a structured, machine-readable format where technically feasible.' },
                { t: 'Right to Withdraw Consent', d: 'Withdraw marketing consent at any time without affecting prior lawful processing.' },
                { t: 'Right to Grievance', d: 'File a formal complaint, addressed within 30 days.' }
              ].map(r => (
                <div key={r.t} className="bg-[#fdfcfa] p-6">
                  <h5 className="font-serif text-[1.05rem] font-medium text-[#0d0d0d] mb-2">{r.t}</h5>
                  <p className="text-[0.82rem] text-[#6b6560] leading-[1.6]">{r.d}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 italic text-[#6b6560]">To exercise any of these rights, please contact us at <a href="mailto:team@contactprosify.com" className="text-[#b8903a] border-b border-[#b8903a]/35 hover:border-[#b8903a] transition-all">team@contactprosify.com</a>.</p>
          </PolicySection>

          <PolicySection id="s12" num="12" title="Third-Party Links">
            <p>The Prosify website may contain links to third-party websites and platforms, such as LinkedIn, Instagram, or payment processors. This Privacy Policy applies solely to Prosify's own website and the services we provide directly. We are not responsible for the privacy practices, content, security, or data handling of any third-party site or service.</p>
            <p className="mt-4">We encourage you to review the individual privacy policies of any external platform you choose to interact with. Your activity on those platforms is governed entirely by their own terms and policies, over which Prosify has no control.</p>
          </PolicySection>

          <PolicySection id="s13" num="13" title="Children's Privacy">
            <p>Prosify's services are intended exclusively for individuals who are 18 years of age or older, or the applicable minimum age of digital consent in their jurisdiction, whichever is higher. We do not knowingly collect, solicit, or process personal information from anyone under this age.</p>
            <p className="mt-4">If you believe that a minor has provided personal data to Prosify without appropriate parental or guardian consent, please contact us immediately. We will promptly verify the matter and permanently delete any such data without delay and without charge.</p>
          </PolicySection>

          <PolicySection id="s14" num="14" title="Changes to This Policy">
            <p>We may update this Privacy Policy from time to time to reflect changes in our services, business practices, applicable law, or regulatory guidance. When we make material changes, we will update the "Last Revised" date at the top of this page.</p>
            <p className="mt-4">Where changes are significant, particularly those that affect your rights or expand the purposes for which we use your data, we will notify existing clients directly by email before the changes take effect. Your continued use of our website or services constitutes your acknowledgement of the updated policy.</p>
          </PolicySection>

          <PolicySection id="s15" num="15" title="Contact & Grievances">
            <p>If you have any questions, concerns, or complaints about this Privacy Policy or the way Prosify handles your personal data, we want to hear from you. We are committed to resolving all privacy matters fairly, promptly, and in good faith.</p>
            
            <h4 className="font-serif text-[1.15rem] font-medium text-[#0d0d0d] mt-8 mb-2">To contact us</h4>
            <p>Email us at <a href="mailto:team@contactprosify.com" className="text-[#b8903a] border-b border-[#b8903a]/35 hover:border-[#b8903a] transition-all">team@contactprosify.com</a> with the subject line <strong>"Privacy Enquiry"</strong> or <strong>"Privacy Complaint."</strong> We will acknowledge your message within 48 hours and provide a substantive response within 30 days.</p>

            <h4 className="font-serif text-[1.15rem] font-medium text-[#0d0d0d] mt-8 mb-2">Formal grievance mechanism (India)</h4>
            <p>In accordance with the Digital Personal Data Protection Act, 2023, the Information Technology Act, 2000, and the IT Rules, 2011, you have the right to lodge a formal grievance with us. All grievances will be acknowledged and fully addressed within 30 days of receipt.</p>
          </PolicySection>
        </div>

        {/* Footer */}
        <footer className="pt-12 pb-16 border-t border-[#e0d9d0]">
          <div className="bg-[#0d0d0d] text-[#f7f4ef] p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-10 rounded-sm">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-3xl font-light mb-2">Privacy Questions?</h3>
              <p className="text-[0.85rem] text-[#a09890]">We respond to all inquiries within 48 hours.</p>
            </div>
            <a 
              href="mailto:team@contactprosify.com" 
              className="font-serif text-xl md:text-2xl text-[#d4a84b] border-b border-[#d4a84b]/30 hover:border-[#d4a84b] transition-all pb-1"
            >
              team@contactprosify.com
            </a>
          </div>
          <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[0.75rem] text-[#6b6560] tracking-[0.06em] uppercase">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gold/5 rounded-full blur-md" />
                  <img src={logo} alt="Prosify Logo" className="relative w-6 h-6 object-contain opacity-90" />
                </div>
                <span className="font-bebas text-xl tracking-[0.2em] text-gold">PROSIFY</span>
              </div>
              <span className="text-[#e0d9d0] hidden md:block">|</span>
              <span className="opacity-60 tracking-[0.1em]">© {new Date().getFullYear()}</span>
            </div>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-[#b8903a] transition-colors">Back to Top</button>
          </div>
        </footer>
      </div>
    </motion.div>
  );
};

const MetaItem = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <p className="text-[0.75rem] tracking-[0.08em] uppercase text-[#6b6560] font-medium">{label}</p>
    <p className="text-[0.82rem] text-[#0d0d0d] font-medium tracking-[0.02em]">{value}</p>
  </div>
);

const PolicySection = ({ id, num, title, children }: { id: string; num: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24 !min-h-0 !h-auto !flex-col !items-start !justify-start !py-0 mb-12 last:mb-0">
    <div className="mb-4 w-full">
      <span className="font-serif text-[0.85rem] text-[#b8903a] font-medium block mb-1">{num}</span>
      <h2 className="font-serif text-[2.2rem] font-normal tracking-tight text-[#0d0d0d] leading-[1.1]">{title}</h2>
    </div>
    <div className="text-[#2a2620] text-[0.95rem] leading-[1.8] space-y-4 w-full">
      {children}
    </div>
  </section>
);

const DataListItem = ({ label, value }: { label: string; value: string }) => (
  <li className="flex flex-col gap-1 text-[0.9rem] border-b border-[#e0d9d0] pb-3 last:border-0">
    <strong className="text-[#0d0d0d] text-[0.75rem] tracking-[0.05em] uppercase font-semibold">{label}</strong>
    <span className="text-[#2a2620] font-medium">{value}</span>
  </li>
);

const BulletItem = ({ text, subText }: { text: React.ReactNode; subText?: string }) => (
  <li className="flex gap-4 text-[0.9rem] text-[#2a2620] leading-[1.65]">
    <span className="text-[#b8903a] flex-shrink-0">—</span>
    <div>
      {text}
      {subText && <p className="mt-1 text-[#6b6560]">{subText}</p>}
    </div>
  </li>
);

export default PrivacyPolicy;
