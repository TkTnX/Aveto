import { Mic } from 'lucide-react'
import { useState } from 'react'

import {
	startRecording,
	stopRecording,
	useMessages,
	useUploadRecord
} from '@/src/shared'
import { EMessageType } from '@/src/shared/types'

interface Props {
	chatId: string
}

export const VoiceRecorder = ({ chatId }: Props) => {
	const { sendMessageMutation } = useMessages()
	const { mutate: sendMessage, isPending: sendMessagePending } =
		sendMessageMutation()
	const { uploadRecordMutation } = useUploadRecord()
	const { mutate } = uploadRecordMutation()
	const [isRecording, setIsRecording] = useState(false)

	const handleStart = () => {
		setIsRecording(true)
		startRecording()
	}
	const handleStop = async () => {
		setIsRecording(false)

		const blob = await stopRecording()

		const formData = new FormData()
		formData.append('file', blob, 'voice.webm')
		mutate(formData, {
			onSuccess: (url: string) => {
				sendMessage({
					text: `voice-message:${url}`,
					chatId,
					type: EMessageType['VOICE'],
					messageMedia: []
				})
			}
		})
	}

	return (
		<button
			disabled={sendMessagePending}
			onMouseDown={handleStart}
			onMouseUp={handleStop}
			className='hover:bg-gray/20 active:bg-blue flex h-11 min-h-11 w-11 min-w-11 items-center justify-center rounded-full active:scale-125'
			type='button'
		>
			<Mic size={24} />
		</button>
	)
}
