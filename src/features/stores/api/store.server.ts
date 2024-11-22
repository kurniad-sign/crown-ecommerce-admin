'use server';

import { cache } from 'react';

import { db } from '~/lib/drizzle';
import { createSupabaseServerClient } from '~/lib/supabase/server';

export const getStores = cache(async () => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    const stores = await db.query.stores.findMany({
      where: (store, { eq }) => eq(store.userId, user?.id as string),
    });

    return stores;
  } catch (error) {
    console.error(error);
    throw new Error('Error when fetch stores');
  }
});
