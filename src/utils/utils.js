function getLang() {
  const lang = navigator.language || navigator.userLanguage;
  const l = lang.substr(0, 2);
  return l === "zh" ? "zh" : "en";
}

export { getLang };
