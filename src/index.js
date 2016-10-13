import TopArticlesQuery from 'lib/TopArticlesQuery';

export async function handler(e, ctx, cb) {
  for (let param in e) {
    console.log(`${param}: ${e[param]}`);
  }

  try {
    const urls = await new TopArticlesQuery(e);
    cb(null, urls);

  } catch(err) {
    cb(err);
  }
};

/* Test */
handler({
  brand: 'foodandwine',
  limit: 10,
  from: 'now-7d',
  // to: 'now-1d',
  // social: 'FacebookShares',
  // date: 'modified'
}, null, console.log );
