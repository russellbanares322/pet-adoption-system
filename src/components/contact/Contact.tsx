import contactImg from "../../assets/contact.svg";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <div className="my-10 py-2">
      <div className="container">
        <p className="section-title">Get in touch</p>
        <div className="my-12 md:my-24 grid grid-cols md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 text-maroon gap-14 md:gap-24">
          <img className="order-2 md:order-1" src={contactImg} alt="contact" />
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
