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
		<div className='message'>
			<p>{item.content}</p>
			<p className="message-hashtags">{getHashtags(item)}</p>
			<p>{item.date}</p>
		</div>
	)
}

export default UserMessage
