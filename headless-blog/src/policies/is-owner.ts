// src/policies/is-owner.ts
export default async (ctx: any, next: () => Promise<void>) => {
  const { id } = ctx.params;
  const user = ctx.state.user;

  if (!user) return ctx.unauthorized('Vous devez être connecté.');

  const entity: any = await strapi.entityService.findOne('api::article.article', id, {
    populate: ['author'],
  });

  if (!entity) return ctx.notFound('Article introuvable.');

  const ownerId = entity.author?.id || entity.author;
  if (String(ownerId) !== String(user.id))
    return ctx.forbidden('Vous ne pouvez modifier ou supprimer que vos propres articles.');

  await next();
};
