"use client";
import { getFavouriteProducts } from "@/apis/services/products";
import storage from "@/apis/storage";
import NoOrderCard from "@/components/account-orders/no-order-card";
import ProductCard from "@/components/products/product-card";
import { AlertStatus } from "@/enum/constants";
import { AlertState, Product } from "@/enum/defined-types";
import Button from "@/libs/button";
import MySingleCheckBox from "@/libs/single-checkbox";
import { openAlert } from "@/redux/slices/alertSlice";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { RootState } from "@/redux/store";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AccountSavelists = () => {
  const dispatch = useDispatch();
  const localToken = storage.getLocalAccessToken();
  const [selected, setSelected] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [allItemIds, setAllItemIds] = useState<string[]>([]);
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);

  const handleChange = (event: any) => {
    const value = event.target.value;
    if (value === "all") {
      setSelected(selected.length === products?.length ? [] : allItemIds);
      return;
    }
    // added below code to update selected options
    const list = [...selected];
    const index = list.indexOf(value);
    index === -1 ? list.push(value) : list.splice(index, 1);
    setSelected(list);
  };

  const getAllFavouriteProducts = async () => {
    try {
      dispatch(openLoading());
      const res = await getFavouriteProducts(localToken);
      if (res) {
        const ids = res?.map((item: Product) => item.id.toString());
        let products: Product[] = [];
        for (let item of res) {
          const product: Product = item;
          product.isLiked = true;
          products.push(product);
        }
        setAllItemIds(ids);
        setProducts(products);
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
    getAllFavouriteProducts();
  }, [refetchQueries]);

  const handleRefetch = () => {
    dispatch(refetchComponent());
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <div className="text-lg font-bold text-grey-c900">
          Sản phẩm yêu thích
        </div>
        {/* <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <MySingleCheckBox
              value={"all"}
              isChecked={selected.length === products?.length}
              onChanged={(event) => {
                handleChange(event);
              }}
            />
            <div>Chọn tất cả</div>
          </div>
          <Button
            className="!text-sm !px-3 !gap-1"
            startIcon={<AddRoundedIcon sx={{ fontSize: 20 }} />}
          >
            Thêm vào giỏ hàng
          </Button>
        </div> */}
      </div>

      <div className="font-medium">Có tất cả {products?.length} sản phẩm</div>

      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 md:grid-cols-3">
        {products?.length
          ? products?.map((product, index) => (
              <ProductCard
                key={product.id}
                item={product}
                selectedItems={selected}
                handleChecked={handleChange}
                isLiked={product?.isLiked}
                localToken={localToken}
                handleRefetch={handleRefetch}
              />
            ))
          : null}
      </div>
      {!products?.length && (
        <NoOrderCard title="Bạn chưa có sản phẩm nào ở đây!" />
      )}
    </div>
  );
};

export default AccountSavelists;
