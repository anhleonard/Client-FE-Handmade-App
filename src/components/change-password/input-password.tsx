import MyTextField from "@/libs/text-field";
import React, { useState } from "react";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { COLORS } from "@/enum/colors";

type InputPasswordProps = {
  title?: string;
  placeholder?: string;
  isError?: boolean;
  isRequired?: boolean;
  helperText?: string | null;
  value?: string | number;
  onChange?: (value: string | number) => void;
};

const InputPassword = ({
  title,
  placeholder,
  isError,
  isRequired = true,
  helperText,
  onChange,
}: InputPasswordProps) => {
  const [type, setType] = useState<"number" | "password" | "text" | undefined>(
    "password"
  );

  return (
    <MyTextField
      className="!w-full"
      id={Math.random().toString()}
      title={title}
      isRequired={isRequired}
      placeholder={placeholder}
      isError={isError}
      helperText={helperText}
      type={type}
      onChange={(value) => {
        if (onChange) {
          onChange(value);
        }
      }}
      endIcon={
        type === "password" ? (
          <div onClick={() => setType("text")}>
            <VisibilityOffRoundedIcon
              sx={{ color: COLORS.grey.c900, fontSize: 18 }}
            />
          </div>
        ) : (
          <div onClick={() => setType("password")}>
            <VisibilityRoundedIcon
              sx={{ color: COLORS.grey.c900, fontSize: 18 }}
            />
          </div>
        )
      }
    />
  );
};

export default InputPassword;
