import { HStack } from "@chakra-ui/react";
import Link from "next/link";
import { Buy, Free } from "../../types/tabs";
import prepLink from "../../utils/prepLink";

const Button = ({ button }: { button: Buy | Free }) => {
  switch (button.type) {
    case "buy":
      return (
        <HStack justifyContent="flex-end">
          <p>{"$" + button.price}</p>
          <a
            onClick={(e) => e.stopPropagation()}
            href={prepLink(button.link)}
            target="_blank"
            className="block ml-2 px-3 pb-2 pt-1.5 rounded-md bg-carmine-soft hover:bg-carmine-hard transition ease-in duration-300"
          >
            Buy
          </a>
        </HStack>
      );
    case "free":
      return (
        <HStack justifyContent="flex-end">
          <p>Free</p>
          <Link onClick={(e) => e.stopPropagation()} href={button.link} target="_blank">
            <div className="block ml-2 px-3 pb-2 pt-1.5 rounded-md bg-carmine-soft hover:bg-carmine-hard transition ease-in duration-300">
              Get
            </div>
          </Link>
        </HStack>
      );
  }
};

export default Button;
