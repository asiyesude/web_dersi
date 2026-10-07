import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");

function createCard(event) {
    const [gun, ay, yil] = event.date.split("-");
    const tarihFormatli = new Date(yil, ay - 1, gun).toLocaleDateString("tr-TR", { 
        day: "numeric", 
        month: "long", 
        year: "numeric" 
    });

    return `
        <article class="kart">
            <h3>${event.title}</h3>
            <p>${event.category} · <time datetime="${yil}-${ay}-${gun}">${tarihFormatli}</time></p>
            <a href="etkinlik-detay.html?id=${event.id}">Detayları gör &rarr;</a>
        </article>
    `;
}

function render(dizi) {
    if (list) {
        list.innerHTML = dizi.map(createCard).join("");
    }
}

if (list) {
    if (list.dataset.limit) {
        const yaklasan = [...events]
            .sort((a, b) => a.date.localeCompare(b.date))
            .slice(0, Number(list.dataset.limit));
        render(yaklasan);
    } else {
        render(events);
    }
}
// --- ADIM 7: FİLTRELEME İŞLEMLERİ ---
const aramaKutusu = document.querySelector("#arama");
const kategoriSecici = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");
const filtreFormu = document.querySelector("#filtre-formu");

// Eğer sayfada filtre formu varsa bu kodlar çalışsın
if (filtreFormu) {
    // 1. Kategorileri benzersiz olarak bulup menüye ekliyoruz
    const kategoriler = [...new Set(events.map(e => e.category))];
    kategoriler.forEach(kategori => {
        const option = document.createElement("option");
        option.value = kategori;
        option.textContent = kategori;
        kategoriSecici.appendChild(option);
    });

    // 2. Filtreleme Motoru
    function filtrele() {
        const aranan = aramaKutusu.value.toLocaleLowerCase("tr-TR");
        const secilenKategori = kategoriSecici.value;

        const sonuc = events.filter(e => {
            const metinUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan) || 
                                e.description.toLocaleLowerCase("tr-TR").includes(aranan);
            const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;
            
            return metinUyuyor && kategoriUyuyor;
        });

        // Kalan kartları sayfaya basıyoruz
        render(sonuc);
        
        // Sonuç sayısını güncelliyoruz
        if (sonuc.length > 0) {
            sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
        } else {
            sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
        }
    }

    // 3. Kullanıcı kutuya yazdıkça veya menüyü değiştirdikçe filtreyi çalıştır
    aramaKutusu.addEventListener("input", filtrele);
    kategoriSecici.addEventListener("change", filtrele);
    
    // Enter tuşunun sayfayı yenilemesini engelle
    filtreFormu.addEventListener("submit", (e) => {
        e.preventDefault();
    });

    // Sayfa ilk yüklendiğinde "6 etkinlik listeleniyor" yazması için bir kez çalıştırıyoruz
    filtrele();
}