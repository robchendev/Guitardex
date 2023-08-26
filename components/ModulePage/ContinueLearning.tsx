import Link from "next/link";
import React from "react";
import {
  Continuation,
  ModuleContinuation,
  PreReq,
  PreReqExpanded,
} from "../../types/dynamic/common";
import { Technique } from "../../types/dynamic/techniques";
import A from "../Typography/A";

const ContinueLearning = ({
  continuations,
  library,
}: {
  continuations: Continuation[];
  library: "technique" | "audioSkill";
}) => {
  return (
    <div>
      <p className="text-lg font-medium">Continue Learning</p>
      {continuations.length ? (
        <ul>
          {continuations.map((continuation: Continuation, index: number) => (
            <li className="list-disc ml-4 mb-0" key={index}>
              <A href={`/${library}/${continuation.id}`} text={continuation.name} />
              {continuation.alsoRequires.length && (
                <>
                  {" "}
                  (Also requires:{" "}
                  {continuation.alsoRequires.map((req: PreReq, i: number) => (
                    <A key={i} href={`/${library}/${req.id}`} text={req.name} />
                  ))}
                  )
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>There is no continuation to this technique.</p>
      )}
    </div>
  );
};

export default ContinueLearning;
