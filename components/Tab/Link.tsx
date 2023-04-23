import { Buy, Free } from "../../types/tabs";
import prepLink from "../../utils/prepLink";
import Truncate from "../Truncate";

const Link = ({ button }: { button: Buy | Free }) => {
  switch (button.type) {
    case "buy":
      return <Truncate href={prepLink(button.link)}>{button.link}</Truncate>;
    case "free":
      return (
        <Truncate href={button.link} isInternal newTab>
          eddievdmeer.com/{button.link}
        </Truncate>
      );
  }
};

export default Link;
