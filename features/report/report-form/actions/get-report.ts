"use server";
import { REPORT_STAFF_ACTION_TAG } from "@/constants/action-tag";
import { getYearMonthDoc } from "@/lib/firebase-doc";
import { unstable_cache } from "next/cache";
import { GetReportData, ReportData } from "../model/type";
import { MONTHS } from "@/utils/get-month-days";

const actionTag = REPORT_STAFF_ACTION_TAG;

async function _getReportsByMonth(
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

export const getReportsByMonth = unstable_cache(
  _getReportsByMonth,
  [actionTag],
  {
    revalidate: false,
    tags: [actionTag],
  },
);

async function _getReportsByYear(
  year: string,
): Promise<GetReportData[] | null> {
  const yearDocRef = getYearMonthDoc(actionTag, year, "_").parent.parent;

  if (!yearDocRef) return null;

  const monthsSnap = await yearDocRef.collection("months").listDocuments();

  if (monthsSnap.length === 0) return null;

  const monthsData = await Promise.all(
    monthsSnap.map(async (monthDocRef) => {
      const daysSnap = await monthDocRef.collection("days").get();

      return {
        month: monthDocRef.id,
        days: daysSnap.docs.map(
          (doc) => doc.data() as { reports: ReportData[] },
        ),
      };
    }),
  );

  const reports: GetReportData[] = [];

  monthsData.forEach(({ month, days }) => {
    const monthReports = days.flatMap((day) => day.reports ?? []);

    if (monthReports.length === 0) return;

    reports.push({
      id: month,
      reports: monthReports,
    });
  });

  if (reports.length === 0) return null;

  return reports;
}

export const getReportsByYear = unstable_cache(_getReportsByYear, [actionTag], {
  revalidate: false,
  tags: [actionTag],
});
