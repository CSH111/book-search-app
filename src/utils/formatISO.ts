const formatISO = (iso: string) => {
  const dateObj = new Date(iso);
  const lacaleStringOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };
  const localeYYYYMM = dateObj.toLocaleString("kr-KR", lacaleStringOptions);
  return localeYYYYMM;
};

export default formatISO;
