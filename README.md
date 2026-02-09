# ꦠ Tembung - Game Tebak Kata Basa Jawa

Game tebak kata berbahasa Jawa, terinspirasi dari Wordle & Katla. Dibangun dengan Vue 3 + TypeScript + Tailwind CSS.

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-BADGE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)

## 🎮 Demo

**[Mainkan Tembung →](https://your-site.netlify.app)**

## ✨ Fitur

- 🎯 Tebak kata 5 huruf dalam 6 kesempatan
- 📅 Kata harian yang sama untuk semua pemain
- 🎨 Warna petunjuk (hijau, kuning, abu-abu)
- ⌨️ Keyboard virtual + keyboard fisik
- 📊 Statistik menang & streak
- 💾 Progress tersimpan otomatis
- 🔐 Kata ter-obfuscate (tidak terlihat di devtools)

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Struktur Proyek

```
src/
├── composables/
│   ├── useGame.ts      # Logika game
│   └── useWords.ts     # Word service (obfuscated)
├── components/
│   ├── GameHeader.vue  # Header + stats
│   ├── GameGrid.vue    # Grid kotak
│   ├── GameMessage.vue # Pesan hasil
│   └── Keyboard.vue    # Virtual keyboard
└── App.vue             # Entry point
```

## 📝 Lisensi

MIT
