"use client";
import SecondaryAuctionLayout from "@/components/auctions/secondary-auction-layout";
import { formatCurrency } from "@/enum/functions";
import FormatEndCurrencyIcon from "@/libs/format-end-currency-icon";
import MyPrimaryTextField from "@/libs/primary-text-field";
import MySelect from "@/libs/select";
import MyTextArea from "@/libs/text-area";
import MyTextField from "@/libs/text-field";
import React, { useState } from "react";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { COLORS } from "@/enum/colors";
import ListSellerPrice from "@/components/auctions/list-seller-price";
import Button from "@/libs/button";
import { Collapse } from "@mui/material";
import { UploadFile } from "antd";
import UploadImage from "@/libs/upload-image";

const CreateAuctionPage = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [amount, setAmount] = useState("");

  const [hiddenSelectHandmader, setHiddenSelectHandmader] = useState(true);

  return (
    <SecondaryAuctionLayout headerTitle="Tạo dự án">
      <div className="divide-y divide-grey-c100">
        <div className="flex flex-col gap-3 pb-8">
          <MyPrimaryTextField
            id={Math.random().toString()}
            title="Tên dự án"
            placeholder="Nhập tên dự án của bạn"
            isRequired
          />
          <div>
            <MyTextArea
              id={Math.random().toString()}
              title="Mô tả dự án"
              placeholder="Nhập mô tả cho yêu cầu của bạn"
              isRequired
            />
          </div>
          <MyPrimaryTextField
            id={Math.random().toString()}
            title="Số lượng yêu cầu"
            type="text"
            hasInputNumber
            placeholder="Nhập số lượng sản phẩm mà bạn cần"
            isRequired
          />

          <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium text-grey-c600 dark:text-white">
              Thêm hình ảnh mô tả
            </label>
            <UploadImage fileList={fileList} setFileList={setFileList} />
          </div>

          <MyTextField
            id={Math.random().toString()}
            type="text"
            title="Số tiền tối đa"
            placeholder="Nhập số tiền tối đa bạn có thể bỏ ra"
            isRequired
            hasInputNumber
            endIcon={
              <FormatEndCurrencyIcon
                value={parseInt(amount !== "" ? amount : "0")}
              />
            }
            // onChange={(value) => setAmount(value as string)}
          />
          <div className="grid grid-cols-2 gap-8">
            <MySelect
              id={Math.random().toString()}
              title="Dự kiến ngày đóng đấu giá"
              placeholder="-- Lựa chọn --"
              isRequired
              options={[]}
            />
            <MyPrimaryTextField
              id={Math.random().toString()}
              title="Số tiền phải đặt cọc"
              placeholder="Nhập tên dự án của bạn"
              defaultValue={formatCurrency(150000)}
              isRequired
              disabled
              helperText="Số tiền này được tính là 30% so với giá max"
            />
          </div>
          <div>
            <div className="grid grid-cols-3 gap-8">
              <MySelect
                id={Math.random().toString()}
                title="Tỉnh/ Thành phố"
                placeholder="-- Lựa chọn --"
                isRequired
                options={[]}
              />
              <MySelect
                id={Math.random().toString()}
                title="Quận/ Huyện"
                placeholder="-- Lựa chọn --"
                isRequired
                options={[]}
              />
              <MySelect
                id={Math.random().toString()}
                title="Phường/ Xã"
                placeholder="-- Lựa chọn --"
                isRequired
                options={[]}
              />
            </div>
          </div>
          <MyPrimaryTextField
            id={Math.random().toString()}
            title="Địa chỉ chi tiết"
            placeholder="Nhập địa chỉ chi tiết số nhà, ngõ, ..."
            isRequired
          />
        </div>

        {/* Lưu ý */}
        <div className="py-8 flex flex-row items-start gap-2">
          <ErrorOutlineRoundedIcon
            sx={{ fontSize: 22, color: COLORS.support.c500, marginTop: "4px" }}
          />
          <ul>
            <li>
              Nếu bạn lựa chọn một số handmader chúng tôi đề xuất trước, dự án
              của bạn sẽ được gửi tới handmader, nếu một trong các handmader bạn
              lựa chọn đồng ý làm thì dự án này sẽ được chuyển giao cho họ!
            </li>
            <li>
              Nếu không lựa chọn handmader theo đề xuất, dự án của bạn sẽ được
              gửi lên để đấu giá!
            </li>
          </ul>
        </div>

        {/* Danh sách sellers đã ra giá */}
        <Collapse in={!hiddenSelectHandmader} timeout={600}>
          <div className="py-8 flex flex-col gap-8">
            <div className="font-bold text-grey-c900">
              Danh sách ứng cử viên
            </div>
            <ListSellerPrice hasCheckBox />
            <ListSellerPrice hasCheckBox />
            <ListSellerPrice hasCheckBox />
          </div>
        </Collapse>

        {/* action buttons */}
        <div className="pt-8 grid md:grid-cols-2 gap-8">
          <Button
            color="black"
            onClick={() => setHiddenSelectHandmader(!hiddenSelectHandmader)}
          >
            {hiddenSelectHandmader
              ? "Mở tùy chọn handmader"
              : "Ẩn tùy chọn handmader"}
          </Button>
          <Button>Đặt dự án</Button>
        </div>
      </div>
    </SecondaryAuctionLayout>
  );
};

export default CreateAuctionPage;
