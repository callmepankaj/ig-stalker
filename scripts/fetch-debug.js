async function test() {
  const userId = '173560420'; // Cristiano's PK
  const url = `https://www.instagram.com/api/v1/users/${userId}/info/`;
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'X-IG-App-ID': '936619743392459',
    'X-ASBD-ID': '129477',
    'X-IG-WWW-Claim': '0',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': `https://www.instagram.com/`,
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
  };

  try {
    console.log('Fetching user info for PK:', userId);
    const res = await fetch(url, { headers });
    console.log('Status:', res.status);
    const data = await res.json();
    const fs = require('fs');
    fs.writeFileSync('scripts/response-debug-info.json', JSON.stringify(data, null, 2));
    console.log('Saved response to response-debug-info.json successfully.');
  } catch (err) {
    console.error('Error:', err);
  }
}
test();
