const purgeLink = (link?: string) => {
  if (link) {
    return link.replace(/http(s)?(:)?(\/\/)?|(\/\/)?(www\.)?/g, "");
  }
  return "";
};

export default purgeLink;
