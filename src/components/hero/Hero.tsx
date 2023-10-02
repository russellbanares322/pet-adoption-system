import heroImg from "../../assets/pet-adoption.svg";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

//* Todos

//* Make this hero section responsive
//* Try to find new hero image banner with cat

const Hero = () => {
  return (
    <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 text-maroon">
      <div className=" pt-10 md:pt-32 w-auto md:w-96">
        <p className="text-4xl font-extrabold">
          You can't buy love but you can{" "}
          <span className="text-orange">adopt</span> it{" "}
          <span className="text-orange">.</span>
        </p>
        <p className="mt-2">
          When you adopt, you save loving animals by making them part of your
          family and open up shelter space for another animal who might
          desperately need it.
        </p>
        <button className="button-filled mt-5 flex items-center gap-2">
          Find a pet <HiOutlineArrowNarrowRight size={25} />
        </button>
      </div>
      <div className="pt-10 md:pt-16">
        <img className="object-cover" src={heroImg} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
