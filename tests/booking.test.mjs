import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import { inquiryMessage, messages, whatsappUrl } from '../src/lib/booking.mjs';

test('WhatsApp links keep the official recipient and each CTA message', () => {
  for (const message of Object.values(messages)) {
    const url = new URL(whatsappUrl(message));
    assert.equal(url.origin + url.pathname, 'https://wa.me/6281322172075');
    assert.equal(url.searchParams.get('text'), message);
  }
});

test('inquiry adds the local date, event, and guest estimate without changing the recipient', () => {
  const message = inquiryMessage({ date: '2027-02-01', event: 'Akad & syukuran', guests: '80' });
  assert.match(message, /Tanggal: 1 Februari 2027\nJenis acara: Akad & syukuran\nEstimasi tamu: 80 orang$/);
  assert.equal(new URL(whatsappUrl(message)).searchParams.get('text'), message);
});
