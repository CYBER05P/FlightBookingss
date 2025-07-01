import SearchForm from "./SearchForm";

export default function HeroSection() {
  return (
    <section className="relative flex-1 flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-500 to-cyan-500 p-8 pt-16">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Your Journey Begins Here
        </h1>
        <p className="text-lg text-white mb-8 max-w-xl mx-auto">
          Discover amazing destinations and book your flights with FMS Airways. Seamless travel experiences await you.
        </p>
        <SearchForm />
      </div>
    </section>
  );
}