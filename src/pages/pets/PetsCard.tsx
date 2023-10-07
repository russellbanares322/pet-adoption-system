type PetsCardProps = {
  name: string;
  description: string;
  age: string;
  image: string;
};

const PetsCard = ({ name, description, age, image }: PetsCardProps) => {
  return (
    <div>
      <img className="rounded-md" src={image} />
    </div>
  );
};

export default PetsCard;
