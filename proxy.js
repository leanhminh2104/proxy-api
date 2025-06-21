export default async function handler(req, res) {
  const target = req.query.url;

  if (!target) {
    return res.status(400).json({ error: "Thiếu tham số ?url=" });
  }

  try {
    const fetchRes = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
                      "AppleWebKit/537.36 (KHTML, like Gecko) " +
                      "Chrome/137.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "vi,en-US;q=0.9,en;q=0.8",
        "Referer": "https://www.google.com/",
        "Origin": "https://www.google.com",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Sec-CH-UA": '"Google Chrome";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
        "Sec-CH-UA-Mobile": "?0",
        "Sec-CH-UA-Platform": '"Windows"',
        "Sec-CH-Prefers-Color-Scheme": "dark",
        "Upgrade-Insecure-Requests": "1"
      }
    });

    const contentType = fetchRes.headers.get("content-type") || "text/plain";
    const data = await fetchRes.text();

    res.setHeader("Content-Type", contentType);
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.status(fetchRes.status).send(data);
  } catch (e) {
    return res.status(502).json({ error: "Không thể truy cập URL gốc" });
  }
}
