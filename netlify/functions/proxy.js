export async function handler(event) {
  const target = new URLSearchParams(event.queryStringParameters).get("url");

  if (!target) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "error", message: "Thiếu tham số ?url=" }),
    };
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
    const ip = event.headers["x-forwarded-for"] || "unknown";
    const message = await fetchRes.text();
    const now = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        status: "success",
        method: "GET",
        timestamp: now,
        ip,
        message: message.trim().length > 0 ? message : "THÔNG BÁO: gọi API thành công"
      })
    };
  } catch {
    return {
      statusCode: 502,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "error", message: "Không thể truy cập URL gốc" })
    };
  }
}
