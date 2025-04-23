import axios from 'axios';

// ⏫ Function 1: Get current stock price
export const getStockPrice = async (symbol: string) => {
  const API_KEY = '998b90d923mshe0d6057a55f2568p1082dcjsn9f86ffedc08b';

  try {
    const response = await axios.get(
      `https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/${symbol}`,
      {
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
        },
      }
    );

    const result = response.data?.body?.[0];
    if (!result) {
      console.error('Invalid data returned from API:', response.data);
      return null;
    }

    return result;
  } catch (error: any) {
    console.error('API call failed:', error?.response || error.message);
    return null;
  }
};

// ⏫ Function 2: Get 1Y, 3Y, 5Y returns
export const getHistoricalReturns = async (symbol: string) => {
  const API_KEY = '998b90d923mshe0d6057a55f2568p1082dcjsn9f86ffedc08b';
  const HOST = 'yh-finance.p.rapidapi.com';

  const today = Math.floor(Date.now() / 1000);
  const offsets: Record<string, number> = {
    '1Y': today - 365 * 24 * 60 * 60,
    '3Y': today - 3 * 365 * 24 * 60 * 60,
    '5Y': today - 5 * 365 * 24 * 60 * 60,
  };

  try {
    const url = `https://yh-finance.p.rapidapi.com/stock/v3/get-historical-data?symbol=${symbol}&region=US`;
    const response = await axios.get(url, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': HOST,
      },
    });

    const prices = response.data?.prices;
    if (!Array.isArray(prices)) return null;

    const returns: Record<string, number> = {};
    const currentClose = prices.find((p: any) => p.close && p.date <= today)?.close;

    for (const [label, pastUnix] of Object.entries(offsets)) {
      const pastClose = prices.find((p: any) => p.close && p.date <= pastUnix)?.close;
      if (currentClose && pastClose) {
        const ret = ((currentClose - pastClose) / pastClose) * 100;
        returns[label] = parseFloat(ret.toFixed(2));
      } else {
        returns[label] = NaN;
      }
    }

    return returns;
  } catch (error: any) {
    console.error(`Failed to fetch historical data for ${symbol}`, error?.response || error.message);
    return null;
  }
};
