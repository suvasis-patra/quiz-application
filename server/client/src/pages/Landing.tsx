import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Community from "../components/community";
import FAQ from "../components/Faq";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Features />
      <Community />
      <FAQ />
      <Footer />
    </main>
  );
};

export default Landing;
