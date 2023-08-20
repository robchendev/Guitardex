type NavButton = {
  text: string;
  url: string;
  isDivider?: false;
};

type NavDivider = {
  isDivider: true;
};

export type Navigation = NavButton | NavDivider;
