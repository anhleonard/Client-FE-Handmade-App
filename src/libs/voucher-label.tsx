import { VoucherColorState } from "@/enum/constants";
import { ReactNode } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface MyVoucherLabelProps {
  children?: ReactNode;
  width?: string;
  height?: string;
  bgColor?: string;
  px?: string;
  py?: string;
  type?: "primary" | "error" | "success" | "warning" | "progress" | "delivery";
  onClose?: () => void;
}

const MyVoucherLabel: React.FC<MyVoucherLabelProps> = ({
  children,
  width,
  height,
  bgColor,
  px,
  py,
  type,
  onClose,
}) => {
  const setColorByType = (type: string) => {
    switch (type) {
      case "primary":
        return VoucherColorState.primary;

      case "success":
        return VoucherColorState.success;

      case "error":
        return VoucherColorState.error;

      case "warning":
        return VoucherColorState.warning;

      case "progress":
        return VoucherColorState.progress;

      case "delivery":
        return VoucherColorState.delivery;
    }
  };

  return (
    <div
      className={`flex ${width ?? "w-fit "} ${height ?? "h-fit "} ${
        px ?? "px-3"
      } ${py ?? "py-1"} ${
        type ? setColorByType(type) : bgColor ? bgColor : "bg-primary-c800"
      } items-center justify-center rounded-full`}
    >
      <div className="flex items-center gap-2">
        <div>{children}</div>
        <button
          onClick={() => {
            if (onClose) onClose();
          }}
        >
          <CloseRoundedIcon
            sx={{ fontSize: 18 }}
            className="hover:cursor-pointer hover:scale-110 transition duration-200"
          />
        </button>
      </div>
    </div>
  );
};

export default MyVoucherLabel;
