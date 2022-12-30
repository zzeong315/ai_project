const getDayString = (date: string) => {
  // 2022-11-29T00:00:00.000Z
  const yyyyMMdd = date.substring(0, 10);
  const [sYear, sMonth, sDate] = yyyyMMdd.split("-");

  const dayNum = new Date(Number(sYear), Number(sMonth) - 1, Number(sDate));

  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return week[dayNum.getDay()];
};

export default getDayString;
