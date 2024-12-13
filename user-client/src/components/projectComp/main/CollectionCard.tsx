import Link from "next/link";
import React from "react";
interface PropTypes {
  title: string;
  href: string;
  img: string;
  description: string;
}

const CollectionCard: React.FC<PropTypes> = ({ title, href }) => {
  return (
    <Link
      href={`/collections/${href}`}
      className={"w-full z-0 justify-center flex-row flex"}
    >
      <div className="w-full aspect-square group ring-2 ring-black bg-gray-300 hover:bg-gradient-to-br from-gray-300 to-black rounded-lg">
        <div className="w-full flex-col duration-200 gap-2 p-5 flex justify-center h-full items-center">
          <h1 className="group-hover:text-white text-3xl">{title}</h1>
          <div className="hidden group-hover:block duration-300  group-hover:text-white">
            <p>Click to View</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollectionCard;
