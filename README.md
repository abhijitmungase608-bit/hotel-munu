# 🍕 MenuCard — Smart Restaurant QR Digital Menu & Contactless Ordering SaaS

A full-featured, modern SaaS platform for restaurants, cafes, and hotels to create dynamic digital menus, generate table-specific QR codes, take live kitchen orders with audio notifications, and accept WhatsApp orders.

![MenuCard SaaS](public/icons.svg)

---

## ✨ Key Features

### 1. 📱 Customer Mobile-First Digital Menu
- **Instant QR Access**: Diners scan the table QR code to open the restaurant's menu directly in their mobile browser—**no app download required**.
- **Automatic Table Recognition**: Captures the diner's table number directly from the QR URL (e.g. `?table=4`).
- **Rich Dish Customization**: Interactive add-on groups (Crust options like *Hand Tossed* or *Cheese Burst*, extra toppings, dipping sauces, and custom cooking instructions).
- **Dietary & Category Filters**: Sticky category pills (🍕 Pizza, 🍔 Burgers, 🍝 Pasta, 🥤 Drinks, 🍰 Desserts) and 1-tap **Veg / Non-Veg** toggles.
- **Dynamic Sold Out States**: Out-of-stock dishes immediately display a "Sold Out" overlay and are disabled in real time.
- **Dual Checkout Options**:
  1. **Direct Kitchen Order**: Sends orders straight to the restaurant dashboard with audio alerts and live order tracking (`Received` ➔ `Preparing` ➔ `Served`).
  2. **WhatsApp Order**: Formats an itemized bill breakdown and launches a WhatsApp chat directly with the restaurant.

---

### 2. 👨‍🍳 Restaurant Owner Dashboard
- **Live Kitchen Orders Pipeline**: Real-time order queue with audio chime notifications (Web Audio API synthesizers) and status workflow (`NEW` ➔ `PREPARING` ➔ `SERVED` ➔ `COMPLETED`).
- **Kitchen Order Ticket (KOT) Printing**: 1-click printable receipt format tailored for thermal/receipt printers.
- **1-Click Availability Switch**: Instantly toggle any dish between `Available 🟢` and `Sold Out 🔴`, synchronizing across all active customer tabs.
- **Table & QR Code Studio**:
  - Add & manage restaurant tables with seating capacity and zones.
  - High-resolution QR code generator for each table.
  - **Printable Table Tent Cards**: Ready-to-print stand cards with cut lines, table badge, restaurant logo, and scan instructions.
- **Discounts & Combos Engine**: Create promo coupon codes (e.g. `PIZZA20`, `WELCOME50`) and combo meal deals.
- **Customization & Themes**: 5 pre-configured design presets (*Modern Emerald*, *Warm Amber Cafe*, *Sunset Crimson*, *Luxury Dark & Gold*, *Cyber Neon*) with logo and cover photo support.
- **Business Analytics**: Scan traffic graphs, daily revenue, and top 5 bestsellers ranking.
- **SaaS Subscription Tiering**: Free, Starter Pro (₹199/mo), and Business Elite (₹499/mo).

---

### 3. 🛡️ Super Admin Console
- Platform-wide GMV, active tenant counts, subscription ARR, and restaurant directory management.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Vanilla CSS utilities
- **Icons & UI**: Lucide React
- **QR Code Engine**: Canvas-based `qrcode` library
- **Real-time Sync**: Cross-tab `BroadcastChannel` & LocalStorage persistence
- **Audio Engine**: Web Audio API tone synthesizer (no external MP3 dependencies)
- **Effects**: `canvas-confetti`

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/abhijitmungase608-bit/hotel-munu.git
cd hotel-munu
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 📄 License
MIT License © 2026 Abhijit Mungase.
