# Coffee Shop App

Aplikasi Coffee Shop dengan Next.js 14 App Router dan TypeScript.

## 🏗️ Struktur Folder

```
coffee-shop/
├── public/                    # Assets statis
│   ├── images/
│   │   ├── products/         # Gambar produk kopi
│   │   └── banners/          # Banner promosi
│   └── icons/                # Icon aplikasi
│
├── src/
│   ├── app/                  # ROUTING UTAMA (App Router)
│   │   ├── api/              # Backend API Routes
│   │   │   ├── products/     # API produk
│   │   │   └── auth/         # API autentikasi
│   │   │
│   │   ├── (auth)/           # Auth Pages (Login/Register)
│   │   │   ├── login/
│   │   │   └── register/
│   │   │
│   │   ├── (shop)/           # AREA CUSTOMER
│   │   │   ├── layout.tsx    # Layout dengan Navbar + Footer
│   │   │   ├── page.tsx      # Landing Page
│   │   │   ├── katalog/      # Halaman katalog produk
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/   # Detail produk (Dynamic)
│   │   │   └── cart/         # Keranjang belanja
│   │   │
│   │   ├── (dashboard)/      # AREA ADMIN & OWNER
│   │   │   ├── layout.tsx    # Layout dengan Sidebar
│   │   │   ├── admin/        # Fitur Admin
│   │   │   │   ├── products/ # Kelola produk
│   │   │   │   └── content/  # Kelola konten
│   │   │   └── owner/        # Dashboard Owner
│   │   │
│   │   ├── layout.tsx        # Root Layout
│   │   └── globals.css       # Global CSS
│   │
│   ├── components/           # Komponen UI
│   │   ├── ui/               # Komponen atomic (Button, Card, Input)
│   │   ├── layout/           # Komponen layout (Navbar, Footer, Sidebar)
│   │   ├── shop/             # Komponen customer (ProductCard, CartItem)
│   │   └── dashboard/        # Komponen admin/owner (SalesChart, DataTable)
│   │
│   ├── lib/                  # Logic & Konfigurasi
│   │   ├── db.ts             # Database connection (placeholder)
│   │   ├── auth.ts           # Auth config (placeholder)
│   │   └── utils.ts          # Helper functions
│   │
│   └── types/                # TypeScript Definitions
│       └── index.ts          # Interface untuk Product, User, Order, dll
│
├── .env                      # Environment variables
├── next.config.ts            # Next.js config
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🚀 Mode Development

Untuk fase development awal:
- ✅ **Login tanpa password**: Pilih role (Customer/Admin/Owner) langsung masuk
- ✅ **No Database**: Menggunakan data dummy di memory
- ❌ **No Middleware**: Belum ada proteksi route (akan ditambahkan nanti)

## 📱 Fitur

### Customer
- 🏠 Landing page dengan hero section
- 📋 Katalog produk kopi
- 🔍 Detail produk
- 🛒 Keranjang belanja

### Admin
- 📦 Kelola produk (CRUD)
- 📝 Kelola konten & banner

### Owner
- 📊 Dashboard analitik
- 💰 Laporan penjualan
- 📈 Grafik penjualan

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components

## 📦 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔐 Login Development

Untuk masuk ke aplikasi (mode development):

1. Kunjungi `/login`
2. Pilih role:
   - **Customer** → Redirect ke `/` (Home)
   - **Admin** → Redirect ke `/admin/products`
   - **Owner** → Redirect ke `/owner` (Dashboard)

## 📝 Catatan Development

- Database akan dikonfigurasi menggunakan Prisma + MySQL (fase selanjutnya)
- Authentication akan menggunakan NextAuth.js (fase selanjutnya)
- Middleware untuk proteksi route akan ditambahkan (fase selanjutnya)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
