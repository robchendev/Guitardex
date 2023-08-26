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
  console.log("module continuations", continuations);
  // TODO: EX
  // TODO: Maybe move this to server side

  // if number is >= 0, it means the postReq has been found,

  // and shows us index of so we can remove it from the array
  // console.log("postReq: ", postReq);
  // if (postReq) {
  //   return (
  //     <li key={index}>
  //       {postReq.name}
  //       {alsoRequires.length && (
  //         <span>
  //           {" "}
  //           - Also requires:{" "}
  //           {alsoRequires.map((req: PreReq, i: number) => (
  //             <span key={i}>{req.name}</span>
  //           ))}
  //         </span>
  //       )}
  //     </li>
  //   );
  // }
  // return <>hello</>;

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
