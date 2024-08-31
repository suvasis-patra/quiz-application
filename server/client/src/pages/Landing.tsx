import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import FAQ from "../components/Faq";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Features />
      <FAQ />
      <Footer />
    </main>
  );
};

export default Landing;
