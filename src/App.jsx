import { useState, useEffect } from 'react'
import { socket } from './socket'
import Message from './components/Message'

export default function App() {
	const [messages, setMessages] = useState([])
	const [msgText, setMsgText] = useState('')

	useEffect(() => {
		socket.on('message', message =>
			setMessages(prevMessages => [
				...prevMessages,
				{ user: 'user', text: message },
			]),
		)
	}, [])

	const sendMessage = e => {
		e.preventDefault()

		socket.emit('sendMessage', { text: msgText })
		setMsgText('')
	}

	return (
		<div className='mx-auto w-[500px]'>
			<h1 className='mb-6 mt-2 text-center text-4xl font-medium'>
				Real time chat app
			</h1>
			<div className='flex flex-col rounded-md border border-gray-800'>
				<div className='h-[400px] overflow-y-scroll px-4 py-3'>
					{messages.length !== 0 &&
						messages.map((msg, i) => <Message key={i} {...msg} />)}
				</div>
				<form className='flex justify-stretch' onSubmit={sendMessage}>
					<input
						type='text'
						className='w-9/12 rounded-md border border-black px-2 outline-none'
						placeholder='write something'
						value={msgText}
						onChange={e => setMsgText(e.target.value)}
					/>
					<button
						type='submit'
						className='w-3/12 rounded-md bg-green-600 px-2 py-1 text-gray-100 transition-all hover:bg-green-700'
					>
						Send message
					</button>
				</form>
			</div>
		</div>
	)
}
