import React, { ReactNode } from "react";

type DefaultLayoutProps = {
  children: ReactNode;
};

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="md:px-15 lg:px-30 px-8">
      <main className="mb-12 space-y-10 lg:space-y-14 mt-6">{children}</main>
    </div>
  );
};

export default DefaultLayout;
