# Kampüs Etkinlikleri Backend API

Node.js ve Express ile geliştirilmiş Kampüs Etkinlikleri REST API sunucusu.

## Kurulum ve Çalıştırma Komutları

    cd backend
    npm install
    npm run seed
    npm run dev
    npm start

## Ortam Değişkenleri (.env)

Uygulama çalışmak için backend/.env dosyasında aşağıdaki değişkenleri kullanır (.env.example dosyasını kopyalayarak oluşturabilirsiniz):

    PORT=3000
    MONGODB_URI=mongodb://127.0.0.1:27017/kampus

## REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| :--- | :--- | :--- | :--- | :--- | :--- |
| GET | /health | Sunucu durumu | 200 | - | çalışıyor |
| GET | /events (?search= & ?category=) | Listeyi getir, ara ve filtrele | 200 | - | çalışıyor |
| GET | /events/upcoming | Yaklaşan etkinlikler | 200 · tarihe göre sıralı | - | çalışıyor |
| GET | /events/:id | Tek etkinlik | 200 | 404 | çalışıyor |
| POST | /events | Yeni etkinlik | 201 | 400 | çalışıyor |
| PATCH | /events/:id | Güncelle | 200 · güncel kayıt | 400, 404 | çalışıyor |
| DELETE | /events/:id | Sil | 204 · gövde yok | 404 | çalışıyor |