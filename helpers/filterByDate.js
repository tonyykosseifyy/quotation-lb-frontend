import moment from "moment";

export const filterByDate = (arr, dateSpan) => {
  const todayDate = new Date();
  const startDayOfPrevDateSpan = moment(todayDate).subtract(1, dateSpan).format("LLLL");

  const lastDayOfPrevDateSpan = moment(todayDate).format("LLLL");

  return arr.filter((obj) => {
    const createdDate = obj.createdAt;
    return moment(createdDate).isBetween(startDayOfPrevDateSpan, lastDayOfPrevDateSpan);
  });
};
