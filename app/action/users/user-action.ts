"use server";

import { unstable_cache } from "next/cache";
import { redis } from "@/lib/redis";
import { dbAdmin } from "@/lib/firebase";

type UserData = {
  id: string;
  mail: string;
  role: string;
};
const USERS_ACTION_TAG = "users";

// get

export const _getUsers = async () => {
  const cached = await redis.get(USERS_ACTION_TAG);
  if (cached) return cached as UserData[];
  const snapshot = await dbAdmin.collection(USERS_ACTION_TAG).get();
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  await redis.set(USERS_ACTION_TAG, users);
  return users as UserData[];
};

export const getUsers = unstable_cache(_getUsers, [USERS_ACTION_TAG], {
  revalidate: false,
  tags: [USERS_ACTION_TAG],
});

// export const getUsers = async () => {
//   "use cache";

//   cacheTag("users");

//   const snapshot = await dbAdmin.collection("users").get();
//   return snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   })) as UsersSchemaTypeData[];
// };
