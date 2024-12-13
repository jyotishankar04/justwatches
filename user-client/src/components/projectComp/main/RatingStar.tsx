"use client";
import { createReview } from "@/lib/queryUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
interface PropTypes {
  reviews: {
    rating: number;
    count: number;
    reviews: Array<{
      id: string;
      comment: string;
      rating: number;
      user: {
        name: string;
        email: string;
      };
    }>;
  };
}

const RatingStar: React.FC<PropTypes> = ({
  reviews: { rating, count, reviews },
}) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const params = useParams();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  const isYouHaveReview = reviews.some(
    (review) => review.user.email === user?.data.email
  );

  const { mutate: createReviewMutate, isLoading: isCreatingReview } =
    useMutation({
      mutationFn: (data: {
        productId: string;
        comment: string;
        rating: number;
      }) =>
        createReview({
          productId: data.productId,
          comment: data.comment,
          rating: data.rating,
        }),
      onSuccess: (data) => {
        if (!data.success) {
          toast.error(data.message);

          return;
        }
        toast.success("Review created successfully");
        const reviewModel = document.getElementById("reviewModel");
        if (reviewModel) {
          reviewModel.close();
        }
        queryClient.invalidateQueries(["product", { product: params.product }]);
        queryClient.invalidateQueries(["reviews", params.product]);
        reset();
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });

  const onReviewSubmit = handleSubmit((data) => {
    if (!data.review || !data.rating) {
      toast.error("Please fill all the fields");
    }
    createReviewMutate({
      productId: params.product as string,
      comment: data.review,
      rating: parseInt(data.rating),
    });
  });

  return (
    <div>
      <div className="flex items-center justify-between px-10 py-6 gap-6">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-8 h-8 ms-3 ${
                i < rating ? "text-yellow-300" : "text-gray-300"
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
        <p className="text-lg font-bold">
          {count <= 0 ? "No reviews" : `${count} reviews`}
        </p>
      </div>
      <div className="flex justify-center">
        <button
          className="btn bg-yellow-400  "
          onClick={() => {
            const reviewModel = document.getElementById("reviewModel");
            if (reviewModel) {
              reviewModel.showModal();
            }
          }}
        >
          Write a review
        </button>
        <dialog id="reviewModel" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => reset()}
              >
                ✕
              </button>{" "}
            </form>

            {!isYouHaveReview ? (
              <form onSubmit={onReviewSubmit}>
                <h3 className="font-bold text-lg">Write a review</h3>
                <div className="py-4">
                  <textarea
                    {...register("review")}
                    className="textarea textarea-bordered input-info max-h-52 min-h-52 w-full"
                    placeholder="Write your review here"
                  ></textarea>
                  <div>
                    <div className="rating my-3">
                      {[...Array(5)].map((_, i) => (
                        <input
                          key={i}
                          defaultChecked={i === 0 ? true : false}
                          type="radio"
                          name="rating-2"
                          defaultValue={i + 1}
                          onClick={() => {
                            setValue("rating", i + 1);
                          }}
                          className="mask mask-star-2 bg-orange-400"
                        />
                      ))}
                    </div>
                  </div>
                  <button
                    disabled={isCreatingReview}
                    className="btn bg-yellow-400 text-white w-full"
                  >
                    {isCreatingReview ? (
                      <div>
                        <span className="loading loading-spinner"></span>
                        Creating...
                      </div>
                    ) : (
                      "Submit Review"
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-gray-500 text-center">
                You have already submitted a review for this product.
                <br />
                <span className="text-black">
                  Thank you for your valuable feedback!
                </span>
              </div>
            )}
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default RatingStar;
