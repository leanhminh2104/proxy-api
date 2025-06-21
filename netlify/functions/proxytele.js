export async function handler(event, context) {
  let target = event.queryStringParameters?.url;

  if (!target) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Thiếu tham số ?url=" }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };
  }

  // Nếu target không phải URL encode, thì encode lại
  try {
    new URL(target); // kiểm tra có hợp lệ không
  } catch (e) {
    // Nếu sai format URL thì thử decode và encode lại
    target = encodeURI(target);
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

    return {
      statusCode: fetchRes.status,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store"
      },
      body: data
    };
  } catch (err) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: "Không thể truy cập URL gốc", chi_tiet: err.message }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };
  }
}
