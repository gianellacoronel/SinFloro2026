"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateWalletCookie(address: string | null) {
  const cookieStore = await cookies();

  if (address) {
    cookieStore.set("user_wallet_address", address, {
      path: "/",
      maxAge: 31536000, // 1 year
      sameSite: "strict",
    });
  } else {
    cookieStore.delete("user_wallet_address");
  }

  revalidatePath("/");
}
