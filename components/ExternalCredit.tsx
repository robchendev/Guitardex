import React from "react";
import { CreditExternal, externalCredit } from "../config/credits";
import Divider from "./Sidebar/Divider";

const ExternalCredit = () => {
  return (
    <div className="bg-bg-light rounded-lg px-4 py-3 mt-4">
      <p className="text-lg font-medium">Community Credits</p>
      <p className="mb-2">These people contributed to this project. Thank you everyone!</p>
      <Divider />
      <ul className="mt-2">
        {externalCredit.map((credit: CreditExternal, index: number) => (
          <li key={index} className="list-disc ml-4 mb-0">
            {credit.name}: {credit.contribution}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExternalCredit;
