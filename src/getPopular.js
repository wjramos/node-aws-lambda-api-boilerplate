import TopArticlesQuery from './lib/TopArticlesQuery';

export async function getPopular(e, ctx, cb) {
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
