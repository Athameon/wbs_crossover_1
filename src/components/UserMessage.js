import './UserMessage.css'

const UserMessage = (item) => {

	function getHashtags(feedData) {
    const hashtags = feedData.hashtags.split(",");
    let result = '';
    for (const hashtag of hashtags){
        result += `#${hashtag} `
    }

    return result.substr(0, result.length-1);
  }

	return (
		<div className='user-message'>
			<p className='user-message-content'>{item.content}</p>
			<div className='user-message-content-wrapper'>
				<p className="user-message-hashtags">{getHashtags(item)}</p>
				<p className='user-message-date'>{item.date}</p>
			</div>
		</div>
	)
}

export default UserMessage
