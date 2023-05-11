export type LinkPage = {
  title: string;
  subtitle: string;
  imagePath?: string;
  items: LinkItem[];
};

export type LinkItem = {
  type: string;
  buttonLabel: string;
  url: string;
};
