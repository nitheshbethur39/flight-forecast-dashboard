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

    const result = response.data?.body?.[0];
    if (!result) {
      console.error('Invalid data returned from API:', response.data);
      return null;
    }

    return { 
      price: result.regularMarketPrice ?? null,
      change: result.regularMarketChangePercent ?? null, 
    };
  } catch (error: any) {
    console.error('API call failed:', error?.response || error.message);
    return null;
  }
};
