import React from "react";
import { Continuation, Library, PreReq } from "../../types/dynamic/common";
import Divider from "../Sidebar/Divider";
import A from "../Typography/A";

const ContinueLearning = ({
  continuations,
  library,
}: {
  continuations: Continuation[];
  library: Library;
}) => {
  return (
    <div className="bg-bg rounded-lg px-4 py-3 mt-4">
      <p className="text-lg font-medium mb-2">Continue Learning...</p>
      <Divider />
      {continuations.length ? (
        <ul className="mt-2">
          {continuations.map((continuation: Continuation, index: number) => (
            <li className="list-disc ml-4 mb-0" key={index}>
              <A href={`/${library}/${continuation.id}`} text={continuation.name} />
              {continuation.alsoRequires.length !== 0 && (
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
        <p className="mt-2">There is no continuation to this module.</p>
      )}
    </div>
  );
};

export default ContinueLearning;
