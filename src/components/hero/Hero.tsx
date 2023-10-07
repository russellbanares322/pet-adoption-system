import heroImg from "../../assets/hero.svg";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="container grid grid-cols md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 text-maroon gap-10">
      <div className="pt-20 md:pt-32 max-w-[600px]">
        <p className="text-2xl md:text-5xl font-extrabold">
          You can't buy love but you can{" "}
          <span className="text-orange">adopt</span> it{" "}
          <span className="text-orange">.</span>
        </p>
        <p className="mt-2 text-sm md:text-lg">
          When you adopt, you save loving animals by making them part of your
          family and open up shelter space for another animal who might
          desperately need it.
        </p>
        <button
          onClick={() => navigate("/pets")}
          className="button-filled mt-5 flex items-center gap-2"
        >
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
