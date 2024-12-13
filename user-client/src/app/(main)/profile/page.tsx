"use client";

import { profile as initialProfile } from "@/lib/dummyDb";
import { editProfileApi, getUserApi } from "@/lib/queryUtils";

import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value,
    });
  };

  const { mutate, isLoading: isSaving } = useMutation({
    mutationFn: editProfileApi,
    onSuccess: () => {
      refetch();
      setIsEditOpen(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const { data: user, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getUserApi,
    retry: false,
    onSuccess: (data) => {
      setProfile(data.data);
      setEditedProfile(data.data);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to fetch user data");
    },
  });

  const handleSave = () => {
    if (!editedProfile) {
      toast.error("Profile cannot be empty");
      return;
    }

    mutate({
      name: editedProfile.name,
    });
  };
  if (!user) {
    return (
      <div className="text-black flex flex-col justify-start items-center bg-gray-200 w-full h-full">
        <h1 className="text-3xl text-gray-600 font-bold py-6 uppercase">
          Profile
        </h1>
      </div>
    );
  }

  return (
    <div className="text-black flex flex-col justify-start items-center bg-gray-200 w-full h-full">
      <h1 className="text-3xl text-gray-600 font-bold py-4 uppercase">
        Profile
      </h1>

      <div className="container m-auto">
        <div className="w-full h-full p-8 bg-gray-200">
          <div className="w-32 h-32 m-auto  border-2 flex justify-center items-center overflow-hidden rounded-md">
            <Image
              src={user?.data.image || ""}
              alt="profile"
              width={600}
              height={600}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="w-full flex justify-center mt-5 items-center gap-4">
            <button
              onClick={() => setIsEditOpen(!isEditOpen)}
              className="py-2 px-4 duration-300 border-2 text-sm border-black hover:bg-black hover:text-white uppercase transition-colors font-bold"
            >
              {isEditOpen ? "Cancel" : "Edit Profile"}
            </button>
            {isEditOpen &&
              (isSaving ? (
                <button className="py-2 px-4 duration-300 border-2 text-sm border-black hover:bg-black hover:text-white uppercase transition-colors font-bold">
                  Saving...
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="py-2 px-4 duration-300 border-2 text-sm border-black hover:bg-black hover:text-white uppercase transition-colors font-bold"
                >
                  Save
                </button>
              ))}
          </div>

          {!isEditOpen ? (
            <div className="w-8/12 m-auto  flex justify-center mt-5 items-start gap-4 flex-col">
              <ProfileInfoCard
                key="name"
                keyName="Name"
                value={user.data.name}
              />
              <ProfileInfoCard
                key="email"
                keyName="Email"
                value={user.data.email}
              />
            </div>
          ) : (
            <div className="w-8/12 bg-gray-200 m-auto flex justify-center mt-5 items-start gap-4 flex-col">
              <input
                type="text"
                name="name"
                value={editedProfile.name}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-full"
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={editedProfile.email}
                disabled
                onChange={handleInputChange}
                className="border p-2 disabled:opacity-50 rounded-md w-full"
                placeholder="Email"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileInfoCard: React.FC<{ keyName: string; value: string }> = ({
  keyName,
  value,
}) => {
  return (
    <div className="flex justify-between items-center w-full p-4 bg-white shadow-md rounded-md">
      <span className="text-gray-500 font-semibold">{keyName}:</span>
      <span className="text-gray-700">{value || "Not Available"}</span>
    </div>
  );
};

export default ProfilePage;
