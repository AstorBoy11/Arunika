'use client';

import { useState } from 'react';

export default function KatalogPage() {
  const [selectedRoast, setSelectedRoast] = useState('all');
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Ethiopian Yirgacheffe',
      roast: 'Light Roast',
      price: 18.00,
      quantity: 1,
      image: ''
    },
    {
      id: 2,
      name: 'Midnight Espresso',
      roast: 'Dark Roast',
      price: 30.00,
      quantity: 2,
      image: ''
    }
  ]);

  // Data dummy untuk development
  const products = [
    { 
      id: 1, 
      name: 'Ethiopian Yirgacheffe', 
      price: 18.00,
      roast: 'LIGHT ROAST',
      description: 'Bright acidity with floral and citrus notes. A classic choi...',
      slug: 'ethiopian-yirgacheffe',
      image: ''
    },
    { 
      id: 2, 
      name: 'Colombia Huila', 
      price: 16.50,
      roast: 'MEDIUM ROAST',
      description: 'Balanced body with notes of caramel, dried fruit, and a hi...',
      slug: 'colombia-huila',
      image: ''
    },
    { 
      id: 3, 
      name: 'Midnight Espresso', 
      price: 15.00,
      roast: 'DARK ROAST',
      description: 'Deep, rich, and intense. Perfect for espresso shots o...',
      slug: 'midnight-espresso',
      image: ''
    },
    { 
      id: 4, 
      name: 'Sumatra Mandheling', 
      price: 19.00,
      roast: 'DARK ROAST',
      description: 'Full-bodied with an earthy aroma and low acidity...',
      slug: 'sumatra-mandheling',
      image: ''
    },
    { 
      id: 5, 
      name: 'Guatemala Antigua', 
      price: 17.50,
      roast: 'MEDIUM ROAST',
      description: 'Spicy and smoky with a hint of chocolate. Volcanic soil...',
      slug: 'guatemala-antigua',
      image: ''
    },
    { 
      id: 6, 
      name: 'Swiss Water Decaf', 
      price: 16.00,
      roast: 'DECAF',
      description: 'All the flavor without the caffeine. Smooth, chemical-...',
      slug: 'swiss-water-decaf',
      image: ''
    },
  ];

  const roastTypes = ['all', 'light', 'medium', 'dark', 'decaf'];
  
  const filteredProducts = selectedRoast === 'all' 
    ? products 
    : products.filter(p => p.roast.toLowerCase().includes(selectedRoast));

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal;

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f5e6d3]">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-black text-gray-900 mb-2">Our Selection</h1>
              <p className="text-green-700 text-sm">
                Freshly roasted beans delivered straight to your door.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 mb-8 flex-wrap">
              {[
                { value: 'all', label: 'All Roasts' },
                { value: 'light', label: 'Light Roast' },
                { value: 'medium', label: 'Medium Roast' },
                { value: 'dark', label: 'Dark Roast' },
                { value: 'decaf', label: 'Decaf' }
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setSelectedRoast(value)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedRoast === value
                      ? 'bg-primary text-[#0d1b10] shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  {/* Product Badge */}
                  <div className="relative">
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`px-3 py-1 text-xs font-bold rounded ${
                        product.roast === 'LIGHT ROAST' ? 'bg-orange-100 text-orange-800' :
                        product.roast === 'MEDIUM ROAST' ? 'bg-amber-900 text-white' :
                        product.roast === 'DARK ROAST' ? 'bg-gray-900 text-white' :
                        'bg-teal-600 text-white'
                      }`}>
                        {product.roast}
                      </span>
                    </div>
                    {/* Product Image */}
                    <div className="bg-gradient-to-br from-amber-100 to-amber-50 h-48 flex items-center justify-center">
                      <div className="w-32 h-32 bg-gray-200 rounded-lg"></div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">/12oz</span>
                      </div>
                      <button className="bg-white border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold text-sm hover:border-primary hover:text-primary transition-all flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
                <span className="bg-primary text-[#0d1b10] px-3 py-1 rounded-full text-sm font-bold">
                  {cartItems.length} items
                </span>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 border-b pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg flex-shrink-0 flex items-center justify-center">
                      <div className="w-10 h-10 bg-gray-200 rounded"></div>
                    </div>
                    
                    <div className="flex-1">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="float-right text-gray-400 hover:text-red-500"
                      >
                        ✕
                      </button>
                      <h3 className="font-bold text-gray-900 text-sm mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">{item.roast}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-gray-600 hover:text-gray-900 w-6 h-6 flex items-center justify-center"
                          >
                            −
                          </button>
                          <span className="font-semibold text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-gray-600 hover:text-gray-900 w-6 h-6 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-sm text-gray-500">
                    Calculated at checkout
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-4">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mb-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Checkout via WhatsApp
              </button>
              
              <p className="text-xs text-center text-gray-500">
                Secure checkout powered by WhatsApp Business
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
