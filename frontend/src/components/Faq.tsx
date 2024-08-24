import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FAQS } from "../utils/constant";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 px-4 md:px-12 lg:px-20 bg-white">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="max-w-2xl mx-auto space-y-4">
        {FAQS.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg shadow-sm bg-white"
          >
            <button
              className="w-full px-6 py-4 flex justify-between items-center text-left font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {activeIndex === index ? (
                <ChevronUp className="text-blue-500" />
              ) : (
                <ChevronDown className="text-blue-500" />
              )}
            </button>
            {activeIndex === index && (
              <div className="px-6 py-4 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
