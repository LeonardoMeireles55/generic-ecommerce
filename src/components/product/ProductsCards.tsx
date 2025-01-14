import useProductsCards from "@/hooks/useProductsCards";
import Link from "next/link";
import { ProgressSpinner } from "primereact/progressspinner";
import useLoading from "@/hooks/useLoading";
import { Product } from "../type/Product";
import { useContext } from "react";
import CartContext from "../context/CartContext";

type CategoryProps = {
  categoryProps: string | string[] | undefined;
};

const ProductsCards = ({ categoryProps }: CategoryProps): JSX.Element => {
  const { displayedProducts } = useProductsCards();

  const { addToCart } = useContext(CartContext);

  const { loading, handleImageLoad } = useLoading();

  const createProductTags = (product: Product) => {
    const { id, name, price, photoLink, offPrice, stars } = product;
    const discountedPrice = (price - (price * offPrice) / 100).toFixed(2);

    return (
      <div
        id="products-cards"
        key={id}
        className="relative flex flex-col items-center justify-center p-4 text-center md:p-6"
      >
        <Link href={"/product-description?id=" + product.id}>
          <div>
            {loading && (
              <ProgressSpinner
                style={{ width: "25px", height: "25px" }}
                strokeWidth="4"
                fill="transparent"
                animationDuration=".5s"
              />
            )}
            <img
              onLoad={handleImageLoad}
              src={photoLink}
              className={`object-cover md:w-96 md:h-96 rounded-md ${loading ? "hidden" : "block"}`}
              alt={name}
            />
          </div>
        </Link>
        <button
          onClick={() => {
            addToCart(product);
          }}
          className="absolute px-0 py-0 mb-2 text-black rounded-full bg-secondary bottom-1 right-1 md:right-4 md:bottom-3 md:px-1 md:py-1 hover:bg-quaternary"
        >
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 11.01V11M16 11.01V11M8 8V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609
               3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V8M8 8H6.84027C5.80009 8 4.93356 8.79732 4.84718
                9.83391L4.18051 17.8339C4.08334 18.9999 5.00352 20 6.1736 20H17.8264C18.9965 20 19.9167 18.9999 19.8195 17.8339L19.1528
                 9.83391C19.0664 8.79732 18.1999 8 17.1597 8H16M8 8H16"
              stroke="#000000"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="mt-2 font-bold">{name}</h1>
        <p className="text-xs text-gray-500 line-through">R${price}</p>
        <p className="text-md">R${discountedPrice}</p>
        <div className="flex items-center justify-center gap-1 mt-1">
          <div className="text-yellow-400 md:text-3xl">
            {Array(Math.min(5, Math.max(1, Math.floor(stars))))
              .fill("★")
              .join("")}
          </div>
          <span className="text-xs text-center"> ({Math.floor(stars)})</span>
        </div>
      </div>
    );
  };

  const renderProductsTag = () => {
    return (
      <div className="flex flex-col items-center justify-center mx-auto mt-8 mb-8 md:mt-16 md:w-5/6">
        <div
          id="products-list"
          className="grid items-center justify-center grid-cols-2 gap-3 sm:grid sm:grid-cols-2 sm:gap-16 lg:grid-cols-4"
        >
          {categoryProps != null
            ? displayedProducts
                .filter((product) => product.categoryEnums === categoryProps)
                .map((product: Product) => (
                  <div key={product.id}>{createProductTags(product)}</div>
                ))
            : displayedProducts.map((product: Product) => (
                <div key={product.id}>{createProductTags(product)}</div>
              ))}
        </div>
      </div>
    );
  };
  return renderProductsTag();
};
export default ProductsCards;
