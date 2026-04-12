import { Mic } from 'lucide-react'
import { useEffect, useState } from 'react'

import { audioChunks, startRecording, stopRecording, useUploadRecord } from '@/src/shared'

export const VoiceRecorder = () => {
    const { uploadRecordMutation } = useUploadRecord()
    const {mutate, isPending} = uploadRecordMutation()
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

        mutate(formData)
    
    }

	return (
		<button
			onMouseDown={handleStart}
			onMouseUp={handleStop}
			className='hover:bg-gray/20 active:bg-blue flex h-11 min-h-11 w-11 min-w-11 items-center justify-center rounded-full active:scale-125'
			type='button'
		>
			<Mic size={24} />
		</button>
	)
}
