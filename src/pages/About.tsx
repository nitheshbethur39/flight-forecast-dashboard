import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const contributors = [
  {
    name: "Krithi Sheregar",
    role: "Scrum Master",
    linkedin: "https://www.linkedin.com/in/krithi-sheregar-5545071b9/",
  },
  {
    name: "Bethlehem Seifu Belaineh",
    role: "Product Owner",
    linkedin: "https://linkedin.com/in/bbelaineh",
  },
  {
    name: "Abhishek Anish",
    role: "Developer",
    linkedin: "https://www.linkedin.com/in/abhishek-anish/",
  },
  {
    name: "Varun Vegi",
    role: "Developer",
    linkedin: "https://www.linkedin.com/in/varunvegi",
  },
  {
    name: "Varshith Kakollu",
    role: "Developer",
    linkedin: "https://www.linkedin.com/in/vkakollu9999/",
  },
  {
    name: "Sai Saketh Cholleti",
    role: "Developer",
    linkedin: "https://www.linkedin.com/in/cholleti-sai-saketh/",
  },
  {
    name: "Nithish Bilasunur Manjunatha Reddy",
    role: "Developer",
    linkedin: "https://www.linkedin.com/in/nithishbm/",
  },
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F3FDFE] py-16 px-6">
      <section className="container mx-auto max-w-5xl">
        {/* Back to Home */}
        <div className="mb-8">
          <a
            href="/"
            className="inline-flex items-center bg-white text-black-600 font-medium px-4 py-2 rounded-xl shadow-sm hover:bg-blue-50 transition"
          >
            ← Back to Home
          </a>
        </div>
        <h1 className="text-4xl font-bold text-center mb-12">About This Project</h1>

        {/* About Dashboard */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-12 text-center">
          <p className="text-gray-700 text-lg">
            The Airline Stock Prediction Dashboard forecasts stock prices of major U.S. airlines
            using machine learning models trained on financial, operational, and stock market data.
            It provides a smarter way to explore potential investment opportunities.
          </p>
        </div>

        {/* Contributors */}
        <h2 className="text-3xl font-semibold mb-8 text-center">Project Contributors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contributors.map((contributor, index) => (
            <div
              key={contributor.name}
              className={`bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition ${
                index === contributors.length - 1 ? "md:col-span-3 w-full md:w-1/2 mx-auto" : ""
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">{contributor.name}</h3>
              <p className="text-gray-600 mb-4">{contributor.role}</p>
              <Button asChild variant="link" className="text-blue-600 hover:text-blue-800">
                <a
                  href={contributor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <img src="/images/Linkedin.png" alt="LinkedIn" className="w-8 h-8" />
                </a>
              </Button>
            </div>
          ))}
        </div>

        {/* Faculty Advisor */}
        <h2 className="text-3xl font-semibold mb-8 text-center">Faculty Advisor</h2>
        <div className="bg-white p-6 rounded-2xl shadow-md mb-16 text-center">
          <h3 className="text-xl font-semibold mb-2">Dr. Isaac Gang</h3>
          <p className="text-gray-600">Professor, Department of Data Analytics Engineering, George Mason University</p>
          <Button asChild variant="link" className="text-blue-600 hover:text-blue-800 mt-2">
            <a
              href="https://www.linkedin.com/in/isaacgang/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 justify-center"
            >
              <img src="/images/Linkedin.png" alt="LinkedIn" className="w-8 h-8" />
            </a>
          </Button>
        </div>

        {/* Client Info */}
        <h2 className="text-3xl font-semibold mb-8 text-center">Client Information</h2>
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">Dr. Lance Sherry</h3>
          <p className="text-gray-600">Director</p>
          <p className="text-gray-600">Air Transportation Systems Research Group, GMU Center for Air Transportation Systems Research (CATSR)</p>
          <Button asChild variant="link" className="text-blue-600 hover:text-blue-800 mt-2">
            <a
              href="https://www.linkedin.com/in/lance-sherry-298aa8182/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 justify-center"
            >
              <img src="/images/Linkedin.png" alt="LinkedIn" className="w-8 h-8" />
            </a>
          </Button>
        </div>


      </section>
    </div>
    
  );
};

export default About;
