import axios from 'axios';

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
    const url = `https://${HOST}/stock/v3/get-historical-data?symbol=${symbol}&region=US`;
    const response = await axios.get(url, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': HOST,
      },
    });
    console.log("Fetching returns for:", symbol);
    console.log("Response data:", response.data);
    

    const prices = response.data?.prices?.filter((p: any) => p.close && p.date).sort((a: any, b: any) => b.date - a.date);
    if (!prices || prices.length === 0) return null;

    const returns: Record<string, number> = {};
    const currentClose = prices[0].close;

    for (const [label, targetUnix] of Object.entries(offsets)) {
      const past = prices.find((p: any) => p.date <= targetUnix);
      const pastClose = past?.close;

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
  console.log("API returned prices:", prices?.slice(0, 5));

};
