import { COLORS } from "@/enum/colors";
import { Checkbox } from "@mui/material";

type MySingleCheckBoxProps = {
  isChecked?: boolean;
  disabled?: boolean;
  size?: number;
  onChanged?: () => void;
  checkedColor?: string;
};

const MySingleCheckBox = ({
  isChecked = false,
  disabled = false,
  size = 24,
  onChanged,
  checkedColor,
}: MySingleCheckBoxProps) => {
  return (
    <Checkbox
      aria-label="select-item"
      checked={isChecked}
      onChange={() => {
        if (onChanged) {
          onChanged();
        }
      }}
      sx={{
        color: COLORS.grey.c700,
        "&.Mui-checked": {
          color: checkedColor ?? COLORS.success.c700,
        },
        "& .MuiSvgIcon-root": { fontSize: size },
      }}
      disabled={disabled}
      style={{ padding: 0 }}
    />
  );
};

export default MySingleCheckBox;
