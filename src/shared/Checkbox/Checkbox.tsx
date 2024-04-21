import React, { FC } from "react";

export interface CheckboxProps {
  label?: string;
  subLabel?: string;
  className?: string;
  sizeClassName?: string;
  labelClassName?: string;
  name: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = ({
  subLabel = "",
  label = "",
  name,
  className = "",
  sizeClassName = "w-5 h-5",
  labelClassName = "",
  defaultChecked,
  onChange,
}) => {
  return (
    <div className={`flex items-center text-sm sm:text-base ${className}`}>
      <input
        id={name}
        name={name}
        type="checkbox"
        className={`block no-ring focus:ring-action-primary transition duration-200 text-primary-c800 rounded border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-c800 focus:ring-primary-c800 ${sizeClassName}`}
        defaultChecked={defaultChecked}
        onChange={(e) => onChange && onChange(e.target.checked)}
      />
      {label && (
        <div className="pl-2.5 sm:pl-3.5 flex flex-col flex-1 justify-center select-none">
          <span
            className={`text-slate-900 dark:text-slate-100 ${labelClassName} ${
              !!subLabel ? "-mt-0.5" : ""
            }`}
          >
            {label}
          </span>
          {subLabel && (
            <p className="mt-0.5 text-slate-500 dark:text-slate-400 text-sm font-light">
              {subLabel}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkbox;
