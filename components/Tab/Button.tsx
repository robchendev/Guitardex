import { HStack } from "@chakra-ui/react";
import { Buy, Free } from "../../types/tabs";
import prepLink from "../../utils/prepLink";

const Button = ({ button }: { button: Buy | Free }) => {
  let label = "";
  let cta = "";

  switch (button.type) {
    case "buy":
      label = "$" + button.price;
      cta = "Buy";
      break;
    case "free":
      label = "Free";
      cta = "Get";
      break;
  }

  return (
    <HStack justifyContent="flex-end">
      <p>{label}</p>
      <a
        onClick={(e) => e.stopPropagation()}
        href={prepLink(button.link)}
        className="block ml-2 px-3 pb-2 pt-1.5 rounded-md bg-carmine-soft hover:bg-carmine-hard transition ease-in duration-300"
      >
        {cta}
      </a>
    </HStack>
  );
};

export default Button;
