module.exports = async (req, res) => {
  // Set CORS headers so BotGhost and external services can make requests freely
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ 
      found: false, 
      error: 'Missing required query parameter: username' 
    });
  }

  // Your new Google Apps Script Deployment URL
  const googleScriptUrl = `https://script.google.com/macros/s/AKfycbyGlMyPne_lLboKzRMYx0hUnxBkWy1PyzXk5uZ0D8Xx1hcksDeWaV48kF51NQpOxXRVyQ/exec?username=${encodeURIComponent(username)}`;

  try {
    // Fetch from Google Apps Script with automatic redirect following
    const response = await fetch(googleScriptUrl, { redirect: 'follow' });
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ 
      found: false, 
      error: 'Failed to communicate with Google Apps Script endpoint',
      details: error.message 
    });
  }
};
