import { Image } from "@chakra-ui/react";
import React from "react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import LinkIcon from "./LinkIcon";

type TeamSocial = {
  type: "youtube" | "instagram";
  link: string;
};

const TeamSocialIcon = ({ item }: { item: TeamSocial }) => {
  switch (item.type) {
    case "youtube":
      return <LinkIcon icon={FaYoutube} link={item.link} />;
    case "instagram":
      return <LinkIcon icon={FaInstagram} link={item.link} />;
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
    <div className="flex flex-col items-center mx-5 lg:w-1/4 ">
      <Image src={imageUrl} alt={`${name} as ${role}`} className="rounded-3xl mb-5" />
      <span className="text-2xl">{name}</span>
      <p className="text-lg italic text-gold ">{role}</p>
      <div className="text-3xl mt-4">
        {socials.map((item: TeamSocial, index: number) => (
          <TeamSocialIcon key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default TeamMember;
