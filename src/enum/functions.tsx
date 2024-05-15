import storage from "@/apis/storage";
import { VariantItem } from "./defined-types";

export function formatCurrency(price: number) {
  const formatter = new Intl.NumberFormat("vi", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "symbol",
  });

  const parts = formatter.formatToParts(price);

  let formattedPrice = "";
  parts.forEach((part) => {
    if (part.type !== "currency") {
      formattedPrice += part.value;
    }
  });

  return formattedPrice + "đ";
}

export function getCurrentUser() {
  const localUser = storage.getLocalUser();
  if (localUser) {
    try {
      const user = JSON.parse(localUser);
      return user;
    } catch (error) {
      console.error("Error parsing localUser JSON:", error);
      return null;
    }
  } else {
    console.error("localUser is empty or undefined");
    return null;
  }
}

export function formatShippingAddress(data: any) {
  if (data?.companyName)
    return `${data?.companyName}, ${data?.detailAddress}, ${data?.ward}, ${data?.district}, ${data?.province}, Việt Nam`;
  return `${data?.detailAddress}, ${data?.ward}, ${data?.district}, ${data?.province}, Việt Nam`;
}

export function formatVariant(data: Array<VariantItem>) {
  return data.map((item) => item.name).join(" - ");
}

export function formatPickedVariant(data: Array<VariantItem>) {
  return data.map((item) => item.name).join(", ");
}
