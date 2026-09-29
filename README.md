# Gesture Battle — Asmaul Husna

Versi arsitektur:
- Frontend game: GitHub Pages / hosting HTTPS biasa.
- Kamera + MediaPipe: berjalan di frontend.
- Backend opsional: Google Apps Script.
- Data skor opsional: Google Sheets.

## Kenapa frontend dipisah dari Apps Script?
HTML Service Apps Script berjalan dalam sandbox/iframe sehingga akses kamera dapat ditolak. Game ini menempatkan kode kamera dan computer vision pada halaman HTTPS biasa.

## 1. Pasang frontend di GitHub Pages

Buat repository baru, misalnya:
`gesture-battle-pai`

Upload:
`index.html`

GitHub Pages dapat menerbitkan situs statis langsung dari repository. Lihat dokumentasi resmi:
https://docs.github.com/en/pages/getting-started-with-github-pages

Setelah aktif, URL biasanya berbentuk:
`https://USERNAME.github.io/gesture-battle-pai/`

Buka URL tersebut menggunakan Chrome/Edge. Kamera akan meminta izin setelah tombol MULAI GAME ditekan.

## 2. Opsional: aktifkan Google Apps Script sebagai backend skor

Buat project Apps Script baru dan tambahkan:
`Code.gs`
`appsscript.json`

Jika ingin menyimpan skor:
1. Buat Google Sheet.
2. Salin ID spreadsheet dari URL.
3. Masukkan ke `SPREADSHEET_ID` di Code.gs.
4. Deploy > New deployment > Web app.
5. Execute as: Me.
6. Access: Anyone.
7. Salin URL `/exec`.

Kemudian buka `index.html` dan cari:
`const GAS_ENDPOINT="";`

Isi menjadi:
`const GAS_ENDPOINT="URL_WEB_APP_ANDA";`

Frontend akan mengirim skor akhir P1/P2 ke Apps Script.

## 3. Alur game

- 2 pemain di depan satu kamera.
- P1 berada di sisi kiri, P2 di sisi kanan.
- Jawaban muncul sebagai banyak lingkaran.
- Lingkaran jatuh dari atas.
- Telapak terbuka digunakan sebagai catcher.
- Tangan bertabrakan dengan lingkaran untuk memilih jawaban.
- Benar: +10.
- Salah: umpan balik penjelasan.
- Timer 15 detik per soal.
- 20 soal Asmaul Husna.
- Setelah selesai muncul hasil kedua pemain.

## Catatan
Model MediaPipe dan WASM dimuat dari CDN saat game dimulai. Untuk penggunaan sekolah yang sangat bergantung pada internet, sebaiknya nanti kita tambahkan cache/service worker atau hosting asset sendiri.
