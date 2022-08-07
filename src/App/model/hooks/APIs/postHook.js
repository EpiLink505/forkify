import ajaxTimeout from './ajaxTimeout';

async function postHook(url, data) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const response = await Promise.race([fetchPro, ajaxTimeout()]);
    const json = await response.json();
    // if (!response.ok) throw new Error('Unable to post data.');
    if (!response.ok) throw new Error(`${json.message} (${response.status})`);
    return json;
  } catch (err) {
    throw err;
  }
}

export default postHook;
