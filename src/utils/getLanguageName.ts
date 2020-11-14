import { Language } from "../types";

const getLanguageName = (lng: Language): string => {
  let language;

  switch (true) {
    case lng === 'fr':
      language = 'Français';
      break;
    default:
      language = 'English';
      break;
  }

  return language;
};

export default getLanguageName;
