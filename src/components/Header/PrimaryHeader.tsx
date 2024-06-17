import MainTabsHeader from "./main-tabs-header";

export interface PrimaryHeaderProps {}

const PrimaryHeader = ({}: PrimaryHeaderProps) => {
  return (
    <div className="sticky top-0 w-full z-40">
      <MainTabsHeader />
    </div>
  );
};

export default PrimaryHeader;
