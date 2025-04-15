import axios from 'axios';

const API_KEY = '998b90d923mshe0d6057a55f2568p1082dcjsn9f86ffedc08b';
const BASE_URL = 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/';

export const getStockPrice = async (ticker: string) => {
  try {
    const response = await axios.get(`${BASE_URL}${ticker}`, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
      },
    });

    const data = response.data;
    return {
      price: data?.price?.regularMarketPrice,
      change: data?.price?.regularMarketChangePercent
    };
  } catch (err) {
    console.error('Error fetching stock price:', err);
    return null;
  }
};
