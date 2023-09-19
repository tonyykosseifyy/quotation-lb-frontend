export const formatNumber = (num, offset = 3) => {
  const numberStr = num.toString();
  const isNegative = num < 0;
  const numberWithoutSign = isNegative ? numberStr.slice(1) : numberStr;
  const groups = [];
  let currentIndex = numberWithoutSign.length;

  while (currentIndex > 0) {
    const startIndex = Math.max(0, currentIndex - offset);
    const group = numberWithoutSign.slice(startIndex, currentIndex);
    groups.unshift(group);
    currentIndex -= offset;
  }
  const result = (isNegative ? "-" : "") + groups.join(",");

  return result;
};
