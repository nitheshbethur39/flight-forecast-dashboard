import React from "react";
import InvestmentCalculator from "@/components/InvestmentCalculator";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";

const InvestmentPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <Header />

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">
              📈 Investment Return Simulator
            </h2>
            <p className="text-lg text-gray-600 mt-3">
              Project your returns from any quarter between <strong>2024 Q1</strong> to <strong>2025 Q4</strong> using our predictive models.
            </p>
            <Separator className="mt-6 mx-auto w-24" />
          </div>

          <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
            <InvestmentCalculator />
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestmentPage;
