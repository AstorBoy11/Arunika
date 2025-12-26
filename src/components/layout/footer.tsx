export default function Footer() {
  return (
    <footer className="border-t border-[#e7d4b8] bg-[#726a60] py-12">
      <div className="layout-container flex justify-center px-4 md:px-10 lg:px-40">
        <div className="w-full max-w-[960px] flex flex-col md:flex-row justify-between gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-gray-900 dark:text-white">
              <div className="size-6 text-primary">
                <svg
                  className="w-full h-full"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2,16C2,16 2,6 10,6C13.9,6 16.5,7.9 18.2,10.2C19,11.2 20.3,11.7 21.5,11.4C21.8,11.3 22,11.5 22,11.8V12.2C22,12.5 21.8,12.7 21.6,12.8C19.7,13.7 18.2,15.2 17.5,17.2C16.8,19.3 15.2,21.1 13.2,21.8C10.7,22.7 7.9,21.9 6.2,20.1L6.2,20.1C5.2,19.1 4.3,17.9 3.6,16.7L2,16Z M12,8C10.3,8 9,9.3 9,11C9,12.7 10.3,14 12,14C13.7,14 15,12.7 15,11C15,9.3 13.7,8 12,8Z" />
                </svg>
              </div>
              <span className="text-lg font-bold">Coffee Co.</span>
            </div>
            <p className="text-black text-sm max-w-xs">
              Brewing the best moments since 2025. Sustainable, ethical, and
              delicious.
            </p>
          </div>
          <div className="flex gap-12 flex-wrap">
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-gray-900 dark:text-white">
                Shop
              </h4>
              <a
                className="text-sm text-black hover:text-[#F9F3E5]"
                href="/katalog"
              >
                All Coffee
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-gray-900 dark:text-white">
                Company
              </h4>
              <a
                className="text-sm text-black hover:text-[#F9F3E5]"
                href="#"
              >
                Our Story
              </a>
              <a
               className="text-sm text-black hover:text-[#F9F3E5]"
                href="#"
              >
                Contact
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-gray-900 dark:text-white">
                Social
              </h4>
              <a
               className="text-sm text-black hover:text-[#F9F3E5]"
                href="#"
              >
                Instagram
              </a>
              <a
                className="text-sm text-black hover:text-[#F9F3E5]"
                href="#"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-gray-400 text-xs">
        © 2025 Coffee Co. All rights reserved.
      </div>
    </footer>
  );
}
