import { headerUrl } from "@/apis/services/authentication";
import { Review } from "@/enum/defined-types";
import { formatCommonTime } from "@/enum/functions";
import { Avatar, Rating } from "@mui/material";

type Props = {
  className?: string;
  review: Review;
};

const ReviewItem = ({ className = "", review }: Props) => {
  return (
    <div
      className={`nc-ReviewItem flex flex-col ${className}`}
      data-nc-id="ReviewItem"
    >
      <div className=" flex space-x-4 ">
        <div className="flex-1 flex justify-between items-center">
          <div className="flex flex-row items-center gap-3">
            <Avatar
              alt="user-image"
              src={`${headerUrl}/products/${review?.user?.avatar}`}
              sx={{ width: 44, height: 44 }}
            />
            <div>
              <span className="block font-semibold text-base text-grey-c900">
                {review?.user?.name}
              </span>
              <span className="block mt-0.5 text-grey-c600 dark:text-slate-400 text-xs">
                {review?.createdAt && formatCommonTime(review?.createdAt)}
              </span>
            </div>
          </div>
          <Rating value={review?.ratings} readOnly sx={{ fontSize: 24 }} />
        </div>
      </div>
      <div className="mt-4 prose prose-sm sm:prose dark:prose-invert sm:max-w-2xl">
        <p className="text-slate-600 dark:text-slate-300">{review?.comment}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
