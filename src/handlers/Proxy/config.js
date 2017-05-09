export const RECENT_ARTICLES = `http://toro-trans-${process.env.NODE_ENV === 'development' ? 'stage' : 'stage'}.us-west-2.elasticbeanstalk.com/web-articles`;
export const ARTICLE = `http://toro-trans-${process.env.NODE_ENV === 'development' ? 'stage' : 'stage'}.us-west-2.elasticbeanstalk.com/article`;
export const S3_BUCKET = 'amp-article-bucket';
export const AWS_CONFIG = {
  accessKeyId: 'AKIAIHHQMKY3FYAO3QZA',
  secretAccessKey: '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',
  region: 'us-east-1',
};
