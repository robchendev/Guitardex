import { tabs } from "../config/tabs";
import { TabInfo } from "../types/tabs";
import purgeLink from "./purgeLink";

export type TabsCache = {
  title: string;
  source?: string;
  artist?: string;
  isAnime?: boolean;
  tuning?: string;
  strings?: string;
  diff: number;
};

export const tabsCache: TabsCache[] = tabs.map(
  ({ title, source, artist, isAnime, tuning, difficulty }: TabInfo) => ({
    title: title.toLowerCase(),
    source: source?.toLowerCase(),
    artist: artist?.toLowerCase(),
    isAnime: isAnime,
    tuning: tuning?.name.toLowerCase(),
    strings: tuning?.strings.toLowerCase().replace(/\s/g, ""),
    diff: difficulty,
  })
);

// The point of this tabCloneCache is to prevent the regex function
// from running for every rendered component by caching the tab
export const tabCloneCache: TabInfo[] = tabs.map((tab: TabInfo) => ({
  ...tab,
  guitardex: tab.guitardex ? purgeLink(tab.guitardex) : undefined,
  youtube: tab.youtube ? purgeLink(tab.youtube) : undefined,
  spotify: tab.spotify ? purgeLink(tab.spotify) : undefined,
  apple: tab.apple ? purgeLink(tab.apple) : undefined,
  button: tab.button
    ? /* eslint-disable */
      {
        ...tab.button,
        link: tab.button ? purgeLink(tab.button?.link) : "",
      }
    : undefined,
  /* eslint-enable */
}));

export const tabsCacheSize = tabsCache.length;
