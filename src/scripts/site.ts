import { inquiryMessage, whatsappUrl } from '../lib/booking.mjs';

const mobileNav = document.querySelector<HTMLDetailsElement>('.mobile-nav')!;
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => { mobileNav.open = false; });
});
mobileNav.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobileNav.open) {
    mobileNav.open = false;
    mobileNav.querySelector('summary')?.focus();
  }
});

const sticky = document.querySelector<HTMLElement>('.sticky-contact')!;
const hero = document.querySelector<HTMLElement>('.hero')!;
const closing = document.querySelector<HTMLElement>('.closing')!;
const observer = new IntersectionObserver(entries => {
  sticky.hidden = hero.getBoundingClientRect().bottom > 0 ||
    closing.getBoundingClientRect().top < window.innerHeight ||
    entries.some(entry => entry.target === closing && entry.isIntersecting);
});
observer.observe(hero);
observer.observe(closing);

const gallery = document.querySelector<HTMLElement>('.gallery-grid')!;
const filters = document.querySelector<HTMLElement>('.gallery-filters')!;
const filterButtons = [...filters.querySelectorAll<HTMLButtonElement>('button')];
const allFilter = filters.querySelector<HTMLButtonElement>('[data-filter="semua"]')!;
const openAll = document.querySelector<HTMLButtonElement>('[data-open-all]')!;
const dialog = document.querySelector<HTMLDialogElement>('.lightbox')!;
const image = dialog.querySelector<HTMLImageElement>('img')!;
const caption = dialog.querySelector<HTMLParagraphElement>('p')!;
const close = dialog.querySelector<HTMLButtonElement>('[data-close]')!;
const steps = [...dialog.querySelectorAll<HTMLButtonElement>('[data-step]')];
const photos = [...gallery.querySelectorAll<HTMLAnchorElement>('[data-photo]')].map(link => {
  const figure = link.closest('figure')!;
  return {
    link, figure,
    group: figure.dataset.group,
    caption: figure.querySelector('figcaption')!.textContent!,
    alt: link.querySelector('img')!.alt,
  };
});
let visiblePhotos = photos;
let lightboxPhotos = photos;
let current = 0;

function showPhoto(index: number) {
  current = (index + lightboxPhotos.length) % lightboxPhotos.length;
  const photo = lightboxPhotos[current];
  image.src = photo.link.href;
  image.alt = photo.alt;
  caption.textContent = `${photo.caption} · ${current + 1} / ${lightboxPhotos.length}`;
}

function openLightbox(photo: (typeof photos)[number], collection: typeof photos) {
  lightboxPhotos = collection;
  steps.forEach(button => { button.disabled = collection.length < 2; });
  showPhoto(collection.indexOf(photo));
  dialog.showModal();
}

filters.hidden = false;
openAll.hidden = false;
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const group = button.dataset.filter!;
    gallery.dataset.view = group;
    visiblePhotos = group === 'semua' ? photos : photos.filter(photo => photo.group === group);
    photos.forEach(photo => {
      photo.figure.hidden = group !== 'semua' && photo.group !== group;
    });
    openAll.hidden = group === 'semua';
    filterButtons.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
  });
});
photos.forEach(photo => {
  photo.link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openLightbox(photo, visiblePhotos);
  });
});
openAll.addEventListener('click', () => {
  allFilter.click();
  allFilter.focus();
});
close.addEventListener('click', () => dialog.close());
steps.forEach(button => {
  button.addEventListener('click', () => showPhoto(current + Number(button.dataset.step)));
});
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showPhoto(current + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});
let swipeStart: Touch | undefined;
image.addEventListener('touchstart', event => {
  swipeStart = event.touches.length === 1 ? event.touches[0] : undefined;
}, { passive: true });
image.addEventListener('touchend', event => {
  if (!swipeStart) return;
  const end = event.changedTouches[0];
  const x = end.clientX - swipeStart.clientX;
  const y = end.clientY - swipeStart.clientY;
  if (Math.abs(x) > 44 && Math.abs(x) > Math.abs(y)) showPhoto(current + (x < 0 ? 1 : -1));
  swipeStart = undefined;
}, { passive: true });

const inquiry = document.querySelector<HTMLFormElement>('#inquiry')!;
inquiry.querySelector<HTMLInputElement>('[name="date"]')!.min = new Intl.DateTimeFormat('sv-SE', {
  timeZone: 'Asia/Jakarta', dateStyle: 'short',
}).format(new Date());
inquiry.addEventListener('submit', event => {
  event.preventDefault();
  const fields = new FormData(inquiry);
  const message = inquiryMessage({
    date: String(fields.get('date')),
    event: String(fields.get('event')),
    guests: String(fields.get('guests')),
  });
  window.location.assign(whatsappUrl(message));
});
inquiry.hidden = false;
