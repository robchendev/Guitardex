import React from "react";

const Detail = ({
  label,
  children,
  pre = false,
  disabled = false,
}: {
  label: string;
  children?: React.ReactNode;
  pre?: boolean;
  disabled?: boolean;
}) => {
  if (disabled) {
    return null;
  }
  return (
    <tr className="border-grey-med border-t border-b">
      <td className="py-1 w-24 text-white-ghost">{label}</td>
      <td className={"py-1" + (pre ? " whitespace-pre" : "")}>{children}</td>
    </tr>
  );
};

export default Detail;
