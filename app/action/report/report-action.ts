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

// create report
export const createReport = async (data: ReportCreateType) => {
  const { uniqueKey, day, ...restData } = data;

  console.log(restData);
  const docRef = dbAdmin.collection(REPORT_STAFF_ACTION_TAG).doc(uniqueKey);
  const snap = await docRef.get();

  if (!snap.exists) {
    const doc = {
      data: [
        {
          day: day,
          ...restData,
        },
      ],
    };

    await docRef.set(doc);
    updateTag(REPORT_STAFF_ACTION_TAG);
    return;
  }
};

// get by uniqueKey
export async function _getReportDataByUniqueKey(uniqueKey: string) {
  const doc = await dbAdmin
    .collection(REPORT_STAFF_ACTION_TAG)
    .doc(uniqueKey)
    .get();

  if (!doc.exists) return null;

  return {
    id: doc.id,
    ...doc.data(),
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
