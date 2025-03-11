const Header = () => {
    return (
        <div className='flex justify-between bg-gray-100 py-4 px-6 items-center'>
            <div className=''>
                <div>Explore</div>
            </div>
            <div>
                {/* <img src={ht} width={160} /> */}
                <div className='text-2xl font-bold '>Pulse Point</div>
            </div>
            <div className='flex justify-between gap-x-6'>
                <div><button>Search</button></div>
                <div>E-paper</div>
                <div>Sign In</div>

            </div>
        </div>
    )
}
export default Header