// Minimal Google Sheets integration for public sheets via GViz CSV
// Config
const SHEET_ID = '1iboA7jGZUA07-nyD8HQ3VBknfpCZRJ35jhtjMqsnA58';
// Adjust this to the exact sheet/tab name that contains the class listing
// Common candidates based on the shared document: "Kelas dan Lokus", "Kelas Peserta", or similar.
const SHEET_NAME_CLASSES = 'Kelas dan Lokus';

async function fetchCsvFromGoogleSheet(sheetId, sheetName) {
  const url = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error('Gagal mengambil data dari Google Sheets');
  return await response.text();
}

function parseCsv(csvText) {
  // Simple CSV parser that handles quoted values and commas inside quotes
  const rows = [];
  let current = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const next = csvText[i + 1];
    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++; // skip escaped quote
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        current.push(field);
        field = '';
      } else if (char === '\n') {
        current.push(field);
        rows.push(current);
        current = [];
        field = '';
      } else if (char === '\r') {
        // ignore CR
      } else {
        field += char;
      }
    }
  }
  if (field.length > 0 || current.length > 0) {
    current.push(field);
    rows.push(current);
  }
  return rows;
}

function slugifyHeader(h) {
  return (h || '')
    .toLowerCase()
    .replace(/\.+/g, '')
    .replace(/\s+\/\s+/g, ' ') // normalize like Kab./Kota
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function mapRowsToObjects(rows) {
  if (!rows || rows.length === 0) return [];
  const header = rows[0].map(slugifyHeader);
  return rows.slice(1).filter(r => r.some(c => String(c || '').trim() !== '')).map(r => {
    const obj = {};
    for (let i = 0; i < header.length; i++) {
      const key = header[i] || `col_${i}`;
      obj[key] = r[i] !== undefined ? r[i] : '';
    }
    return obj;
  });
}

function normalizeClassRecord(rec) {
  // Expected keys from sheet header
  // no, nama_kelas, kab_kota_penyelenggaraan, jenjang, no_kelas, tahap_fixed, lokus, kecamatan_lokus, jumlah_peserta
  return {
    namaKelas: rec.nama_kelas || rec['nama_kelas'] || rec['nama'] || '',
    kabupaten: rec.kab_kota_penyelenggaraan || rec['kab_kota'] || rec['kabupaten'] || '',
    jenjang: rec.jenjang || '',
    noKelas: rec.no_kelas || '',
    tahap: rec.tahap_fixed || rec.tahap || '',
    lokus: rec.lokus || '',
    kecamatan: rec.kecamatan_lokus || rec.kecamatan || '',
    jumlahPeserta: rec.jumlah_peserta || '',
  };
}

const SheetsAPI = (() => {
  let cachedClasses = null;
  let lastError = null;

  async function getClasses() {
    if (cachedClasses) return cachedClasses;
    try {
      const csv = await fetchCsvFromGoogleSheet(SHEET_ID, SHEET_NAME_CLASSES);
      const rows = parseCsv(csv);
      const objs = mapRowsToObjects(rows).map(normalizeClassRecord)
        .filter(x => x.namaKelas && x.lokus);
      cachedClasses = objs;
      return objs;
    } catch (e) {
      lastError = e;
      console.error('SheetsAPI error:', e);
      return [];
    }
  }

  function uniqueValues(items, key) {
    return Array.from(new Set(items.map(i => (i[key] || '').toString().trim()).filter(Boolean))).sort();
  }

  return { getClasses, uniqueValues, getLastError: () => lastError };
})();

// Expose globally
window.SheetsAPI = SheetsAPI;

