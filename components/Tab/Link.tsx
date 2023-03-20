import { Buy, Free } from "../../types/tabs";
import prepLink from "../../utils/prepLink";
import Truncate from "../Truncate";

const Link = ({ button }: { button: Buy | Free }) => {
  switch (button.type) {
    case "buy":
      return <Truncate href={prepLink(button.link)}>{button.link}</Truncate>;
    case "free":
      return <Truncate href={prepLink(button.link)}>placeholder link for free</Truncate>;
  }
};

export default Link;
