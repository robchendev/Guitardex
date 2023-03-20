const prepLink = (link?: string) => {
  if (link) {
    return "https://" + link;
  }
  return "";
};

export default prepLink;
