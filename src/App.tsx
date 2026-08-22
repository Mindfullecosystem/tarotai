import Starfield from "./components/Starfield";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import CardOfDay from "./components/CardOfDay";
import Reading from "./components/Reading";
import FeaturedArcana from "./components/FeaturedArcana";
import Zodiac from "./components/Zodiac";
import Gallery from "./components/Gallery";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen bg-night-950 text-ivory">
      <Starfield />
      <div className="noise-overlay" aria-hidden="true" />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <CardOfDay />
        <Reading />
        <FeaturedArcana />
        <Zodiac />
        <Gallery />
        <Pricing />
        <Testimonials />
        <FAQ />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
