# 🎓 Pelatihan Pembelajaran Mendalam - Sistem Database Google Sheets

## 📊 **Integrasi Database Google Sheets**

Website ini menggunakan **Google Sheets** sebagai pusat database untuk menyimpan dan mengelola data pelatihan.

### 🔗 **Link Database Utama**
- **Google Sheets ID:** `1iboA7jGZUA07-nyD8HQ3VBknfpCZRJ35jhtjMqsnA58`
- **URL:** [Klik di sini untuk membuka database](https://docs.google.com/spreadsheets/d/1iboA7jGZUA07-nyD8HQ3VBknfpCZRJ35jhtjMqsnA58/edit)

## 🗂️ **Struktur Database**

### **Sheet 1: Kelas dan Lokus**
- Data kelas pelatihan
- Lokasi penyelenggaraan
- Jumlah peserta
- Jenjang pendidikan

### **Sheet 2: Biodata Peserta**
- Informasi lengkap peserta
- Data pribadi dan profesional
- Kontak dan alamat

### **Sheet 3: Absensi Peserta**
- Rekam kehadiran
- Status kehadiran
- Tanggal dan alasan

### **Sheet 4: Data Fasilitator**
- Informasi fasilitator
- Kualifikasi dan pengalaman

## ⚙️ **Konfigurasi Sistem**

### **File Konfigurasi: `config.js`**
```javascript
const CONFIG = {
  SHEETS: {
    MAIN_DATABASE: {
      ID: '1iboA7jGZUA07-nyD8HQ3VBknfpCZRJ35jhtjMqsnA58'
    }
  },
  ENDPOINTS: {
    BIODATA: 'https://script.google.com/macros/s/...',
    ABSENSI: 'https://script.google.com/macros/s/...'
  }
};
```

### **File Integrasi: `sheets.js`**
- Mengambil data dari Google Sheets
- Parsing CSV data
- Cache management

### **File Submit: `submit.js`**
- Kirim data form ke Google Apps Script
- Validasi input
- Error handling

## 🚀 **Cara Menggunakan**

### **1. Akses Database**
- Buka link Google Sheets di atas
- Pastikan memiliki akses edit
- Struktur kolom harus sesuai dengan kode

### **2. Update Data**
- Edit langsung di Google Sheets
- Data otomatis ter-update di website
- Refresh halaman untuk melihat perubahan

### **3. Backup Data**
- Download sebagai Excel/CSV
- Simpan di folder aman
- Lakukan backup berkala

## 🔧 **Troubleshooting**

### **Masalah Umum:**
1. **Data tidak muncul**
   - Periksa koneksi internet
   - Pastikan sheet name benar
   - Cek console browser untuk error

2. **Form tidak bisa submit**
   - Periksa Google Apps Script
   - Pastikan endpoint aktif
   - Cek permission Google Sheets

3. **Cache tidak update**
   - Hard refresh browser (Ctrl+F5)
   - Tunggu 5 menit untuk auto-refresh
   - Clear browser cache

## 📱 **Fitur Website**

### **Halaman Utama (`index.html`)**
- Dashboard dengan tombol aksi
- Background animasi yang hidup
- Navigasi ke semua fitur

### **Form Biodata (`biodata.html`)**
- Input data lengkap peserta
- Validasi otomatis
- Submit ke Google Sheets

### **Daftar Kelas (`kelas.html`)**
- Tampilan data kelas real-time
- Filter berdasarkan kriteria
- Update otomatis dari database

### **Absensi (`peserta-tidak-hadir.html`)**
- Rekam kehadiran peserta
- Status kehadiran
- Alasan ketidakhadiran

## 🎨 **Styling & Animasi**

### **CSS Features:**
- Background gradient yang bergerak
- Efek glassmorphism
- Animasi floating particles
- Responsive design
- Modern UI/UX

### **JavaScript Features:**
- Real-time data fetching
- Form validation
- Error handling
- Cache management

## 🔐 **Keamanan**

### **Yang Sudah Diterapkan:**
- Validasi input di client-side
- Sanitasi data sebelum submit
- Rate limiting di Google Apps Script
- Error handling yang aman

### **Yang Perlu Diperhatikan:**
- Jangan share Google Sheets ID publik
- Batasi akses edit hanya untuk admin
- Backup data secara berkala
- Monitor penggunaan API

## 📞 **Support & Maintenance**

### **Untuk Admin:**
- Monitor Google Apps Script quota
- Backup data berkala
- Update struktur database sesuai kebutuhan
- Test fitur setelah perubahan

### **Untuk User:**
- Laporkan bug melalui form
- Berikan feedback untuk improvement
- Ikuti panduan penggunaan

---

## 🎯 **Status Sistem**

- ✅ **Database:** Terhubung ke Google Sheets
- ✅ **Form:** Terintegrasi dengan Google Apps Script
- ✅ **UI/UX:** Modern dan responsive
- ✅ **Animasi:** Background yang hidup
- ✅ **Validation:** Client-side dan server-side
- ✅ **Error Handling:** Comprehensive

**Last Updated:** $(Get-Date -Format "dd/MM/yyyy HH:mm")
**Version:** 2.0
**Status:** Production Ready 🚀