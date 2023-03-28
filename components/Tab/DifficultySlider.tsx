import {
  Center,
  Flex,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";
import React from "react";
import { Difficulty } from "../../types/tabs";
import { Tab } from "./_index";

const DifficultySlider = ({
  min,
  max,
  onChange,
}: {
  min: Difficulty;
  max: Difficulty;
  onChange: (rating: [Difficulty, Difficulty]) => void;
}) => {
  return (
    <div className="mb-3">
      <div className="text-lg">
        {min !== max ? (
          <Flex gap={2} alignItems="center" justifyContent="center">
            Difficulty: <Tab.Difficulty rating={min} /> to <Tab.Difficulty rating={max} />
          </Flex>
        ) : (
          <Flex gap={2} alignItems="center" justifyContent="center">
            Difficulty: <Tab.Difficulty rating={min} hasNum />
          </Flex>
        )}
      </div>
      <Center>
        <div className="w-full px-2 lg:w-2/5 lg:px-0">
          <RangeSlider
            // eslint-disable-next-line
            aria-label={["min", "max"]}
            min={0}
            max={10}
            defaultValue={[min, max]}
            onChange={onChange}
          >
            <RangeSliderTrack bg="#555">
              <RangeSliderFilledTrack bg="#B51C42" />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </div>
      </Center>
    </div>
  );
};

export default DifficultySlider;
