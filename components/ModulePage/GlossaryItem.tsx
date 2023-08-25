import React from "react";
import { Tooltip } from "react-tooltip";

const GlossaryItem = ({
  item = "",
  addToGlossary,
}: {
  item: string;
  addToGlossary: (term: string, definition: string) => void;
}) => {
  const [t, d] = item.split("|");
  const term = t.trim();
  const definition = d.trim();
  addToGlossary(term, definition);
  return (
    <span className="">
      <Tooltip
        id="my-tooltip"
        className="transition-none duration-0 ttLight"
        offset={0}
        noArrow={true}
        closeOnScroll={false}
        closeOnResize={false}
      />
      <a
        data-tooltip-id="my-tooltip"
        data-tooltip-content={definition}
        className="border-b-2 pb-px border-purple hover:text-text-light hover:bg-tooltip-light"
      >
        {term}
      </a>
    </span>
  );
};

export default GlossaryItem;
