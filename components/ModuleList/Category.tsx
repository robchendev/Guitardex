import React from "react";

function capitalize(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}

const Category = ({ value }: { value: string }) => {
  return <p className="text-ghost-light">{capitalize(value)}</p>;
};

export default Category;
