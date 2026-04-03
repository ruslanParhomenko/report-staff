"use server";

import { REPORT_STAFF_ACTION_TAG } from "@/constants/action-tag";
import { ReportType } from "@/features/report-day/schema";
import { dbAdmin } from "@/lib/firebase";
import { unstable_cache, updateTag } from "next/cache";

type ReportCreateType = {
  day: string;
  uniqueKey: string;
  data: Omit<ReportType, "date">;
};

export type DataType = {
  day: string;
  data: Omit<ReportType, "date">;
};

export type GetReportType = {
  id: string;
  data: DataType[];
};
// create report
export const createReport = async (payload: ReportCreateType) => {
  const { uniqueKey, day, data } = payload;

  const docRef = dbAdmin.collection(REPORT_STAFF_ACTION_TAG).doc(uniqueKey);
  const snap = await docRef.get();

  // если документа нет — создаём сразу с одним днем
  if (!snap.exists) {
    await docRef.set({
      data: [
        {
          day,
          data,
        },
      ],
    });

    updateTag(REPORT_STAFF_ACTION_TAG);
    return;
  }

  const raw = snap.data();
  if (!raw || !Array.isArray(raw.data)) return;

  // 🔥 ключевая логика
  const existingIndex = raw.data.findIndex((item: any) => item.day === day);

  let newData;

  if (existingIndex !== -1) {
    // ✅ день уже есть → перезаписываем
    newData = raw.data.map((item: any, index: number) =>
      index === existingIndex ? { day, data } : item,
    );
  } else {
    // ✅ дня нет → добавляем
    newData = [...raw.data, { day, data }];
  }

  await docRef.update({ data: newData });

  updateTag(REPORT_STAFF_ACTION_TAG);
};

// get by uniqueKey
export async function _getReportDataByUniqueKey(uniqueKey: string) {
  const doc = await dbAdmin
    .collection(REPORT_STAFF_ACTION_TAG)
    .doc(uniqueKey)
    .get();

  if (!doc.exists) return null;

  const raw = doc.data();

  if (!raw || !Array.isArray(raw.data)) return null;

  return {
    id: doc.id,
    data: raw.data,
  };
}

export const getReportDataByUniqueKey = unstable_cache(
  _getReportDataByUniqueKey,
  [REPORT_STAFF_ACTION_TAG],
  {
    revalidate: false,
    tags: [REPORT_STAFF_ACTION_TAG],
  },
);
