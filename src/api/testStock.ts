import { getStockPrice } from './getStockPrice.ts';

const run = async () => {
  const result = await getStockPrice('UAL');
  console.log('UAL Price Data:', result);
};

run();
