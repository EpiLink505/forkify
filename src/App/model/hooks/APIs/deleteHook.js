import ajaxTimeout from './ajaxTimeout';

async function putHook(url, data) {
  try {
    const fetchPro = fetch(url, {
      method: 'DELETE',
    });
    const response = await Promise.race([fetchPro, ajaxTimeout()]);
    if (!response.ok) throw new Error('Could not delete bookmark');
  } catch (err) {
    throw err;
  }
}

export default putHook;
