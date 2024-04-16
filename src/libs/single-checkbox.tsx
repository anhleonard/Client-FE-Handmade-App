import { COLORS } from "@/enum/colors";

type MySingleCheckBoxProps = {
  isChecked?: boolean;
  disabled?: boolean;
  onChanged?: (event?: any) => void;
  checkedColor?: string;
  value?: any;
  width?: string;
  height?: string;
};

const MySingleCheckBox = ({
  isChecked = false,
  disabled = false,
  onChanged,
  checkedColor,
  value,
  width = "w-4.5",
  height = "h-4.5",
}: MySingleCheckBoxProps) => {
  return (
    <>
      <input
        type="checkbox"
        value={value}
        checked={isChecked}
        onChange={(event) => {
          if (onChanged) {
            onChanged(event);
          }
        }}
        className={`border-2 border-grey-c700 rounded-[4px] no-ring ${width} ${height} cursor-pointer disabled:cursor-default transition duration-100`}
        disabled={disabled}
        style={{ color: checkedColor ?? COLORS.success.c700 }}
      ></input>
    </>
  );
};

export default MySingleCheckBox;
