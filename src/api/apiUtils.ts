import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

/**
 * Maximum number of retry attempts for failed API requests
 */
const MAX_RETRIES = 3;

/**
 * Delay between retries in milliseconds (starts at 1s, then exponential backoff)
 */
const INITIAL_RETRY_DELAY = 1000;

/**
 * Error types that should trigger a retry
 */
const RETRIABLE_ERRORS = [
  'ECONNRESET',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ENOTFOUND',
  'ENETUNREACH',
  'EHOSTUNREACH',
];

/**
 * HTTP status codes that should trigger a retry
 */
const RETRIABLE_STATUS_CODES = [408, 429, 500, 502, 503, 504];

/**
 * Sleep/delay utility function
 * @param ms Milliseconds to delay
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Cache for API responses to avoid duplicate requests
 */
const apiCache = new Map<string, { data: any; timestamp: number }>();

/**
 * Cache expiration time (5 minutes)
 */
const CACHE_EXPIRATION = 5 * 60 * 1000;

/**
 * Enhanced fetch function with retries, caching, and error handling
 * 
 * @param url API endpoint URL
 * @param options Axios request config
 * @param cacheKey Optional custom cache key (defaults to URL)
 * @param retries Number of retries to attempt (defaults to MAX_RETRIES)
 * @param useCache Whether to use cache for this request (defaults to true)
 * @returns Promise with API response data
 */
export const fetchWithRetry = async <T>(
  url: string, 
  options: AxiosRequestConfig, 
  cacheKey: string = url,
  retries: number = MAX_RETRIES,
  useCache: boolean = true
): Promise<T> => {
  // Check cache first if enabled
  if (useCache) {
    const cached = apiCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_EXPIRATION) {
      console.log(`Using cached response for ${cacheKey}`);
      return cached.data as T;
    }
  }

  let lastError: Error | null = null;
  let attempt = 0;
  
  while (attempt <= retries) {
    try {
      if (attempt > 0) {
        // Exponential backoff delay for retries
        const delay = INITIAL_RETRY_DELAY * Math.pow(2, attempt - 1);
        console.log(`Retry attempt ${attempt}/${retries} for ${url} after ${delay}ms delay`);
        await sleep(delay);
      }
      
      const response = await axios.request<T>({
        url,
        ...options,
        // Add request timeout
        timeout: 10000, // 10 seconds
      });
      
      // Store in cache if successful and caching is enabled
      if (useCache) {
        apiCache.set(cacheKey, { 
          data: response.data, 
          timestamp: Date.now() 
        });
      }
      
      return response.data;
    } catch (error) {
      lastError = error as Error;
      const axiosError = error as AxiosError;
      
      // Only retry for specific error types and status codes
      const statusCode = axiosError.response?.status;
      const errorCode = axiosError.code;
      
      const shouldRetry = (
        RETRIABLE_STATUS_CODES.includes(statusCode as number) ||
        RETRIABLE_ERRORS.includes(errorCode as string) ||
        !axiosError.response // Network errors have no response
      );
      
      if (!shouldRetry || attempt >= retries) {
        break;
      }
      
      attempt++;
    }
  }
  
  // If we got here, all retries failed
  const errorMessage = lastError instanceof AxiosError 
    ? `${lastError.message} (Status: ${lastError.response?.status}, Data: ${JSON.stringify(lastError.response?.data)})`
    : lastError?.message || 'Unknown error';
    
  throw new Error(`Failed after ${attempt} attempts: ${errorMessage}`);
};

/**
 * Clear the API cache
 * @param cacheKey Optional specific cache key to clear (clears all if omitted)
 */
export const clearApiCache = (cacheKey?: string) => {
  if (cacheKey) {
    apiCache.delete(cacheKey);
  } else {
    apiCache.clear();
  }
};