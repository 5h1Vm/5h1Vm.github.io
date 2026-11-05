/**
 * 5h1Vm Lab · Gallery (gallery.js)
 * Arrow buttons + frame counter for the swipeable photo row.
 * The card nearest the front of the track gets .is-active (straightens + lifts).
 * Scrolling itself is plain CSS scroll-snap. Zero dependencies.
 */
(function(window) {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('[data-gallery]');
    const prev = document.querySelector('[data-gallery-prev]');
    const next = document.querySelector('[data-gallery-next]');
    if (!track || !prev || !next) return;

    const count = document.querySelector('[data-gallery-count]');
    const cards = Array.from(track.querySelectorAll('.polaroid'));
    const pad = n => String(n).padStart(2, '0');
    let activeIdx = 0;

    const step = () => Math.max(track.clientWidth * 0.8, 200);

    // nearest card to the front edge of the visible track
    const nearestCard = () => {
      const sl = track.scrollLeft;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const d = Math.abs(card.offsetLeft - sl);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      return best;
    };

    const update = () => {
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;

      const i = nearestCard();
      if (i !== activeIdx) {
        cards[activeIdx] && cards[activeIdx].classList.remove('is-active');
        activeIdx = i;
        cards[activeIdx].classList.add('is-active');
        if (count) count.textContent = pad(activeIdx + 1) + ' / ' + pad(cards.length);
      }
    };

    // initial state: first card active, counter set
    cards[0] && cards[0].classList.add('is-active');
    if (count) count.textContent = pad(1) + ' / ' + pad(cards.length);

    prev.addEventListener('click', () => {
      const t = cards[Math.max(activeIdx - 1, 0)];
      t && track.scrollTo({ left: t.offsetLeft, behavior: 'smooth' });
    });
    next.addEventListener('click', () => {
      const t = cards[Math.min(activeIdx + 1, cards.length - 1)];
      t && track.scrollTo({ left: t.offsetLeft, behavior: 'smooth' });
    });
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });
})(window);
