import { HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const DexInfoItem = ({
  title,
  subtitle,
  href,
}: {
  title: string;
  subtitle: string;
  href: string;
}) => {
  return (
    <Link className="w-full hover:text-text group relative" href={href}>
      <HStack
        className={"bg-bg rounded-md duration-200 group-hover:ml-3 relative z-20 mb-1.5"}
        justifyContent="space-between"
        align="stretch"
      >
        <div className="px-3.5 py-2">
          <Text as="h1" noOfLines={1} className="font-medium">
            {title}
          </Text>
          <Text as="p" noOfLines={1}>
            {subtitle}
          </Text>
        </div>
      </HStack>
    </Link>
  );
};

export default DexInfoItem;
