import Logo from "@/shared/Logo/Logo";
import SocialsList1 from "@/shared/SocialsList1/SocialsList1";
import { CustomLink } from "@/data/types";
import React from "react";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Truy cập",
    menus: [
      { href: "/", label: "Trang chủ" },
      { href: "/search", label: "Tất cả sản phẩm" },
      { href: "/auctions", label: "Dự án handmade" },
      { href: "/account", label: "Thông tin người dùng" },
    ],
  },
  {
    id: "1",
    title: "Kết nối",
    menus: [
      { href: "/", label: "Hotline: 0394356433" },
      { href: "/", label: "Email: handmade-support@gmail.com" },
      { href: "/", label: "Address: Số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội" },
    ],
  },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="relative border-t border-neutral-200 dark:border-neutral-700 py-8 px-[250px]">
      <div className="grid grid-cols-3 gap-21">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <Logo />
            <div className="text-sm font-medium text-justify">
              Chúng tôi tự hào là thương hiệu đầu tiên ở Việt Nam trong lĩnh vực
              đồ thủ công. Handmade - nơi dừng chân của mọi khách hàng!
            </div>
          </div>
          <div className="col-span-2 flex items-center md:col-span-3">
            <SocialsList1 />
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
    </div>
  );
};

export default Footer;
