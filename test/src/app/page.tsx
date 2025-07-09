import Hero from "../components/Hero";
import About from "../components/About";

export default function Home() {
  return (
    <div className="bg-background dark:bg-black min-h-screen w-full flex flex-col items-center justify-center px-0 sm:px-0">
      <Hero />
      <About />
      {/* Services, Gallery, Packages, Reviews, Booking, Newsletter, Contact, DownloadApp, FABs, etc. will be added here */}
    </div>
  );
}
