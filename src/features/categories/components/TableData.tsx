import { getCategories } from "../api/category.server"

export async function TableDataCategories({ storeId }: { storeId: string }) {
  const categories = await getCategories(storeId)

  console.log(categories)

  return (
    <div>
      Table Data Server Wrapper
    </div>
  )
}