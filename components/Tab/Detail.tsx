import React from "react";

const Detail = ({
  label,
  children,
  disabled = false,
}: {
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
}) => {
  if (disabled) {
    return null;
  }
  return (
    <tr className="border-grey-med border-t border-b ">
      <td className="py-1 w-24 text-white-ghost">{label}</td>
      <td className="py-1 whitespace-pre">{children}</td>
    </tr>
  );
};

export default Detail;
