export const format = (value: number): string => {
  const formatCurrency = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatCurrency.format(value);
};

export const formatNumber = (value: number): string => Number(value).toLocaleString('en', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const formatDecimals = (value: number): string => Number(value).toLocaleString('es-MX', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
