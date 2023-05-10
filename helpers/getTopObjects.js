export const getTopObjects = (arr, key, numOfObjects = 3) => {
    return arr.sort((a, b) => b[key] - a[key]).slice(0, numOfObjects);
};
