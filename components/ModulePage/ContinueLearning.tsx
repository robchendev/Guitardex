import React from "react";
import { Continuation, Library, PreReq } from "../../types/dynamic/common";
import Divider from "../Sidebar/Divider";
import A from "../Typography/A";
import { capitalize } from "../ModuleList/Category";

const ContinueLearning = ({
  continuations,
  library,
  name,
  id,
}: {
  continuations: Continuation[];
  library: Library;
  name: string;
  id: number;
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
                    <span key={i}>
                      {i > 0 && ", "}
                      <A
                        key={i}
                        href={`/${library}/${req.id}`}
                        text={
                          library === "a" && req.category && req.category !== "general"
                            ? `${capitalize(req.category)}: ${req.name}`
                            : req.name
                        }
                      />
                    </span>
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
      <p className="text-lg font-medium mt-4 mb-2">Report Issues</p>
      <Divider />
      <p className="mt-2">
        See an problem with this page's contents? Please{" "}
        <A
          href={`/contact?t=Report_Issue&s=Issue_with_${name
            ?.replaceAll(" ", "_")
            .replaceAll("/", "+")}&l=${library}&id=${id}`}
          text="let us know"
        />
        !
      </p>
    </div>
  );
};

export default ContinueLearning;
