import { events } from "./data.js";

const container = document.querySelector("#detay");

// Adres çubuğundaki id değerini (örnek: event-2) okuyoruz
const urlId = new URLSearchParams(location.search).get("id");

// Bu id'ye sahip etkinliği veri listemizde arıyoruz
const event = events.find(e => e.id === urlId);

if (!event) {
    container.innerHTML = `
        <div style="border: 2px solid red; padding: 20px; color: red; margin-bottom: 20px; border-radius: 5px;">
            <p>"${urlId || 'Boş'}" numaralı bir etkinlik yok. Lütfen listeden geçerli bir etkinlik seçin.</p>
        </div>
        <a href="etkinlikler.html">&larr; Listeye dön</a>
    `;
} else {
    document.title = event.title;
    
    const [gun, ay, yil] = event.date.split("-");
    const tarihFormatli = new Date(yil, ay - 1, gun).toLocaleDateString("tr-TR", { 
        day: "numeric", month: "long", year: "numeric" 
    });

    container.innerHTML = `
        <h2>${event.title}</h2>
        
        <div style="display: grid; grid-template-columns: 1fr; gap: 20px; margin-bottom: 30px;">
            <div style="background-color: var(--renk-ana); color: white; padding: 40px; text-align: center; border-radius: 8px;">
                <h3 style="color: white; margin-bottom: 10px;">${event.title}</h3>
                <p style="font-size: 1.5rem; margin-bottom: 10px;">${yil}</p>
                <p>${gun} ${new Date(yil, ay - 1, gun).toLocaleDateString("tr-TR", { month: "long" })} · ${event.location}</p>
            </div>
            
            <div style="background-color: white; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h3>Etkinlik Künyesi</h3>
                <dl style="display: grid; grid-template-columns: 120px 1fr; gap: 10px; margin-top: 15px;">
                    <dt style="font-weight: bold;">Tarih</dt>
                    <dd style="margin: 0;">${tarihFormatli}, ${event.time}</dd>
                    
                    <dt style="font-weight: bold;">Yer</dt>
                    <dd style="margin: 0;">${event.location}</dd>
                    
                    <dt style="font-weight: bold;">Kategori</dt>
                    <dd style="margin: 0;">${event.category}</dd>
                    
                    <dt style="font-weight: bold;">Kontenjan</dt>
                    <dd style="margin: 0;">${event.capacity} kişi</dd>
                </dl>
            </div>
        </div>
        
        <div class="aciklama">
            <h3>Açıklama</h3>
            <p>${event.description}</p>
            
            <div style="margin-top: 30px; display: flex; gap: 15px;">
                <a href="etkinlikler.html" style="padding: 10px 0;">&larr; Listeye dön</a>
                <a href="etkinlik-guncelle.html?id=${event.id}" style="background-color: var(--renk-ana); color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Bu etkinliği güncelle</a>
            </div>
        </div>
    `;
}