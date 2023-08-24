import React from "react";

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
    // TODO: Tooltip
    <span className="text-purple-dark">
      {term}={definition}
    </span>
  );
};

export default GlossaryItem;
