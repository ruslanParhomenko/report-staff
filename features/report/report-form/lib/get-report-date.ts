export function getReportDate(date = new Date()): Date {
  const reportDate = new Date(date);

  if (reportDate.getHours() < 7) {
    reportDate.setDate(reportDate.getDate() - 1);
  }

  reportDate.setHours(0, 0, 0, 0);

  return reportDate;
}
