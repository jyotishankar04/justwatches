"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const ImageViewer: React.FC<{
  images: {
    id: string;
    url: string;
  }[];
}> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        return prev === images.length - 1 ? 0 : prev + 1;
      });
    }, 4000);

    // Cleanup the interval on component unmount or when images change
    return () => clearInterval(interval);
  }, [images]);
  if (!images || images.length == 0)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h1 className="text-3xl font-bold">No images available</h1>
      </div>
    );

  return (
    <div className="w-full grid grid-cols-3 justify-around mt-8 items-center h-full">
      <div className="w-full  flex justify-center items-center ">
        <div className="flex flex-col gap-5">
          {images.map(
            (image, index) =>
              image &&
              image.url != "" && (
                <div
                  key={index}
                  className={`w-28 h-28 border-black border p-4 rounded-md cursor-pointer overflow-hidden flex justify-center items-center  ring-black ${
                    current == index ? "ring-2" : ""
                  }`}
                >
                  {image.url ? (
                    <Image
                      onClick={() => setCurrent(index)}
                      alt="image"
                      src={image.url}
                      className="w-full h-full object-contain object-center"
                      width={200}
                      height={200}
                    />
                  ) : (
                    <Image
                      onClick={() => setCurrent(index)}
                      alt="image"
                      src={
                        "https://res.cloudinary.com/djby1yfko/image/upload/v1725959846/icons8-no-image-50_qd9iep.png"
                      }
                      className="w-6/12 object-contain  opacity-50 object-center"
                      width={500}
                      height={500}
                    />
                  )}
                </div>
              )
          )}
        </div>
      </div>
      <div className="w-full h-[60vh] p-10 col-span-2">
        {images[current].url ? (
          <Image
            alt="image"
            src={images[current].url}
            className="w-full h-full object-contain object-center"
            width={500}
            height={500}
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-3xl font-bold">No images available</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageViewer;
