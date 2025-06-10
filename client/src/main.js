// Vue'nun createApp fonksiyonu  (uygulama başlatmak için)
import { createApp } from 'vue'

// Ana bileşen (uygulamanın kökü)
import App from './App.vue'

// Sayfalar arası yönlendirmeyi (routing) yöneten yapı
import router from './router'

// Durum yönetimi için Pinia içe aktarılıyor
import { createPinia } from 'pinia'

// Vue uygulaması oluşturuluyor
const app = createApp(App)

// Pinia (state management) uygulamaya entegre ediliyor
app.use(createPinia())

// Vue Router uygulamaya entegre ediliyor
app.use(router)

// Uygulama, index.html içindeki #app id'li elemana bağlanıyor
app.mount('#app')
