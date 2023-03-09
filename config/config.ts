import { IconType } from "react-icons";
// eslint-disable-next-line prettier/prettier
import { FaApple, FaInstagram, FaSpotify, FaTwitter, FaYoutube } from "react-icons/fa";

export type GuitarInfo = {
  name: string;
  desc: string;
  price: number;
};

type Config = {
  guitars: GuitarInfo[];
};

export const config: Config = {
  guitars: [
    {
      name: "Avian Songbird 5A",
      desc: "The best sounding guitar I own. The tone is clean and it has a comfortable neck and body shape. Use my discount code “EVDM” to get 5% off any Avian Guitar.",
      price: 3199,
    },
    {
      name: "Enya X4",
      desc: "A carbon fibre guitar with a deep and rich sound. The interesting soundhole placement projects the sound to player better while not sacrificing the audience’s listening experience.",
      price: 899,
    },
    {
      name: "Cuntz CWG-23S",
      desc: "The best sounding guitar I own. The tone is clean and it has a comfortable neck and body shape. Use my discount code “EVDM” to get 5% off any Avian Guitar.",
      price: 4550,
    },
    {
      name: "Rainsong Black Ice WS1000N2",
      desc: "One of my more visually appealing guitars. Being made out of carbon fiber, it’s light, loud and is indestructable compared to wood guitars.",
      price: 2700,
    },
  ],
};
// INDEX PAGE

export type NavItem = {
  name: string;
  link: string;
};

export const navItems: NavItem[] = [
  {
    name: "about",
    link: "/",
  },
  {
    name: "music",
    link: "/music",
  },
  {
    name: "tabs",
    link: "/tabs",
  },
  {
    name: "guitars",
    link: "/guitars",
  },
  {
    name: "gear",
    link: "/gear",
  },
  {
    name: "contact",
    link: "/contact",
  },
];

export type SocialIcon = {
  name: string;
  link: string;
  icon: IconType;
};

export const icons: SocialIcon[] = [
  {
    name: "youtube",
    link: "/",
    icon: FaYoutube,
  },
  {
    name: "instagram",
    link: "/music",
    icon: FaInstagram,
  },
  {
    name: "tabs",
    link: "/tabs",
    icon: FaTwitter,
  },
  {
    name: "guitars",
    link: "/guitars",
    icon: FaSpotify,
  },
  {
    name: "gear",
    link: "/gear",
    icon: FaApple,
  },
];
// MUSIC PAGE

export type MusicIcon = {
  name: string;
  link: string;
  picture: string;
};

export const images: MusicIcon[] = [
  {
    name: "get out the way",
    link: "https://open.spotify.com/track/5FXCk4Hu9jCcjOIhTozB6Y?si=64121cad3175468f",
    picture: "/img/music1.jpg",
  },
  {
    name: "i don't care",
    link: "https://open.spotify.com/track/5FXCk4Hu9jCcjOIhTozB6Y?si=64121cad3175468f",
    picture: "/img/music2.jpg",
  },
  {
    name: "silence",
    link: "https://open.spotify.com/album/67myKGkmkSt6l6OvTwMg4I",
    picture: "/img/music3.jpg",
  },
  {
    name: "creepin",
    link: "https://eddie-van-der-meer.lnk.to/Creepin",
    picture: "/img/music4.jpg",
  },
  {
    name: "helpless",
    link: "https://eddie-van-der-meer.lnk.to/HelplessTP",
    picture: "/img/music5.jpg",
  },
  {
    name: "all i wanted",
    link: "https://eddie-van-der-meer.lnk.to/AllIWanted",
    picture: "/img/music6.jpg",
  },
  {
    name: "go fast",
    link: "https://eddie-van-der-meer.lnk.to/GoFast",
    picture: "/img/music7.jpg",
  },
  {
    name: "paralyzed",
    link: "https://eddie-van-der-meer.lnk.to/Paralyzed",
    picture: "/img/music8.jpg",
  },
];
