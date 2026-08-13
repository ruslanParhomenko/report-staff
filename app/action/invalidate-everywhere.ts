"use server";

export async function invalidateEverywhere(tag: string) {
  const urls = ["https://report-staff.netlify.app/"];

  await Promise.all(
    urls.map((url) =>
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-revalidate-secret": process.env.REVALIDATE_SECRET!,
        },
        body: JSON.stringify({ tag }),
      }).catch(() => {}),
    ),
  );
}
