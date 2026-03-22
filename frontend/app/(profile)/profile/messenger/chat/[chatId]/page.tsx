import { BigChat } from "@/src/entities"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: 'Сообщения | Авето'
}

const ChatPage = async ({ params }: { params: Promise<{ chatId: string }> }) => {
    const {chatId} = await params
	return <BigChat chatId={chatId} />
}

export default ChatPage
