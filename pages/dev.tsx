import { VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import Divider from "../components/Sidebar/Divider";
import Wrapper from "../components/Wrapper";
import { changeLog, Log } from "../config/updates";

const Development: NextPage = () => {
  return (
    <Wrapper title="Development">
      <div>Changelog</div>
      <VStack divider={<Divider />} align="stretch">
        {changeLog.map((log: Log, index: number) => (
          <div key={index} className="mb-5">
            <h4 className={"mt-4 mb-0 text-lg font-medium tracking-wider"}>
              v{log.version} - {log.title}
            </h4>
            <p className="mb-3">{log.date}</p>
            <ul>
              {log.changes.map((change: string, i: number) => (
                <li key={i} className="list-disc ml-4 mb-1.5">
                  {change}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </VStack>
    </Wrapper>
  );
};

export default Development;
