import React from "react";
import { COLORS } from "@/enum/colors";
import { CustomTab } from "@/enum/defined-types";
import { Box, Tab, Tabs, tabsClasses } from "@mui/material";
import { useRouter } from "next/navigation";
import RenderSearchForm from "./render-search-form";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

type ScrollTabsProps = {
  tabs: CustomTab[];
  hasSearchTab?: boolean;
  value: number;
  handleChange: any;
};

const ScrollTabs = ({
  tabs,
  hasSearchTab = false,
  value = 1,
  handleChange,
}: ScrollTabsProps) => {
  const router = useRouter();

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
            <div className="md:col-span-2">
              <RenderSearchForm />
            </div>
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
