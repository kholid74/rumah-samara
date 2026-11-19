const whatsappNumber = '6281322172075';

export const messages = {
  date: 'Halo SAMARA, saya ingin cek ketersediaan venue untuk tanggal ...',
  price: 'Halo SAMARA, saya ingin tanya detail sewa Rp2.500.000 dan fasilitasnya.',
  decoration: 'Halo SAMARA, saya ingin tanya harga khusus dengan Atha Decoration.',
  visit: 'Halo SAMARA, saya ingin jadwalkan survei lokasi.',
  general: 'Halo SAMARA, saya ingin berdiskusi tentang rencana acara keluarga di SAMARA.',
};

export function whatsappUrl(message) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function inquiryMessage({ date, event, guests }) {
  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(new Date(date));

  return [
    'Halo SAMARA, saya ingin cek ketersediaan venue untuk rencana acara berikut.',
    `Tanggal: ${formattedDate}`,
    `Jenis acara: ${event}`,
    `Estimasi tamu: ${guests} orang`,
  ].join('\n');
}
