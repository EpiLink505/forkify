import ajaxTimeout from './ajaxTimeout';

async function fetchHook(url) {
  try {
    const fetchPro = fetch(url);
    const response = await Promise.race([fetchPro, ajaxTimeout()]);
    // const json = await response.json();
    // console.log(json);
    // if (!response.ok) throw new Error('Unable to fetch data!');

    const json = await response.json();
    if (!response.ok) throw new Error(`${json.message} (${response.status})`);
    return json;
  } catch (err) {
    throw err;
  }
}

export default fetchHook;
