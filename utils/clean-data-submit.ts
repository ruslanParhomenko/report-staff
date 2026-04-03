export const cleanReportData = (rest: any) => {
  const isValid = (v: any) => v !== "" && v !== "0" && v !== 0 && v != null;

  return Object.fromEntries(
    Object.entries(rest).map(([key, items]: any) => [
      key,
      items
        .filter((item: any) => isValid(item.value))
        .map((item: any) => ({
          ...item,
          valueByTime: item.valueByTime.filter((v: any) => isValid(v.value)),
        })),
    ]),
  );
};
