import { FEATURES } from "../utils/constant";

const Features = () => {
  return (
    <section className="py-12 px-4 md:px-12 lg:px-20 bg-gradient-to-b from-white to-orange-50">
      <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
        Why Choose Quiz<span className="text-blue">Master</span>?
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((item) => (
          <article
            key={item.title}
            className="flex flex-col items-center justify-center text-center hover:shadow-dark border-2 border-black p-6 bg-blue text-white"
          >
            <span className="text-white mb-4 text-5xl">{item.icon}</span>
            <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
            <p className="text-black">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Features;
