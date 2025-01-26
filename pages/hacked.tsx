import React from "react";
import A from "../components/Typography/A";
import H3 from "../components/Typography/H3";
import P from "../components/Typography/P";
import Wrapper from "../components/Wrapper";

const Hacked = () => {
  return (
    <Wrapper title="Hacked">
      <H3 text="Fingerstyle Guitar Central Was Hacked" />
      <P text="Hey all, Bob, the former owner of Fingerstyle Guitar Central, fell to a remote access hack and his Discord and email accounts were stolen with no way of recovering access. The account was then sold and the server ownership was transferred." />
      <P text="There isn't any way of getting the server ownership back, and the new owners have banned the former owners from the server, so we cannot participate in discussions and answer questions you may have about techniques." />
      <P
        spanned
        text="If you'd like a space to discuss Guitardex and/or Fingerstyle, feel free to join this new "
      />
      <A spanned text="community discord server" href="https://discord.gg/pNq3CQem" />
      <P
        spanned
        text=". It's very barebones right now but we will expand it more soon and tie it closely to Guitardex."
      />
      <div className="w-full mt-4 flex justify-center">
        <iframe
          src="https://discord.com/widget?id=1330450503385219173&theme=dark"
          width="350"
          height="350"
          allowTransparency
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        />
      </div>
    </Wrapper>
  );
};

export default Hacked;
