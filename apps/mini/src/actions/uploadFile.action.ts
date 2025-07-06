"use server";

import type { Id } from "@mint-up/convex/_generated/dataModel";
import { api } from "@mint-up/convex/_generated/api";
import { fetchMutation } from "@mint-up/convex/nextjs";

export async function uploadFile(file: File) {
  console.log("uploadFile", file);
  const uploadUrl = await fetchMutation(api.storage.generateUploadUrl);
  const res = await fetch(uploadUrl, {
    method: "POST",
    headers: { "Content-Type": file.type },
    body: file,
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const response = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const storageId = response.storageId as Id<"_storage">;

  return { storageId, uploadUrl };
}
