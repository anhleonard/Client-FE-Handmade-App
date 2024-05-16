import { COLORS } from "@/enum/colors";
import { formatCurrency } from "@/enum/functions";
import MyLabel from "@/libs/label";
import MySingleCheckBox from "@/libs/single-checkbox";
import { Collapse, Divider, List, ListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import MyTextArea from "@/libs/text-area";
import { AlertState, OrderProduct, SellerPackage } from "@/enum/defined-types";
import TestBuyingItem from "./test-buying-item";
import storage from "@/apis/storage";
import { updatedOrderProduct } from "@/apis/services/order-products";
import { AlertStatus } from "@/enum/constants";
import { useDispatch } from "react-redux";
import { openAlert } from "@/redux/slices/alertSlice";

function calculateTotalPrice(
  selectedItems: string[],
  products: OrderProduct[]
) {
  let totalPrice = 0;

  products.forEach((product) => {
    if (selectedItems.includes(product.code)) {
      const unitPrice = parseInt(product.productUnitPrice);
      const quantity = product?.numberSelectedItem
        ? product?.numberSelectedItem
        : product.productQuantity;
      totalPrice += unitPrice * quantity;
    }
  });

  return totalPrice;
}

type Props = {
  sellerPackage: SellerPackage;
  handleRefetch: () => void;
};

const TestSellerItemsPackage = ({ sellerPackage, handleRefetch }: Props) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<string[]>(
    sellerPackage?.orderProducts
      .filter((item) => item.isSelected)
      .map((item) => item.code)
  );

  const allItemCodes = sellerPackage.orderProducts.map(
    (item: OrderProduct) => item.code
  );

  const handleChange = (event: any) => {
    const value = event.target.value;
    if (value === "all") {
      setSelected(
        selected.length === sellerPackage.orderProducts.length
          ? []
          : allItemCodes
      );
      return;
    }
    // added below code to update selected options
    const list = [...selected];
    const index = list.indexOf(value);
    index === -1 ? list.push(value) : list.splice(index, 1);
    setSelected(list);
  };

  useEffect(() => {
    handleChangeSelectedItems(selected);
  }, [selected]);

  const handleChangeSelectedItems = async (selected: string[]) => {
    try {
      const token = storage.getLocalAccessToken();

      const notSelectedItems = sellerPackage.orderProducts.filter(
        (item) => !selected.includes(item.code)
      );
      const selectedItems = sellerPackage.orderProducts.filter((item) =>
        selected.includes(item.code)
      );

      for (let item of selectedItems) {
        const variables = {
          isSelected: true,
        };
        await updatedOrderProduct(item?.id, variables, token);
      }

      for (let item of notSelectedItems) {
        const variables = {
          isSelected: false,
        };
        await updatedOrderProduct(item?.id, variables, token);
      }

      handleRefetch(); // refetch page cart
    } catch (error: any) {
      let alert: AlertState = {
        isOpen: true,
        title: "LỖI",
        message: error?.response?.data?.message,
        type: AlertStatus.ERROR,
      };
      dispatch(openAlert(alert));
    }
  };

  return (
    <div className="rounded-2xl border-[2px] border-grey-c50 overflow-hidden">
      <ListItem className="bg-white border-b-2 border-grey-c50" disablePadding>
        <div className="w-full flex flex-row justify-between py-6 px-4 hover:bg-transparent">
          <div className="flex flex-row items-center gap-2">
            <StorefrontOutlinedIcon
              sx={{ fontSize: 24, color: COLORS.grey.c900 }}
            />
            <div className="text-base font-bold text-grey-c900">
              {sellerPackage?.store?.name}
            </div>
            <MyLabel type="warning">
              {sellerPackage.orderProducts.length} sản phẩm
            </MyLabel>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <MySingleCheckBox
              value="all"
              isChecked={selected.length === sellerPackage.orderProducts.length}
              checkedColor={COLORS.primary.c900}
              onChanged={(event) => {
                handleChange(event);
              }}
            />
            <div className="text-sm text-grey-c900">Chọn tất cả</div>
          </div>
        </div>
      </ListItem>
      <Collapse in={true}>
        <List disablePadding className="flex flex-col">
          {/* các items có trong giỏ hàng của seller đó */}
          {sellerPackage?.orderProducts
            ?.sort((a, b) => a.id - b.id)
            .map((item: OrderProduct, index: number) => (
              <TestBuyingItem
                key={index}
                item={item}
                handleChecked={(event) => {
                  handleChange(event);
                }}
                selected={selected}
                handleRefetch={handleRefetch}
              />
            ))}

          {/* list applied voucher */}
          {/* <ListItem
            className="block w-full px-4 py-4 border-b-2 border-grey-c50 space-y-4"
            disablePadding
          >
            <div className="flex flex-row items-start gap-4 justify-between">
              <div className="font-bold">Shop khuyến mãi</div>
              <Button className="!px-5 !py-2 !bg-blue-c100 !text-blue-c900 !text-xs !font-bold">
                Xem ưu đãi
              </Button>
            </div>
            <div className="flex flex-row flex-wrap gap-6">
              <MyVoucherLabel type="warning">G-LAMQUEN -30K</MyVoucherLabel>
              <MyVoucherLabel type="warning">G-LAMQUEN -30K</MyVoucherLabel>
              <MyVoucherLabel type="warning">G-LAMQUEN -30K</MyVoucherLabel>
              <MyVoucherLabel type="warning">G-LAMQUEN -30K</MyVoucherLabel>
              <MyVoucherLabel type="warning">G-LAMQUEN -30K</MyVoucherLabel>
              <MyVoucherLabel type="warning">G-LAMQUEN -30K</MyVoucherLabel>
              <MyVoucherLabel type="warning">G-LAMQUEN -30K</MyVoucherLabel>
            </div>
          </ListItem> */}

          {/* payment */}
          <ListItem className="block w-full px-4 py-4" disablePadding>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="col-span-1">
                <MyTextArea
                  id={`${Math.random()}`}
                  placeholder="Ghi chú cho nhà bán"
                  className="h-full"
                />
              </div>
              <div className="col-span-1 bg-primary-c50 p-4 text-sm text-grey-c900 rounded-2xl space-y-4">
                <div className="flex flex-row justify-between items-center">
                  <div className="text-grey-c700 font-semibold">
                    Sản phẩm đã chọn mua tại shop
                  </div>
                  <div className="font-bold">{selected.length}</div>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div className="text-grey-c700 font-semibold">Tạm tính</div>
                  <div className="font-bold">
                    {formatCurrency(
                      calculateTotalPrice(
                        selected,
                        sellerPackage?.orderProducts
                      )
                    )}
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div className="text-grey-c700 font-semibold">
                    Tiền được giảm
                  </div>
                  <div className="font-bold">- {formatCurrency(0)}</div>
                </div>
                <Divider
                  sx={{
                    height: "2px",
                    backgroundImage: `repeating-linear-gradient(to right, ${COLORS.grey.c50}, ${COLORS.grey.c50} 6px, transparent 0px, transparent 8px)`,
                  }}
                  className="border-none"
                />
                <div className="flex flex-row justify-between items-center">
                  <div className="text-grey-c700 font-semibold">Thành tiền</div>
                  <div className="font-bold text-primary-c900">
                    {formatCurrency(
                      calculateTotalPrice(
                        selected,
                        sellerPackage?.orderProducts
                      ) -
                        0 >=
                        0
                        ? calculateTotalPrice(
                            selected,
                            sellerPackage?.orderProducts
                          ) - 0
                        : 0
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
};

export default TestSellerItemsPackage;
