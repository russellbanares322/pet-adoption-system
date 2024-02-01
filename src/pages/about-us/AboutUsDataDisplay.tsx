type AboutUsDataDisplayProps = {
  description: string;
  itemIndex: number;
  image: string;
  title: string;
};

const AboutUsDataDisplay = ({
  description,
  itemIndex,
  image,
  title,
}: AboutUsDataDisplayProps) => {
  const wrapData = itemIndex % 2 !== 0;

  return (
    <div
      className={`flex-1 justify-center md:flex ${
        wrapData ? "flex-row-reverse" : "flex-row"
      } md:justify-start items-center gap-10 mb-3 relative`}
    >
      <div>
        <p className="text-xl font-semibold text-maroon mb-2">{title}</p>
        <p>{description}</p>
      </div>
      <img
        className={`h-52 max-w-7xl w-full object-cover rounded-lg border-b-8 border-b-orange ${
          wrapData ? "border-l-8 border-l-orange" : "border-r-orange border-r-8"
        }`}
        src={image}
        alt="about-us"
      />
      {title === "Our Story" && (
        <div className="absolute top-9 right-2 h-20 max-w-7xl w-96 bg-neutral-300 blur-md" />
      )}
    </div>
  );
};

export default AboutUsDataDisplay;
