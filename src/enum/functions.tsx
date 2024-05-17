import storage from "@/apis/storage";
import { OrderProduct, VariantItem } from "./defined-types";
import moment from "moment";

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

export function formatDate(timestamp: Date) {
  const date = moment(timestamp).format("DD-MM-YYYY HH:mm:ss");
  return date;
}

export function formatCommonTime(time: Date) {
  const date = new Date(time);
  // Lấy giờ và phút
  let hours = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");

  // Lấy ngày, tháng, và năm
  let day = date.getDate().toString().padStart(2, "0");
  let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
  let year = date.getFullYear();

  // Định dạng thành chuỗi
  return `${hours}:${minutes} ${day}-${month}-${year}`;
}

export function contentShippingAddress(data: any) {
  return (
    <div className="space-y-2">
      <div className="text-base font-bold">
        {data?.name} - {data?.phone}
      </div>
      <div className="text-sm">{formatShippingAddress(data)}</div>
    </div>
  );
}

export function calculateTotalPrice(items: OrderProduct[]) {
  return items.reduce((total: number, item) => {
    const price = parseInt(item.productUnitPrice) * item.productQuantity;
    return total + price;
  }, 0);
}
