"use server";

import { dbAdmin } from "@/lib/firebase";
import { DataProducts } from "@/types/data-products";
import { unstable_cache } from "next/cache";

const TAG = "data-products";

const _getDataJson = async () => {
  const docRef = dbAdmin.collection(TAG).doc(TAG);
  const snap = await docRef.get();

  if (!snap.exists) return null;

  return snap.data() as DataProducts;
};

export const getDataProducts = unstable_cache(_getDataJson, [TAG], {
  revalidate: false,
  tags: [TAG],
});
