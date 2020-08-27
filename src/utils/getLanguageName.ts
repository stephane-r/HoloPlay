const getLanguageName = (lng: 'en' | 'fr'): string => {
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
