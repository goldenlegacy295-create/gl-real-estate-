import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicy() {
  useEffect(() => {
    // Scroll to top when mounted
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FAF8F4] pt-32 pb-20 px-6 font-sans text-zinc-900 min-h-screen">
      <Helmet>
        <title>Privacy Policy | Golden Legacy Real Estate</title>
        <meta name="description" content="Privacy Policy for Golden Legacy Real Estate. Learn how we collect, use, and protect your personal data in compliance with UAE data protection laws." />
        <meta name="keywords" content="Privacy Policy, Golden Legacy Real Estate, data protection, UAE PDPL, Dubai real estate" />
      </Helmet>

      <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-zinc-100">
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-6">
          Privacy Policy
        </h1>
        <p className="text-xs text-zinc-500 mb-10 uppercase tracking-widest font-bold">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        
        <div className="space-y-10 text-zinc-600 leading-relaxed text-sm md:text-base">
          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-4 font-display uppercase tracking-wider">1. Company Identity & Contact Information</h2>
            <p className="mb-4">
              Golden Legacy Real Estate PJSC ("we", "our", or "us") is a registered luxury real estate firm operating under DLD License #1104823.
            </p>
            <address className="not-italic bg-zinc-50 p-6 border border-zinc-100 rounded-sm mt-4 text-sm">
              <strong className="text-zinc-900 block mb-2 text-base">Golden Legacy Real Estate PJSC</strong>
              Boulevard Plaza Tower 2<br />
              Downtown Dubai, Business Bay<br />
              Dubai, United Arab Emirates<br /><br />
              <strong>Email:</strong> <a href="mailto:leadsgoldenlegacy@gmail.com" className="text-gold hover:underline">leadsgoldenlegacy@gmail.com</a><br />
              <strong>Phone:</strong> <a href="tel:+971554740389" className="text-gold hover:underline">+971 55 474 0389</a>
            </address>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-4 font-display uppercase tracking-wider">2. What Data Is Collected</h2>
            <p className="mb-4">
              We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about our luxury properties, services, or when you contact us. The personal information we collect may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Contact Data:</strong> Full name, email address, and direct phone (WhatsApp) numbers.</li>
              <li><strong>Inquiry Data:</strong> Estimated capital allocation, investment scope, timeline, and specific property interests submitted via our contact or inquiry forms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-4 font-display uppercase tracking-wider">3. Tracking & Cookies</h2>
            <p className="mb-4">
              Our website uses cookies and similar tracking technologies, including the <strong>Meta (Facebook) Pixel (ID: 1674029257008088)</strong>. These tools collect data about your browsing behavior and interactions on our site to assist in advertising, retargeting, and analytics. 
            </p>
            <p>
              By using our website, you acknowledge that tracking data is shared with Meta Platforms. You can manage your cookie preferences through your browser settings or opt out of targeted advertising via relevant third-party platforms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-4 font-display uppercase tracking-wider">4. How Your Data Is Used</h2>
            <p className="mb-4">We process your personal information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>To respond to your inquiries and coordinate your portfolio.</li>
              <li>To send administrative information, marketing communications, and exclusive property updates.</li>
              <li>To fulfill and manage real estate transactions and requests.</li>
              <li>To comply with our legal and regulatory obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-4 font-display uppercase tracking-wider">5. Legal Basis & Compliance</h2>
            <p>
              We process your data in strict compliance with the <strong>UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL)</strong>. Our legal basis for processing your data relies on your consent, the necessity to perform a contract with you, and our legitimate business interests in operating a premier real estate brokerage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-4 font-display uppercase tracking-wider">6. Data Retention, Sharing & Security</h2>
            <div className="space-y-4">
              <p>
                <strong>Retention:</strong> We keep your personal information only for as long as necessary for the purposes set out in this policy, unless a longer retention period is required or permitted by law.
              </p>
              <p>
                <strong>Third-Party Sharing:</strong> We may share your information with trusted property developers and partners (such as Emaar, DAMAC, etc.) to facilitate your investment goals, as well as with legal authorities if required by UAE law.
              </p>
              <p>
                <strong>Security:</strong> We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-4 font-display uppercase tracking-wider">7. Your User Rights</h2>
            <p className="mb-4">Under applicable data protection laws, including the UAE PDPL, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Access:</strong> Request copies of your personal data.</li>
              <li><strong>Correction:</strong> Request that we correct any information you believe is inaccurate or incomplete.</li>
              <li><strong>Deletion:</strong> Request that we erase your personal data under certain conditions.</li>
              <li><strong>Opt-Out:</strong> Withdraw your consent for marketing communications at any time by contacting us directly.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 mb-4 font-display uppercase tracking-wider">8. Policy Amendments</h2>
            <p>
              We reserve the right to amend this Privacy Policy at our discretion and at any time. When we make changes to this Privacy Policy, we will post the updated notice on the website and update the policy's effective date. Your continued use of our website following the posting of changes constitutes your acceptance of such changes.
            </p>
          </section>
          
          <div className="mt-12 p-6 bg-zinc-50 border border-zinc-200 text-xs text-zinc-500 leading-relaxed">
            <p className="font-bold mb-2 text-zinc-700 uppercase tracking-wider">Legal Disclaimer</p>
            <p>This privacy policy is provided for informational purposes. Clients are advised that all matters regarding data privacy are governed by the applicable laws of the UAE. Please consult with a legal professional for definitive advice regarding your rights under the PDPL.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
