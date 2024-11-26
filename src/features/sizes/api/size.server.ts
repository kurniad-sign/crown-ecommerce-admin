'use server';

import { db } from '~/lib/drizzle';

export const getSizes = async (storeId: string) => {
  try {
    const sizes = await db.query.sizes.findMany({
      where: (size, { eq }) => eq(size.storeId, storeId),
      orderBy: (size, { desc }) => [desc(size.createdAt)],
    });

    return sizes;
  } catch (error) {
    console.error(error);
    throw new Error(`Error when fetching size, ${error}`);
  }
};
