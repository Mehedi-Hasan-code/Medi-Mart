import React from 'react'

const steps = [
  {
    title: "Order Online",
    icon: (
      <svg className="w-12 h-12 text-blue-600 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 10h18M5 14h14M7 18h10" /></svg>
    ),
    desc: "Browse medicines, upload your prescription, and place your order securely online.",
  },
  {
    title: "We Process",
    icon: (
      <svg className="w-12 h-12 text-green-600 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 1a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    desc: "Our pharmacists verify your order and prepare your medicines with care.",
  },
  {
    title: "Home Delivery",
    icon: (
      <svg className="w-12 h-12 text-pink-600 mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h6m-6 0V7a4 4 0 00-4-4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2v-5a2 2 0 00-2-2h-7z" /></svg>
    ),
    desc: "Our trusted riders deliver your medicines safely to your doorstep, fast and hassle-free.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-12 px-4 md:px-0">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">How It Works</h2>
        <p className="text-gray-600 mb-10">Ordering medicine from MediMart is simple, safe, and convenient.</p>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center bg-gray-50 rounded-xl shadow p-6 hover:shadow-md transition-shadow">
              {step.icon}
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks