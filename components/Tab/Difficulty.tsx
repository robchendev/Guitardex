import { HStack } from "@chakra-ui/react";
import { ImStarEmpty, ImStarFull, ImStarHalf } from "react-icons/im";
import { Difficulty } from "../../types/tabs";

const Difficulty = ({ rating, hasNum = false }: { rating: Difficulty; hasNum?: boolean }) => {
  const full = Math.floor(rating / 2);
  const half = rating % 2;
  const empty = Math.floor((10 - rating) / 2);
  return (
    <HStack spacing={1} className="text-lg">
      {[...Array(full)].map((val: number, index: number) => (
        <ImStarFull key={index} />
      ))}
      {half === 1 && <ImStarHalf />}
      {[...Array(empty)].map((val: number, index: number) => (
        <ImStarEmpty key={index} />
      ))}
      {hasNum && <p className="pl-1">{(rating / 2).toFixed(1)}</p>}
    </HStack>
  );
};

export default Difficulty;
