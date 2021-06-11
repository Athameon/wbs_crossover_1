import './Header.css'

const Header = (props) => {
  
  const handleSubmit = (event) => {
    event.preventDefault();
    props.performSearch(event.target.firstChild.value);
  }

  return(
    <div className='header'>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Search ...' />
        <span className='search'><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg></span>
      </form>
    </div>
  )
}

export default Header;