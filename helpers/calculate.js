export const calculateTotal = (unitPrice, quantity, discount) => {
  return quantity * unitPrice * (1 - discount / 100);
};

export const calculateTotalAfterDiscounts = (total, discounts = []) => {
  discounts.forEach((discount) => {
    total *= 1 - discount / 100;
  });
  console.log(total);

  return total;
};

export const calculateCommission = (total, commission) => {
  return (total * commission) / 100;
};
