import React from 'react'
import ConversationStripe from './ConversationStripe'

const ConversationList = () => {
  return (
 <div className='py-2 flex flex-col w-96 overflow-auto'>
			<ConversationStripe />
			<ConversationStripe />
			<ConversationStripe />
			<ConversationStripe />
			<ConversationStripe />
			<ConversationStripe />
			<ConversationStripe />
			<ConversationStripe />
			<ConversationStripe />
			<ConversationStripe />
		</div>
	);
}

export default ConversationList