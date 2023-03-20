import { Buy, Free } from "../../types/tabs";

const Price = ({ button }: { button: Buy | Free }) => {
  switch (button.type) {
    case "buy":
      return <p>${button.price}</p>;
    case "free":
      return <p>free</p>;
  }
};

export default Price;
