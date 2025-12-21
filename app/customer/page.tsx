"use client";

export default function CustomerPage() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-[#f5e6d3]/95 backdrop-blur-sm border-b border-[#e7d4b8]">
        <div className="px-4 md:px-8 xl:px-12 py-3 max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-gray-900">
            <div className="size-8 text-[#13ec37]">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] hidden sm:block">Morning Brew Co.</h2>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium text-[#13ec37] transition-colors" href="/customer">Shop</a>
            <a className="text-sm font-medium hover:text-[#13ec37] transition-colors" href="#">About</a>
            <a className="text-sm font-medium hover:text-[#13ec37] transition-colors" href="#">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex relative items-center w-64 h-10 rounded-lg bg-[#e7f3e9] overflow-hidden">
              <div className="flex items-center justify-center pl-3 text-[#4c9a59]">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input className="w-full bg-transparent border-none focus:ring-0 text-sm px-3 placeholder:text-[#4c9a59] text-gray-900" placeholder="Search coffee..." />
            </div>
            <button className="relative flex items-center justify-center size-10 rounded-lg bg-[#e7f3e9] hover:bg-[#13ec37]/20 transition-colors group">
              <span className="material-symbols-outlined text-gray-900 group-hover:text-[#13ec37]">shopping_cart</span>
              <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#13ec37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#13ec37]"></span>
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-[1440px] mx-auto w-full px-4 md:px-8 xl:px-12 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column: Product Catalog */}
          <div className="flex-1 w-full min-w-0">
            {/* Headline & Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-gray-900">Our Selection</h1>
              <p className="text-[#4c9a59]">Freshly roasted beans delivered straight to your door.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
              <button className="flex h-9 items-center justify-center px-4 rounded-full bg-[#13ec37] text-[#0d1b10] text-sm font-semibold shadow-sm transition-transform hover:scale-105 active:scale-95">
                All Roasts
              </button>
              <button className="flex h-9 items-center justify-center px-4 rounded-full bg-white border border-[#e7f3e9] hover:border-[#13ec37] text-gray-900 text-sm font-medium transition-all hover:shadow-md active:scale-95">
                Light Roast
              </button>
              <button className="flex h-9 items-center justify-center px-4 rounded-full bg-white border border-[#e7f3e9] hover:border-[#13ec37] text-gray-900 text-sm font-medium transition-all hover:shadow-md active:scale-95">
                Medium Roast
              </button>
              <button className="flex h-9 items-center justify-center px-4 rounded-full bg-white border border-[#e7f3e9] hover:border-[#13ec37] text-gray-900 text-sm font-medium transition-all hover:shadow-md active:scale-95">
                Dark Roast
              </button>
              <button className="flex h-9 items-center justify-center px-4 rounded-full bg-white border border-[#e7f3e9] hover:border-[#13ec37] text-gray-900 text-sm font-medium transition-all hover:shadow-md active:scale-95">
                Decaf
              </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Product Card 1 */}
              <div className="group flex flex-col bg-white rounded-xl shadow-sm border border-transparent hover:border-[#e7f3e9] hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative aspect-[4/3] w-full bg-[#f0f4f1] overflow-hidden">
                  <div className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB7GdbMeysPZPeYA2QTNYW9OWyz4ScqTSOi-7sne_EGMd4daAvwAiNCkjVne_5N24Dgqd0ciBZ-xYXlW-fYOifrmzjXGluBnzEm-G5m1bQgy5W9cIK1VXjQF9toKmZcFP7bwLxWwkHtBNm29oLRbAjrftTcTHntv96sdDHcMkJ7oqjzTgW2aS3K3Z0OVHNVeVEiYZkmDIeIR6x0SsjFqHLwc2DFyfqb2zPEXdL6mlaCZ7pGnP8XCo8kLKPFlreFeNSLWIU1aMNGGq3I")'}}>
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider text-gray-900">
                    Light Roast
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">Ethiopian Yirgacheffe</h3>
                  </div>
                  <p className="text-sm text-[#4c9a59] mb-4 line-clamp-2">Bright acidity with floral and citrus notes. A classic choice for pour-over.</p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-lg font-bold text-gray-900">$18.00 <span className="text-xs font-normal text-[#4c9a59]">/ 12oz</span></span>
                    <button className="flex items-center gap-2 bg-[#13ec37] hover:bg-green-400 text-[#0d1b10] font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Card 2 */}
              <div className="group flex flex-col bg-white rounded-xl shadow-sm border border-transparent hover:border-[#e7f3e9] hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative aspect-[4/3] w-full bg-[#f0f4f1] overflow-hidden">
                  <div className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBlVOX7Pb8NECqR1s68XmMd7e_vvg-k0J5VshxocQzakyheqDHLsOJzdCVwLSK3m22hJE99eBPxvRhUxRNicieOWtFPkfbfuPw8DXOCgfsyuj7yq_MjgVfmF5ykpeM0u0Qrx9J7-TCAXiZuWH0jAvDL-056OjzpNnORmQ30GIul2HKYKTCgwTdkGmaBq8YnAFn3mOYoXwdaDm6Bgb-nz9ueCfIN-SvKra3KSsPyTXBufhXS7JIRuGjdiqqQXJBi8oQW4ldewHl-Ri4_")'}}>
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider text-gray-900">
                    Medium Roast
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">Colombia Huila</h3>
                  </div>
                  <p className="text-sm text-[#4c9a59] mb-4 line-clamp-2">Balanced body with notes of caramel, dried fruit, and a hint of chocolate.</p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-lg font-bold text-gray-900">$16.50 <span className="text-xs font-normal text-[#4c9a59]">/ 12oz</span></span>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#13ec37] hover:text-[#13ec37] text-gray-900 font-medium py-2 px-4 rounded-lg transition-all text-sm">
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Card 3 */}
              <div className="group flex flex-col bg-white rounded-xl shadow-sm border border-transparent hover:border-[#e7f3e9] hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative aspect-[4/3] w-full bg-[#f0f4f1] overflow-hidden">
                  <div className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuADyETVtk4zgpCjBwYnEzt8388udWhSBf4h3tss3wvznVVlpqqgxuaphq2gb-L0QoOJP1uvCubD64MaHnlXDx1EtoPvu9w4Uw0B1E5YDGuBEAT9xQ4LIU4VagAGJsXm5uufXNXrlLG3rQD3CtaMw2nTipnFJsVEtgW9A57kl_c9aUamh_Mfq6vHNXPgOoDESD9_w6oXXlmxQPJeKQVRodlzPa_MyEutakDSW--cJ8DKX_T1fKySAI81MylJ3IIFeOy6ykmDIAWyGyYk")'}}>
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider text-gray-900">
                    Dark Roast
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">Midnight Espresso</h3>
                  </div>
                  <p className="text-sm text-[#4c9a59] mb-4 line-clamp-2">Deep, rich, and intense. Perfect for espresso shots or strong drip coffee.</p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-lg font-bold text-gray-900">$15.00 <span className="text-xs font-normal text-[#4c9a59]">/ 12oz</span></span>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#13ec37] hover:text-[#13ec37] text-gray-900 font-medium py-2 px-4 rounded-lg transition-all text-sm">
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Card 4 */}
              <div className="group flex flex-col bg-white rounded-xl shadow-sm border border-transparent hover:border-[#e7f3e9] hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative aspect-[4/3] w-full bg-[#f0f4f1] overflow-hidden">
                  <div className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCjNJW81omhpQNWU5cyVATwuVLzfV22g3zYNrxjIXOTLkEQF1URhEaR8sYt8wpyXSPsKH8x5Nxi3tT_1AGob0MdLSi0K9H9qpr3QyNyC4ByeiMOFAwSz8NiyB-VgcmFSxfwoPMZFJWLu4v-7NFrLjEA_esT6h9IgXRTld1a7McUuPA0PLJdJT2-YX_dda1DByini4rYbXfQChSfTlmqyVLip-aSRhkVQQs2f1tNglmZFLuAZU9xwLmJDLiFOunonyZ0uj3UErE8clFq")'}}>
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider text-gray-900">
                    Dark Roast
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">Sumatra Mandheling</h3>
                  </div>
                  <p className="text-sm text-[#4c9a59] mb-4 line-clamp-2">Full-bodied with an earthy aroma and low acidity. Complex and spicy.</p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-lg font-bold text-gray-900">$19.00 <span className="text-xs font-normal text-[#4c9a59]">/ 12oz</span></span>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#13ec37] hover:text-[#13ec37] text-gray-900 font-medium py-2 px-4 rounded-lg transition-all text-sm">
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Card 5 */}
              <div className="group flex flex-col bg-white rounded-xl shadow-sm border border-transparent hover:border-[#e7f3e9] hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative aspect-[4/3] w-full bg-[#f0f4f1] overflow-hidden">
                  <div className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBit7CiCa2qOuehBVbX8rlLEY28Mz8gltMZ_pTwwEVSwXxPwY37kkIEYrxhlyQFjtUmxvAtTI88CKfXYVqycRmHZ60Zj_vy3ZuixJ5_VHG4gdpm-7DtwnvOUVlmYoKSOpxJzsbrNZuWx7q87smD5HgAIOWXOJvntw1TNqvgz443xgm68I63DfnFmeIGwOkDfNf30ghS21YUVITreeIB-n1wLGd6Mu9RjoDjXPDpsY9TVy-8d0SysJLgdGw7hi62cNdMD-sVDRkvddFY")'}}>
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider text-gray-900">
                    Medium Roast
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">Guatemala Antigua</h3>
                  </div>
                  <p className="text-sm text-[#4c9a59] mb-4 line-clamp-2">Spicy and smoky with a hint of chocolate. Volcanic soil richness.</p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-lg font-bold text-gray-900">$17.50 <span className="text-xs font-normal text-[#4c9a59]">/ 12oz</span></span>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#13ec37] hover:text-[#13ec37] text-gray-900 font-medium py-2 px-4 rounded-lg transition-all text-sm">
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Card 6 */}
              <div className="group flex flex-col bg-white rounded-xl shadow-sm border border-transparent hover:border-[#e7f3e9] hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative aspect-[4/3] w-full bg-[#f0f4f1] overflow-hidden">
                  <div className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-110" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA7iJe8VqT77P2OX4bbYXWpEeubFzwxGO4yoW6pRvK7YLMlCi9o3I4mMmm48vXd37wwYoQaeBlW-EFfW-La1XL8695urbv8j9c00Ps73aDk00LywnnUo5Vta1pzRTVwB0Fp7Bi1c28Ah-w1IgSb4olVS43_f4gyDsR2MMXn3e2CYO3F-DeO9mRupeWDeutMKsHEqYdeR820qM7rJwRfhX6HhS9jIqU6b79UOZtsw5h-FIvTfjvydsW_Gvcsg3dqDThLZ6XwcEX6Vory")'}}>
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded text-xs font-semibold uppercase tracking-wider text-gray-900">
                    Decaf
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">Swiss Water Decaf</h3>
                  </div>
                  <p className="text-sm text-[#4c9a59] mb-4 line-clamp-2">All the flavor without the caffeine. Smooth, chemical-free process.</p>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-lg font-bold text-gray-900">$16.00 <span className="text-xs font-normal text-[#4c9a59]">/ 12oz</span></span>
                    <button className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#13ec37] hover:text-[#13ec37] text-gray-900 font-medium py-2 px-4 rounded-lg transition-all text-sm">
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cart Drawer */}
          <aside className="w-full lg:w-[380px] flex-shrink-0 lg:sticky lg:top-24">
            <div className="bg-white rounded-xl shadow-xl border border-[#e7f3e9] overflow-hidden flex flex-col h-auto lg:h-[calc(100vh-120px)]">
              {/* Cart Header */}
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
                <span className="bg-[#13ec37]/20 text-[#0d1b10] text-xs font-bold px-2 py-1 rounded-full">2 Items</span>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {/* Item 1 */}
                <div className="flex gap-4 group">
                  <div className="h-20 w-20 rounded-lg bg-gray-100 bg-center bg-cover shrink-0" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBUY7l_wBVeSqIOf3z3Fa6kUlD963LwWOOgw9YCH9LswF3jOJfH5axk_iSdmlAWM8imZNTObQJIGT3eT1Y4TQ4rYaL3hLprez4FpD69HpvawnXAKyBsCQOzHv_sz9dbXF6rs5DSQuKHQ8-rEsgvbimKziGZIEUepEAS3z945O800D0plW2eSvGbED-wExUZnpHzEiesiH-p3U64n5RSJYJiioqBReZP6V4gskhZMJpz081SmjfNKD2tNtQHTS0kRBSZvBScqsMN-fhm")'}}>
                  </div>
                  <div className="flex flex-col flex-1 justify-between py-0.5">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-gray-900 leading-tight">Ethiopian Yirgacheffe</h4>
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      </div>
                      <p className="text-xs text-[#4c9a59]">Light Roast</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-[#e7f3e9] rounded-lg px-2 h-7">
                        <button className="text-gray-900 hover:text-[#13ec37]">
                          <span className="material-symbols-outlined text-[16px]">remove</span>
                        </button>
                        <span className="text-xs font-semibold text-gray-900">1</span>
                        <button className="text-gray-900 hover:text-[#13ec37]">
                          <span className="material-symbols-outlined text-[16px]">add</span>
                        </button>
                      </div>
                      <p className="text-sm font-bold text-gray-900">$18.00</p>
                    </div>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex gap-4 group">
                  <div className="h-20 w-20 rounded-lg bg-gray-100 bg-center bg-cover shrink-0" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDeQqARkzgO9AyToFw0Y5DK6yllh5nvj0sqaIR1Fo203dzsHZUzyi5bu8Me1sC1Q3tBeEeZErAZP2VGnkroYnoWSa2ThMITI-kNXtZqkjLZs6Z3Cgb7A5R7ClrBtfWK3m8Xrmlm0SdoQS8-46nRt0pUqQKE38DU92pENvtYTX352bhZicdj-0Unq8uL9CIQgG0aQ-4Bguf8kxw2fqX4J9W3Q1C18PRWLo1rjfFn0lWoPwx_Iu6D9On2hpDTPcpPeiARx9RrZFLrDbQ1")'}}>
                  </div>
                  <div className="flex flex-col flex-1 justify-between py-0.5">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-gray-900 leading-tight">Midnight Espresso</h4>
                        <button className="text-gray-400 hover:text-red-500 transition-colors">
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      </div>
                      <p className="text-xs text-[#4c9a59]">Dark Roast</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 bg-[#e7f3e9] rounded-lg px-2 h-7">
                        <button className="text-gray-900 hover:text-[#13ec37]">
                          <span className="material-symbols-outlined text-[16px]">remove</span>
                        </button>
                        <span className="text-xs font-semibold text-gray-900">2</span>
                        <button className="text-gray-900 hover:text-[#13ec37]">
                          <span className="material-symbols-outlined text-[16px]">add</span>
                        </button>
                      </div>
                      <p className="text-sm font-bold text-gray-900">$30.00</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cart Footer */}
              <div className="p-5 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between items-center mb-2 text-sm">
                  <span className="text-[#4c9a59]">Subtotal</span>
                  <span className="font-semibold text-gray-900">$48.00</span>
                </div>
                <div className="flex justify-between items-center mb-6 text-sm">
                  <span className="text-[#4c9a59]">Shipping</span>
                  <span className="font-semibold text-gray-900">Calculated at checkout</span>
                </div>
                <div className="flex justify-between items-center mb-6 text-lg font-bold border-t border-gray-200 pt-3">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">$48.00</span>
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-[#13ec37] hover:bg-[#10d431] text-[#0d1b10] font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98]">
                  <span className="material-symbols-outlined text-[24px]">chat</span>
                  Checkout via WhatsApp
                </button>
                <p className="text-center text-xs text-[#4c9a59] mt-3">Secure checkout powered by WhatsApp Business</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
