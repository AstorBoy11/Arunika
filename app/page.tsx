export default function Home() {
  return (
    <>
      {/* TopNavBar */}
      <header className="sticky top-0 z-50 w-full border-b border-[#e7d4b8] bg-[#726a60] backdrop-blur-sm">
        <div className="layout-container flex h-full flex-col">
          <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-3">
            <div className="flex w-full max-w-[960px] items-center justify-between">
              <div className="flex items-center gap-4 text-gray-900 dark:text-white">
                <div className="size-8 text-primary">
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
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
                  Coffee Co.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* HeroSection */}
      <div className="relative w-full overflow-hidden">
        <div className="px-4 md:px-10 lg:px-40 flex justify-center py-5">
          <div className="w-full max-w-[960px]">
            <div className="@container">
              <div className="@[480px]:p-4">
                <div
                  className="flex min-h-[560px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-8 text-center relative overflow-hidden group"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCY3uJUir_KcXB0n2J3bhgg9LqA30j9VlXxAPlj5weZrc9LAsmwxrGBBwxiVnPtnfrbwo9v8hZ-TYXXw6ONsK_abJZgiPnRm0GNw4nBtMFLtiRrTwUavdA20VnVVSzRWqdJ3Fmr4t9dIHLfDK50SBIYz_QDvbu2BtLMIHa0V7bwEzMdIDwCIOG6U7GDgPNzAK9PZBHt3H-Y6DmHVZD6RTi-LrKIm0SFwgnlfDukcxZkDKeb3XM_kBjB21EAUsgRmgq1Ju75VC4U8ar0")',
                  }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-500"></div>
                  <div className="relative z-10 flex flex-col gap-4 max-w-2xl">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl drop-shadow-sm">
                      Awaken Your Senses
                    </h1>
                    <h2 className="text-gray-100 text-base font-normal leading-relaxed @[480px]:text-lg max-w-lg mx-auto drop-shadow-sm">
                      Experience the warmth of premium, ethically sourced beans
                      roasted to perfection. From our farm to your morning cup.
                    </h2>
                  </div>
                  <div className="relative z-10 flex flex-col sm:flex-row gap-3 mt-4">
                    <a
                      href="/shop"
                      className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-[#0d1b10] text-base font-bold transition-all hover:bg-[#0fd630] hover:shadow-lg hover:shadow-primary/20"
                    >
                      <span className="truncate">Shop Now</span>
                    </a>
                    <button className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-white/10 backdrop-blur-md border border-white/30 text-white text-base font-bold transition-all hover:bg-white/20">
                      <span className="truncate">Our Story</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FeatureSection */}
      <div className="w-full">
        <div className="px-4 md:px-10 lg:px-40 flex justify-center py-12">
          <div className="w-full max-w-[960px]">
            <div className="flex flex-col gap-10 px-4">
              <div className="flex flex-col md:flex-row gap-6 justify-between items-end">
                <div className="flex flex-col gap-3">
                  <h2 className="text-gray-900 dark:text-black text-3xl md:text-4xl font-black leading-tight tracking-tight">
                    Why Choose Us
                  </h2>
                  <p className="text-gray-600 dark:text-black text-base max-w-lg">
                    We believe in quality, sustainability, and community. Every
                    cup tells a story of dedication and passion.
                  </p>
                </div>
                <button className="color-black font-bold text-sm hover:underline decoration-2 underline-offset-4 flex items-center gap-1">
                  Learn More{" "}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Feature 1 */}
                <div className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 hover:shadow-lg hover:shadow-primary/5 transition-shadow">
                  <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary-dark">
                    <span className="material-symbols-outlined text-3xl color-black">
                      handshake
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-gray-900 dark:text-black text-lg font-bold">
                      Ethically Sourced
                    </h3>
                    <p className="text-gray-600 dark:text-black text-sm leading-relaxed">
                      Direct trade partnerships with farmers ensure fair wages
                      and sustainable farming practices.
                    </p>
                  </div>
                </div>
                {/* Feature 2 */}
                <div className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 hover:shadow-lg hover:shadow-primary/5 transition-shadow">
                  <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary-dark">
                    <span className="material-symbols-outlined text-3xl color-black">
                      local_fire_department
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-gray-900 dark:text-black text-lg font-bold">
                      Expertly Roasted
                    </h3>
                    <p className="text-gray-600 dark:text-black text-sm leading-relaxed">
                      Small batches roasted daily for maximum flavor profile and
                      unbeatable freshness.
                    </p>
                  </div>
                </div>
                {/* Feature 3 */}
                <div className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-6 hover:shadow-lg hover:shadow-primary/5 transition-shadow">
                  <div className="size-12 rounded-full bg-primary/20 flex items-center justify-center text-primary-dark">
                    <span className="material-symbols-outlined text-3xl color-black">
                      diversity_3
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-gray-900 dark:text-black text-lg font-bold">
                      Community Focused
                    </h3>
                    <p className="text-gray-600 dark:text-black text-sm leading-relaxed">
                      Supporting local initiatives and creating a gathering
                      space for coffee lovers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
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
                  href="#"
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
    </>
  );
}
