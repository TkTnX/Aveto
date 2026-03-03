import { AddItemSteps } from "@/src/widgets"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Новое объявление - Объявления на сайте Авето"
}

const AddItemPage = () => {
  return (
    <AddItemSteps />
)
}

export default AddItemPage