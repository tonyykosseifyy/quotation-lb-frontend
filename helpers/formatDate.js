export const formatDate = (date) => {
    const parts = date.split("-");
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
};