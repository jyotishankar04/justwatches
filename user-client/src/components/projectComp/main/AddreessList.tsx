"use client";

import { deleteAddress, updateAddress } from "@/lib/queryUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface AddressListProps {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  name: string;
  landmark: string;
  contactNumber: string;
}

const AddreessList: React.FC<{
  addresses: AddressListProps[];
  selectAddress: (address: AddressListProps) => void;
}> = ({ addresses, selectAddress }) => {
  const [selectedAddress, setSelectedAddress] =
    React.useState<AddressListProps | null>(null);

  const handleClick = (address: AddressListProps) => {
    selectAddress(address);
    setSelectedAddress(address);
  };
  if (!addresses) return <div>No addresses</div>;
  return (
    <div className="w-full flex flex-col gap-4">
      {addresses?.map((address) => (
        <div
          key={address.id}
          className={`p-3 flex flex-row justify-between rounded-md hover:bg-base-300 cursor-pointer hover:ring-1 bg-base-200 ${
            address.id == selectedAddress?.id ? "ring-2 ring-black" : ""
          }`}
        >
          <p>
            {address.name}, {address.address}, {address.zip},
          </p>
          <div className="flex gap-2 items-center">
            <button
              onClick={() => handleClick(address)}
              className="btn btn-primary btn-sm"
            >
              Select
            </button>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button
              className="btn btn-sm"
              onClick={() =>
                document.getElementById("addressEditModel").showModal()
              }
            >
              Edit
            </button>
            <AddressEditModel address={address} />
          </div>
        </div>
      ))}
    </div>
  );
};

const AddressEditModel: React.FC<{ address: AddressListProps }> = ({
  address,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: address.name,
      address: address.address,
      city: address.city,
      state: address.state,
      zipCode: address.zip,
      country: address.country,
      landmark: address.landmark,
      contactNumber: address.contactNumber,
    },
  });

  const queryClient = useQueryClient();
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
      return updateAddress({
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
        landmark: data.landmark,
        contactNumber: data.contactNumber,
        addressId: address.id,
      });
    },
    onSuccess: (data) => {
      if (!data.success) {
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      setIsEditOpen(false);
      document.getElementById("addressEditModel").close();
    },
  });
  const onSubmit = handleSubmit((data) => {
    if (!data) {
      return;
    }
    if (
      !data.name.trim() ||
      !data.address.trim() ||
      !data.city.trim() ||
      !data.state.trim() ||
      !data.zipCode.trim() ||
      !data.country.trim() ||
      !data.landmark.trim() ||
      !data.contactNumber.trim()
    ) {
      return;
    }

    mutate(data);
  });

  return (
    <dialog id="addressEditModel" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <div className="modal-header flex justify-between items-center mr-10">
          <h3 className="font-bold text-lg">Edit Address</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditOpen(!isEditOpen)}
              className={`btn btn-primary py-1 ${isEditOpen && "hidden"}`}
            >
              Edit
            </button>
            <div
              onClick={() =>
                document.getElementById("deleteModelDialog").showModal()
              }
              className={`btn btn-error py-1 text-white ${
                isEditOpen && "hidden"
              }`}
            >
              <DeletePopUp address={address} />
              Delete
            </div>
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Name</label>
            <input
              disabled={!isEditOpen}
              className="input input-bordered"
              defaultValue={address.name}
              placeholder="Jhon Doe"
              {...register("name")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Address</label>
            <textarea
              disabled={!isEditOpen}
              defaultValue={address.address}
              className="textarea min-h-24 max-h-24 input-bordered"
              placeholder="Address"
              {...register("address")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">City</label>
            <input
              disabled={!isEditOpen}
              className="input input-bordered"
              defaultValue={address.city}
              placeholder="City"
              {...register("city")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">State</label>
            <input
              disabled={!isEditOpen}
              className="input input-bordered"
              defaultValue={address.state}
              placeholder="State"
              {...register("state")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Zip</label>
            <input
              disabled={!isEditOpen}
              className="input input-bordered"
              defaultValue={address.zip}
              placeholder="Zip"
              {...register("zipCode")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Contact Number</label>
            <input
              disabled={!isEditOpen}
              className="input input-bordered"
              placeholder="Contact Number"
              type="number"
              defaultValue={address.contactNumber}
              {...register("contactNumber")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Landmark (Optional)</label>
            <input
              disabled={!isEditOpen}
              className="input input-bordered"
              defaultValue={address.landmark}
              placeholder="Landmark"
              {...register("landmark")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold">Country</label>
            <input
              disabled={!isEditOpen}
              className="input input-bordered"
              defaultValue={address.country}
              placeholder="Country"
              {...register("country")}
            />
          </div>
          <button
            disabled={!isEditOpen}
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

const DeletePopUp: React.FC<{ address: AddressListProps }> = ({ address }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading: isDeleting } = useMutation({
    mutationFn: () => deleteAddress(address.id),
    onSuccess: (data) => {
      if (!data.success) {
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      document.getElementById("deleteModelDialog").close();
    },
  });
  return (
    <dialog id="deleteModelDialog" className="modal">
      <div className="modal-box text-black">
        <h3 className="font-bold text-lg">Delete Address</h3>
        <p className="py-4 font-normal">
          Are you sure you want to delete{" "}
          <span className="font-bold">
            {address.name + " " + address.address} {address.zip}
          </span>
        </p>
        <div className=" w-full grid grid-cols-2 gap-5">
          <form method="dialog" className="w-full ">
            <button
              onClick={() =>
                document.getElementById("deleteModelDialog").close()
              }
              disabled={isDeleting}
              className="btn btn-primary w-full"
            >
              Cancel
            </button>
          </form>

          <button
            disabled={isDeleting}
            onClick={() => mutate()}
            className="btn btn-error text-white"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AddreessList;
