
const axios = require('axios');
const WINDOW_SIZE = 10;
const TIMEOUT_MS = 500;
let window = [];

exports.getNumbers = async (req, res) => {

   console.log(req.params);
  const { numberid } = req.params;
  const validIds = ['p', 'f', 'e', 'r'];

  if (!validIds.includes(numberid)) {
    return res.status(400).json({ error: 'Invalid number ID' });
  }

  try {
    const sourceUrl = `http://test-server.com/numbers/${numberid}`;
    const response = await axios.get(sourceUrl, { timeout: TIMEOUT_MS });
    const numbers = response.data.numbers;

    // Filter unique numbers and maintain window size
    const uniqueNumbers = numbers.filter(num => !window.includes(num));
    const newWindow = [...window, ...uniqueNumbers].slice(-WINDOW_SIZE);

    const windowPrevState = [...window];
    window = newWindow;

    const average = window.reduce((sum, num) => sum + num, 0) / window.length;

    return res.json({
      numbers: uniqueNumbers,
      windowPrevState,
      windowCurrState: window,
      average
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching numbers' });
  }
};