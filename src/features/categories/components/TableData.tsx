import { getCategories } from "../api/category.server"
import { TableCategories } from "./TableCategories"

export async function TableDataCategories({ storeId }: { storeId: string }) {
  const categories = await getCategories(storeId)

  return (
   <TableCategories items={categories} />
  )
}