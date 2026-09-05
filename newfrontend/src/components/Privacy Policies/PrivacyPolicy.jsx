import React from "react";

const Section = ({ title, children }) => (
  <section className="mb-8 sm:mb-10">
    <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-3 sm:mb-4 border-b border-red-500/30 pb-2">
      {title}
    </h2>
    {children}
  </section>
);

const SubSection = ({ title, children, as: Tag = "h3" }) => (
  <div className="mb-4 sm:mb-6">
    <Tag className={`font-semibold text-white mb-2 ${Tag === "h3" ? "text-base sm:text-lg" : "text-sm sm:text-base"}`}>
      {title}
    </Tag>
    {children}
  </div>
);

const Para = ({ children }) => (
  <p className="text-gray-300 leading-relaxed mb-3 text-sm sm:text-[15px]">{children}</p>
);

const BulletList = ({ items }) => (
  <ul className="list-none space-y-2 mb-4 pl-1 sm:pl-2">
    {items.map((item, i) => (
      <li key={i} className="flex gap-2 text-gray-300 text-sm sm:text-[15px]">
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Spacer equal to fixed navbar height (5rem = 80px) */}
      <div className="h-20" />
      {/* Hero banner */}
      <div className="relative pt-8 sm:pt-12 pb-10 sm:pb-12 px-4 sm:px-6 text-center bg-linear-to-b from-[#1a0000] to-[#0a0a0a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.15),transparent_70%)]" />
        <h1 className="relative text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
          Privacy <span className="text-red-500">Policy</span>
        </h1>
        <p className="relative mt-2 sm:mt-3 text-gray-400 text-xs sm:text-sm">Last updated: October 22, 2024</p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Para>
          This Privacy Policy describes Our policies and procedures on the collection, use and
          disclosure of Your information when You use the Service and tells You about Your privacy
          rights and how the law protects You.
        </Para>
        <Para>
          We use Your Personal data to provide and improve the Service. By using the Service, You
          agree to the collection and use of information in accordance with this Privacy Policy.
        </Para>

        {/* ── Interpretation & Definitions ── */}
        <Section title="Interpretation and Definitions">
          <SubSection title="Interpretation">
            <Para>
              The words of which the initial letter is capitalized have meanings defined under the
              following conditions. The following definitions shall have the same meaning regardless
              of whether they appear in singular or in plural.
            </Para>
          </SubSection>

          <SubSection title="Definitions">
            <Para>For the purposes of this Privacy Policy:</Para>
            <ul className="space-y-3 mt-2">
              {[
                { term: "Account", def: "means a unique account created for You to access our Service or parts of our Service." },
                { term: "Affiliate", def: "means an entity that controls, is controlled by or is under common control with a party." },
                { term: "Company", def: 'referred to as either "the Company", "We", "Us" or "Our" in this Agreement, refers to Kharagpur Data Analytics Group, IIT Kharagpur.' },
                { term: "Cookies", def: "are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses." },
                { term: "Country", def: "refers to: West Bengal, India" },
                { term: "Device", def: "means any device that can access the Service such as a computer, a cellphone or a digital tablet." },
                { term: "Personal Data", def: "is any information that relates to an identified or identifiable individual." },
                { term: "Service", def: "refers to the Website." },
                { term: "Service Provider", def: "means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service." },
                { term: "Website", def: "refers to Kharagpur Data Analytics Groups, accessible from https://www.kdagiitkgp.com/" },
                { term: "You", def: "means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable." },
              ].map(({ term, def }) => (
                <li key={term} className="flex gap-2 sm:gap-3 text-sm sm:text-[15px] text-gray-300">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500/70" />
                  <span><strong className="text-white">{term}</strong> — {def}</span>
                </li>
              ))}
            </ul>
          </SubSection>
        </Section>

        {/* ── Collecting and Using ── */}
        <Section title="Collecting and Using Your Personal Data">
          <SubSection title="Types of Data Collected">
            <SubSection title="Personal Data" as="h4">
              <Para>
                While using Our Service, We may ask You to provide Us with certain personally
                identifiable information that can be used to contact or identify You. Personally
                identifiable information may include, but is not limited to:
              </Para>
              <BulletList items={["Email address", "First name and last name", "Phone number", "Usage Data"]} />
            </SubSection>

            <SubSection title="Tracking Technologies and Cookies" as="h4">
              <Para>
                Cookies are small text files that are stored on your device when you visit certain
                websites. They are used to remember your preferences, login information, or to
                track your activity on the website to provide a better user experience.
              </Para>
              <BulletList items={[
                "Session Cookies — Temporary cookies that expire when you close your browser, used to maintain session state.",
                "Persistent Cookies — Remain on your device for a set period; used to remember your preferences for future visits.",
                "First-Party Cookies — Set by the website you are visiting, readable only by that website.",
                "Third-Party Cookies — Set by domains other than the one you are visiting, usually for tracking or advertising.",
              ]} />
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-2">
                <Para>
                  Currently, <strong className="text-white">our Service does not use Cookies</strong> or
                  similar tracking technologies. We prioritize user privacy and have chosen not to track
                  your activity or store any unnecessary data at this time.
                </Para>
                <Para>
                  However, we may introduce Cookies in future versions to enhance functionality. If we
                  decide to implement Cookies, we will provide clear notification and offer an option to
                  manage your cookie preferences.
                </Para>
              </div>
            </SubSection>
          </SubSection>

          <SubSection title="Use of Your Personal Data">
            <Para>The Company may use Personal Data for the following purposes:</Para>
            <BulletList items={[
              "To provide and maintain our Service, including to monitor the usage of our Service.",
              "To manage Your Account and registration as a user of the Service.",
              "To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication.",
              "To provide You with news, special offers and general information about goods, services and events.",
              "To manage Your requests and attend to them.",
              "For other purposes such as data analysis, identifying usage trends, and improving our Service.",
            ]} />
          </SubSection>

          <SubSection title="Sharing Your Personal Data">
            <Para>We may share Your personal information in the following situations:</Para>
            <BulletList items={[
              "With Service Providers to monitor and analyze the use of our Service.",
              "With Affiliates, requiring them to honor this Privacy Policy.",
              "With business partners to offer You certain products, services or promotions.",
              "With other users when You share personal information in public areas.",
              "With Your consent for any other purpose.",
            ]} />
          </SubSection>

          <SubSection title="Retention of Your Personal Data">
            <Para>
              Kharagpur Data Analytics Group will retain Your Personal Data only for as long as is
              necessary for the purposes set out in this Privacy Policy. We will retain and use Your
              Personal Data to comply with our legal obligations, resolve disputes, and enforce our
              legal agreements and policies.
            </Para>
            <Para>
              Usage Data is generally retained for a shorter period of time, except when used to
              strengthen security or improve the functionality of Our Service.
            </Para>
          </SubSection>

          <SubSection title="Transfer of Your Personal Data">
            <Para>
              Your information may be transferred to and maintained on computers located outside of
              Your state, province, country or other governmental jurisdiction where data protection
              laws may differ from Your jurisdiction.
            </Para>
            <Para>
              Your consent to this Privacy Policy followed by Your submission of such information
              represents Your agreement to that transfer. The Company will take all steps reasonably
              necessary to ensure Your data is treated securely.
            </Para>
          </SubSection>

          <SubSection title="Delete Your Personal Data">
            <Para>
              You have the right to delete or request that We assist in deleting the Personal Data
              that We have collected about You.
            </Para>
            <Para>
              You may update, amend, or delete Your information at any time by signing in to Your
              Account and visiting the account settings section. You may also contact Us to request
              access to, correct, or delete any personal information You have provided to Us.
            </Para>
          </SubSection>

          <SubSection title="Disclosure of Your Personal Data">
            <SubSection title="Business Transactions" as="h4">
              <Para>
                If Kharagpur Data Analytics Group is involved in a merger, acquisition or asset sale,
                Your Personal Data may be transferred. We will provide notice before Your Personal Data
                is transferred and becomes subject to a different Privacy Policy.
              </Para>
            </SubSection>
            <SubSection title="Law Enforcement" as="h4">
              <Para>
                Under certain circumstances, Kharagpur Data Analytics Group may be required to disclose
                Your Personal Data if required to do so by law or in response to valid requests by
                public authorities (e.g. a court or a government agency).
              </Para>
            </SubSection>
            <SubSection title="Other Legal Requirements" as="h4">
              <Para>
                Kharagpur Data Analytics Group may disclose Your Personal Data in the good faith belief
                that such action is necessary to:
              </Para>
              <BulletList items={[
                "Comply with a legal obligation",
                "Protect and defend the rights or property of Kharagpur Data Analytics Group",
                "Prevent or investigate possible wrongdoing in connection with the Service",
                "Protect the personal safety of Users of the Service or the public",
                "Protect against legal liability",
              ]} />
            </SubSection>
          </SubSection>

          <SubSection title="Security of Your Personal Data">
            <Para>
              The security of Your Personal Data is important to Us, but remember that no method of
              transmission over the Internet, or method of electronic storage is 100% secure. While
              We strive to use commercially acceptable means to protect Your Personal Data, We cannot
              guarantee its absolute security.
            </Para>
          </SubSection>
        </Section>

        {/* ── Children's Privacy ── */}
        <Section title="Children's Privacy">
          <Para>
            Our Service does not address anyone under the age of 13. We do not knowingly collect
            personally identifiable information from anyone under the age of 13. If You are a parent
            or guardian and You are aware that Your child has provided Us with Personal Data, please
            contact Us.
          </Para>
          <Para>
            If We need to rely on consent as a legal basis for processing Your information and Your
            country requires consent from a parent, We may require Your parent's consent before We
            collect and use that information.
          </Para>
        </Section>

        {/* ── Links to Other Websites ── */}
        <Section title="Links to Other Websites">
          <Para>
            Our Service may contain links to other websites that are not operated by Us. If You
            click on a third party link, You will be directed to that third party's site. We strongly
            advise You to review the Privacy Policy of every site You visit.
          </Para>
          <Para>
            We have no control over and assume no responsibility for the content, privacy policies
            or practices of any third party sites or services.
          </Para>
        </Section>

        {/* ── Changes ── */}
        <Section title="Changes to this Privacy Policy">
          <Para>
            We may update Our Privacy Policy from time to time. We will notify You of any changes
            by posting the new Privacy Policy on this page.
          </Para>
          <Para>
            We will let You know via email and/or a prominent notice on Our Service, prior to the
            change becoming effective and update the "Last updated" date at the top of this Privacy
            Policy.
          </Para>
          <Para>
            You are advised to review this Privacy Policy periodically for any changes. Changes to
            this Privacy Policy are effective when they are posted on this page.
          </Para>
        </Section>

        {/* ── Contact ── */}
        <Section title="Contact Us">
          <Para>If you have any questions about this Privacy Policy, You can contact us:</Para>
          <a
            href="mailto:iitkgpkdag@gmail.com"
            className="inline-flex items-center gap-2 mt-1 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-red-600/20 border border-red-500/40 text-red-400 hover:bg-red-600/30 hover:text-red-300 transition-colors text-xs sm:text-sm font-medium break-all sm:break-normal"
          >
            iitkgpkdag@gmail.com
          </a>
        </Section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
