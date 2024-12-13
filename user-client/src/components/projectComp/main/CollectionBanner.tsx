interface PropTypes {
  title: string;
  image: string;
}

const CollectionBanner: React.FC<PropTypes> = ({ title, image }) => {
  return (
    <div
      className="hero "
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="hero-overlay bg-opacity-0"></div>
      <div className="hero-content h-96 text-neutral-content text-center">
        <div className="w-full grid grid-cols-4">
          <h1 className="text-6xl font-bold uppercase text-white">{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default CollectionBanner;
