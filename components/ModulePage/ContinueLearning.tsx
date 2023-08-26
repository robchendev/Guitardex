import React from "react";
import { Continuation, Library, PreReq } from "../../types/dynamic/common";
import A from "../Typography/A";

const ContinueLearning = ({
  continuations,
  library,
}: {
  continuations: Continuation[];
  library: Library;
}) => {
  return (
    <div>
      <p className="text-lg font-medium">Continue Learning</p>
      {continuations.length ? (
        <ul>
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
        <p>There is no continuation to this module.</p>
      )}
    </div>
  );
};

export default ContinueLearning;
