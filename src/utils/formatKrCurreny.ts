const formatKrCurreny = (numberToFormat: string | number) => {
  return Number(numberToFormat).toLocaleString("kr-KR").toString() + "원";
};

export default formatKrCurreny;
