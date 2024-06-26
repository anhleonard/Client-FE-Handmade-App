"use client";
import { getDefaultShipping } from "@/apis/services/users";
import storage from "@/apis/storage";
import AccountCard from "@/components/account/account_card";
import withAuth from "@/components/authentication/withAuth";
import { AlertStatus } from "@/enum/constants";
import { AlertState, Shipping } from "@/enum/defined-types";
import { contentShippingAddress, getCurrentUser } from "@/enum/functions";
import MyLabel from "@/libs/label";
import MyTextAction from "@/libs/text-action";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AccountPage = () => {
  const router = useRouter();
  const user = getCurrentUser();
  const dispatch = useDispatch();
  const [defaultShipping, setDefaultShipping] = useState<Shipping>();

  const getSingleDefaultShipping = async () => {
    try {
      dispatch(openLoading());
      const token = storage.getLocalAccessToken();
      const res = await getDefaultShipping(token);
      if (res) {
        setDefaultShipping(res);
      }
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: error?.response?.data?.message,
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    } finally {
      dispatch(closeLoading());
    }
  };

  useEffect(() => {
    getSingleDefaultShipping();
  }, []);

  const contentPerson = () => {
    return (
      <>
        <div className="text-grey-c900 font-medium space-y-2 w-full">
          <div>Tên: {user?.name}</div>
          <div>Số điện thoại: {user?.phoneNumber}</div>
          <div>Email: {user?.email}</div>
          <div className="flex flex-row items-center justify-between w-full">
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
        {!defaultShipping ? (
          <div className="text-grey-c900 font-medium flex flex-col justify-between gap-2 w-full">
            <div>Bạn không có thiết lập địa chỉ vận chuyển mặc định.</div>
            <div className="invisible">
              Bạn không có thiết lập địa chỉ vận chuyển mặc định.
            </div>
            <div className="invisible">
              Bạn không có thiết lập địa chỉ vận chuyển mặc định.
            </div>
            <div className="flex flex-row items-center justify-between w-full">
              <MyTextAction
                label="Thêm địa chỉ mới"
                onClick={() => router.push("/add-address")}
              />
              <MyTextAction
                label="Danh sách địa chỉ"
                color="text-blue-c900"
                onClick={() => router.push("/account-address")}
              />
            </div>
          </div>
        ) : (
          <div>{contentShippingAddress(defaultShipping)}</div>
        )}
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
      <div className="grid xl:grid-cols-2 gap-8 text-grey-c900">
        <AccountCard title="Thông tin cá nhân" content={contentPerson()} />
        <AccountCard title={titleAddress()} content={contentAddress()} />
      </div>
    </div>
  );
};

export default AccountPage;
