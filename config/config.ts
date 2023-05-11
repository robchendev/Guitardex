import { IconType } from "react-icons";

import { FaApple, FaInstagram, FaSpotify, FaTwitter, FaYoutube } from "react-icons/fa";

export type GuitarInfo = {
  name: string;
  brand: string;
  desc: string;
  videoId: string;
  buyLink?: string;
  price?: string;
} & ({ available: "buy"; buyLink: string; price: string } | { available: "discontinued" });
type Config = {
  guitars: GuitarInfo[];
};

export const config: Config = {
  guitars: [
    {
      available: "buy",
      name: "Songbird 2A",
      brand: "Avian",
      buyLink: "https://avianguitar.com/discount/EVDM?redirect=%2Fcollections%2Fguitars",
      desc: "A full-body mahogany guitar. It's got a warm yet vibrant tone, and the build is the same as my Songbird 5A.",
      price: "1299",
      videoId: "s0DhUOQCchw",
    },
    {
      available: "buy",
      name: "Songbird 5A",
      brand: "Avian",
      buyLink: "https://avianguitar.com/discount/EVDM?redirect=%2Fcollections%2Fguitars",
      desc: "The best sounding guitar I own. The tone is clean and it has a comfortable neck and body shape.",
      price: "3199",
      videoId: "asy2-MU-FbQ",
    },
    {
      available: "buy",
      name: "X4",
      brand: "Enya",
      buyLink: "https://www.enya-music.com/collections/guitar/products/x4-cutaway",
      desc: "A carbon fibre guitar with a deep and rich sound. The interesting soundhole placement projects the sound to player better while not sacrificing the audience’s listening experience.",
      price: "899",
      videoId: "DGtyrC2Xn3g",
    },

    {
      available: "buy",
      name: "CWG-23S Indian Rosewood",
      brand: "Cuntz",
      buyLink:
        "https://www.thomann.de/gb/cuntz_guitars_cwg_23s_indian_rose_custom.htm?partner_id=69983",
      desc: "My most comfortable and favorite all-purpose guitar. Ever since I bought it, I’ve been using it as my main practice guitar.",
      price: "4550",
      videoId: "I29XpIFRblc",
    },
    {
      available: "buy",
      name: "Black Ice WS1000N2",
      brand: "RainSong",
      buyLink: "https://www.thomann.de/gb/rainsong_bi_ws1000n2_black_ice.htm?partner_id=69983",
      desc: "One of my more visually appealing guitars. Being made out of carbon fiber, it’s light, loud and is indestructable compared to wood guitars.",
      price: "2700",
      videoId: "hXQxSi34GWY",
    },
    {
      available: "buy",
      name: "EA80C",
      brand: "Maton",
      buyLink: "https://maton.com.au/product/ea80c",
      desc: "My oldest, most nostalgic guitar. I played this guitar in my early and pre-youtube years, when I first discovered Tommy Emmanuel’s works.",
      price: "2000",
      videoId: "6SBD2KywFpE",
    },
    {
      available: "discontinued",
      name: "Signature Model",
      brand: "Baton Rouge",
      desc: "My signature model from Baton Rouge guitars. I like this guitar the most out of all the guitars I’ve received from Baton Rouge.",
      videoId: "xsRZejd0YBs",
    },
    {
      available: "discontinued",
      name: "AR101S",
      brand: "Baton Rouge",
      desc: "My other signature model from Baton Rouge guitars. It is comfortable to use, has a nice appearance and a decent tone.",
      videoId: "hXQxSi34GWY",
    },
    {
      available: "discontinued",
      name: "X4S/GACE Fabulous",
      brand: "Baton Rouge",
      desc: "I’ve seldom used this guitar, but it is a good pick. The red stripes and soundhole rosette gives it the unique appearance",
      videoId: "e_k-yLShHC8",
    },
    {
      available: "discontinued",
      name: "Smokey Hybrid SMH",
      brand: "RainSong",
      desc: "This guitar is a warmer, mellower version of the Rainsong Black Ice model. As a carbon fiber guitar, it’s lightweight, loud and very, very durable.",
      videoId: "L2o1Dv70kRo",
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
    name: "About",
    link: "/",
  },
  {
    name: "Music",
    link: "/music",
  },
  {
    name: "Tabs",
    link: "/tabs",
  },
  {
    name: "Guitars",
    link: "/guitars",
  },
  {
    name: "Gear",
    link: "/gear/audio",
  },
  {
    name: "Contact",
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
    link: "https://www.youtube.com/@EddievanderMeer",
    icon: FaYoutube,
  },
  {
    name: "instagram",
    link: "https://www.instagram.com/eddievandermeer_",
    icon: FaInstagram,
  },
  {
    name: "twitter",
    link: "https://twitter.com/EddievanderMeer",
    icon: FaTwitter,
  },
  {
    name: "spotify",
    link: "https://open.spotify.com/artist/08WRjJPbPqSEOkFuc99ymW",
    icon: FaSpotify,
  },
  {
    name: "apple-music",
    link: "https://music.apple.com/us/artist/eddie-van-der-meer/879551373",
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
    link: "/l/get-out-the-way",
    picture: "/img/l/get-out-the-way.jpg",
  },
  {
    name: "i don't care",
    link: "/l/i-dont-care",
    picture: "/img/l/i-dont-care.jpg",
  },
  {
    name: "silence",
    link: "/l/silence",
    picture: "/img/l/silence.jpg",
  },
  {
    name: "creepin",
    link: "/l/creepin",
    picture: "/img/l/creepin.jpg",
  },
  {
    name: "helpless",
    link: "/l/helpless",
    picture: "/img/l/helpless.jpg",
  },
  {
    name: "all i wanted",
    link: "/l/all-i-wanted",
    picture: "/img/l/all-i-wanted.jpg",
  },
  {
    name: "go fast",
    link: "/l/go-fast",
    picture: "/img/l/go-fast.jpg",
  },
  {
    name: "paralyzed",
    link: "/l/paralyzed",
    picture: "/img/l/paralyzed.jpg",
  },
];
