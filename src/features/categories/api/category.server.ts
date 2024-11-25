'use server';

import { db } from '~/lib/drizzle';

export const getCategories = async (storeId: string) => {
  try {
    const categories = await db.query.categories.findMany({
      where: (category, { eq }) => eq(category.storeId, storeId),
      orderBy: (category, { desc }) => [desc(category.createdAt)],
      with: {
        parent: true,
      },
    });

    return categories;
  } catch (error) {
    console.error(error);
    throw new Error(`Error when fetching categories, ${error}`);
  }
};
