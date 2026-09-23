function Doc({ title, updated, children }) {
  return (
    <article className="band">
      <div className="wrap article prose">
        <h1 className="display-s">{title}</h1>
        <p className="updated">Last updated: {updated}</p>
        {children}
      </div>
    </article>
  );
}

function Mail({ children }) {
  return <a href={`mailto:${children}`}>{children}</a>;
}

export function PrivacyPolicy() {
  return (
    <Doc title="Privacy Policy" updated="September 22, 2026">
      <p>Token Metrics AG (“Token Metrics”, “we”, “us”, or “our”) respects your privacy and is committed to protecting personal information.</p>
      <p>This Privacy Policy explains how we collect, use, disclose, and protect personal information when you visit tokenmetrics.org, contact us, use our website services, interact with our content, or otherwise communicate with us.</p>
      <p>Token Metrics AG is based in Zug, Switzerland.</p>

      <h2>1. Data controller</h2>
      <p>The controller responsible for personal data covered by this Privacy Policy is:</p>
      <p><strong>Token Metrics AG</strong><br />Zug, Switzerland<br />Website: <a href="https://tokenmetrics.org">https://tokenmetrics.org</a></p>
      <p>For privacy-related questions, contact <Mail>privacy@tokenmetrics.org</Mail>.</p>

      <h2>2. Information we collect</h2>
      <p>Depending on how you interact with our website, we may collect the following categories of information.</p>
      <h3>Information you provide directly</h3>
      <ul>
        <li>First and last name</li>
        <li>Email address</li>
        <li>Company name</li>
        <li>Job title</li>
        <li>Telephone number, where provided</li>
        <li>Information contained in messages or inquiries</li>
        <li>Information submitted through contact or career forms</li>
        <li>Other information you voluntarily provide</li>
      </ul>
      <h3>Information collected automatically</h3>
      <p>When you visit our website, certain technical information may be collected automatically, including:</p>
      <ul>
        <li>IP address</li>
        <li>Browser type and version</li>
        <li>Operating system</li>
        <li>Device information</li>
        <li>Approximate geographic information derived from technical data</li>
        <li>Pages visited</li>
        <li>Referring website</li>
        <li>Date and time of access</li>
        <li>Website interaction information</li>
        <li>Technical logs and security information</li>
      </ul>
      <p>We only collect information that is reasonably necessary for the purposes described in this Policy.</p>

      <h2>3. How we use personal information</h2>
      <ul>
        <li>Operate and maintain our website</li>
        <li>Respond to inquiries</li>
        <li>Communicate with visitors and business contacts</li>
        <li>Provide requested information or services</li>
        <li>Manage business relationships</li>
        <li>Process applications for employment or other opportunities</li>
        <li>Improve website functionality and user experience</li>
        <li>Analyze website usage and performance</li>
        <li>Maintain security and prevent abuse</li>
        <li>Detect, investigate, and prevent fraudulent or unauthorized activity</li>
        <li>Comply with applicable legal obligations</li>
        <li>Establish, exercise, or defend legal claims</li>
        <li>Protect our rights, property, and users</li>
      </ul>
      <p>We will not use personal information for purposes incompatible with the purpose for which it was collected unless permitted or required by applicable law.</p>

      <h2>4. Legal bases for processing</h2>
      <p>Where the GDPR applies, we process personal information on one or more of the following legal bases:</p>
      <h3>Contract</h3>
      <p>We may process information where processing is necessary to enter into or perform a contract with you.</p>
      <h3>Legitimate interests</h3>
      <p>We may process information where necessary for legitimate business interests, provided those interests are not overridden by your rights and interests. Examples may include website security, service improvement, business communications, and fraud prevention.</p>
      <h3>Consent</h3>
      <p>Where required, we may request your consent before processing personal information for a particular purpose. You may withdraw consent at any time. Withdrawal does not affect processing that occurred before withdrawal.</p>
      <h3>Legal obligations</h3>
      <p>We may process information where necessary to comply with applicable laws, regulations, court orders, or other legal requirements.</p>

      <h2>5. Cookies and similar technologies</h2>
      <p>Our website may use cookies and similar technologies. Cookies may be used for essential website functionality, security, website performance, analytics, remembering preferences, and understanding how visitors use our website.</p>
      <p>Where required by applicable law, non-essential cookies will only be used after obtaining appropriate consent. You can manage cookies through your browser settings and, where available, our cookie-management tools.</p>

      <h2>6. Analytics</h2>
      <p>We may use analytics technologies to understand website traffic, performance, and user interaction. Where third-party analytics providers are used, those providers may process certain technical information on our behalf. We will configure analytics and tracking technologies in accordance with applicable privacy requirements.</p>

      <h2>7. Communications</h2>
      <p>If you contact us, we may use the information you provide to respond to your request and maintain the related business communication.</p>
      <p>If you subscribe to communications from us, we may send information about company updates, research, products, events, or other relevant content. You may unsubscribe from marketing communications at any time using the unsubscribe mechanism included in the communication or by contacting us.</p>

      <h2>8. Careers</h2>
      <p>If you submit an employment application or other career-related information, we may process the information for recruitment and hiring purposes. This may include contact information, CV or resume information, employment history, education, skills and qualifications, portfolio or professional profile information, and information you voluntarily include in your application.</p>
      <p>We will use recruitment information only for legitimate recruitment and employment-related purposes and retain it only for as long as reasonably necessary, subject to applicable law.</p>

      <h2>9. Sharing personal information</h2>
      <p>We may disclose personal information to:</p>
      <ul>
        <li>Service providers that operate website, hosting, analytics, communication, security, or other business systems</li>
        <li>Professional advisers such as lawyers, accountants, and auditors</li>
        <li>Government authorities where legally required</li>
        <li>Courts, regulators, or law-enforcement authorities where required or permitted by law</li>
        <li>Potential buyers, investors, or successors in connection with a corporate transaction</li>
        <li>Other parties where you have provided appropriate consent</li>
      </ul>
      <p>We do not sell personal information as a commodity. Third-party service providers may only process personal information according to applicable contractual and legal requirements.</p>

      <h2>10. International data transfers</h2>
      <p>Some service providers or recipients may be located outside Switzerland or the European Economic Area. Where personal information is transferred internationally, we will take appropriate measures required by applicable data-protection law. Depending on the circumstances, this may include an adequacy decision, appropriate contractual safeguards, or another legally recognized transfer mechanism.</p>

      <h2>11. Data retention</h2>
      <p>We retain personal information only for as long as reasonably necessary for the purposes described in this Policy, unless a longer retention period is required by law. Retention periods may depend on the nature of the information, the purpose for which it was collected, our ongoing business relationship, legal and regulatory requirements, dispute-resolution requirements, and security and fraud-prevention requirements.</p>
      <p>When personal information is no longer required, we will delete, anonymize, or otherwise dispose of it in accordance with applicable requirements.</p>

      <h2>12. Data security</h2>
      <p>We use reasonable technical and organizational measures designed to protect personal information against unauthorized access, alteration, disclosure, loss, or destruction. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.</p>

      <h2>13. Your rights</h2>
      <p>Depending on applicable law and your circumstances, you may have rights relating to your personal information, including the right to access personal information, request correction of inaccurate information, request deletion, restrict certain processing, object to certain processing, data portability where applicable, withdraw consent where processing is based on consent, and lodge a complaint with a competent supervisory authority.</p>
      <p>Requests may be submitted to <Mail>privacy@tokenmetrics.org</Mail>. We may take reasonable steps to verify your identity before fulfilling a request where necessary to protect your information.</p>

      <h2>14. Automated decision-making</h2>
      <p>We do not intend to make decisions producing legal or similarly significant effects about individuals solely through automated processing unless we provide the notices and safeguards required by applicable law.</p>

      <h2>15. Children’s privacy</h2>
      <p>Our website is not intended for children. We do not knowingly collect personal information from children where prohibited by applicable law.</p>

      <h2>16. Third-party websites</h2>
      <p>Our website may contain links to third-party websites or services. We are not responsible for the privacy practices, security, or content of third-party websites. We encourage you to review the privacy policies of those websites before providing personal information.</p>

      <h2>17. Changes to this Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time. When we make changes, we will update the “Last updated” date at the top of this Policy. If significant changes are made, we may provide additional notice where required by applicable law.</p>

      <h2>18. Contact</h2>
      <p><strong>Token Metrics AG</strong><br />Zug, Switzerland<br />Email: <Mail>privacy@tokenmetrics.org</Mail><br />Website: <a href="https://tokenmetrics.org">https://tokenmetrics.org</a></p>
    </Doc>
  );
}

