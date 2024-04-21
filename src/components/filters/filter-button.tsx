import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type FilterButtonProps = {
  isOpen?: boolean;
  handleClickFilterButton?: () => void;
};

const FilterButton = ({
  isOpen,
  handleClickFilterButton,
}: FilterButtonProps) => {
  return (
    <ButtonPrimary
      className="w-fit !pr-16 !bg-blue-c900 !text-white hover:opacity-80"
      sizeClass="pl-4 py-2.5 sm:pl-6"
      onClick={handleClickFilterButton}
    >
      <svg className={`w-6 h-6`} viewBox="0 0 24 24" fill="none">
        <path
          d="M14.3201 19.07C14.3201 19.68 13.92 20.48 13.41 20.79L12.0001 21.7C10.6901 22.51 8.87006 21.6 8.87006 19.98V14.63C8.87006 13.92 8.47006 13.01 8.06006 12.51L4.22003 8.47C3.71003 7.96 3.31006 7.06001 3.31006 6.45001V4.13C3.31006 2.92 4.22008 2.01001 5.33008 2.01001H18.67C19.78 2.01001 20.6901 2.92 20.6901 4.03V6.25C20.6901 7.06 20.1801 8.07001 19.6801 8.57001"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.07 16.52C17.8373 16.52 19.27 15.0873 19.27 13.32C19.27 11.5527 17.8373 10.12 16.07 10.12C14.3027 10.12 12.87 11.5527 12.87 13.32C12.87 15.0873 14.3027 16.52 16.07 16.52Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.87 17.12L18.87 16.12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="block truncate ml-2.5">Lọc</span>
      <span className="absolute top-1/2 -translate-y-1/2 right-5">
        <ChevronDownIcon
          className={`w-5 h-5 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </span>
    </ButtonPrimary>
  );
};

export default FilterButton;
