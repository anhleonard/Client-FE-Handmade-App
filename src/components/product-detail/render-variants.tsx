import { Variant } from "@/enum/defined-types";
import { formatVariant } from "@/enum/functions";
import React from "react";

type RenderVariantsProps = {
  label?: string;
  variants: Array<Variant>;
  selectedVariant: Variant;
  onChanged?: (item: Variant) => void;
};

const RenderVariants = ({
  label,
  variants,
  selectedVariant,
  onChanged,
}: RenderVariantsProps) => {
  if (!variants || !variants.length) {
    return null;
  }

  return (
    <div>
      <div className="text-sm mb-2 font-semibold text-grey-c900">{label} :</div>
      <div className="flex flex-row gap-2 items-center flex-wrap">
        {variants.map((variant, index) => (
          <div key={index}>
            {!(variant.inventoryNumber === 0) ? (
              <div
                key={index}
                onClick={() => {
                  if (onChanged) {
                    onChanged(variant);
                  }
                }}
                className={`max-w-[200px] rounded-full border-2 cursor-pointer text-sm font-medium px-4 py-2 ${
                  variant?.id === selectedVariant?.id
                    ? "border-primary-c600 dark:border-primary-500 text-primary-c900"
                    : "border-grey-c100 text-grey-c800"
                } `}
              >
                {formatVariant(variant?.variantItems)}
              </div>
            ) : (
              <button
                key={index}
                className="max-w-[200px] rounded-full border-2 border-transparent cursor-default text-sm font-medium px-4 py-2 disabled:bg-grey-c50 disabled:text-grey-c300"
                disabled
              >
                {formatVariant(variant?.variantItems)}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderVariants;
