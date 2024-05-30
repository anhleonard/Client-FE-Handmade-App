import { Order } from "@/enum/defined-types";
import React from "react";
import CreateReviewItem from "./create-review-item";

type Props = {
  order: Order;
};

const CreateReviewModal = ({ order }: Props) => {
  return (
    <div className="flex flex-col gap-4 divide-y-2 divide-grey-c50">
      {order?.orderProducts?.map((orderProduct, index) => {
        return (
          <CreateReviewItem
            index={index}
            key={orderProduct?.id}
            order={order}
            orderProduct={orderProduct}
          />
        );
      })}
    </div>
  );
};

export default CreateReviewModal;
