import { aboutUsData } from "./about-us-data";
import AboutUsDataDisplay from "./AboutUsDataDisplay";

const AboutUs = () => {
  return (
    <div className="py-24 w-full bg-whitesmoke min-h-screen h-full">
      <div className="container">
        <h1 className="font-bold text-3xl text-maroon">About Us</h1>
        <div className="mt-4">
          {aboutUsData.map((data, index) => (
            <AboutUsDataDisplay itemIndex={index} key={data.title} {...data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
