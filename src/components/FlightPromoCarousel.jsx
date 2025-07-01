import { Link } from "react-router-dom";

export default function FlightPromoCarousel({ promos, current, setCurrent }) {
  return (
    <section className="relative h-[28rem] overflow-hidden mx-6 my-8 rounded-xl shadow-xl">
      {promos.map((promo, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex items-center justify-between p-8 transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${promo.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-white max-w-xl">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
              {promo.destination}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{promo.title}</h2>
            <p className="text-xl mb-6">{promo.subtitle}</p>
            <Link to={promo.link}>
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105">
                Book Now - {promo.priceTag}
              </button>
            </Link>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {promos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === current ? "bg-white" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
