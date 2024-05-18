import React, { ReactNode } from "react";

type ChildHeadingProps = {
  title?: string;
  support?: ReactNode;
};

const ChildHeading = ({ title, support }: ChildHeadingProps) => {
  return (
    <div className="space-y-8">
      {/* HEADING */}
      <div className="space-y-4">
        <h2 className="block text-xl sm:text-2xl lg:text-3xl font-semibold">
          {title}
        </h2>
        {support}
      </div>

      <hr className="border-slate-200 dark:border-slate-700" />
    </div>
  );
};

export default ChildHeading;
