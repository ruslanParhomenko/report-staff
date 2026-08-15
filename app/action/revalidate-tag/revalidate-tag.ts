"use server";

import { updateTag } from "next/cache";

export const revalidateTagClient = async (tag: string) => {
  updateTag(tag);
};
