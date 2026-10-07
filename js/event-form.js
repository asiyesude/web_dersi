import { events } from "./data.js";

const form = document.querySelector("form");
// URL'de id var mı bakıyoruz (varsa güncelleme sayfasındayız demektir)
const urlId = new URLSearchParams(location.search).get("id");

if (form) {
    // 1. GÜNCELLEME SAYFASI: FORMU OTOMATİK DOLDURMA
    if (urlId) {
        // Tıklanan etkinliği veri listesinden bul
        const etkinlik = events.find(e => e.id === urlId);
        
        if (etkinlik) {
            // Formdaki inputları sırayla seç (name veya id attributelarına göre)
            const isimInput = form.querySelector("input[type='text']");
            const kategoriSecici = form.querySelector("select");
            const tarihInput = form.querySelector("input[type='date']");
            const aciklamaInput = form.querySelector("textarea");

            // Bulduğumuz verileri formdaki kutulara yazdırıyoruz
            if(isimInput) isimInput.value = etkinlik.title;
            if(kategoriSecici) kategoriSecici.value = etkinlik.category;
            if(aciklamaInput) aciklamaInput.value = etkinlik.description;
            
            // Tarihi HTML'in istediği formata (YYYY-MM-DD) çevirip yazdırıyoruz
            if(tarihInput && etkinlik.date) {
                const [gun, ay, yil] = etkinlik.date.split("-");
                tarihInput.value = `${yil}-${ay}-${gun}`;
            }
        }
    }

    // 2. KAYDET BUTONUNA BASILINCA YAPILACAKLAR
    form.addEventListener("submit", function(e) {
        e.preventDefault(); 

        if (urlId) {
            alert("Etkinlik başarıyla güncellendi! (Simülasyon)");
            window.location.href = `etkinlik-detay.html?id=${urlId}`;
        } else {
            alert("Yeni etkinlik başarıyla eklendi! (Simülasyon)");
            window.location.href = "etkinlikler.html"; 
        }
    });
}