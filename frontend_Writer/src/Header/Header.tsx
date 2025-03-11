import {NavLink} from 'react-router-dom'
const Header = () => {
    return (
        <div className='flex justify-between bg-gray-400 py-4 px-6 items-center shadow shadow-amber-500 mb-[4px]'>
           
            <div>
                {/* <img src={ht} width={160} /> */}
                <NavLink to="/home">
                <div className='text-2xl font-bold '>Pulse Point</div>
                </NavLink>
            </div>
            <div className='flex justify-between gap-x-6'>
                <div><button>Search</button></div>
                <NavLink to="/createArticle">Create Article</NavLink>
                <NavLink to="/myArticles">My Articles</NavLink>
                <NavLink to="/logout">Sign out</NavLink>
                
            </div>
        </div>
    )
}
export default Header