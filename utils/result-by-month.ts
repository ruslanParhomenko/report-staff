import { GetReportType } from "@/app/action/report/report-action";

type MatrixMap = Record<string, { day: string; value: string }[]>;

type BuildResult = {
  uniqueNames: string[];
  map: MatrixMap;
  days: string[];
};

export function buildProductMatrix(report: GetReportType | null): BuildResult {
  if (!report || !Array.isArray(report.data)) {
    return {
      uniqueNames: [],
      map: {},
      days: [],
    };
  }

  const daysData = report.data;

  const uniqueNames = new Set<string>();
  const map: MatrixMap = {};
  const days = daysData.map((d) => d.day);

  // 1️⃣ Собираем уникальные name
  for (const dayItem of daysData) {
    const categories = Object.values(dayItem.data ?? {});

    for (const category of categories) {
      if (!Array.isArray(category)) continue;

      for (const product of category) {
        if (!product?.name) continue;
        uniqueNames.add(product.name);
      }
    }
  }

  // 2️⃣ Инициализируем map
  for (const name of uniqueNames) {
    map[name] = days.map((day) => ({
      day,
      value: "",
    }));
  }

  // 3️⃣ Заполняем значениями
  for (const dayItem of daysData) {
    const { day, data } = dayItem;

    const categories = Object.values(data ?? {});

    for (const category of categories) {
      if (!Array.isArray(category)) continue;

      for (const product of category) {
        if (!product?.name) continue;

        const dayIndex = days.indexOf(day);
        if (dayIndex === -1) continue;

        map[product.name][dayIndex] = {
          day,
          value: product.value ?? "",
        };
      }
    }
  }

  return {
    uniqueNames: Array.from(uniqueNames),
    map,
    days,
  };
}
