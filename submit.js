// submit.js - Handle form submissions to Google Apps Script Web App endpoints

// CONFIG: Ganti URL di bawah ini dengan URL Web App (Deploy → New deployment) dari Apps Script Anda
const ENDPOINT_BIODATA = 'https://script.google.com/macros/s/AKfycby4G6r3KpbeV8cQRTeo9KmynT4xlaujniw_G0nrmlbKn0cn0I5bL3rPyua2cRXMQOEi/exec';
const ENDPOINT_ABSENCE = 'https://script.google.com/macros/s/AKfycby4G6r3KpbeV8cQRTeo9KmynT4xlaujniw_G0nrmlbKn0cn0I5bL3rPyua2cRXMQOEi/exec';

function serializeForm(form) {
  const formData = new FormData(form);
  const data = {};
  for (const [key, value] of formData.entries()) {
    if (data[key] !== undefined) {
      // combine duplicate keys into array
      data[key] = Array.isArray(data[key]) ? [...data[key], value] : [data[key], value];
    } else {
      data[key] = value;
    }
  }
  // metadata
  data._clientTimestamp = new Date().toISOString();
  data._pageTitle = document.title;
  data._pageUrl = location.href;
  data._userAgent = navigator.userAgent;
  return data;
}

function detectFormType(form) {
  // Absence form contains these fields
  if (form.querySelector('#nama_peserta') && form.querySelector('#status') && form.querySelector('#tanggal')) {
    return 'absence';
  }
  return 'biodata';
}

function toUrlEncoded(data) {
  const params = new URLSearchParams();
  Object.keys(data).forEach((k) => {
    const v = data[k];
    if (Array.isArray(v)) {
      v.forEach((item) => params.append(k, String(item)));
    } else {
      params.append(k, String(v));
    }
  });
  return params.toString();
}

async function postFormUrlEncoded(url, body) {
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: toUrlEncoded(body),
  });
  const text = await resp.text().catch(() => '');
  return { ok: resp.ok, status: resp.status, text };
}

document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const type = detectFormType(form);
      const data = serializeForm(form);
      if (type === 'absence') data.formType = 'absence';
      const endpoint = type === 'absence' ? ENDPOINT_ABSENCE : ENDPOINT_BIODATA;

      const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true; submitBtn.dataset.originalText = submitBtn.textContent; submitBtn.textContent = 'Mengirim...';
      }

      try {
        const res = await postFormUrlEncoded(endpoint, data);
        if (!res.ok) {
          console.error('Submit error', res.status, res.text);
          alert('Gagal mengirim data. Kode: ' + res.status + (res.text ? ('\n' + res.text) : ''));
          return;
        }
        alert('Data berhasil dikirim. Terima kasih.');
        form.reset();
      } catch (e) {
        console.error(e);
        alert('Gagal mengirim data. Periksa koneksi atau hubungi admin.');
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.dataset.originalText || 'Kirim'; }
      }
    });
  });
});


