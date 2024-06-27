"use client";

import DefaultLayout from "@/layout/default-layout";
import { Route } from "@/routers/types";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";
import { FC } from "react";
import AccountPage from "./account/page";
import SideBarAccount from "@/components/account/side-bar-account";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import AccountSavelists from "./account-savelists/page";
import { useRouter } from "next/navigation";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import AccountOrder from "./account-order/page";
import AccountAddressPage from "./account-address/page";
import AccountAuction from "./account-auction/page";
import ReorderRoundedIcon from "@mui/icons-material/ReorderRounded";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import storage from "@/apis/storage";
import withAuth from "@/components/authentication/withAuth";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const accountPages: {
  name: string;
  link: Route;
  component: ReactNode;
  icon: ReactNode;
}[] = [
  {
    name: "Thông tin cá nhân",
    link: "/account",
    component: <AccountPage />,
    icon: <PersonOutlineRoundedIcon sx={{ fontSize: 24 }} />,
  },
  {
    name: "Danh sách địa chỉ",
    link: "/account-address",
    component: <AccountAddressPage />,
    icon: <RoomOutlinedIcon sx={{ fontSize: 24 }} />,
  },
  {
    name: "Sản phẩm yêu thích",
    link: "/account-savelists",
    component: <AccountSavelists />,
    icon: <FavoriteBorderRoundedIcon sx={{ fontSize: 24 }} />,
  },
  {
    name: "Quản lý đơn hàng",
    link: "/account-order",
    component: <AccountOrder />,
    icon: <ReorderRoundedIcon sx={{ fontSize: 24 }} />,
  },
  {
    name: "Dự án handmade",
    link: "/account-auction",
    component: <AccountAuction />,
    icon: <AssignmentOutlinedIcon sx={{ fontSize: 24 }} />,
  },
  // {
  //   name: "Đổi trả hàng",
  //   link: "/account-billing",
  //   component: <AccountSavelists />,
  //   icon: <FavoriteBorderRoundedIcon sx={{ fontSize: 24 }} />,
  // },
];

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <DefaultLayout>
      <div className="space-y-10 lg:space-y-14">
        <main>
          {/* LOOP ITEMS */}
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/3 xl:w-1/4 flex flex-col gap-5">
              {accountPages.map((item, index) => {
                function setSelected(index: number, path: string) {
                  switch (index) {
                    case 0:
                      return (
                        path === "/account" ||
                        path === "/edit-account" ||
                        path === "/change-password"
                      );
                    case 1:
                      return (
                        path === "/account-address" || path === "/add-address"
                      );
                    case 2:
                      return path === "/account-savelists";
                    case 3:
                      return path === "/account-order";

                    case 4:
                      return path === "/account-auction";
                    case 5:
                      return path === "/account-billing";
                  }
                }

                return (
                  <SideBarAccount
                    key={index}
                    title={item.name}
                    icon={item.icon}
                    selected={setSelected(index, pathname)}
                    onClicked={() => {
                      if (item.link === "/account-auction") {
                        storage.updateAuctionTab("");
                      } else if (item.link === "/account-order") {
                        storage.updateOrderTab("");
                      }
                      router.push(item.link, { scroll: true });
                    }}
                  />
                );
              })}
            </div>
            <div className="flex-shrink-0 my-6 lg:mb-0 lg:mx-4 border-t lg:border-t-0"></div>
            <div className="lg:w-2/3 xl:w-3/4">{children}</div>
          </div>
        </main>
      </div>
    </DefaultLayout>
  );
};

export default withAuth(CommonLayout);
