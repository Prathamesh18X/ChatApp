import React from 'react'
import { BsSend } from "react-icons/bs";

const MessageInput = () => {
  return (
    		<form className='px-4 my-3 flex items-center gap-2'>
			<div className='flex w-[70%] items-center input input-bordered '>
				<input
					type='text'
					className='grow'
					placeholder='Send a message'
				/>
				<button type='submit' className=' w-5 h-5 outline-none'>
					<BsSend />
				</button>
			</div>
		</form>
  )
}

export default MessageInput