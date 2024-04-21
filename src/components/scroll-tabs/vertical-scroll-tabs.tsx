import { COLORS } from "@/enum/colors";
import { CustomTab } from "@/enum/defined-types";
import { renderSearchIcon } from "@/enum/icons";
import { Box, Tab, Tabs, Typography, tabsClasses } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

type VerticalScrollTabsProps = {
  tabs: CustomTab[];
  hasSearchTab?: boolean;
};

const VerticalScrollTabs = ({
  tabs,
  hasSearchTab = false,
}: VerticalScrollTabsProps) => {
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
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && <div>{children}</div>}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full md:grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1 w-full">
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="product-screen-tabs"
            sx={{
              [`& .${tabsClasses.scrollButtons}`]: {
                "&.Mui-disabled": { opacity: 0.2 },
                "&.Mui-selected": {
                  color: COLORS.primary.c900,
                  backgroundColor: COLORS.primary.c100,
                  borderRadius: "16px",
                },
              },
              width: "100%",
              "& .MuiTabs-flexContainer": {
                gap: "16px",
              },
              maxWidth: "none",
            }}
            TabIndicatorProps={{
              sx: {
                width: 0,
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
                    textTransform: "none",
                    "&.Mui-selected": {
                      color: COLORS.primary.c900,
                      backgroundColor: COLORS.primary.c100,
                      borderRadius: "16px",
                    },
                  }}
                  className="duration-500 text-[14px] font-semibold bg-grey-c10 rounded-2xl"
                />
              );
            })}
          </Tabs>
        </div>
        <div className="md:col-span-3">
          {tabs.map((item) => {
            return (
              <TabPanel key={item.value} value={value} index={item.value}>
                <div className="my-6 md:my-0">{item.content}</div>
              </TabPanel>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VerticalScrollTabs;
