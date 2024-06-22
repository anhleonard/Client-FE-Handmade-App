"use client";
import DefaultLayout from "@/layout/default-layout";
import { Avatar } from "@mui/material";
import Image from "next/image";
import React, { Context, createContext, useEffect, useState } from "react";
import Button from "@/libs/button";
import { AlertStatus } from "@/enum/constants";
import { useParams } from "next/navigation";
import ScrollTabs from "@/components/scroll-tabs/scroll-tabs";
import { AlertState, Store } from "@/enum/defined-types";
import { useDispatch, useSelector } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { changeFollower, singleStore } from "@/apis/services/stores";
import { openAlert } from "@/redux/slices/alertSlice";
import { addStore } from "@/redux/slices/storeSlice";
import storage from "@/apis/storage";
import StoreHomePage from "../../store-homepage/page";
import StoreItemsScreen from "../../store-items/page";
import StoreCollection from "../../store-collection/page";
import StoreHistory from "../../store-history/page";
import { ChangeFollowerValues } from "@/apis/types";
import { RootState } from "@/redux/store";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { headerUrl } from "@/apis/services/authentication";

interface StoreContextType {
  createdAt: Date;
  description: string;
  totalNumber: number;
  value: number;
  searchText: string;
  handleResetValue: (value: number, searchText: string) => void;
}

export const StoreContext: Context<StoreContextType> = createContext({
  createdAt: new Date(),
  description: "",
  totalNumber: 0,
  value: 0,
  searchText: "",
  handleResetValue: (value: number, searchText: string) => {},
});

const SingleStoreScreen = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [store, setStore] = useState<Store>();
  const storeId = parseInt(params?.id?.toString());
  const [searchText, setSearchText] = useState("");

  const tabId = storage.getStoreTab();
  const [value, setValue] = useState<number>(tabId ? +tabId : 1);
  const [followed, setFollowed] = useState<boolean>(false);

  const refetchQueries = useSelector((state: RootState) => state.refetch.time);

  const handleResetValue = (value: number, searchText: string) => {
    setValue(value);
    setSearchText(searchText);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    storage.updateStoreTab(newValue.toString());
    setValue(newValue);
  };

  const tabCollectId = storage.getCollectionTab();
  const [collectValue, setCollectValue] = useState<number>(
    tabCollectId ? +tabCollectId : 1
  );

  //change inside collect tab
  const handleChangeCollect = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    storage.updateCollectionTab(newValue.toString());
    setCollectValue(newValue);
  };

  //change from home page
  const changeCollectTab = async (tabId: number, collectTabId: number) => {
    setValue(tabId);
    setCollectValue(collectTabId);
  };

  const getSingleStore = async () => {
    try {
      dispatch(openLoading());
      const res: Store = await singleStore(storeId);
      if (res) {
        if (res?.followers?.length) {
          const userId = storage.getLocalUserId();
          const user = res?.followers?.some(
            (follower) => follower.id === +userId
          );
          if (user) {
            setFollowed(true);
          }
        } else setFollowed(false);
        setStore(res);
        dispatch(addStore({ store: res }));
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
    getSingleStore();
  }, [refetchQueries]);

  const storeSellerTabs = [
    {
      label: "Cửa hàng",
      value: 1,
      content: <StoreHomePage changeCollectTab={changeCollectTab} />,
    },
    {
      label: "Tất cả sản phẩm",
      value: 2,
      content: <StoreItemsScreen />,
    },
    {
      label: "Bộ sưu tập",
      value: 3,
      content: (
        <StoreCollection
          value={collectValue}
          handleChange={handleChangeCollect}
        />
      ),
    },
    {
      label: "Hồ sơ cửa hàng",
      value: 4,
      content: <StoreHistory />,
    },
  ];

  const handleRefetch = () => {
    dispatch(refetchComponent());
  };

  const handleChangeFollower = async () => {
    try {
      dispatch(openLoading());
      const variables: ChangeFollowerValues = {
        userId: +storage.getLocalUserId(),
        storeId: storeId,
      };
      const token = storage.getLocalAccessToken();
      const res = await changeFollower(variables, token);

      if (res) {
        handleRefetch();
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

  return (
    <DefaultLayout>
      {/* image header */}
      <div className="grid grid-cols-6 h-[200px] gap-8">
        <div className="relative col-span-2 rounded-2xl overflow-hidden h-full">
          {/* seller avatar */}
          <Image
            src={"/images/bg-store-no-overlay.svg"}
            alt="background-store-1"
            layout="fill"
            objectFit="cover"
          />

          {/* thông tin cơ bản */}
          <div className="inset-0 absolute rounded-2xl w-full h-full">
            <div
              style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              className="h-full text-white text-base flex flex-col gap-2 justify-center items-center p-4"
            >
              <Avatar
                sx={{ width: 64, height: 64 }}
                src={`${headerUrl}/products/${store?.avatar}`}
              />
              <div className="font-semibold text-center">{store?.name}</div>
              <div className="flex items-center gap-5 text-sm">
                <div>Người theo dõi: {store?.followers?.length}</div>
                <div>Điểm uy tín: {store?.score}</div>
              </div>
              {/* seller actions */}
              <div className="flex items-center gap-3">
                {!followed ? (
                  <Button
                    onClick={() => handleChangeFollower()}
                    className="!text-xs !px-3 !py-1.5"
                  >
                    Theo dõi
                  </Button>
                ) : null}
                {followed ? (
                  <Button
                    onClick={() => handleChangeFollower()}
                    className="!text-xs !px-3 !py-1.5"
                    color="success"
                  >
                    Đã theo dõi
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="relative col-span-4 rounded-2xl overflow-hidden h-full">
          <Image
            src={"/images/store-bg-long.svg"}
            alt="background-store-2"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      {store ? (
        <StoreContext.Provider
          value={{
            createdAt: store.createdAt,
            description: store.description,
            totalNumber: store.products.length,
            value: value,
            searchText: searchText,
            handleResetValue: handleResetValue,
          }}
        >
          <ScrollTabs
            tabs={storeSellerTabs}
            hasSearchTab
            value={value}
            handleChange={handleChange}
          />
        </StoreContext.Provider>
      ) : null}
    </DefaultLayout>
  );
};

export default SingleStoreScreen;
