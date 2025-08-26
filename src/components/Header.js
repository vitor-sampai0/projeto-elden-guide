import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white shadow-lg">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                            <span className="text-2xl font-bold">ER</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-yellow-400">Elden Guide</h1>
                            <p className="text-gray-300 text-sm">Guia completo dos bosses</p>
                        </div>
                    </div>

                    <nav className="hidden md:flex space-x-10 gap-4">
                        <Link href="/" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 font-medium">
                            Home
                        </Link>
                        <Link href="#api" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 font-medium">
                            API
                        </Link>
                        <Link href="/bosses" className="text-gray-300 hover:text-yellow-400 transition-colors duration-200 font-medium">
                            Bosses
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;