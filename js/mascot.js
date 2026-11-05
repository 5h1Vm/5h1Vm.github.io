/**
 * 5h1Vm Lab · Lizard Greeter (mascot.js)
 * A small waving gif that says hi and cycles a few lines on click.
 * Zero dependencies.
 */
(function(window) {
  'use strict';

  const LINES = [
    "hey 👋 i just wave. the real stuff is on this page.",
    "recruiter? the résumé is top right. i checked.",
    "every repetitive task is a script waiting to exist.",
    "memory forensics: the art of arguing with RAM politely.",
    "the backups are immutable. my loyalty is not a metric.",
    "i'm technically a gif. try not to hold it against me."
  ];

  class MascotGreeter {
    constructor() {
      this.index = -1;
      this.bubbleTimeout = null;
      this.init();
    }

    init() {
      document.addEventListener('DOMContentLoaded', () => {
        this.btn = document.getElementById('mascot-sticker');
        this.msg = document.getElementById('mascot-msg');

        if (this.btn) {
          this.btn.addEventListener('click', () => this.next());
        }

        // first hello, shortly after load
        setTimeout(() => this.show(LINES[0], 5000), 1500);
      });
    }

    next() {
      this.index = (this.index + 1) % LINES.length;
      this.show(LINES[this.index], 4600);
      if (this.btn) {
        this.btn.classList.remove('bop');
        void this.btn.offsetWidth; // restart animation
        this.btn.classList.add('bop');
        setTimeout(() => this.btn.classList.remove('bop'), 500);
      }
    }

    show(text, duration = 4500) {
      if (!this.msg) return;
      this.msg.textContent = text;
      this.msg.classList.add('show');
      clearTimeout(this.bubbleTimeout);
      this.bubbleTimeout = setTimeout(() => {
        this.msg.classList.remove('show');
      }, duration);
    }
  }

  window.MascotGreeter = new MascotGreeter();
})(window);
