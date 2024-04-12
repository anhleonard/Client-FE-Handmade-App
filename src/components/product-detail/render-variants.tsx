import { VariantType } from "@/enum/defined-types";
import Button from "@/libs/button";
import React, { useState } from "react";

type RenderVariantsProps = {
  label: string;
  variants: Array<VariantType>;
  onChanged?: (item: any) => void;
};

const RenderVariants = ({
  label,
  variants,
  onChanged,
}: RenderVariantsProps) => {
  const [variantActive, setVariantActive] = useState(0);
  if (!variants || !variants.length) {
    return null;
  }

  return (
    <div>
      <div className="text-sm mb-2 font-semibold text-grey-c900">{label} :</div>
      <div className="flex flex-row gap-2 items-center">
        {variants.map((variant, index) => (
          <>
            {!(variant.inStock === 0) ? (
              <div
                key={index}
                onClick={() => {
                  if (onChanged) {
                    onChanged({ label: label, variant: variants[index] });
                  }
                  setVariantActive(index);
                }}
                className={`max-w-[200px] rounded-full border-2 cursor-pointer text-sm font-medium px-4 py-2 ${
                  variantActive === index
                    ? "border-primary-c600 dark:border-primary-500 text-primary-c900"
                    : "border-grey-c100 text-grey-c800"
                } `}
              >
                {variant.name}
              </div>
            ) : (
              <button
                key={index}
                className="max-w-[200px] rounded-full border-2 border-transparent cursor-default text-sm font-medium px-4 py-2 disabled:bg-grey-c50 disabled:text-grey-c300"
                disabled
              >
                {variant.name}
              </button>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default RenderVariants;
