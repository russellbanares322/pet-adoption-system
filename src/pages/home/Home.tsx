import Contact from "../../components/contact/Contact";
import Featured from "../../components/featured/Featured";
import Footer from "../../components/footer/Footer";
import Hero from "../../components/hero/Hero";

const Home = () => {
  return (
    <div className="w-full text-maroon">
      <Hero />
      <Featured />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
