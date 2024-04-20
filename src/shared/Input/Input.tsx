import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  sizeClass?: string;
  fontClass?: string;
  rounded?: string;
}

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      sizeClass = "h-11 px-4 py-3",
      fontClass = "text-base font-medium",
      rounded = "rounded-2xl",
      children,
      type = "text",
      ...args
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        className={`text-grey-c900 placeholder:text-grey-c200 transition duration-300 no-ring block w-full focus:border-primary-300 focus:border-3 focus:border-slate-900 bg-white disabled:bg-neutral-200 dark:disabled:bg-neutral-800 ${rounded} ${fontClass} ${sizeClass} ${className}`}
        {...args}
      />
    );
  }
);

export default Input;
