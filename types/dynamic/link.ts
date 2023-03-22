export type LinkPage = {
  title: string;
  subtitle: string;
  imagePath?: string;
  items: LinkItem[];
};

export type LinkItem = {
  brandLogo: string;
  buttonLabel: string;
  buttonLink: string;
};
