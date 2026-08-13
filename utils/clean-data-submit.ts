export const cleanReportData = (rest: any) => {
  const isValid = (item: any) =>
    item?.name != null &&
    item.name !== "" &&
    item?.value != null &&
    item.value !== "" &&
    item.value !== "0" &&
    item.value !== 0;

  const result = Object.fromEntries(
    Object.entries(rest)
      .map(([key, items]: any) => [key, items.filter(isValid)])
      .filter(([, items]: any) => items.length > 0),
  );

  return Object.keys(result).length > 0 ? result : null;
};
