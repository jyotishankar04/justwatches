import { IProductDetailsCard } from "@/app/(main)/products/[product]/page"; //+
import { addToCart, getReviews, removeFromCart } from "@/lib/queryUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IndianRupee, Trash2 } from "lucide-react";
import RatingStar from "./RatingStar";
import { useParams } from "next/navigation";
import Image from "next/image";
import { timeAgo } from "@/app/utils/timeUtils";
import toast from "react-hot-toast";

export const ProductRightCard: React.FC<{
  product: IProductDetailsCard;
  cart: { cartItems: { data: { product: { id: string } }[] } } | undefined;
}> = ({ product, cart }) => {
  const cartItems = cart?.data.cartItems.map((item) => item.product.id) || [];
  const queryClint = useQueryClient();

  const { mutate: addToCartMutate, isLoading: addToCartLoading } = useMutation({
    mutationFn: (productId: string) => addToCart(productId),
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      queryClint.invalidateQueries(["product", { product: product.id }]);
      queryClint.invalidateQueries(["cartItems"]);
    },
  });
  const { mutate: removeFromCartMutate, isLoading: removeFromCartLoading } =
    useMutation({
      mutationFn: (productId: string) => removeFromCart(productId),
      onSuccess: (data) => {
        if (!data.success) {
          toast.error(data.message);
        }
        toast.success(data.message);

        queryClint.invalidateQueries(["product", { product: product.id }]);
        queryClint.invalidateQueries(["cartItems"]);
        queryClint.invalidateQueries(["product", product.id]);
      },
    });

  return (
    <div className="w-full flex justify-center items-center h-full">
      <div className="bg-gray-100 p-8 w-8/12">
        <div className="flex justify-end">
          {/* {product.isLiked ? (
            <Heart className="text-red-500" fill="red" />
          ) : (
            <Heart />
          )} */}
        </div>
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-4xl font-bold uppercase">
            {product?.Collection?.name}
          </h1>
          <h1 className="text-2xl font-bold opacity-65 uppercase">
            {product?.name}
          </h1>
          <h1 className="text-3xl flex gap-2 items-center font-bold uppercase">
            <IndianRupee />
            {product?.price}
          </h1>
          {cartItems.includes(product?.id) ? (
            <div className="grid grid-cols-2 gap-2">
              <button className="py-2 px-4 text-2xl z-30 border-2 border-green-600 text-green-600 uppercase">
                Already added
              </button>
              <button
                onClick={() => removeFromCartMutate(product?.id)}
                className="py-2 px-4 text-2xl z-30 border-2 border-red-600 text-red-600 uppercase hover:bg-red-600 flex justify-center items-center hover:text-white"
              >
                {removeFromCartLoading ? (
                  <span className="loading loading-spinner">Removing...</span>
                ) : (
                  <Trash2 />
                )}
              </button>
            </div>
          ) : (
            <>
              {product.Stocks.quantity > 0 ? (
                <button
                  onClick={() => addToCartMutate(product?.id)}
                  className="py-2 px-4 text-2xl z-30 border-2 w-full mt-5 duration-300 border-black hover:bg-black hover:text-white uppercase"
                >
                  {addToCartLoading ? (
                    <span className="loading loading-spinner">Adding...</span>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              ) : (
                <button className="py-2 px-4 text-2xl z-30 border-2 w-full mt-5 duration-300 border-red-500 text-red-500 uppercase">
                  Out of Stock
                </button>
              )}
            </>
          )}
        </div>
        <div>
          <RatingStar
            reviews={{
              rating: product?.Reviews.averageRating,
              count: product?._count.Reviews,
              reviews: product?.Reviews.reviews,
            }}
          />
        </div>
        <div className="flex justify-center">
          <a
            href={"#full-description"}
            className="lscroll-smooth mt-5 cursor-pointer border-2 px-10 py-2 hover:bg-black hover:text-white duration-300 border-black uppercase"
          >
            Full Description
          </a>
        </div>
        <div className="flex justify-center ">
          <button
            onClick={() =>
              document.getElementById("reviewShowModel").showModal()
            }
            className="lscroll-smooth mt-5 cursor-pointer border-2 px-10 py-2 hover:bg-black hover:text-white duration-300 border-black uppercase"
          >
            View Reviews
          </button>
          <ProductReviewModel />
        </div>
      </div>
    </div>
  );
};

const ProductReviewModel = () => {
  const params = useParams();
  const { data: reviews } = useQuery({
    queryKey: ["reviews", params.product], // Ensure this is an array
    queryFn: () => getReviews({ productId: params.product as string }), // Use params.product here directly
  });

  return (
    <dialog id="reviewShowModel" className="modal w-full">
      <div className="modal-box w-10/12  max-w-5xl">
        <div className="modal-header">
          <h2 className="text-xl font-bold">Reviews</h2>
        </div>
        <div className="modal-body w-full flex flex-col gap-4">
          {reviews?.data.reviews.map((review) => (
            <div
              key={review.id}
              className="p-2 rounded-md hover:bg-base-300 bg-base-200"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={review.user.image}
                  width={60}
                  height={60}
                  alt={review.user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-col gap-0">
                  <h3>{review.user.name}</h3>
                  <span className="text-gray-600 text-xs">
                    {timeAgo(review.createdAt)}
                  </span>
                </div>
              </div>
              <p className="text-md my-3 px-3">{review.content}</p>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ms-3 ${
                      i < review.rating ? "text-yellow-300" : "text-gray-300"
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
