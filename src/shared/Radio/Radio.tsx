import React, { FC } from "react";

export interface RadioProps {
  className?: string;
  name: string;
  id: string;
  onChange?: (value: string) => void;
  defaultChecked?: boolean;
  sizeClassName?: string;
  label?: string;
}

const Radio: FC<RadioProps> = ({
  className = "",
  name,
  id,
  onChange,
  label,
  sizeClassName = "w-5 h-5",
  defaultChecked,
}) => {
  return (
    <div className={`flex items-center text-sm sm:text-base ${className}`}>
      <input
        id={id}
        name={name}
        type="radio"
        className={`no-ring cursor-pointer transition duration-200 focus:ring-action-primary text-primary-c800 rounded-full border-slate-400 hover:border-slate-700 bg-transparent dark:border-slate-700 dark:hover:border-slate-500 dark:checked:bg-primary-c800 focus:ring-primary-c800 ${sizeClassName}`}
        onChange={(e) => onChange && onChange(e.target.value)}
        defaultChecked={defaultChecked}
        value={id}
      />
      {label && (
        <label
          htmlFor={id}
          className="pl-2.5 sm:pl-3 block text-slate-900 dark:text-slate-100 select-none cursor-pointer"
          dangerouslySetInnerHTML={{ __html: label }}
        ></label>
      )}
    </div>
  );
};

export default Radio;
