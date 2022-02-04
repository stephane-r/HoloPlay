const getLanguageName = (lng: "en" | "fr" | "cs"): string => {
  let language;

  switch (true) {
    case lng === "fr":
      language = "Français";
      break;
    case lng === "cs":
      language = "Čeština";
      break;
    default:
      language = "English";
      break;
  }

  return language;
};

export default getLanguageName;
