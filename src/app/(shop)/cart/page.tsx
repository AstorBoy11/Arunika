'use client';

import CartItem from '@/components/shop/cart-item';

export default function CartPage() {
  // Data dummy untuk development
  const cartItems = [
    { id: 1, name: 'Espresso', price: 25000, quantity: 2, image: '' },
    { id: 2, name: 'Cappuccino', price: 30000, quantity: 1, image: '' },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Keranjang Belanja</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <div className="text-center py-12 text-gray-500">
              Keranjang Anda kosong
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
            <h2 className="text-2xl font-bold mb-4">Ringkasan Pesanan</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rp {total.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span>Biaya Layanan</span>
                <span>Rp 5.000</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>Rp {(total + 5000).toLocaleString('id-ID')}</span>
              </div>
            </div>
            <button className="w-full bg-amber-700 text-white py-3 rounded-lg font-semibold hover:bg-amber-800 transition">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
