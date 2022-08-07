import ajaxTimeout from './ajaxTimeout';

async function putHook(url, data) {
  try {
    const fetchPro = fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const response = await Promise.race([fetchPro, ajaxTimeout()]);
    if (!response.ok) throw new Error('Unable to post data.');
  } catch (err) {
    throw err;
  }
}

export default putHook;
