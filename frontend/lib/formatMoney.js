export default function formatMoney(amount = 0) {
  const option = {
    style: 'currency',
    currency: 'NOK',
    minimumFractionDigits: 0,
  };
  const formatter = Intl.NumberFormat('nb-NO', option);

  const formatted = formatter.formatToParts(amount);

  const formattedAmount = formatted
    .map(({ type, value }) => {
      type === 'group' ? (value = ',') : value;
      type === 'decimal' ? (value = '') : value;
      return value;
    })
    .reduce((string, part) => string + part);

  return formattedAmount.replace('kr', 'NOK');
}
