import { IconType } from "react-icons";
import { FaYoutube, FaGithub, FaSpotify, FaGlobe } from "react-icons/fa";

export type CreditLink = {
  icon: IconType;
  url: string;
};

export type Credit = {
  name: string;
  roles: string;
  img: string;
  links: CreditLink[];
};

export type CreditExternal = {
  name: string;
  contribution: string;
};

export const mainCredits: Credit[] = [
  {
    name: "Robert Chen",
    roles: "Developer, Content Writer",
    img: "/img/team/robert-chen.jpg",
    links: [
      {
        icon: FaGithub,
        url: "https://github.com/robchendev",
      },
      {
        icon: FaYoutube,
        url: "https://youtube.com/RobertChen",
      },
      {
        icon: FaSpotify,
        url: "https://open.spotify.com/artist/4JQzZTSBYflrvsi3fiPJmZ",
      },
      {
        icon: FaGlobe,
        url: "https://robertchenyt.com/",
      },
    ],
  },
  {
    name: "Eddie van der Meer",
    img: "/img/team/eddie-van-der-meer.jpg",
    roles: "Content Advisor (Audio Production)",
    links: [
      {
        icon: FaYoutube,
        url: "https://www.youtube.com/user/eddie2754/",
      },
      {
        icon: FaSpotify,
        url: "https://open.spotify.com/artist/08WRjJPbPqSEOkFuc99ymW",
      },
      {
        icon: FaGlobe,
        url: "https://eddievdmeer.com/",
      },
    ],
  },
  {
    name: "Constantine Kulak",
    img: "/img/team/constantine-kulak.jpg",
    roles: "Developer",
    links: [
      {
        icon: FaGithub,
        url: "https://github.com/kulakdev",
      },
    ],
  },
  {
    name: "Bob Ma",
    img: "/img/team/bob-ma.jpg",
    roles: "Content Advisor (Techniques)",
    links: [
      {
        icon: FaYoutube,
        url: "https://youtube.com/oBobma/",
      },
      {
        icon: FaSpotify,
        url: "https://open.spotify.com/artist/0AzJ9NCXlRf3dVbSBqU24i",
      },
    ],
  },
  // Weijun requested we leave his section out for the time being
  // {
  //   name: "WeiJun Syu",
  //   img: "/img/team/weijun-syu.jpg",
  //   roles: "Software Consultant",
  //   links: [
  //     {
  //       icon: FaGithub,
  //       url: "https://github.com/weijunsyu",
  //     },
  //     {
  //       icon: FaGlobe,
  //       url: "https://weijunsyu.com/",
  //     },
  //   ],
  // },
  {
    name: "Bryan Quan",
    img: "/img/team/bryan-quan.jpg",
    roles: "Quality Assurance",
    links: [
      {
        icon: FaGithub,
        url: "https://github.com/biryaniq",
      },
    ],
  },
  // {
  //   name: "Matthew Paule",
  //   img: "/img/team/matt-paule.jpg",
  //   roles: "Content Advisor",
  //   links: [
  //     {
  //       icon: FaGithub,
  //       url: "https://github.com/biryaniq",
  //     },
  //   ],
  // },
];

export const externalCredit: CreditExternal[] = [
  {
    name: "Sample",
    contribution: "Stub information",
  },
  {
    name: "Sample",
    contribution: "Stub information",
  },
];
