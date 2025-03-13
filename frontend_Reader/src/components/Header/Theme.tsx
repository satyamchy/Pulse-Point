import { useState } from 'react';
import { Search, Menu } from 'lucide-react';

const Theme = () => {
    const [isOpen, setIsOpen] = useState(false);
    //1B1F3B   //E63946
    return (
        <>
            <header className="bg-[#1B2A4E] text-white flex justify-between items-center p-4 shadow-lg">
                <div className="text-2xl font-bold tracking-wide">PulsePoint News</div>

                <nav className="hidden md:flex space-x-6">
                    <a href="#" className="hover:text-[#D72638] transition">Home</a>
                    <a href="#" className="hover:text-[#D72638] transition">World</a>
                    <a href="#" className="hover:text-[#D72638] transition">Technology</a>
                    <a href="#" className="hover:text-[#D72638] transition">Sports</a>
                    <a href="#" className="hover:text-[#D72638] transition">Contact</a>
                </nav>


                <div className="flex items-center space-x-4">
                    <Search className="cursor-pointer hover:text-[#FF8C42] transition" />
                    <button
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <Menu />
                    </button>
                </div>

                {isOpen && (
                    <div className="absolute top-16 right-4 bg-[#1B2A4E] text-white p-4 rounded-lg space-y-2 shadow-md md:hidden">
                        <a href="#" className="block hover:text-[#E63946]">Home</a>
                        <a href="#" className="block hover:text-[#E63946]">World</a>
                        <a href="#" className="block hover:text-[#D72638]">Technology</a>
                        <a href="#" className="block hover:text-[#D72638]">Sports</a>
                        <a href="#" className="block hover:text-[#D72638]">Contact</a>
                    </div>


                )}
            </header>

            <div className="bg-[#1B1F3B] text-white flex justify-between items-center my-5 p-4 shadow-lg">
                <div className="text-2xl font-bold tracking-wide">PulsePoint News</div>

                <nav className="hidden md:flex space-x-6">
                    <a href="#" className="hover:text-[#D72638] transition">Home</a>
                    <a href="#" className="hover:text-[#D72638] transition">World</a>
                    <a href="#" className="hover:text-[#D72638] transition">Technology</a>
                    <a href="#" className="hover:text-[#D72638] transition">Sports</a>
                    <a href="#" className="hover:text-[#D72638] transition">Contact</a>
                </nav>
            </div>
        </>
    );
};

export default Theme;
