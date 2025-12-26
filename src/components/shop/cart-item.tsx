'use client';

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
}

export default function CartItem({ item }: CartItemProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
      <div className="bg-gray-200 w-20 h-20 rounded"></div>
      
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-amber-700 font-bold">
          Rp {item.price.toLocaleString('id-ID')}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
          -
        </button>
        <span className="px-4 font-semibold">{item.quantity}</span>
        <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
          +
        </button>
      </div>

      <div className="text-right">
        <p className="font-bold text-lg">
          Rp {(item.price * item.quantity).toLocaleString('id-ID')}
        </p>
        <button className="text-red-600 text-sm hover:text-red-800">
          Hapus
        </button>
      </div>
    </div>
  );
}
