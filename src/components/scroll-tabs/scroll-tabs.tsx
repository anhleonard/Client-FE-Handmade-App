import { COLORS } from "@/enum/colors";
import { CustomTab } from "@/enum/defined-types";
import { renderSearchIcon } from "@/enum/icons";
import { Box, Tab, Tabs, tabsClasses } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

type ScrollTabsProps = {
  tabs: CustomTab[];
  hasSearchTab?: boolean;
};

const ScrollTabs = ({ tabs, hasSearchTab = false }: ScrollTabsProps) => {
  const router = useRouter();
  const [value, setValue] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && <div>{children}</div>}
      </div>
    );
  }

  const renderSearchForm = () => {
    return (
      <form
        className="flex-1 text-slate-900 dark:text-slate-100"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/search");
        }}
      >
        <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded-2xl py-3.5">
          {renderSearchIcon()}
          <input
            type="text"
            placeholder="Tìm kiếm mặt hàng của bạn"
            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-sm placeholder:text-grey-c300 py-0"
            autoFocus
          />
        </div>
      </form>
    );
  };

  return (
    <div className="w-full">
      <Box
        sx={{
          width: "100%",
        }}
      >
        <div
          className={
            hasSearchTab
              ? "flex flex-col md:grid md:grid-cols-5 gap-6 w-full"
              : "w-full"
          }
        >
          <Box
            sx={{
              width: "100%",
            }}
            className={hasSearchTab ? "md:col-span-3" : ""}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="product-screen-tabs"
              variant="scrollable"
              scrollButtons
              sx={{
                backgroundColor: COLORS.grey.c10,
                [`& .${tabsClasses.scrollButtons}`]: {
                  "&.Mui-disabled": { opacity: 0.2 },
                  "&.Mui-selected": {
                    color: COLORS.primary.c900,
                    backgroundColor: COLORS.primary.c100,
                    borderRadius: "16px",
                  },
                },
                width: "100%",
              }}
              TabIndicatorProps={{
                sx: {
                  backgroundColor: COLORS.primary.c900,
                  height: 0,
                },
              }}
            >
              {tabs.map((item) => {
                return (
                  <Tab
                    key={item.value}
                    label={item.label}
                    value={item.value}
                    sx={{
                      color: COLORS.grey.c900,
                      textTransform: "none",
                      width: "175px",
                      "&.Mui-selected": {
                        color: COLORS.primary.c900,
                        backgroundColor: COLORS.primary.c100,
                        borderRadius: "16px",
                      },
                    }}
                    className="duration-500 text-[14px] font-semibold"
                  />
                );
              })}
            </Tabs>
          </Box>
          {hasSearchTab && (
            <div className="md:col-span-2">{renderSearchForm()}</div>
          )}

          <hr className="border-grey-c50 dark:border-slate-700 block md:hidden" />
        </div>
        {tabs.map((item) => {
          return (
            <TabPanel key={item.value} value={value} index={item.value}>
              <div className="my-6">{item.content}</div>
            </TabPanel>
          );
        })}
      </Box>
    </div>
  );
};

export default ScrollTabs;
