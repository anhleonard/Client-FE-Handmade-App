"use client";
import AccountCard from "@/components/account/account_card";
import MyLabel from "@/libs/label";
import MyTextAction from "@/libs/text-action";
import { useRouter } from "next/navigation";

const AccountPage = () => {
  const router = useRouter();

  const contentPerson = () => {
    return (
      <>
        <div className="text-grey-c900 font-medium space-y-2">
          <div>Tên: Anh Leonard</div>
          <div>Số điện thoại: 0394356433</div>
          <div>Email: anhleonard@gmail.com</div>
          <div className="flex flex-row items-center justify-between">
            <MyTextAction
              label="Chỉnh sửa"
              onClick={() => router.push("/edit-account")}
            />
            <MyTextAction
              label="Đổi mật khẩu"
              color="text-blue-c900"
              onClick={() => router.push("/change-password")}
            />
          </div>
        </div>
      </>
    );
  };

  const contentAddress = () => {
    return (
      <>
        <div className="text-grey-c900 font-medium flex flex-col justify-between gap-2">
          <div>Bạn không có thiết lập địa chỉ vận chuyển mặc định.</div>
          <div className="invisible">
            Bạn không có thiết lập địa chỉ vận chuyển mặc định.
          </div>
          <div className="invisible">
            Bạn không có thiết lập địa chỉ vận chuyển mặc định.
          </div>
          <div className="flex flex-row items-center justify-between">
            <MyTextAction label="Thêm địa chỉ mới" />
            <MyTextAction label="Danh sách địa chỉ" color="text-blue-c900" />
          </div>
        </div>
      </>
    );
  };

  const titleAddress = () => {
    return (
      <div className="flex flex-row gap-2 items-center">
        <div>Địa chỉ giao hàng</div>
        <MyLabel type="warning">Mặc định</MyLabel>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <div className="text-lg font-bold text-grey-c900">
        Thông tin tài khoản
      </div>
      <div className="grid md:grid-cols-2 gap-8 text-grey-c900">
        <AccountCard title="Thông tin cá nhân" content={contentPerson()} />
        <AccountCard title={titleAddress()} content={contentAddress()} />
      </div>
    </div>
  );
};

export default AccountPage;
