import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Link from "next/link";
import { CATS_DISCOVER } from "./data";
import { Avatar } from "@mui/material";
import { useRouter } from "next/navigation";

export interface CardCategory3Props {
  id?: number;
  className?: string;
  name?: string;
  desc?: string;
  color?: string;
  auctionImage?: string;
  collection?: boolean;
  close?: any;
}

const CardCategory3 = ({
  id,
  className = "",
  name = CATS_DISCOVER[2].name,
  desc = CATS_DISCOVER[2].desc,
  color = CATS_DISCOVER[2].color,
  auctionImage = "/images/default-auction.jpg",
  collection = false,
  close,
}: CardCategory3Props) => {
  const router = useRouter();
  return (
    <div className={`nc-CardCategory3 block ${className}`}>
      <div
        className={`relative w-full aspect-w-16 aspect-h-11 sm:aspect-h-9 h-0 rounded-2xl overflow-hidden group ${color}`}
      >
        <div>
          <div className="absolute inset-5 sm:inset-8">
            <Avatar
              src={`${auctionImage}`}
              alt="img"
              className="absolute bottom-0 right-0 h-30 w-30 drop-shadow-xl"
            />
          </div>
        </div>
        <span className="opacity-0 group-hover:opacity-40 absolute inset-0 bg-black/10 transition-opacity"></span>

        <div>
          <div className="absolute inset-5 sm:inset-8 flex flex-col">
            <div className="max-w-xs">
              <span className={`block mb-2 text-sm text-slate-700`}>
                {name}
              </span>
              {desc && (
                <h2
                  className={`text-xl max-w-[250px] text-slate-900 font-semibold`}
                  dangerouslySetInnerHTML={{ __html: desc }}
                ></h2>
              )}
            </div>
            <div className="mt-auto">
              <ButtonSecondary
                sizeClass="py-3 px-4 sm:py-3.5 sm:px-6"
                fontSize="text-sm font-medium"
                className="nc-shadow-lg"
                onClick={() => {
                  if (close) {
                    close();
                  }
                  router.push(
                    !collection ? `/detail-auction/${id}` : `/collection/${id}`
                  );
                }}
              >
                Xem chi tiết
              </ButtonSecondary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCategory3;
