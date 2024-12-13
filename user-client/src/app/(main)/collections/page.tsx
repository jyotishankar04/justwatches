import CollectionPage from "@/components/projectComp/main/CollectionPage";

const page = async () => {
  return (
    <div className="w-full p-4">
      <h1 className="text-3xl font-bold uppercase pl-8">Collections</h1>
      <div className="mt-4 grid-cols-5 grid gap-4">
        <CollectionPage />
      </div>
    </div>
  );
};

export default page;
