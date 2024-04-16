export enum ColorState {
  primary = "bg-primary-c800 text-white text-xs font-medium",
  error = "bg-support-c10 text-support-c500 text-xs font-medium",
  success = "bg-success-c50 text-success-c700 text-xs font-medium",
  warning = "bg-primary-c100 text-primary-c900 text-xs font-medium",
  progress = "bg-blue-c50 text-blue-c900 text-xs font-medium",
  delivery = "bg-purple-c10 text-purple-c900 text-xs font-medium",
}

export enum VoucherColorState {
  primary = "bg-primary-c800 text-white text-xs font-medium",
  error = "bg-support-c10 text-support-c500 text-xs font-medium border-2 border-support-c500",
  success = "bg-success-c50 text-success-c700 text-xs font-medium border-2 border-success-c700",
  warning = "bg-primary-c100 text-primary-c900 text-xs font-medium border-2 border-primary-c900",
  progress = "bg-blue-c50 text-blue-c900 text-xs font-medium border-2 border-blue-c900",
  delivery = "bg-purple-c10 text-purple-c900 text-xs font-medium border-2 border-purple-c900",
}

export const yesNoOptions = [
  { label: "Có", value: "YES", index: 0 },
  { label: "Không", value: "NO", index: 1 },
];

export const addressTypes = [
  {
    index: 0,
    label: "Nhà riêng",
    value: "HOME",
  },
  {
    index: 1,
    label: "Nơi làm việc",
    value: "WORKING_PLACE",
  },
];

export const genderTypes = [
  {
    index: 0,
    label: "Nam",
    value: "MALE",
  },
  {
    index: 1,
    label: "Nữ",
    value: "FEMALE",
  },
];
