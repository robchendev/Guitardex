import { HStack, Image, VStack } from "@chakra-ui/react";
import React from "react";
import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import LinkIcon from "./LinkIcon";

type TeamSocial = {
  type: "youtube" | "instagram" | "github";
  link: string;
};

const TeamSocialIcon = ({ item }: { item: TeamSocial }) => {
  switch (item.type) {
    case "youtube":
      return <LinkIcon icon={FaYoutube} link={item.link} />;
    case "instagram":
      return <LinkIcon icon={FaInstagram} link={item.link} />;
    case "github":
      return <LinkIcon icon={FaGithub} link={item.link} />;
  }
};

const TeamMember = ({
  name,
  role,
  imageUrl,
  socials,
}: {
  name: string;
  role: string;
  imageUrl: string;
  socials: TeamSocial[];
}) => {
  return (
    <VStack>
      <Image src={imageUrl} alt={`${name} as ${role}`} className="rounded-3xl w-full h-full mb-2" />
      <span className="text-2xl">{name}</span>
      <p className="text-lg italic text-gold">{role}</p>
      <HStack spacing={0} pt={1}>
        {socials.map((item: TeamSocial, index: number) => (
          <TeamSocialIcon key={index} item={item} />
        ))}
      </HStack>
    </VStack>
  );
};

export default TeamMember;
