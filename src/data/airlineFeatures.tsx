const airlineFeatures: Record<string, { title: string; desc: string }[]> = {
  ALGT: [
    { title: 'Operating Revenue', desc: 'Total income from the airline’s core business operations.' },
    { title: 'Cost per Available Seat Mile', desc: 'Measures cost efficiency by dividing operating costs by available seat miles.' },
    { title: 'Available Seat per Mile', desc: 'Represents seat supply across all miles flown.' },
  ],
  AAL: [
    { title: 'Available Seat Miles', desc: 'Total seat capacity offered multiplied by distance flown.' },
    { title: 'Number of Passengers', desc: 'Passenger count, indicating total travelers carried.' },
    { title: 'Operating Revenue', desc: 'Revenue generated from operations like ticket sales and services.' },
  ],
  UAL: [
    { title: 'Passengers', desc: 'Represents total number of enplaned passengers.' },
    { title: 'Distance', desc: 'Total miles traveled by flights, a demand indicator.' },
    { title: 'Available Seat Miles', desc: 'Measures total seat capacity multiplied by miles flown.' },
    { title: 'Seat Utilization', desc: 'Load factor showing efficiency of seating capacity usage.' },
    { title: 'Fuel Efficiency', desc: 'Amount of fuel consumed per available seat mile.' },
  ],
  ALK: [
    { title: 'Property and Baggage (PROP_BAG)', desc: 'Revenue earned from baggage services and charges.' },
    { title: 'Transport Expenses (TRANS_EXPENSES)', desc: 'Costs related to transportation services.' },
    { title: 'Passenger Services (PAX_SERVICE)', desc: 'Expenses incurred to serve passengers on board and at airports.' },
    { title: 'Income Before Tax (INCOME_PRE_TAX)', desc: 'Pre-tax earnings from operational and non-operational sources.' },
  ],
  DAL: [
    { title: 'Operating Revenue', desc: 'Revenue from Delta’s core operations like ticketing and cargo.' },
    { title: 'Long Term Debt', desc: 'Total liabilities with repayment due beyond one year.' },
    { title: 'Revenue per Passenger Mile', desc: 'Income generated for every mile flown by a paying passenger.' },
  ],
  JBLU: [
    { title: 'PRASM', desc: 'Passenger Revenue per Available Seat Mile – key revenue efficiency metric.' },
    { title: 'Admin Cost Ratio', desc: 'Administrative expenses expressed as a ratio to overall revenue.' },
    { title: 'Cost per Available Seat Mile', desc: 'Unit cost metric evaluating operating efficiency.' },
  ],
  LUV: [
    { title: 'PRASM', desc: 'Revenue per seat mile flown, specific to passenger sales.' },
    { title: 'Transport Expenses', desc: 'Operational expenditures for running flights and logistics.' },
    { title: 'Revenue from Enplaned Passenger', desc: 'Average revenue generated per boarded passenger.' },
  ],
  ULCC: [
    { title: 'Transport Expenses (TRANS_EXPENSES)', desc: 'Flight operation-related expenses, including fuel and maintenance.' },
    { title: 'Property and Baggage (PROP_BAG)', desc: 'Baggage-related fees and services income.' },
    { title: 'Income Before Tax (INCOME_PRE_TAX)', desc: 'Company’s profitability before income taxes are applied.' },
    { title: 'Passenger Services (PAX_SERVICE)', desc: 'In-flight and airport passenger-related services and associated costs.' },
  ],
};

export default airlineFeatures;
