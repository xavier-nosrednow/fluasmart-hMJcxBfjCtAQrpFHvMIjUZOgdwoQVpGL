(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     Toast helper
  --------------------------------------------------------------------- */
  const toastEl = document.getElementById('toast');
  let toastTimer = null;
  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2600);
  }

  /* ---------------------------------------------------------------------
     Header actions (mock)
  --------------------------------------------------------------------- */
  document.getElementById('backBtn')?.addEventListener('click', () => {
    showToast('Voltar (ação simulada)');
  });

  document.getElementById('cartBtn')?.addEventListener('click', () => {
    showToast('Carrinho: 24 itens');
  });

  document.getElementById('menuBtn')?.addEventListener('click', () => {
    showToast('Menu (ação simulada)');
  });

  document.getElementById('notifBtn')?.addEventListener('click', () => {
    showToast('Notificações (ação simulada)');
  });

  document.getElementById('searchForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = e.target.querySelector('.search-form__input').value.trim();
    showToast(value ? `Pesquisando por "${value}"…` : 'Digite algo para pesquisar');
  });

  /* ---------------------------------------------------------------------
     Categories carousel
  --------------------------------------------------------------------- */
  const catTrack = document.getElementById('catTrack');
  const catPrev = document.getElementById('catPrev');
  const catNext = document.getElementById('catNext');
  const SCROLL_STEP = 220;

  function updateCarouselButtons() {
    if (!catTrack) return;
    const maxScroll = catTrack.scrollWidth - catTrack.clientWidth;
    catPrev.disabled = catTrack.scrollLeft <= 4;
    catNext.disabled = catTrack.scrollLeft >= maxScroll - 4;
  }

  catPrev?.addEventListener('click', () => {
    catTrack.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' });
  });
  catNext?.addEventListener('click', () => {
    catTrack.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' });
  });
  catTrack?.addEventListener('scroll', updateCarouselButtons);
  window.addEventListener('resize', updateCarouselButtons);
  updateCarouselButtons();

  document.querySelectorAll('.category').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.category').forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      showToast(`Categoria selecionada: ${btn.dataset.cat}`);
    });
  });

  /* ---------------------------------------------------------------------
     Gallery — click a thumbnail to swap the main image
  --------------------------------------------------------------------- */
  const galleryMain = document.getElementById('galleryMain');
  const thumbs = document.querySelectorAll('.thumb');

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const currentMainSrc = galleryMain.src;
      const nextSrc = thumb.dataset.full;

      // Swap main image
      galleryMain.src = nextSrc;

      // Swap this thumbnail's own preview with the previous main image,
      // so the gallery always shows a different picture in the slot
      const thumbImg = thumb.querySelector('img');
      thumbImg.src = currentMainSrc;
      thumb.dataset.full = currentMainSrc;

      thumbs.forEach((t) => t.classList.remove('thumb--active'));
      thumb.classList.add('thumb--active');
    });
  });

  /* ---------------------------------------------------------------------
     Grade dropdown (Selecione a Grade)
  --------------------------------------------------------------------- */
  const gradeBtn = document.getElementById('gradeBtn');
  const gradeOptions = document.getElementById('gradeOptions');
  const gradeValue = document.getElementById('gradeValue');

  function closeGradeOptions() {
    gradeOptions.hidden = true;
    gradeBtn.setAttribute('aria-expanded', 'false');
  }

  gradeBtn?.addEventListener('click', () => {
    const isOpen = !gradeOptions.hidden;
    gradeOptions.hidden = isOpen;
    gradeBtn.setAttribute('aria-expanded', String(!isOpen));
  });

  gradeOptions?.addEventListener('click', (e) => {
    const option = e.target.closest('li');
    if (!option) return;
    gradeValue.textContent = option.textContent;
    closeGradeOptions();
  });

  gradeOptions?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      gradeValue.textContent = e.target.textContent;
      closeGradeOptions();
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.buy-box__grade')) closeGradeOptions();
  });

  /* ---------------------------------------------------------------------
     Primary actions (mock — no backend)
  --------------------------------------------------------------------- */
  document.getElementById('stockBtn')?.addEventListener('click', () => {
    showToast(`Consultando estoque da grade ${gradeValue.textContent}…`);
  });

  document.getElementById('manualBtn')?.addEventListener('click', () => {
    showToast('Manual de montagem (download simulado)');
  });

  /* ---------------------------------------------------------------------
     Tabs
  --------------------------------------------------------------------- */
  const tabButtons = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabButtons.forEach((t) => {
        t.classList.remove('tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      tabContents.forEach((c) => c.classList.remove('tab-content--active'));

      tab.classList.add('tab--active');
      tab.setAttribute('aria-selected', 'true');
      document.getElementById(`tab-${tab.dataset.tab}`)?.classList.add('tab-content--active');
    });
  });

  /* ---------------------------------------------------------------------
     Similar products (mock navigation)
  --------------------------------------------------------------------- */
  document.querySelectorAll('.similar-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const name = card.querySelector('.similar-card__name').textContent;
      showToast(`Abrindo produto: ${name}`);
    });
  });
})();
