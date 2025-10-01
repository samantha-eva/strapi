import { factories } from '@strapi/strapi';
import isOwner from '../../../policies/is-owner';

export default factories.createCoreRouter('api::article.article', {
  config: {
    update: { middlewares: [isOwner] },
    delete: { middlewares: [isOwner] },
  },
});
