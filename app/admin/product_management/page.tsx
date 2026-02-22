"use client";

import AdminHeader from "@/components/admin-header";
import Image from "next/image";
import { 
  Plus, 
  Search, 
  Edit, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

export default function AdminProducts() {
  // Dummy Data for Products
  const productsData = [
    {
      id: 1,
      name: "Ethiopian Yirgacheffe",
      desc: "Floral notes with hints of citrus and bergamot.",
      price: "$24.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdNBXTYnPxU1kPZPpnHrs1t8B0esROWXjRpYmjvOGXBeyev3BSIKGNI_xdOFvsjIy_S6pEJBJDqIoOf7BQuC36BqFK9am7VOx-ZwKwg1gWK99pPvOdy2f8GW72WE-SC-uoiSEhATsbZ6U5cBm_4EoqMUYf0LCXc4e8ep29zvledZdUUoAwOIDNYf4C5UifSQTOvGpO5UNHLsh4Vmn4lCxepJucscLbR70J0oH6G5d3ZTi3nkd2TvDUMx-g5aw3Ms8ghEIBF8gtYLNs",
      visible: true
    },
    {
      id: 2,
      name: "Sumatra Mandheling",
      desc: "Full body, earthy flavor with herbal nuances.",
      price: "$22.50",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwxhi_iHgGsi7mv5rDslgJMlXZ-SCsKSf-AsVqBlfZV6_e7N7Rq1p8TI8b1B2f7hxKev5dj1UG9WfSgxwRq1ecA6WYBxqYqEBk6tKDL-loRcT6ctU5MfIH_043NaPZlV_70Ws4rSgNO3fqm5h4DGayGikAJV2p9D76LzlyurHNqFv2Cauzg8tokyNlMDvWqdlp1BTfmf_rUendhuvIrYiR0yY9f-AcvItHLATN46K8RT9NqsbuA_ruR6HlYRWLhd135Wbq-boj4yAn",
      visible: true
    },
    {
      id: 3,
      name: "Colombian Supremo",
      desc: "Sweet, smooth, and balanced with nutty undertones.",
      price: "$19.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB29ghdLNV_5IZlJvp3QUC5ih_e8iH9EMRdFH4qvAJ_mQAuEHWkJnKKVjITfGfMYjZMDzlJlMdlu_8n2paEL9e9mk8eEX_PhVN1BaxTg5S4-9jujL1Zb-6HY3WUTVCaJBACnWADZHhQrsacHLY1hXQBCTTVBTNVRDWMW0kt7xFoGOCT8_fANvB0VgoMdnDQWNs0n4DAeJTFyrP5tsym98J2xJ8uLIJ1Kuoao3G5BIKG1Pk0rWeo0gGyvjnbLKrWO2Am3KdkDv9rzi_Q",
      visible: true
    },
    {
      id: 4,
      name: "Guatemala Antigua",
      desc: "Spicy and smoky with a hint of chocolate.",
      price: "$21.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSmDhnb9eQA1BusBHf2hpd4Ug8aBTjLJyP3KSfBFfm9EGI8IquaVD1xjMo138-kMKTgQoAds3VYHMiTa7kxL247mVyoL3n223hSwu6Hd1hSh3-bZYqH0tk1mKU2mzFAzHZhVmwa7FxaytplGYlqqvlo3tVc3WsTR-x2e7xwWQchJXOn81oud7bqFd1Gvnb9fXpEFIs8WiCwb7-OSJw-iNKVgLRYcTMIMJUTapO3OxUrMcmUh-28oeor0zEQEVu0aq7RPzUJoWmWmms",
      visible: false // Example Hidden Product
    },
    {
      id: 5,
      name: "French Roast Blend",
      desc: "Intense, bold, and smoky flavor profile.",
      price: "$18.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTplK1YTqAX0Jn6g26J1rZZ08BRSdh2E-tOc3j6N4WjtK41l7vNBMShBxgrphEvS4VlgSvbrel9jIOuUScnM6iKYKbsaC5iJ6t25pWXZ1lHtppEDo_VVsPxw3yu675TpTHXMj07jv1WyMuEBbnzOB6UEV2_1O49D2xGwk_g68nq5OOZ0ZQzU67zoY2eedaVQ8VNADXQcVhfGCTQ-sVRuHD6_DF77A64jrlmBPB4bl1Mljvdx88ifWNgUG5XHpibAvZGtkhfQQ8UOeX",
      visible: true
    },
    {
      id: 6,
      name: "Kenya AA",
      desc: "Bright acidity with berry and wine notes.",
      price: "$26.00",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkCHv8hK05jxDKbY8QXnryK4kFW0rmtH11zfMBmG2_hyOSFOmmTomie-0ZzytihrZ6llbbaO2vrrScfurdpODH5voSfTVFBIGckxj9Lu7QCbzCb_hgcHS-gR-tkZCof2KW5DN-Y3Uwx65KAFsYi6HagKSYaMz1vCbdiWfq_EPNT35WmujIqxAxZuBevkpDQShL4xVlANrV0LtuLmvkXvBjiQks4JvuaxFi0FBSHxtCqtv4BJpd372QFf2mHhnYBpAZnoYeLTZp37zc",
      visible: true
    },
  ];

  return (
    <div className="flex flex-col h-full w-full">
      {/* 1. HEADER */}
      <AdminHeader 
        title="Product Management" 
        subtitle="Manage your coffee inventory and visibility."
      >
      </AdminHeader>

      {/* 2. MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 pb-20 custom-scrollbar">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
          
          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white dark:bg-[#1a140e] p-4 rounded-xl border border-gray-200 dark:border-[#3e342b] shadow-sm dark:shadow-none transition-colors">
            
            {/* Search Bar */}
            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400 dark:text-[#b9a89d] group-focus-within:text-[#ec6d13] transition-colors" size={20} />
              </div>
              <input 
                className="block w-full pl-10 pr-3 py-2.5 border-none rounded-lg leading-5 bg-gray-100 dark:bg-[#2c241e] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-[#b9a89d] focus:outline-none focus:ring-2 focus:ring-[#ec6d13] transition-all sm:text-sm" 
                placeholder="Search coffee products..." 
                type="text" 
              />
            </div>

            {/* Filter Chips */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
              <button className="flex items-center gap-2 bg-[#ec6d13] hover:bg-[#d65c0b] text-white font-bold py-2.5 px-5 rounded-lg transition-all shadow-lg shadow-[#ec6d13]/20 active:scale-95">
                <Plus size={20} />
                <span>Add New Product</span>
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productsData.map((product) => (
              <div 
                key={product.id} 
                className={`group relative flex flex-col bg-white dark:bg-[#1a140e] border border-gray-200 dark:border-[#3e342b] rounded-2xl overflow-hidden hover:border-[#ec6d13]/50 transition-all duration-300 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/20 ${!product.visible ? "opacity-75 hover:opacity-100" : ""}`}
              >
                
                {/* Image Container */}
                <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-[#2c241e]">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${!product.visible ? "grayscale-[50%] group-hover:grayscale-0" : ""}`}
                  /> 

                  {/* Hidden Overlay */}
                  {!product.visible && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity">
                      <span className="bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">HIDDEN</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{product.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-[#b9a89d] mb-4 line-clamp-2">{product.desc}</p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-[#392f28] flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">{product.price}</span>
                    <div className="flex items-center gap-3">
                      <button className="text-gray-400 dark:text-[#b9a89d] hover:text-gray-900 dark:hover:text-white p-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#392f28] transition-colors" title="Edit Product">
                        <Edit size={20} />
                      </button>
                      
                      {/* Toggle Switch */}
                      <label className="relative inline-flex items-center cursor-pointer" title="Toggle Visibility">
                        <input type="checkbox" defaultChecked={product.visible} className="sr-only peer" />
                        <div className="w-9 h-5 bg-gray-300 dark:bg-[#392f28] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#ec6d13]"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6 p-4 rounded-xl bg-white dark:bg-[#1a140e] border border-gray-200 dark:border-[#3e342b] shadow-sm dark:shadow-none transition-colors">
            <span className="text-sm text-gray-500 dark:text-[#b9a89d]">Showing <span className="text-gray-900 dark:text-white font-semibold">1-6</span> of <span className="text-gray-900 dark:text-white font-semibold">24</span> products</span>
            <div className="flex gap-2">
              <button className="px-2 py-1 rounded-lg border border-gray-200 dark:border-[#392f28] text-gray-400 dark:text-[#b9a89d] hover:bg-gray-100 dark:hover:bg-[#392f28] hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors" disabled>
                <ChevronLeft size={20} />
              </button>
              <button className="px-3 py-1 rounded-lg border border-gray-200 dark:border-[#392f28] text-white bg-[#ec6d13] hover:bg-[#d65c0b] transition-colors">1</button>
              <button className="px-3 py-1 rounded-lg border border-gray-200 dark:border-[#392f28] text-gray-500 dark:text-[#b9a89d] hover:bg-gray-100 dark:hover:bg-[#392f28] hover:text-gray-900 dark:hover:text-white transition-colors">2</button>
              <button className="px-3 py-1 rounded-lg border border-gray-200 dark:border-[#392f28] text-gray-500 dark:text-[#b9a89d] hover:bg-gray-100 dark:hover:bg-[#392f28] hover:text-gray-900 dark:hover:text-white transition-colors">3</button>
              <button className="px-3 py-1 rounded-lg border border-gray-200 dark:border-[#392f28] text-gray-500 dark:text-[#b9a89d] hover:bg-gray-100 dark:hover:bg-[#392f28] hover:text-gray-900 dark:hover:text-white transition-colors">...</button>
              <button className="px-2 py-1 rounded-lg border border-gray-200 dark:border-[#392f28] text-gray-500 dark:text-[#b9a89d] hover:bg-gray-100 dark:hover:bg-[#392f28] hover:text-gray-900 dark:hover:text-white transition-colors">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}