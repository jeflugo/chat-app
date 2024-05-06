const Message = ({ user, text }) => {
	return (
		<div className='mb-3 w-fit rounded-lg  bg-green-200 px-4 py-2 text-gray-900'>
			<p>{text}</p>
			<p className='text-xs font-bold italic'>By {user}</p>
		</div>
	)
}

export default Message
