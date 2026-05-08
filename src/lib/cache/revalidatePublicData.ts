import { revalidateTag } from "next/cache";

export function revalidatePropertyData() {
  revalidateTag("properties");
  revalidateTag("featured-properties");
  revalidateTag("cities-for-section");
}

export function revalidateCityData() {
  revalidateTag("cities");
  revalidateTag("properties");
  revalidateTag("cities-for-section");
}
