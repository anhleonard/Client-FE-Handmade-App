import { FilterTime } from "@/enum/defined-types";

export const DATA_categories = [
  {
    name: "New Arrivals",
  },
  {
    name: "Sale",
  },
  {
    name: "Backpacks",
  },
  {
    name: "Travel Bags",
  },
  {
    name: "Laptop Sleeves",
  },
  {
    name: "Organization",
  },
  {
    name: "Accessories",
  },
];

export const DATA_colors = [
  { name: "White" },
  { name: "Beige" },
  { name: "Blue" },
  { name: "Black" },
  { name: "Brown" },
  { name: "Green" },
  { name: "Navy" },
];

export const DATA_sizes = [
  { name: "XXS" },
  { name: "XS" },
  { name: "S" },
  { name: "M" },
  { name: "L" },
  { name: "XL" },
  { name: "2XL" },
];

// export const DATA_sortOrderRadios = [
//   { name: "Most Popular", id: "Most-Popular" },
//   { name: "Best Rating", id: "Best-Rating" },
//   { name: "Newest", id: "Newest" },
//   { name: "Price Low - Hight", id: "Price-low-hight" },
//   { name: "Price Hight - Low", id: "Price-hight-low" },
// ];

export const DATA_sortOrderRadios = [
  { name: "Phổ biến", id: "MOST_POPULAR" },
  { name: "Hàng mới", id: "NEWEST" },
  { name: "Đánh giá cao", id: "BEST_RATING" },
  { name: "Giá thấp đến cao", id: "PRICE_LOW_HIGH" },
  { name: "Giá cao đến thấp", id: "PRICE_HIGH_LOW" },
];

export const PRICE_RANGE = [5000, 10000000];

export const DATA_COMPLETED_TIME: FilterTime[] = [
  { name: "< 1 tuần", min: 0, max: 6, id: "LESS_1_WEEK" },
  { name: "1 tuần - 2 tuần", min: 7, max: 14, id: "FROM_1_TO_2_WEEKS" },
  { name: "2 tuần - 4 tuần", min: 14, max: 30, id: "FROM_2_TO_4_WEEKS" },
  { name: "1 tháng - 2 tháng", min: 30, max: 60, id: "FROM_1_TO_2_MONTHS" },
  { name: "> 2 tháng", min: 61, id: "MORE_2_MONTHS" },
];
