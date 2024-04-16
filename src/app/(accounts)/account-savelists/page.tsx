import ProductCard from "@/components/products/product-card";
import { PRODUCTS } from "@/data/data";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";

const AccountSavelists = () => {
  const renderSection1 = () => {
    return (
      <div className="space-y-4">
        <div className="text-lg font-bold text-grey-c900">
          Sản phẩm yêu thích
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 md:grid-cols-3 ">
          {PRODUCTS.filter((_, i) => i < 6).map((stay) => (
            <ProductCard key={stay.id} data={stay} />
          ))}
        </div>
        <div className="flex !mt-20 justify-center items-center">
          <ButtonSecondary loading>Show me more</ButtonSecondary>
        </div>
      </div>
    );
  };

  return renderSection1();
};

export default AccountSavelists;
