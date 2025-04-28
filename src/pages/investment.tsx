import React from "react";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";

const InvestmentPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section with Background Image */}
      <div className="relative py-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/investment.jpg" // Save Image 5 with this path
            alt="Investment dashboard on laptop and mobile"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-800/70"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
            {/* Left Column - Text Content */}
            <div className="w-full lg:w-5/12 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Investment Return Simulator
              </h1>
              <p className="text-lg mb-6 text-gray-200">
                Project your returns from any quarter between <strong>2024 Q1</strong> to <strong>2025 Q4</strong> using our predictive models.
              </p>
              <Separator className="bg-white/20 mt-6 mb-6" />
            </div>

            {/* Right Column - Calculator Card */}
            <div className="w-full lg:w-7/12">
              <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-100">
                
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Investment Return Calculator
                </h2>
                <Separator className="mb-6" />
                <InvestmentCalculator />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Airline stock
            forecast dashboard
          </p>
          
        </div>
      </footer>
    </div>
  );
};

export default InvestmentPage;