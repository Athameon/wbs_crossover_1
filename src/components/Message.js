import './Message.css'

const Message = (item) => {
	function getHashtags(feedData) {
    const hashtags = feedData.hashtags.split(",");
    let result = '';
    for (const hashtag of hashtags){
        result += `#${hashtag} `
    }

    return result.substr(0, result.length-1);
  }

	return (
		<div className='message'>
		{/* {item.author.img} */}
			<img className='user-img' src='https://randomuser.me/api/portraits/women/48.jpg' alt="User" />
			<div className='users'>
				<span className='user-name'>{item.author.user_name}</span>
				<span className='message-content'>{item.content}</span>
			</div>
			<div className='hash'>
				<span className='date'>{item.date}</span>
				<span className="message-hashtags">{getHashtags(item)}</span>
			</div>
		
		</div>
	)
}

export default Message
