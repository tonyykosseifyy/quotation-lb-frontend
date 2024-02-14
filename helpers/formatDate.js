export const formatDate = (date, seperator) => {
    const parts = date.split("-");
    return `${parts[2]}${seperator}${parts[1]}${seperator}${parts[0]}`;
};
