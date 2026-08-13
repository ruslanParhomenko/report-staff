"use server";
import { REPORT_STAFF_ACTION_TAG } from "@/constants/action-tag";
import { getYearMonthDoc } from "@/lib/firebase-doc";
import { unstable_cache } from "next/cache";
import { GetReportData, ReportData } from "../model/type";

const actionTag = REPORT_STAFF_ACTION_TAG;

async function _getReportsByYear(
  year: string,
  month: string,
): Promise<GetReportData[] | null> {
  const docRef = getYearMonthDoc(actionTag, year, month);
  const daysSnap = await docRef.collection("days").get();

  if (daysSnap.empty) return null;

  const reports = daysSnap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as { reports: ReportData[] }),
  }));

  return reports as GetReportData[];
}

export const getReportsByYear = unstable_cache(_getReportsByYear, [actionTag], {
  revalidate: false,
  tags: [actionTag],
});
