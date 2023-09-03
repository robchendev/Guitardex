import React from "react";
import { Tooltip } from "react-tooltip";

const GlossaryItem = ({ item = "" }: { item: string }) => {
  const [t, d] = item.split("|");
  const term = t.trim();
  const definition = d.trim();
  return (
    <span>
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
        className="border-b-2 pb-px border-link hover:text-text hover:bg-tooltip"
      >
        {term}
      </a>
    </span>
  );
};

export default GlossaryItem;
