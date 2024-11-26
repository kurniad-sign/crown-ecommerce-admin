'use server';

import { db } from '~/lib/drizzle';

export const getColors = async (storeId: string) => {
  try {
    const colors = await db.query.colors.findMany({
      where: (color, { eq }) => eq(color.storeId, storeId),
      orderBy: (color, { desc }) => [desc(color.createdAt)],
    });

    return colors;
  } catch (error) {
    console.error(error);
    throw new Error(`Error when fetching colors, ${error}`);
  }
};