export function TermsOfService() {
  return (
    <Doc title="Terms of Service" updated="September 22, 2026">
      <p>These Terms of Service (“Terms”) govern your access to and use of the Token Metrics website at tokenmetrics.org and related website content and services operated by Token Metrics AG (“Token Metrics”, “we”, “us”, or “our”).</p>
      <p>By accessing or using our website, you agree to these Terms. If you do not agree with these Terms, please do not use the website.</p>

      <h2>1. About Token Metrics</h2>
      <p>Token Metrics AG is a technology company based in Zug, Switzerland. We develop technology and infrastructure related to blockchain, digital assets, real-world assets, tokenization, digital markets, and on-chain settlement.</p>

      <h2>2. Website use</h2>
      <p>You may use our website for lawful purposes and in accordance with these Terms. You agree not to:</p>
      <ul>
        <li>Violate applicable laws or regulations</li>
        <li>Attempt to gain unauthorized access to our systems</li>
        <li>Interfere with the operation or security of the website</li>
        <li>Introduce malicious software or harmful code</li>
        <li>Scrape or collect information through unauthorized automated methods</li>
        <li>Misrepresent your identity or affiliation</li>
        <li>Use the website to engage in fraudulent activity</li>
        <li>Reverse engineer or circumvent technical protections where prohibited by law</li>
        <li>Use our website in a manner that could damage, disable, or impair our systems</li>
      </ul>
      <p>We may restrict or suspend access where reasonably necessary to protect the website, our users, or our business.</p>

      <h2>3. Website content</h2>
      <p>The information presented on our website is provided for general informational purposes. We make reasonable efforts to maintain accurate and useful information, but we do not guarantee that all website content is complete, current, or error-free. Information may be changed or removed without notice.</p>

      <h2>4. No investment advice</h2>
      <p>Nothing on our website constitutes investment advice, financial advice, legal advice, tax advice, accounting advice, an offer to buy or sell securities, an offer to buy or sell digital assets, a solicitation to invest, or a recommendation concerning any particular investment or financial product.</p>
      <p>You are responsible for obtaining appropriate professional advice before making financial, investment, legal, or tax decisions.</p>

      <h2>5. Digital assets and blockchain technology</h2>
      <p>References to blockchain networks, digital assets, tokenization, real-world assets, markets, or related technologies are provided for informational and technological purposes. Digital assets and blockchain technologies may involve significant risks, including volatility, technological failures, cybersecurity risks, regulatory uncertainty, liquidity risks, and loss of assets.</p>
      <p>Nothing on the website should be interpreted as a guarantee of performance, value, liquidity, availability, or future results.</p>

      <h2>6. No guarantee of availability</h2>
      <p>We do not guarantee that the website will always be available, operate without interruption, be free from errors, be free from security vulnerabilities, remain unchanged, or be compatible with every device or browser. We may modify, suspend, or discontinue parts of the website at any time.</p>

      <h2>7. Intellectual property</h2>
      <p>Unless otherwise stated, the website and its content are owned by or licensed to Token Metrics. This includes, where applicable, logos, branding, text, graphics, images, designs, software, website layout, documentation, and other materials.</p>
      <p>You may access and use the website for its intended lawful purpose. You may not reproduce, distribute, modify, publicly display, commercially exploit, or create derivative works from our proprietary materials without appropriate authorization, except where permitted by law.</p>

      <h2>8. Trademarks</h2>
      <p>Token Metrics and associated names, logos, and marks may constitute trademarks or other protected identifiers. You may not use our trademarks in a way that suggests sponsorship, endorsement, affiliation, or partnership without our prior written permission.</p>

      <h2>9. Third-party services and links</h2>
      <p>The website may contain links to third-party websites, applications, networks, or services. Third-party services are governed by their own terms and policies. We do not control and are not responsible for third-party services, content, security, availability, or privacy practices. A link to a third-party service does not necessarily mean that Token Metrics endorses or recommends that service.</p>

      <h2>10. User submissions</h2>
      <p>If you voluntarily submit information through our website, including inquiries, feedback, applications, or other materials, you represent that you have the right to provide that information. You should not submit confidential information through a public or unsecured website form unless specifically requested through an appropriate secure channel.</p>

      <h2>11. Feedback</h2>
      <p>If you provide suggestions, comments, or other feedback regarding our website or products, you grant us permission to use that feedback for business and product-development purposes without creating an obligation to compensate you, unless otherwise agreed in writing.</p>

      <h2>12. Privacy</h2>
      <p>Our processing of personal information is described in our Privacy Policy. By using the website, you acknowledge that personal information may be processed as described in that Privacy Policy.</p>

      <h2>13. Security</h2>
      <p>You must not attempt to compromise or circumvent security controls associated with the website. If you discover a potential security vulnerability, please contact us through an appropriate security or support channel rather than exploiting the vulnerability.</p>

      <h2>14. Disclaimer of warranties</h2>
      <p>To the maximum extent permitted by applicable law, the website and its content are provided on an “as is” and “as available” basis. To the extent permitted by law, Token Metrics disclaims warranties that the website or its content will be uninterrupted, accurate, complete, reliable, secure, or suitable for a particular purpose. Nothing in these Terms excludes a warranty or statutory right that cannot legally be excluded.</p>

      <h2>15. Limitation of liability</h2>
      <p>To the maximum extent permitted by applicable law, Token Metrics will not be responsible for indirect, incidental, special, consequential, or punitive damages arising from or related to your use of, or inability to use, the website. This includes, where permitted by law, loss of profits, revenue, business opportunities, data, or goodwill. Nothing in these Terms limits liability where such limitation is prohibited by applicable law, including liability that cannot legally be excluded or limited.</p>

      <h2>16. Indemnification</h2>
      <p>To the extent permitted by applicable law, you agree to indemnify and hold Token Metrics and its officers, employees, contractors, and affiliates harmless from claims, losses, liabilities, damages, and reasonable expenses arising from your unlawful use of the website, your violation of these Terms, your infringement of another person’s rights, or your misuse of website content or services. This provision applies only to the extent permitted by applicable law.</p>

      <h2>17. Changes to these Terms</h2>
      <p>We may update these Terms from time to time. The revised version will be posted on this page with an updated “Last updated” date. Your continued use of the website after an update constitutes acceptance of the revised Terms to the extent permitted by applicable law.</p>

      <h2>18. Severability</h2>
      <p>If any provision of these Terms is determined to be invalid or unenforceable, the remaining provisions will remain effective to the extent permitted by law.</p>

      <h2>19. Entire agreement</h2>
      <p>These Terms and any policies expressly incorporated into them constitute the agreement governing your use of the website, unless a separate written agreement applies to a particular service or relationship.</p>

      <h2>20. Governing law</h2>
      <p>These Terms are intended to be governed by the laws of Switzerland, without regard to conflict-of-law principles, except where mandatory law provides otherwise. Any dispute arising from these Terms will be subject to the jurisdiction of the competent courts in Switzerland, subject to any mandatory jurisdictional rights that may apply.</p>

      <h2>21. Contact</h2>
      <p><strong>Token Metrics AG</strong><br />Zug, Switzerland<br />Email: <Mail>legal@tokenmetrics.org</Mail><br />Website: <a href="https://tokenmetrics.org">https://tokenmetrics.org</a></p>
    </Doc>
  );
}
