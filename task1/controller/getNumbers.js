const axios = require('axios');

const WINDOW_SIZE = 10;
const TIMEOUT_MS = 500;
let windowNumbers = [];
let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE5ODIyMDU2LCJpYXQiOjE3MTk4MjE3NTYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6Ijk1ZWY2NGZjLWY1OTctNDVmZC04Mzg2LTU1ZTc4MDQyOTZjNCIsInN1YiI6IkRhcnNoYW5zb25pODk1QGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiOTVlZjY0ZmMtZjU5Ny00NWZkLTgzODYtNTVlNzgwNDI5NmM0IiwiY2xpZW50U2VjcmV0IjoibGVHWXRQd2dQYVhzbW5WeSIsIm93bmVyTmFtZSI6IkRhcnNoYW4iLCJvd25lckVtYWlsIjoiRGFyc2hhbnNvbmk4OTVAZ21haWwuY29tIiwicm9sbE5vIjoiMTEyMTI1MzAifQ.9rYuwKzNSlCNfzFdWbUkycOcAsRV-KplQbp0ut4z5JE';

exports.getNumbers = async (req, res) => {
  const { numberid } = req.params;

  // Define valid qualifiers with their respective URLs and filters
  const validQualifiers = {
    'p': { url: 'http://20.244.56.144/test/primes', filter: isPrime },
    'f': { url: 'http://20.244.56.144/test/fibo', filter: isFibonacci },
    'e': { url: 'http://20.244.56.144/test/even', filter: isEven },
    'r': { url: 'http://20.244.56.144/test/rand', filter: () => true } // Random doesn't need a filter
  };

  // Check if numberid is a valid qualifier
  if (!validQualifiers[numberid]) {
    return res.status(400).json({ error: 'Invalid number ID' });
  }

  try {
    const { url, filter } = validQualifiers[numberid];
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}` // Include Bearer token in headers
      },
      timeout: TIMEOUT_MS
    });

    if (!response.data || !Array.isArray(response.data.numbers)) {
      throw new Error('Invalid response format from test server');
    }

    const numbers = response.data.numbers;

    // Filter unique numbers and maintain window size
    const uniqueNumbers = numbers.filter(num => !windowNumbers.includes(num) && filter(num));
    const newWindow = [...windowNumbers, ...uniqueNumbers].slice(-WINDOW_SIZE);

    const windowPrevState = [...windowNumbers];
    windowNumbers = newWindow;

    // Calculate average of current window numbers
    const average = calculateAverage(windowNumbers);

    // Prepare response according to the specified format
    const responseObject = {
      numbers: uniqueNumbers,
      windowPrevState,
      windowCurrState: windowNumbers,
      avg: average.toFixed(2) // Ensure average is formatted to two decimal places
    };

    return res.json(responseObject);
  } catch (error) {
    console.error('Error fetching numbers:', error.message);
    return res.status(500).json({ error: 'Error fetching numbers' });
  }
};

const calculateAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
};

const isPrime = (num) => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  let i = 5;
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
    i += 6;
  }
  return true;
};

const isFibonacci = (num) => {
  const perfectSquare1 = Math.sqrt(5 * num * num + 4);
  const perfectSquare2 = Math.sqrt(5 * num * num - 4);
  return perfectSquare1 % 1 === 0 || perfectSquare2 % 1 === 0;
};

const isEven = (num) => num % 2 === 0;
