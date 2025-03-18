import { NavLink } from 'react-router-dom'
import { useContext, useState } from 'react'
import { Search, X, Menu } from 'lucide-react'
import { AuthorContextData, ContextPropsType } from '../context/AuthorContext';
// import { AuthorContextData } from '../context/AuthorContext';


const Header = () => {
    const contextData = useContext<ContextPropsType>(AuthorContextData);
    console.log("header---", contextData)
    const [isOpen, setIsOpen] = useState(false)
    const [account, setAccount] = useState(false)

    return (
        <div className='bg-[#1B1F3B] text-[#F8F9FA] flex justify-between items-center py-4 px-6 shadow-lg shadow-[#D72638] mb-[4px]'>

            <div>
                <NavLink to="/home"><div className='text-2xl font-bold  hover:text-[#E63946] transition tracking-wide'>Pulse Point</div></NavLink>
            </div>
            {/* hamburger */}
            {/* <div className='hover:text-[#E63946] transition cursor-pointeer' ><Search /></div> */}

            <nav className="hidden md:flex space-x-10 text-lg">
                <div className='hover:text-[#E63946] transition cursor-pointeer' ><Search /></div>
                <NavLink className='hover:text-[#E63946] transition' to="/home">Home</NavLink>
                <NavLink className='hover:text-[#E63946] transition' to="/createArticle">Create Article</NavLink>
                <NavLink className='hover:text-[#E63946] transition' to="/myArticles">My Articles</NavLink>
                {/* <NavLink className='hover:text-[#E63946] transition' to="/logout">Sign out</NavLink>
                <NavLink className="hover:text-[#E63946] transition" to="#">My Account</NavLink> */}
                <img src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png" className='rounded-full w-8 h-8 cursor-pointer' onClick={() => { setAccount(!account) }} />
            </nav>
            {account && (
                <div className='absolute top-16 right-2 items-start bg-[#313a79] text-white m-2 p-4 rounded-lg space-y-2 hidden md:block '>
                    <NavLink className="block hover:text-[#E63946] transition" to="/my-account">My Account</NavLink>
                    <NavLink className="block hover:text-[#E63946] transition" to="/my-profile">My Profile</NavLink>
                    <NavLink className='block hover:text-[#E63946] transition' to="/logout">Sign out</NavLink>
                </div>
            )}

            <button className='md:hidden '
                onClick={() => { setIsOpen(!isOpen) }}>{isOpen ? <X /> : <Menu />}
            </button>

            {isOpen && (<div className='absolute top-16 right-0 items-start w-1/3 mid:1/3 bg-[#1B1F3B] text-white p-4 rounded-lg space-y-4 shadow-lg shadow-[#E63946] md:hidden'>
                <NavLink className='block' onClick={() => setIsOpen(false)} to="/createArticle">Create Article</NavLink>
                <NavLink className='block' onClick={() => setIsOpen(false)} to="/myArticles">My Articles</NavLink>
                <NavLink className="block" onClick={() => setIsOpen(false)} to="#">My Account</NavLink>
                <NavLink className='block' onClick={() => setIsOpen(false)} to="/logout">Sign out</NavLink>
            </div>
            )}

        </div>
    )
}
export default Header