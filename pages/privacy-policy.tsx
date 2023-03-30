import Link from "next/link";
import React from "react";
import Wrapper from "../components/Wrapper";

const PrivacyPolicy = () => {
  return (
    <Wrapper title="Privacy Policy">
      <div className="flex justify-center">
        {" "}
        <div className="w-4/5">
          <p>Website address: https://eddievdmeer.com</p>
          <br />
          <h2 className="text-2xl mb-3">Third party analytics</h2>
          <p className="mb-3">
            We use Google Analytics with the “Anonymize IP” option enabled. We use it with the
            intention of being able to view how many visitors the site gets each day. This puts a
            cookie onto your browsing device but does not collect personally identifiable
            information about you. If you want to disable cookies altogether, you can get an
            extension for your browser to opt out of Google Analytics{" "}
            <a
              className="text-gold"
              href="https://chrome.google.com/webstore/detail/google-analytics-opt-out/fllaojicojecljbmefodhfapmkghcbnh?hl=en"
            >
              here
            </a>
            .
          </p>
          <br />
          <h2 className="text-2xl mb-3">Collection of personal data</h2>
          <p className="mb-3">
            We don’t store data without the user's knowledge and consent. This website does not
            record IP addresses of visitors, nor does it serve any identifying cookies to the
            visitors’ devices. However, should the user submit data via the contact form at the{" "}
            <Link href="/contact" className="text-gold">
              Contact
            </Link>{" "}
            page, and check that they agree to this privacy policy, an email containing the
            submitted information will be sent to Eddie van der Meer and the management team.
          </p>
          <br />
          <h2 className="text-2xl mb-3">Search queries</h2>
          <p className="mb-3">
            The searchbar or searchbars on this website is only used to filter results in a list
            already rendered on the web page. We don't log or save this search query.
          </p>
          <br />
          <h2 className="text-2xl mb-3">GDPR compliance</h2>
          <p className="mb-3">
            For EU users: The only way that your data could be sent to us is if you submit a form
            while agreeing to this privacy policy. If you want your information purged from our
            email inboxes, please send us one last email via the{" "}
            <Link href="/contact" className="text-gold">
              Contact
            </Link>{" "}
            page and mention "Delete all emails containing my email youremailaddress@domain.com" in
            the message box. We will remove all form submissions containing the email address you
            entered.
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default PrivacyPolicy;
