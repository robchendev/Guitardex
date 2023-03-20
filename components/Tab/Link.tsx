import { Buy, Free } from "../../types/tabs";
import purgeLink from "../../utils/purgeLink";
import Truncate from "../Truncate";

const Link = ({ button }: { button: Buy | Free }) => {
  switch (button.type) {
    case "buy":
      return <Truncate href={button.link}>{purgeLink(button.link)}</Truncate>;
    case "free":
      return <Truncate href={button.link}>placeholder link for free</Truncate>;
  }
};

export default Link;
