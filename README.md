# 🎮 Web-Based Pokémon Battle Game ⚡

Vue.js ve Pinia kullanılarak geliştirilen bu **web tabanlı Pokémon savaş oyunu**, gerçek zamanlı savaş deneyimi sunar! Kendi Pokémon takımını oluştur, stratejini belirle ve rakiplerine meydan oku! Hem frontend hem de backend bileşenleriyle tam kapsamlı bir oyun projesidir.

---

## 🚀 Özellikler

- ⚛️ Modern Vue.js 3 ve Pinia state yönetimi  
- 🔥 Express.js tabanlı hızlı ve güvenilir backend  
- ⚔️ Gerçek zamanlı Pokémon savaşları  
- 🐾 Pokémon seçimi ve takım yönetimi  
- 💥 Türler arası etkileşim ve hasar hesaplama  

---

## 🛠 Teknolojiler

- Vue.js 3  
- Pinia  
- Express.js  
- Node.js  
- Modern JavaScript (ES6+)  

---

## 📦 Kurulum & Çalıştırma

### Ön Gereksinimler

- Node.js (v16+)  
- npm veya yarn  

---

### 1️⃣ Depoyu Klonlayın

```bash
git clone https://github.com/ahmetefemat/Web-Based-Pokemon-Battle-Game-W-vue.js-pinia.git
cd Web-Based-Pokemon-Battle-Game-W-vue.js-pinia
```

---

### 2️⃣ Backend (Sunucu) Kurulumu ve Çalıştırılması

```bash
cd server
npm install
npm start
```

➡️ Backend varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.

---

### 3️⃣ Frontend (İstemci) Kurulumu ve Çalıştırılması

Yeni bir terminal açın:

```bash
cd client
npm install
npm run serve
```

➡️ Frontend uygulaması `http://localhost:8080` adresinde açılacaktır.

---

### 4️⃣ Oyuna Başlayın!

Tarayıcınızı açıp [http://localhost:8080](http://localhost:8080) adresine giderek Pokémon savaşlarının keyfini çıkarın! 🎉

---

## 📁 Proje Dosya Yapısı Detayları

```
root/
├── client/                     # 🎨 Frontend (Vue.js) uygulaması
│   ├── public/                 # Statik dosyalar (index.html, favicon vb.)
│   ├── src/
│   │   ├── assets/             # Görseller, stil dosyaları vb.
│   │   ├── components/         # Vue bileşenleri (Button, Navbar, PokémonCard vb.)
│   │   ├── views/              # Sayfa bazlı Vue bileşenleri (SelectView, BattleView vb.)
│   │   ├── store/              # Pinia store dosyaları (state management)
│   │   ├── router/             # Vue Router konfigürasyon dosyası
│   │   ├── App.vue             # Ana Vue bileşeni
│   │   └── main.js             # Uygulama giriş noktası
│   ├── package.json            # Frontend bağımlılıkları ve scriptler
│   └── vite.config.js          # Vite yapılandırması (eğer kullanılıyorsa)
│
├── server/                     # ⚙️ Backend (Express.js) uygulaması
│   ├── controllers/            # İş mantığı ve istekleri yöneten controller dosyaları
│   ├── models/                 # Veri modelleri (örn. Pokémon, Kullanıcı)
│   ├── routes/                 # API endpoint tanımları
│   ├── utils/                  # Yardımcı fonksiyonlar ve modüller
│   ├── app.js                  # Express uygulamasının ana dosyası
│   ├── server.js               # Sunucuyu başlatan dosya
│   └── package.json            # Backend bağımlılıkları ve scriptler
│
├── README.md                   # 📄 Proje açıklamaları ve kurulum talimatları
└── .gitignore                  # Git tarafından yok sayılacak dosyalar
```

---

## 🤝 Katkıda Bulunma

Fikirlerinizi, önerilerinizi veya kod katkılarınızı bekliyoruz! Pull requestleriniz bizim için çok değerli. 💡✨

---

## 📄 Lisans

Bu proje **MIT Lisansı** ile lisanslanmıştır. Detaylar için lisans dosyasına bakabilirsiniz.

---

## 📬 İletişim

Her türlü soru, öneri veya geri bildirim için [GitHub profilimden](https://github.com/ahmetefemat) bana ulaşabilirsiniz.

---

**Teşekkürler ve iyi oyunlar!** 🎉⚡🐉
