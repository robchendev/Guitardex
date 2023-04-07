export type LinkPage = {
  id: string;
  title: string;
  subtitle: string;
  items: LinkItem[];
};

export type LinkItem = {
  brandLogo: string;
  buttonLabel: string;
  buttonLink: string;
};

export const links: LinkPage[] = [
  {
    id: "Creepin",
    title: "Creepin'",
    subtitle: "Noble, Eddie van der Meer",
    items: [
      {
        brandLogo: "spotify",
        buttonLabel: "Play",
        buttonLink: "https://open.spotify.com/track/3lgeOdl7NEUNYVrsdAPfny",
      },
      {
        brandLogo: "applemusic",
        buttonLabel: "Play",
        buttonLink:
          "https://music.apple.com/ca/album/1589393833?i=1589393834&app=music&at=1l3vpUI&ct=LFV_d23977d069ba39ebefbcbe20827a681f&itscg=30440&itsct=catchall_p2&lId=24288308&cId=none&sr=2&src=Linkfire&ls=1",
      },
      {
        brandLogo: "deezer",
        buttonLabel: "Play",
        buttonLink:
          "https://www.deezer.com/track/1516478312?app_id=140685&utm_source=partner_linkfire&utm_campaign=d23977d069ba39ebefbcbe20827a681f&utm_medium=Original&utm_term=eddie-van-der-meer&utm_content=track-1516478312",
      },
      {
        brandLogo: "tidal",
        buttonLabel: "Play",
        buttonLink: "http://listen.tidalhifi.com/track/200601739",
      },
      {
        brandLogo: "itunes",
        buttonLabel: "Play",
        buttonLink:
          "https://music.apple.com/ca/album/1589393833?i=1589393834&app=itunes&at=1l3vpUI&ct=LFV_d23977d069ba39ebefbcbe20827a681f&itscg=30440&itsct=catchall_p5&lId=24288308&cId=none&sr=5&src=Linkfire&ls=1",
      },
    ],
  },
];
