// Fungsi untuk meminta izin notifikasi
function requestNotificationPermission() {
    if ("Notification" in window) {
        Notification.requestPermission();
    }
}

// Fungsi untuk mengirim notifikasi
function showUpdateNotification(articleTitle) {
    if (Notification.permission === "granted") {
        new Notification("Neural Logic Update!", {
            body: `Artikel Baru: ${articleTitle}`,
            icon: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=100" // Gunakan logo NL kamu
        });
    }
}

// Logika pengecekan update (simulasi)
function checkForUpdates(newData) {
    const lastId = localStorage.getItem('lastArticleId');
    const currentLatestId = newData[0].id;

    if (lastId && currentLatestId > lastId) {
        showUpdateNotification(newData[0].title);
    }
    
    // Simpan ID terbaru ke memori browser
    localStorage.setItem('lastArticleId', currentLatestId);
}

// Panggil di dalam fungsi fetch data kamu
// requestNotificationPermission(); 
// checkForUpdates(data);
