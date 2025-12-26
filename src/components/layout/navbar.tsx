export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#6b6355] border-b border-[#7a7061]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 text-white">
            <div className="w-8 h-8 text-primary">
              <svg
                className="w-full h-full"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2,16C2,16 2,6 10,6C13.9,6 16.5,7.9 18.2,10.2C19,11.2 20.3,11.7 21.5,11.4C21.8,11.3 22,11.5 22,11.8V12.2C22,12.5 21.8,12.7 21.6,12.8C19.7,13.7 18.2,15.2 17.5,17.2C16.8,19.3 15.2,21.1 13.2,21.8C10.7,22.7 7.9,21.9 6.2,20.1L6.2,20.1C5.2,19.1 4.3,17.9 3.6,16.7L2,16Z M12,8C10.3,8 9,9.3 9,11C9,12.7 10.3,14 12,14C13.7,14 15,12.7 15,11C15,9.3 13.7,8 12,8Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold">
              Coffee Co.
            </h2>
          </a>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <a href="/" className="text-white hover:text-gray-300 transition font-medium">
              Home
            </a>
            <a href="/katalog" className="text-white hover:text-gray-300 transition font-medium">
              Katalog
            </a>
            <a href="/cart" className="text-white hover:text-gray-300 transition font-medium">
              Cart
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
