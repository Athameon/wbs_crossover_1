import './Message.css'
import { Link } from 'react-router-dom';

const Message = (item) => {
	function getHashtags(feedData) {
    const hashtags = feedData.hashtags.split(",");
    let result = '';
    for (const hashtag of hashtags){
        result += `#${hashtag} `
    }

    return result.substr(0, result.length-1);
  }

	console.log("Author Image: ", item.author);

	return (
		<div className='message'>
			<Link to={'user/' + item.author.id} >
				<img className='user-img' src={item.author.img} alt="User" />
			</Link>
			<div className='users'>
				<Link className='user-link' to={'user/' + item.author.id} >
					<span className='user-name'>{item.author.user_name}</span>
				</Link>
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
