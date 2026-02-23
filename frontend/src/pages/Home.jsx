import HeroSection from "../components/HeroSection";
import AboutSection from "../components/About";
import FindUs from "../components/FindUs";
import Testimonial from "../components/Testimonial";
import FeaturedProducts from "../components/FeaturedProducts";
import BrandScroller from "../components/BrandScroller";

import ContactSection from "../components/ContactSection";

const Main = () => {
  return (
    <div className="bg-zinc-950">
      <HeroSection />
      <BrandScroller />
      <FeaturedProducts />
      <AboutSection />
      <ContactSection />
      <div className="bg-zinc-950">
        <Testimonial/>
        <FindUs className="mx-6" />
      </div>
    </div>
  );
};

export default Main;
