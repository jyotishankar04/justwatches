"use client";
import AddreessList from "@/components/projectComp/main/AddreessList";
import {
  addAddress,
  createAOrder,
  getAddresses,
  getPincodeData,
} from "@/lib/queryUtils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IndianRupeeIcon } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Page = () => {
  const [selectedAddress, setSelectedAddress] = useState<{
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    landmark: string;
    contactNumber: string;
  } | null>(null);

  const queryClient = useQueryClient();
  const carts = queryClient.getQueryData(["cartItems"]);
  const router = useRouter();

  const { data: addresses, isLoading: isAddressLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
    enabled: !!carts,
  });
  const { mutate: createOrder, isLoading: isCreatingOrder } = useMutation({
    mutationFn: () => createAOrder(selectedAddress?.id as string),
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      toast.success(data.message);
      window.location.href = data.data.redirectUrl;

      // queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      // router.replace("/orders/" + data.data.id);
    },
  });

  if (!carts) {
    return (
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-2xl font-bold mt-4 text-red-700">
          Faild to Proceed
        </h1>
        <p>Please go to cart page and try again</p>
        <Link
          href="/cart"
          className="text-white hover:bg-heroOrange bg-black py-2 px-6"
        >
          Go to cart
        </Link>
      </div>
    );
  }
  return (
    <div className="grid w-full P-4 grid-cols-2">
      <div className="flex flex-col p-10 gap-4 items-center">
        {carts?.data?.cartItems.map((cart) => (
          <div
            key={cart.id}
            className="flex gap-4 w-full bg-base-100 p-3 rounded-lg"
          >
            <div className="w-20 overflow-hidden object-center flex justify-center items-center object-cover aspect-square">
              <Image
                className="w-full object-center object-contain"
                width={500}
                height={500}
                src={cart.product.images[0].url}
                alt=""
              />
            </div>
            <div>
              <h1>{cart.product.name}</h1>
              <p>Quantity: {cart.quantity}</p>
              <p>Price: {cart.product.price}</p>
              <Link
                href={`/products/${cart.product.id}`}
                className="text-white hover:bg-heroOrange bg-black py-1 px-4"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="flex p-4 flex-col gap-4">
          <h1 className="text-2xl font-bold">Order Summary</h1>
          <div className="flex justify-start gap-2 flex-col">
            {carts?.data?.cartItems.map((cart, index: number) => (
              <div
                key={cart.id}
                className={`grid grid-cols-4 p-2 gap-4 bg-base-100`}
              >
                <p className="text-lg ">
                  {cart.product.name.substring(0, 10)}...
                </p>
                <p>{cart.quantity}</p>
                <p className="flex gap-2 items-center">
                  <IndianRupeeIcon />
                  {cart.product.price}
                </p>
                <p className="flex gap-2 items-center">
                  <IndianRupeeIcon />
                  {cart.product.price * cart.quantity}
                </p>
              </div>
            ))}
          </div>
          <div className="flex justify-between bg-yellow-600 text-white py-2 px-10">
            <p className="text-lg font-bold">Total</p>
            <p className="flex gap-2 items-center">
              <IndianRupeeIcon />
              {carts?.data?.cartItems.reduce(
                (acc, cur) => acc + cur.product.price * cur.quantity,
                0
              )}
            </p>
          </div>
          <button
            onClick={() => {
              if (!selectedAddress) {
                toast.error("Please select an address");
                return;
              }
              createOrder();
            }}
            className="text-white text-center hover:bg-green-700 hover:text-white   bg-black py-2 px-6"
          >
            {isCreatingOrder ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
      <div>
        <div className="flex p-4 flex-col gap-4">
          <h1 className="text-2xl font-bold">Shipping Address</h1>
          <button
            onClick={() => {
              document.getElementById("addAddressModal").showModal();
            }}
            className="btn btn-primary hover:bg-heroOrange btn-sm my-0 bg-black"
          >
            Add a new address
          </button>
          <AddAddressModal />
        </div>
        <div className="flex flex-col gap-4 p-4 w-full bg-base-300">
          {isAddressLoading ? (
            <div>Loading...</div>
          ) : (
            <AddreessList
              selectAddress={(data) => {
                setSelectedAddress({
                  id: data.id,
                  name: data.name,
                  address: data.address,
                  city: data.city,
                  state: data.state,
                  zip: data.zip,
                  country: data.country,
                  landmark: data.landmark,
                  contactNumber: data.contactNumber,
                });
              }}
              addresses={addresses.data}
            />
          )}
        </div>
      </div>
      <div className="bg-base-300"></div>
    </div>
  );
};

const AddAddressModal = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: (data: {
      name: string;
      address: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
      landmark: string;
      contactNumber: string;
    }) => {
      return addAddress(data);
    },
    onSuccess: (data) => {
      if (!data.success) {
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      reset();
      document.getElementById("addAddressModal").close();
    },
  });
  const onSubmit = handleSubmit((data) => {
    if (!data) return;
    if (
      data.name.trim() === "" ||
      data.address.trim() === "" ||
      data.city.trim() === "" ||
      data.state.trim() === "" ||
      data.zipCode.trim() === "" ||
      data.country.trim() === "" ||
      data.contactNumber.trim() === ""
    )
      return;

    mutate({
      name: data.name,
      address: data.address,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      country: data.country,
      landmark: data.landmark,
      contactNumber: data.contactNumber,
    });
  });
  return (
    <dialog id="addAddressModal" className="modal">
      <div className="modal-box w-11/12 rounded-md max-w-5xl">
        <h3 className="font-bold text-lg">Add a new address</h3>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
        <form action="" onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Name</label>
            <input
              disabled={isUpdating}
              className="input input-bordered"
              placeholder="Jhon Doe"
              {...register("name")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Zip</label>
            <input
              required
              type="number"
              disabled={isUpdating}
              className="input input-bordered"
              placeholder="Zip"
              {...register("zipCode")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Address</label>
            <textarea
              required
              disabled={isUpdating}
              className="textarea min-h-24 max-h-24 input-bordered"
              placeholder="Address"
              {...register("address")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">City</label>
            <input
              disabled={isUpdating}
              required
              className="input input-bordered"
              placeholder="City"
              {...register("city")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">State</label>
            {/* <input
              required
              disabled={isUpdating}
              className="input input-bordered"
              placeholder="State"
              {...register("state")}
            /> */}
            <select
              required
              disabled={isUpdating}
              className="input input-bordered"
              {...register("state")}
            >
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>

              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Contact Number</label>
            <input
              required
              disabled={isUpdating}
              className="input input-bordered"
              placeholder="Contact Number"
              type="number"
              {...register("contactNumber")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Landmark (Optional)</label>
            <input
              disabled={isUpdating}
              className="input input-bordered"
              placeholder="Landmark"
              {...register("landmark")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Country</label>
            <input
              required
              disabled={isUpdating}
              className="input input-bordered"
              placeholder="Country"
              value={"India"}
              {...register("country")}
            />
          </div>
          <button
            disabled={isUpdating}
            type="submit"
            className="btn btn-primary col-span-2"
          >
            {isUpdating ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default Page;
