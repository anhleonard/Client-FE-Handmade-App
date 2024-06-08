import React, { useContext, useEffect, useState } from "react";
import StoreFilterSection from "../filters/store-filter-section";
import ProductCard from "../products/product-card";
import { AlertStatus } from "@/enum/constants";
import Button from "@/libs/button";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { closeLoading, openLoading } from "@/redux/slices/loadingSlice";
import { AlertState, Product } from "@/enum/defined-types";
import { openAlert } from "@/redux/slices/alertSlice";
import { filterStoreProducts } from "@/apis/services/stores";
import { PRICE_RANGE } from "../filters/filter-data";
import { refetchComponent } from "@/redux/slices/refetchSlice";
import { CommonContext } from "@/app/page";
import { StoreContext } from "@/app/(stores)/store/[id]/page";

type Props = {
  handleRefetch: () => void;
};

const StoreItems = () => {
  const theme = useContext(StoreContext);

  const dispatch = useDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const store = useSelector((state: RootState) => state.store.store);
  const refetchQueries = useSelector((state: RootState) => state.refetch.time);

  const [isOnSale, setIsIsOnSale] = useState<boolean>(false);
  const [rangePrices, setRangePrices] = useState<number[]>(PRICE_RANGE);
  const [sortOrderStates, setSortOrderStates] = useState<string>("");
  const [isFilterPrice, setIsFilterPrice] = useState(false);
  const [limit, setLimit] = useState<number>(10);
  const [totalProducts, setTotalProducts] = useState<number>(0);

  const getFilterProducts = async (hasPrice: boolean) => {
    try {
      dispatch(openLoading());
      if (store) {
        const query = {
          discount: isOnSale ? 1 : 0,
          sort: sortOrderStates !== "" ? sortOrderStates : null,
          ...(hasPrice && {
            minPrice: rangePrices[0],
            maxPrice: rangePrices[1],
          }),
          ...(theme.searchText !== "" && {
            productName: theme.searchText,
          }),
          limit: limit,
        };

        const res = await filterStoreProducts(store.id, query);

        if (res) {
          setProducts(res?.data);
          setTotalProducts(res?.total);
        }
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
    getFilterProducts(isFilterPrice);
  }, [isOnSale, sortOrderStates, isFilterPrice, refetchQueries, limit]);

  const handleFilterPrice = (value: boolean) => {
    setIsFilterPrice(value);
  };

  const handleRefetch = () => {
    dispatch(refetchComponent());
  };

  return (
    <div className="nc-SectionGridFeatureItems relative">
      {/* FILTER */}
      <CommonContext.Provider
        value={{
          isFilterPrice: isFilterPrice,
          handleFilterPrice: handleFilterPrice,
          handleRefetch: handleRefetch,
        }}
      >
        <StoreFilterSection
          isOnSale={isOnSale}
          setIsIsOnSale={setIsIsOnSale}
          rangePrices={rangePrices}
          setRangePrices={setRangePrices}
          sortOrderStates={sortOrderStates}
          setSortOrderStates={setSortOrderStates}
          products={products}
          totalProducts={totalProducts}
        />
      </CommonContext.Provider>

      <div
        className={`grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`}
      >
        {products?.map((product, index) => (
          <ProductCard item={product} key={index} />
        ))}
      </div>
      <div className="flex mt-10 justify-center items-center">
        <Button
          onClick={() => {
            setLimit((pre) => pre + 10);
          }}
        >
          Xem thêm
        </Button>
      </div>
    </div>
  );
};

export default StoreItems;
