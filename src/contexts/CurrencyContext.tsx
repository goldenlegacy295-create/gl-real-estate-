import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Currency = 'AED' | 'USD' | 'EUR' | 'GBP' | 'SAR' | 'QAR' | 'INR' | 'RUB' | 'CNY' | 'JPY' | 'CAD' | 'AUD' | 'SGD' | 'HKD' | 'CHF' | 'KWD' | 'OMR';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  rates: Record<string, number>;
  convertPrice: (aedAmount: number) => { amount: number; formatted: string };
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const CACHE_KEY = 'gl_exchange_rates';
const CURRENCY_KEY = 'gl_selected_currency';
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    return (localStorage.getItem(CURRENCY_KEY) as Currency) || 'AED';
  });
  const [rates, setRates] = useState<Record<string, number>>({ AED: 1 });
  const [isLoading, setIsLoading] = useState(true);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem(CURRENCY_KEY, c);
  };

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { timestamp, data } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_TTL) {
            setRates(data);
            setIsLoading(false);
            return;
          }
        }

        // Fetch live rates from a reliable free API (ExchangeRate-API)
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/AED');
        if (!response.ok) throw new Error('Failed to fetch rates');
        
        const data = await response.json();
        setRates(data.rates);
        
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: data.rates
        }));
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        // Fallback to static approximate rates if API fails
        setRates({
          AED: 1, USD: 0.27, EUR: 0.25, GBP: 0.21, SAR: 1.02, QAR: 0.99,
          INR: 22.5, RUB: 24.5, CNY: 1.95, JPY: 40.5, CAD: 0.37, AUD: 0.42,
          SGD: 0.37, HKD: 2.13, CHF: 0.24, KWD: 0.084, OMR: 0.105
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
  }, []);

  const convertPrice = useCallback((aedAmount: number) => {
    const rate = rates[currency] || 1;
    const amount = aedAmount * rate;
    
    // Format based on currency rules
    let formatted = new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    }).format(amount);
    
    return { amount, formatted };
  }, [currency, rates]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates, convertPrice, isLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
