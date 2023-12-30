import React from "react";
import A from "../components/Typography/A";
import H3 from "../components/Typography/H3";
import Wrapper from "../components/Wrapper";

const LI = ({ children }: { children: React.ReactNode }) => (
  <li className="list-disc ml-4 mb-0">{children}</li>
);
const NI = ({ children }: { children: React.ReactNode }) => (
  <li className="list-decimal ml-4 mb-0">{children}</li>
);

const About = () => {
  return (
    <Wrapper title="Help">
      <H3 text="Reading Modules" />
      <ul className="mt-2">
        <LI>
          If there are any 'Required' techniques linked at the top of a page, learn them first.
        </LI>
        <LI>Technique ID numbers do not represent the order you should learn them in.</LI>
        <LI>If you're left-handed, treat every "right" instruction as "left".</LI>
      </ul>
      <H3 text="Add/Remove Modules to Your Guitardex" />
      <ol>
        <NI>
          Go to the <A href="/t" text="Techniques" /> or <A href="/a" text="Audio Production" />{" "}
          library
        </NI>
        <NI>Click the save icon at the right of the technique you want saved</NI>
        <NI>
          Go to the <A href="/" text="Guitardex" /> library
        </NI>
      </ol>
      <H3 text="Edit Your Guitardex" />
      <ol className="mt-2">
        <NI>
          Go to your <A href="/" text="Guitardex" />
        </NI>
        <NI>
          Do any of the following:
          <ul>
            <LI>Re-order your modules by dragging and dropping them</LI>
            <LI>Click the Guitardex's name to edit it</LI>
            <LI>Delete techniques using the trash bin buttons</LI>
          </ul>
        </NI>
        <NI>Changes are automatically saved</NI>
      </ol>
      <H3 text="Share Your Guitardex" />
      <ol>
        <NI>
          Go to your <A href="/" text="Guitardex" />
        </NI>
        <NI>
          Copy your generated share URL and paste it wherever you want (Note: An edit made on a
          shared Guitardex will not affect your Guitardex)
        </NI>
      </ol>
      <H3 text="View Someone Else's Guitardex" />
      <ol>
        <NI>
          Go to the link someone else sent you (ex:{" "}
          <A
            href="/?Common-Techniques_16.14.22.17.1.2.4.5.6.7.10.11.12"
            text="guitardex.com/?Common-Techniques_16.14.22.17.1.2.4.5.6.7.10.11.12"
          />
          )
        </NI>
        <NI>Click OK if prompted</NI>
      </ol>
      <H3 text="Delete/Reset Your Guitardex" />
      <ol>
        <NI>
          Go to your <A href="/" text="Guitardex" />
        </NI>
        <NI>Click 'Delete All'</NI>
      </ol>
    </Wrapper>
  );
};

export default About;
