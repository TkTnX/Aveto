let mediaRecorder: MediaRecorder
export let audioChunks: Blob[] = []

export async function startRecording() {
	const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

	mediaRecorder = new MediaRecorder(stream)

	mediaRecorder.ondataavailable = event => {
		if (event.data.size > 0) {
			audioChunks.push(event.data)
		}
	}

	mediaRecorder.start(1000)
}

export function stopRecording(): Promise<Blob> {
	return new Promise(resolve => {
		mediaRecorder.onstop = () => {
			const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
			audioChunks = []
			resolve(audioBlob)
		}

		mediaRecorder.stop()
	})
}
