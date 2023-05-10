import moment from "moment";

export const filterByDate = (arr, dateSpan) => {
    const todayDate = new Date();
    const startDayOfPrevDateSpan = moment(todayDate)
        .subtract(1, dateSpan)
        .format("LLLL");

    console.log("start day of prev span", startDayOfPrevDateSpan);
    const lastDayOfPrevDateSpan = moment(todayDate).format("LLLL");
    console.log("last day of prev span", lastDayOfPrevDateSpan);

    return arr.filter((obj) => {
        const createdDate = obj.createdAt;
        console.log("createdDate", createdDate);
        return moment(createdDate).isBetween(
            startDayOfPrevDateSpan,
            lastDayOfPrevDateSpan
        );
    });
};
