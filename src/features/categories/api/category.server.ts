'use server'

import { db } from "~/lib/drizzle";
import { createSupabaseServerClient } from "~/lib/supabase/server";

export const getCategories = async (storeId: string) => {
  const supabase = await createSupabaseServerClient();
    try {
      
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Not authorized')
      }

      const categories = await db.query.categories.findMany({
        where: (category, { eq }) => eq(category.storeId, storeId)
      })

      return categories
    } catch(error) {
      console.error(error)
      throw new Error('Error when fetching categories')
    }
}