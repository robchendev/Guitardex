import Image from "next/image";
import React from "react";

const TabImage = ({ src = "" }: { src?: string }) => {
  return (
    <Image
      src={src}
      alt="tab"
      // TODO: Need a suitable blur image placeholder
      // placeholder="blur"
      // blurDataURL={props.src}
      width={1200}
      height={200}
      className="w-full h-full tab-filter-light"
    />
  );
};

export default TabImage;
