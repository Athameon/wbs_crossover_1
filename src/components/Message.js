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
			<img src={item.author.img} alt="User" />
			<p>{item.author.user_name}</p>
			<p>{item.date}</p>
			<p>{item.content}</p>
			<p className="message-hashtags">{getHashtags(item)}</p>
		</div>
	)
}

export default Message
