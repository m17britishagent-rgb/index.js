export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ found: false, error: "Missing username query parameter" });
  }

  // Your Google Apps Script Web App URL
  const gasUrl = `https://script.google.com/macros/s/AKfycby2GiXor0Lxzb7Fj3CRHt5BPfBCY7mYoiHvyOskf0ec-u2e26VKSDagNaA_FNK3V98NpQ/exec?username=${encodeURIComponent(username)}`;

  try {
    // Node fetch automatically follows 302 redirects
    const response = await fetch(gasUrl);
    const data = await response.json();
    
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ found: false, error: err.message });
  }
}
