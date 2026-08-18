"use server";

import { REPORT_STAFF_ACTION_TAG } from "@/constants/action-tag";
import { updateTag } from "next/cache";
import { ReportFormData } from "../model/type";
import { getYearMonthDoc } from "@/lib/firebase-doc";

const actionTag = REPORT_STAFF_ACTION_TAG;

export async function createReport(data: ReportFormData) {
  const { year, month, day, time, timeMs, products } = data;

  const docRef = getYearMonthDoc(actionTag, year, month);
  const docRefByDay = docRef.collection("days").doc(day);

  const reportItem = {
    time,
    data: products,
    timeMs,
  };

  const snapshot = await docRefByDay.get();

  if (snapshot.exists) {
    const currentData = snapshot.data();

    const reports = Array.isArray(currentData?.reports)
      ? currentData.reports
      : [];

    await docRefByDay.update({
      reports: [...reports, reportItem],
    });
  } else {
    await docRefByDay.set({
      reports: [reportItem],
    });
  }

  updateTag(actionTag);

  return docRefByDay.id;
}
