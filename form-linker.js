// Link dropdown "Kelompok" pada form ke data kelas dari spreadsheet
// Halaman target: form-smpn1-peserta.html, form-smpn2-peserta.html

document.addEventListener('DOMContentLoaded', async () => {
  const select = document.getElementById('kelompok');
  if (!select) return;

  // Load Sheets API if available
  if (!window.SheetsAPI) {
    console.warn('SheetsAPI belum dimuat. Tambahkan <script src="sheets.js" defer></script>');
    return;
  }

  const classes = await window.SheetsAPI.getClasses();
  if (!classes.length) return;

  // Tentukan lokus default berdasarkan halaman
  const isSmpn1 = document.body.innerHTML.includes('SMPN 1 Bangil');
  const isSmpn2 = document.body.innerHTML.includes('SMPN 2 Pandaan');

  let filtered = classes;
  if (isSmpn1) filtered = classes.filter(c => (c.lokus || '').toLowerCase().includes('smpn 1 bangil'));
  if (isSmpn2) filtered = classes.filter(c => (c.lokus || '').toLowerCase().includes('smpn 2 pandaan'));

  // Kosongkan opsi awal kecuali placeholder pertama
  for (let i = select.options.length - 1; i >= 1; i--) select.remove(i);

  for (const c of filtered) {
    const opt = document.createElement('option');
    const name = `${c.jenjang}_${c.kabupaten}_${c.noKelas || ''}`.replace(/__+/g, '_').replace(/_$/,'');
    opt.value = name;
    opt.textContent = name;
    select.appendChild(opt);
  }
});

