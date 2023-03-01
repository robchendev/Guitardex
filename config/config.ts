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
