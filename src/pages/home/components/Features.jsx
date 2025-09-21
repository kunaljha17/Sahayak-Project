import React from "react";

const features = [
  { title: "Report Issues", desc: "Easily report municipal problems in your area." },
  { title: "Track Status", desc: "Follow up on your complaints in real-time." },
  { title: "Quick Response", desc: "Authorities respond faster with better tracking." },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-10">Features</h3>
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-blue-50 p-6 rounded shadow-md flex-1">
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
