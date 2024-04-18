import Image from "next/image";
import React from "react";

const EmptyItemsPost = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full rounded-xl bg-grey-c10 py-[80px]">
      <Image
        src={"/images/empty-items.svg"}
        alt="empty-items"
        width={180}
        height={180}
      />
      <div className="font-medium">Bạn chưa có sản phẩm yêu thích nào!</div>
    </div>
  );
};

export default EmptyItemsPost;
