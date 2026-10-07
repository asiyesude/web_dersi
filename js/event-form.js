import { events } from "./data.js";

const form = document.querySelector("form");
const urlId = new URLSearchParams(location.search).get("id");
// Şu an güncelleme sayfasında mıyız kontrol ediyoruz
const isUpdatePage = window.location.pathname.includes("guncelle");

// 1. GÜNCELLEME SAYFASINA ID OLMADAN GİRİLDİYSE HATA GÖSTER[cite: 17]
if (isUpdatePage && !urlId) {
    if (form) form.style.display = "none"; // Formu gizle
    
    const errorDiv = document.createElement("div");
    errorDiv.innerHTML = `
        <div style="border: 1px solid #d9534f; background-color: #f9f2f2; color: #d9534f; padding: 20px; border-radius: 5px; margin: 20px 0;">
            Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.
        </div>
        <a href="etkinlikler.html" style="background-color: #2b7a2b; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Etkinliklere git</a>
    `;
    document.querySelector("main") ? document.querySelector("main").appendChild(errorDiv) : document.body.appendChild(errorDiv);
}

if (form && (!isUpdatePage || (isUpdatePage && urlId))) {
    // 2. FORMU VERİYLE DOLDUR (GÜNCELLEME İÇİN)
    if (isUpdatePage && urlId) {
        const etkinlik = events.find(e => e.id === urlId);
        if (etkinlik) {
            const inputs = form.elements;
            if(inputs["title"]) inputs["title"].value = etkinlik.title;
            if(inputs["category"]) inputs["category"].value = etkinlik.category;
            if(inputs["time"]) inputs["time"].value = etkinlik.time;
            if(inputs["location"]) inputs["location"].value = etkinlik.location;
            if(inputs["capacity"]) inputs["capacity"].value = etkinlik.capacity;
            if(inputs["description"]) inputs["description"].value = etkinlik.description;
            
            if(inputs["date"] && etkinlik.date) {
                const [gun, ay, yil] = etkinlik.date.split("-");
                inputs["date"].value = `${yil}-${ay}-${gun}`;
            }
        }
    }

    // 3. KAYDET BUTONUNA BASILINCA VERİYİ EKRANA JS FORMATINDA BAS[cite: 16]
    form.addEventListener("submit", function(e) {
        e.preventDefault(); 
        
        // Formdaki verileri name etiketlerine göre topluyoruz
        const formData = new FormData(form);
        const veri = Object.fromEntries(formData.entries());

        // Ekrana basmak için sonuc alanı oluşturuyoruz (yoksa)
        let sonucAlani = document.querySelector("#form-sonucu");
        if (!sonucAlani) {
            sonucAlani = document.createElement("pre");
            sonucAlani.id = "form-sonucu";
            sonucAlani.style.backgroundColor = "#f4f4f4";
            sonucAlani.style.padding = "15px";
            sonucAlani.style.border = "1px solid #ccc";
            sonucAlani.style.marginTop = "20px";
            sonucAlani.style.whiteSpace = "pre-wrap";
            form.parentNode.insertBefore(sonucAlani, form.nextSibling);
        }

        // Veriyi ekrana JSON objesi olarak yazdır
        sonucAlani.textContent = JSON.stringify(veri, null, 4);
    });
}