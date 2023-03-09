/* eslint-disable prettier/prettier */
import { IconType } from "react-icons";
// eslint-disable-next-line prettier/prettier

import {
  FaApple,
  FaInstagram,
  FaSpotify,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export type GuitarInfo = {
  name: string;
  brand: string;
  desc: string;
  videoId: string;
  title: string;
  buyLink?: string;
  price?: string;
} & (
  | { available: "buy"; buyLink: string; price: string }
  | { available: "discontinued" }
);
type Config = {
  guitars: GuitarInfo[];
};

export const config: Config = {
  guitars: [
    {
      available: "buy",
      name: "Avian Songbird 5A",
      brand: "avian",
      buyLink:
        "https://avianguitar.com/discount/EVDM?redirect=%2Fcollections%2Fguitars",
      desc: "The best sounding guitar I own. The tone is clean and it has a comfortable neck and body shape. Use my discount code “EVDM” to get 5% off any Avian Guitar.",
      price: "3199",
      videoId: "wQANVR4vqXI",
      title:
        "RADWIMPS - Suzume (すずめ) feat.十明 - すずめの戸締まり OST Fingerstyle Guitar Cover",
    },
    {
      available: "buy",
      name: "X4",
      brand: "enya",
      buyLink:
        "https://www.enya-music.com/collections/guitar/products/x4-cutaway",
      desc: "A carbon fibre guitar with a deep and rich sound. The interesting soundhole placement projects the sound to player better while not sacrificing the audience’s listening experience.",
      price: "899",
      videoId: "DGtyrC2Xn3g",
      title: "I really wanna stay at your home",
    },

    {
      available: "buy",
      name: "cwg-23s rosewood",
      brand: "cuntz",
      buyLink:
        "https://www.thomann.de/gb/cuntz_guitars_cwg_23s_indian_rose_custom.htm?partner_id=69983",
      desc: "The best sounding guitar I own. The tone is clean and it has a comfortable neck and body shape. Use my discount code “EVDM” to get 5% off any Avian Guitar.",
      price: "4550",
      videoId: "I29XpIFRblc",
      title:
        "Kenshi Yonezu (米津玄師) Umi no Yuurei (海の幽霊) - Children of the Sea OST - Fingerstyle Guitar Cover",
    },
    {
      available: "buy",
      name: "Black Ice WS1000N2",
      brand: "rainsong",
      buyLink:
        "https://www.thomann.de/gb/rainsong_bi_ws1000n2_black_ice.htm?partner_id=69983",
      desc: "One of my more visually appealing guitars. Being made out of carbon fiber, it’s light, loud and is indestructable compared to wood guitars.",
      price: "2700",
      videoId: "hXQxSi34GWY",
      title: "Believer - Imagine Dragons - Fingerstyle Guitar Cover",
    },
    {
      available: "buy",
      name: "ea80c",
      brand: "maton",
      buyLink: "https://maton.com.au/product/ea80c",
      desc: "My oldest, most nostalgic guitar. I played this guitar in my early and pre-youtube years, when I first discovered Tommy Emmanuel’s works.",
      price: "2000",
      videoId: "6SBD2KywFpE",
      title: "Re:Zero ED - STYX HELIX - Fingerstyle Guitar Cover",
    },
    {
      available: "discontinued",
      name: "evdm signature",
      brand: "baton rouge",
      desc: "My signature model from Baton Rouge guitars. I like this guitar the most out of all the guitars I’ve received from Baton Rouge.",
      videoId: "xsRZejd0YBs",
      title:
        "Doki Doki Literature Club! OST - Your Reality (Credit Theme) Fingerstyle Guitar Cover",
    },
    {
      available: "discontinued",
      name: "ar101s",
      brand: "baton rouge",
      desc: "My other signature model from Baton Rouge guitars. It is comfortable to use, has a nice appearance and a decent tone.",
      videoId: "hXQxSi34GWY",
      title: "Shape of You - Ed Sheeran - Fingerstyle Guitar Cover",
    },
    {
      available: "discontinued",
      name: "x4s/gace fabulous",
      brand: "baton rouge",
      desc: "I’ve seldom used this guitar, but it is a good pick. The red stripes and soundhole rosette gives it the unique appearance",
      videoId: "e_k-yLShHC8",
      title: "Pirates of the Caribbean Theme - Fingerstyle Guitar Cover",
    },
    {
      available: "discontinued",
      name: "smokey hybrid smh",
      brand: "rainsong",
      desc: "I’ve seldom used this guitar, but it is a good pick. The red stripes and soundhole rosette gives it the unique appearance",
      videoId: "L2o1Dv70kRo",
      title:
        "Boruto: Naruto the Next Generation  Opening 1 - Baton Road - Fingerstyle Guitar Cover",
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
