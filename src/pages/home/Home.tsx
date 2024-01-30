import Contact from "../../components/contact/Contact";
import Featured from "../../components/featured/Featured";
import Hero from "../../components/hero/Hero";

const Home = () => {
  return (
    <div className="w-full text-maroon">
      <Hero />
      <Featured />
      <Contact />
    </div>
  );
};

export default Home;
