// config.js - Konfigurasi Terpusat untuk Integrasi Google Sheets
// File ini berisi semua konfigurasi database dan endpoint

const CONFIG = {
  // GOOGLE SHEETS DATABASE
  SHEETS: {
    // Database utama untuk data kelas dan peserta
    MAIN_DATABASE: {
      ID: '1iboA7jGZUA07-nyD8HQ3VBknfpCZRJ35jhtjMqsnA58',
      SHEETS: {
        KELAS_LOKUS: 'Kelas dan Lokus',
        BIODATA_PESERTA: 'Biodata Peserta',
        ABSENSI: 'Absensi Peserta',
        FASILITATOR: 'Data Fasilitator'
      }
    }
  },

  // GOOGLE APPS SCRIPT ENDPOINTS
  ENDPOINTS: {
    BIODATA: 'https://script.google.com/macros/s/AKfycby4G6r3KpbeV8cQRTeo9KmynT4xlaujniw_G0nrmlbKn0cn0I5bL3rPyua2cRXMQOEi/exec',
    ABSENSI: 'https://script.google.com/macros/s/AKfycby4G6r3KpbeV8cQRTeo9KmynT4xlaujniw_G0nrmlbKn0cn0I5bL3rPyua2cRXMQOEi/exec',
    FASILITATOR: 'https://script.google.com/macros/s/AKfycby4G6r3KpbeV8cQRTeo9KmynT4xlaujniw_G0nrmlbKn0cn0I5bL3rPyua2cRXMQOEi/exec'
  },

  // KONFIGURASI FORM
  FORMS: {
    BIODATA: {
      requiredFields: ['nama', 'tempat_lahir', 'tanggal_lahir', 'jabatan', 'agama', 'jenis_kelamin', 'unit_kerja', 'kabupaten_kota', 'provinsi', 'alamat_rumah', 'email', 'no_wa'],
      validation: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^(\+62|62|0)8[1-9][0-9]{6,9}$/
      }
    },
    PETUGAS_NARASUMBER: {
      requiredFields: ['tipe_pengguna', 'nama', 'tempat_lahir', 'tanggal_lahir', 'jabatan', 'agama', 'jenis_kelamin', 'unit_kerja', 'kabupaten_kota', 'provinsi', 'alamat_rumah', 'email', 'no_wa'],
      narasumberFields: ['bidang_keahlian', 'kualifikasi'],
      validation: {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^(\+62|62|0)8[1-9][0-9]{6,9}$/,
        nip: /^\d{18}$/,
        npwp: /^\d{2}\.\d{3}\.\d{3}\.\d{1}-\d{3}\.\d{3}$/
      }
    },
    ABSENSI: {
      requiredFields: ['nama_peserta', 'status', 'tanggal', 'alasan']
    }
  },

  // PENGATURAN CACHE
  CACHE: {
    DURATION: 5 * 60 * 1000, // 5 menit dalam milidetik
    ENABLED: true
  },

  // PENGATURAN ERROR HANDLING
  ERROR_MESSAGES: {
    NETWORK_ERROR: 'Gagal terhubung ke server. Periksa koneksi internet Anda.',
    VALIDATION_ERROR: 'Mohon lengkapi semua field yang wajib diisi.',
    SUBMIT_SUCCESS: 'Data berhasil dikirim! Terima kasih.',
    SUBMIT_FAILED: 'Gagal mengirim data. Silakan coba lagi atau hubungi admin.'
  }
};

// Export untuk penggunaan di file lain
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
} else {
  window.CONFIG = CONFIG;
}

console.log('✅ Konfigurasi Google Sheets berhasil dimuat');
console.log('📊 Database ID:', CONFIG.SHEETS.MAIN_DATABASE.ID);
console.log('🔗 Endpoints tersedia:', Object.keys(CONFIG.ENDPOINTS).length);
