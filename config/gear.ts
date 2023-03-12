import { NavItem } from "./config";

export type GearNavItem = {
  sections?: {
    name: string;
    gear?: {
      name: string;
      links?: {
        seller: string;
        link: string;
      }[];
    }[];
  }[];
} & NavItem;

export const gearNavItems: GearNavItem[] = [
  {
    name: "Audio",
    link: "/gear/audio",
    sections: [
      {
        name: "Microphones",
        gear: [
          {
            name: "Neumann KM 184 MT",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/3gAn053",
              },
              {
                seller: "Thomann",
                link: "https://www.thomann.de/gb/neumann_km184mt_stereoset.htm?partner_id=69983",
              },
            ],
          },
          {
            name: "Oktava MK-012-02",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2XMnD2U",
              },
              {
                seller: "Thomann",
                link: "https://www.thomann.de/gb/oktava_mk_012_02_msp4_silver.htm?partner_id=69983",
              },
            ],
          },
          {
            name: "Oktava MK-012-01",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2XhhP2A",
              },
              {
                seller: "Thomann",
                link: "https://www.thomann.de/gb/oktava_mk_01201_mkii_matched_pair.htm?partner_id=69983",
              },
            ],
          },
          {
            name: "Behringer C2",
            links: [
              {
                seller: "Thomann",
                link: "https://www.thomann.de/gb/behringer_c2_stereoset.htm?partner_id=69983",
              },
            ],
          },
        ],
      },
      {
        name: "Interface",
        gear: [
          {
            name: "UA Apollo Twin Duo MKII",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2MeljMK",
              },
              {
                seller: "Thomann",
                link: "https://www.thomann.de/gb/universal_audio_apollo_twin_mkii_duo.htm?partner_id=69983",
              },
            ],
          },
          {
            name: "Focusrite Scarlett 2i2",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2XfL3yI",
              },
              {
                seller: "Thomann",
                link: "https://www.thomann.de/gb/focusrite_scarlett_2i2_3rd_gen.htm?partner_id=69983",
              },
            ],
          },
        ],
      },
      {
        name: "Headphones",
        gear: [
          {
            name: "Beyerdynamic DT 1990 Pro",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2zIZYbJ",
              },
              {
                seller: "Thomann",
                link: "https://www.thomann.de/gb/beyerdynamic_dt_1990_pro_250_ohms.htm?partner_id=69983",
              },
            ],
          },
          {
            name: "Beyerdynamic DT 770 Pro",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2MhPmTH",
              },
              {
                seller: "Thomann",
                link: "https://www.thomann.de/gb/beyerdynamic_dt770pro.htm?partner_id=69983",
              },
            ],
          },
          {
            name: "Dragonfly Red Headphone Amplifier",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2XfiCAT",
              },
            ],
          },
          {
            name: "Dragonfly Black Headphone Amplifier",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2TPYSlg",
              },
            ],
          },
        ],
      },
      {
        name: "Other",
        gear: [
          {
            name: "Hola! Music HPS-101TB Mic Stand",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/3c9Xws0",
              },
            ],
          },
          {
            name: "XLR Microphone Cables (any)",
          },
        ],
      },
    ],
  },
  {
    name: "Video",
    link: "/gear/video",
    sections: [
      {
        name: "Camera",
        gear: [
          {
            name: "Blackmagic Pocket Cinema Camera 6k",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/3dnIPDe",
              },
            ],
          },
          {
            name: "Panasonic Lumix GH5",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2Xg9nAr",
              },
            ],
          },
          {
            name: "DJI Mavic 2 Pro Drone",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/3eqhnVo",
              },
            ],
          },
        ],
      },
      {
        name: "Lens / Filters",
        gear: [
          {
            name: "LUMIX G X Vario 12-35mm",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/3eBTQRx",
              },
            ],
          },
          {
            name: "LUMIX G Leica 42.5mm",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/3eCX2wd",
              },
            ],
          },
          {
            name: "Hoya 67mm variable ND filter",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2Bh3FWB",
              },
            ],
          },
          {
            name: "Tiffen 58mm variable ND filter",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/3eCyOlt",
              },
            ],
          },
        ],
      },
      {
        name: "Others",
        gear: [
          {
            name: "SanDisk Extreme Pro 256GB SD card",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2TSRkOM",
              },
            ],
          },
          {
            name: "Samsung T5 500GB portable SSD",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2Xf73cT",
              },
            ],
          },
          {
            name: "Manfrotto MKBFRA4-BH tripod",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2M9h3hI",
              },
            ],
          },
          {
            name: "DJI Ronin-S stabilizer",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/3gCV5BG",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Misc",
    link: "/gear/misc",
    sections: [
      {
        name: "Strings",
        gear: [
          {
            name: "Elixir light nanoweb 80/20 bronze",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2DcecBZ",
              },
            ],
          },
          {
            name: "Elixir light nanoweb phosphor bronze",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2ABQQmT",
              },
            ],
          },
        ],
      },
      {
        name: "Capo",
        gear: [
          {
            name: "G7th performance 3 black",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/3cgDfB4",
              },
            ],
          },
          {
            name: "G7th performance 3 silver",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/3gEeemD",
              },
            ],
          },
          {
            name: "G7th performance 3 gold",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2MdPxiU",
              },
            ],
          },
        ],
      },
      {
        name: "Thumbpick",
        gear: [
          {
            name: "Dunlop medium thumbpicks",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2ABgb0s",
              },
            ],
          },
          {
            name: "Dunlop large thumbpicks",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2DbGYTx",
              },
            ],
          },
        ],
      },
      {
        name: "Maintenance",
        gear: [
          {
            name: "The Nomad Tool cleaner",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2Q6eaOV",
              },
            ],
          },
          {
            name: "Planet Waves lemon oil",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/3ckp51D",
              },
            ],
          },
        ],
      },
      {
        name: "Guitar Stand",
        gear: [
          {
            name: "Hercules 5-guitar rack",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2ABQiNG",
              },
            ],
          },
          {
            name: "Hercules tri guitar stand",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/3gD4Sb1",
              },
            ],
          },
          {
            name: "Hercules duo guitar stand",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/3gyTjS1",
              },
            ],
          },
          {
            name: "Hercules single guitar stand",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2MbadbB",
              },
            ],
          },
        ],
      },
      {
        name: "Other",
        gear: [
          {
            name: "Mono M80 guitar case",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/3ci4efo",
              },
            ],
          },
          {
            name: "Snark SN5X tuner",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2AAHwzM",
              },
            ],
          },
          {
            name: "Hercules music stand",
            links: [
              {
                seller: "Amazon",
                link: "https://amzn.to/2XGRmKO",
              },
            ],
          },
        ],
      },
    ],
  },
];
