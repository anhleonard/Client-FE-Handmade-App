import React, { ReactNode } from "react";

type ChildHeadingProps = {
  title: string;
  support: ReactNode;
};

const ChildHeading = ({ title, support }: ChildHeadingProps) => {
  return (
    <div className="space-y-8">
      {/* HEADING */}
      <div className="max-w-screen-sm space-y-4">
        <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
          {title}
        </h2>
        {support}
      </div>

      <hr className="border-slate-200 dark:border-slate-700" />
    </div>
  );
};

export default ChildHeading;
