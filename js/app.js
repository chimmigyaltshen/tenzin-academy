const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwTEA-dn3wfC6yvVwOjJqqyIah8owda_JuwlFLdW7hTVp0przXRXwQdAzb7TjKbZZPn/exec';

const app = {
  theme: 'light',
  currentFormStep: 1,
  lbIndex: 0,
  lbImages: [],

  galleryData: [
    {src:'campuslife.jpg', cap:'Campus Life', cat:'campus'},
    {src:'students.jpg', cap:'Student Activities', cat:'campus'},
    {src:'sports.jpg', cap:'Sports Day', cat:'sports'},
    {src:'classroom.jpg', cap:'Modern Classroom', cat:'academic'},
    {src:'cultural.jpg', cap:'Cultural Celebration', cat:'cultural'},
    {src:'schoolphoto.jpg', cap:'School Annual Photo', cat:'campus'},
    {src:'sports.jpg', cap:'Basketball Tournament', cat:'sports'},
    {src:'cultural.jpg', cap:'Dance Performance', cat:'cultural'},
    {src:'classroom.jpg', cap:'Science Lab', cat:'academic'},
    {src:'campuslife.jpg', cap:'School Grounds', cat:'campus'},
    {src:'students.jpg', cap:'Award Ceremony', cat:'academic'},
    {src:'sports.jpg', cap:'Football Match', cat:'sports'},
  ],

  facultyData: {
    stem: [
      {name:"K.N. Gajmer",photo:"kn_gajmer.jpg",role:"Chemistry",creds:"M.Sc., PGDE | 19 Years"},
      {name:"Tika Ram Subba",photo:"tika_ram_subba.jpg",role:"Physics",creds:"M.Sc., PGDE | 19 Years"},
      {name:"Jigme Tenzin",photo:"jigme_tenzin.jpg",role:"Biology & Chemistry",creds:"B.Ed. | 20 Years"},
      {name:"Sushma Dahal",photo:"sushma_dahal.jpg",role:"Chemistry & Physics",creds:"20 Years"},
      {name:"Yesel Zangmo",photo:"yesel_zangmo.jpg",role:"Chemistry & Biology",creds:"B.Ed. | 15 Years"},
      {name:"Promila Acharya",photo:"promila_acharya.jpg",role:"Biology",creds:"B.Sc. | 12 Years"},
      {name:"Pelden Phuntsho",photo:"pelden_phuntsho.jpg",role:"ICT",creds:"BCA | 15 Years"},
      {name:"Devi Parsad Gurung",photo:"devi_parsad_gurung.jpg",role:"Physics & Maths",creds:"B.Ed | 10 Years"},
      {name:"Chimi Yoezer",photo:"chimi_yoezer.jpg",role:"Mathematics & Physics",creds:"B.Sc. | 8 Years"},
      {name:"Phurpa Wangdi",photo:"phurpa_wangdi.jpg",role:"Chemistry",creds:"B.Sc. | 2 Years"},
      {name:"Ugyen Lhamo",photo:"ugyen_lhamo.jpg",role:"Physics",creds:"M.Ed | 18 Years"},
    ],
    lang: [
      {name:"Ugyen Tenzin",photo:"ugyen_tenzin.jpg",role:"English",creds:"PGDE, B.Ed, MPA | 24 Years"},
      {name:"Shacha",photo:"shacha.jpg",role:"English & Geography",creds:"PGDE, B.Ed, MA, TEFL | 15 Years"},
      {name:"Ganga Maya Ghimery",photo:"ganga_maya_ghimery.jpg",role:"English",creds:"B.A. | 12 Years"},
      {name:"Rigzin Tshogay",photo:"rigzin_tshogay.jpg",role:"English",creds:"B.A. | 2 Years"},
      {name:"Kinzang Namgay",photo:"kinzang_namgay.jpg",role:"Dzongkha",creds:"PGDE | 12 Years"},
      {name:"Namgay Nidup",photo:"namgay_nidup.jpg",role:"Dzongkha",creds:"PGDE | 11 Years"},
      {name:"Dorji Laydra",photo:"dorji_laydra.jpg",role:"Dzongkha",creds:"M.A. | 7 Years"},
      {name:"Passang Dorji",photo:"passang_dorji.jpg",role:"Dzongkha",creds:"M.A., PGDE | 11 Years"}
    ],
    hum: [
      {name:"Rinchen Tshering",photo:"rinchen_tshering.jpg",role:"Mathematics & BMT",creds:"B.Ed | 16 Years"},
      {name:"Aita Raj Rai",photo:"aita_raj_rai.jpg",role:"Economics",creds:"PGDE | 8 Years"},
      {name:"Thinley Wangdi",photo:"thinley_wangdi.jpg",role:"Accountancy & BE",creds:"B.Com | 7 Years"},
      {name:"Tandin",photo:"tandin.jpg",role:"History & Geography",creds:"B.Ed, MBS, MIT | 15 Years"},
      {name:"Yogi Nidhi Gajmer",photo:"yogi_nidhi_gajmer.jpg",role:"Geography",creds:"B.A. | 11 Years"},
      {name:"Sonam Wangmo",photo:"sonam_wangmo.jpg",role:"Geography",creds:"B.A. | 2 Years"},
      {name:"Arpana Biswa",photo:"arpana_biswa.jpg",role:"Business and Entrepreneurship",creds:"B.Ed | BE "}
    ]
  },

  searchIndex: [
    {title:'Home',page:'index',keywords:'home welcome tenzin academy bhutan'},
    {title:'About Us',page:'about',keywords:'about history vision mission philosophy bhutan paro'},
    {title:'Academic Programs',page:'programs',keywords:'programs academics classes curriculum lower middle higher secondary'},
    {title:'Admissions 2026',page:'admissions',keywords:'admissions apply registration fee structure boarder day scholar'},
    {title:'Faculty',page:'faculty',keywords:'faculty teachers staff principal vice principal'},
    {title:'Science Stream',page:'programs#page-science',keywords:'science physics chemistry biology math stream'},
    {title:'Commerce Stream',page:'programs#page-commerce',keywords:'commerce accounting economics business math stream'},
    {title:'Arts & Humanities',page:'programs#page-arts',keywords:'arts humanities history geography rigzhung media stream'},
    {title:'Class X / Middle Secondary',page:'programs#page-middle',keywords:'class x ten bcse board exam middle secondary'},
    {title:'Lower Secondary',page:'programs#page-lower',keywords:'class vi vii viii lower secondary'},
    {title:'Gallery',page:'gallery',keywords:'gallery photos campus sports cultural academic'},
    {title:'Contact Us',page:'contact',keywords:'contact phone email address map location'},
    {title:'Scholarship 2025',page:'admissions',keywords:'scholarship merit need sports cultural gnh financial'},
  ],

  escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>"']/g, m => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m]);
  },

  init() {
    if (document.getElementById('stem-faculty')) this.renderFaculty();
    if (document.getElementById('facilities-grid')) this.renderAboutSections();
    this.initScrollReveal();
    if (document.getElementById('hero-slideshow')) this.initSlideshow();
    if (document.getElementById('cd-days')) this.initCountdown();
    this.initBackToTop();
    this.initCounters();
    if (document.getElementById('gallery-grid')) this.renderGallery('all');
    this.initProgressBar();
  },

  initProgressBar() {
    window.addEventListener('scroll', () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      const progress = document.getElementById('page-progress');
      if (progress) progress.style.width = pct + '%';
    });
  },

  initBackToTop() {
    const btn = document.getElementById('back-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    });
  },

  initCounters() {
    const counters = document.querySelectorAll('.counter');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target, target = +el.dataset.target, sfx = el.dataset.suffix || '';
          let cur = 0;
          const step = Math.ceil(target / 60);
          const t = setInterval(() => {
            cur = Math.min(cur + step, target);
            el.textContent = cur + sfx;
            if (cur >= target) clearInterval(t);
          }, 20);
          obs.unobserve(el);
        }
      });
    }, {threshold: 0.5});
    counters.forEach(c => obs.observe(c));
  },

  initCountdown() {
    const target = new Date('2026-07-20T08:00:00+06:00');
    const tick = () => {
      const now = new Date(), diff = target - now;
      if (diff <= 0) {
        ['cd-days','cd-hrs','cd-min','cd-sec'].forEach(id => { const el=document.getElementById(id); if(el) el.textContent='0'; });
        const lbl = document.getElementById('cd-label');
        if (lbl) lbl.textContent = 'Second Term is now open!';
        return;
      }
      const d = Math.floor(diff/86400000), h = Math.floor((diff%86400000)/3600000),
            m = Math.floor((diff%3600000)/60000), s = Math.floor((diff%60000)/1000);
      const set = (id, v) => { const el=document.getElementById(id); if(el) el.textContent=String(v).padStart(2,'0'); };
      set('cd-days',d); set('cd-hrs',h); set('cd-min',m); set('cd-sec',s);
    };
    tick();
    setInterval(tick, 1000);
  },

  renderGallery(filter) {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    const data = filter === 'all' ? this.galleryData : this.galleryData.filter(g => g.cat === filter);
    this.lbImages = data;
    grid.innerHTML = data.map((g, i) => `
      <div class="relative h-48 rounded-xl overflow-hidden group cursor-pointer hover-lift" onclick="app.openLightbox(${i})">
        <img src="${g.src}" alt="${g.cap}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onerror="this.parentElement.innerHTML='<div class=\\\'w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center\\\'><i class=\\\'fas fa-image text-3xl text-gray-400\\\'></i></div>'">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
          <p class="text-white text-xs font-bold">${g.cap}</p>
        </div>
        <div class="absolute top-2 right-2 w-7 h-7 bg-white/80 rounded-full items-center justify-center hidden group-hover:flex transition"><i class="fas fa-expand text-xs text-gray-700"></i></div>
      </div>`).join('');
    document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
      const active = btn.dataset.filter === filter;
      btn.className = active
        ? 'gallery-filter-btn active px-4 py-2 rounded-full text-sm font-bold bg-primary text-white'
        : 'gallery-filter-btn px-4 py-2 rounded-full text-sm font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
    });
  },

  filterGallery(cat) { this.renderGallery(cat); },

  openLightbox(i) {
    this.lbIndex = i;
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-cap');
    img.src = this.lbImages[i].src;
    cap.textContent = this.lbImages[i].cap;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.remove('open');
    document.body.style.overflow = '';
  },

  lbNav(dir) {
    this.lbIndex = (this.lbIndex + dir + this.lbImages.length) % this.lbImages.length;
    document.getElementById('lightbox-img').src = this.lbImages[this.lbIndex].src;
    document.getElementById('lightbox-cap').textContent = this.lbImages[this.lbIndex].cap;
  },

  nextStep(step) {
    const stepEl = document.getElementById(`form-step${step}`);
    const fields = stepEl.querySelectorAll('[required]');
    let valid = true;
    fields.forEach(f => {
      if (!f.value || (f.type === 'radio' && !stepEl.querySelector(`[name="${f.name}"]:checked`))) {
        valid = false;
        this.showFieldError(f);
      }
    });
    if (!valid) { this.toast('Please fill all required fields', 'error'); return; }
    if (step === 2) { this.buildReview(); }
    this.setStep(step + 1);
  },

  prevStep(step) { this.setStep(step - 1); },

  setStep(step) {
    [1,2,3].forEach(s => {
      const el = document.getElementById(`form-step${s}`);
      if (el) el.classList.toggle('hidden', s !== step);
      const dot = document.getElementById(`step${s}-dot`);
      if (dot) {
        dot.className = s <= step
          ? 'step-dot w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold'
          : 'step-dot w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-400 flex items-center justify-center text-xs font-bold';
      }
    });
    this.currentFormStep = step;
  },

  buildReview() {
    const form = document.getElementById('admission-form');
    const fd = new FormData(form);
    const box = document.getElementById('review-box');
    const fields = [
      ['Full Name', fd.get('fullName')],
      ['Class', fd.get('classApplying')],
      ['Date of Birth', fd.get('dob')],
      ['CID', fd.get('cid')],
      ['Contact', fd.get('contact')],
      ['Student Type', fd.get('studentType')],
      ['Previous School', fd.get('previousSchool')],
      ['Previous Class', fd.get('previousClass')],
      ['Previous %', fd.get('previousPercentage') + '%'],
    ];
    box.innerHTML = '<p class="font-bold text-gray-700 dark:text-white mb-2 text-xs uppercase tracking-wider">Application Summary</p>' +
      fields.filter(f => f[1]).map(f => `<div class="flex justify-between text-xs border-b dark:border-gray-600 pb-1"><span class="text-gray-500">${f[0]}</span><span class="font-bold dark:text-white">${this.escapeHTML(f[1])}</span></div>`).join('');
  },

  validateField(el) {
    const ok = el.value && el.checkValidity();
    el.classList.toggle('field-error', !ok);
    el.classList.toggle('field-ok', !!ok);
    const errEl = el.nextElementSibling;
    if (errEl && errEl.classList.contains('err-msg')) errEl.classList.toggle('hidden', !!ok);
  },

  showFieldError(el) {
    el.classList.add('field-error');
    const errEl = el.nextElementSibling;
    if (errEl && errEl.classList.contains('err-msg')) errEl.classList.remove('hidden');
  },

  calcFee() {
    const stream = document.getElementById('calc-stream').value;
    const type = document.getElementById('calc-type').value;
    const result = document.getElementById('calc-result');
    const amount = document.getElementById('calc-amount');
    const note = document.getElementById('calc-note');
    if (!stream || !type) { result.classList.add('hidden'); return; }
    const fees = { science: { boarder: 130000, day: 80000 }, general: { boarder: 110000, day: 60000 } };
    const val = fees[stream][type];
    result.classList.remove('hidden');
    amount.textContent = 'Nu. ' + val.toLocaleString();
    note.textContent = stream === 'science' ? 'Science Stream — Tuition + Hostel (Boarder) / Tuition only (Day)' : 'General Stream — Tuition + Hostel & Mess (Boarder) / Tuition only (Day)';
  },

  printCalendar() {
    const table = document.getElementById('calendar-print-table');
    const win = window.open('', '_blank');
    win.document.write(`<html><head><title>Academic Calendar 2026 – Tenzin Academy</title><style>body{font-family:sans-serif;padding:20px}h1{color:#0080FF}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:10px;text-align:left}th{background:#0080FF;color:white}tr:nth-child(even){background:#f9f9f9}@media print{button{display:none}}</style></head><body><h1>Tenzin Academy – Academic Calendar 2026</h1><p>Kichu, Lamgong, Paro, Bhutan | +975-17578882</p>${table.innerHTML}<br><button onclick="window.print()">Print</button></body></html>`);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 400);
  },

  openSearch() {
    document.getElementById('search-overlay').classList.add('open');
    setTimeout(() => document.getElementById('search-input').focus(), 100);
    document.getElementById('search-results').innerHTML = '<p class="text-xs text-gray-400 text-center py-4">Start typing to search…</p>';
  },

  closeSearch() {
    document.getElementById('search-overlay').classList.remove('open');
    document.getElementById('search-input').value = '';
  },

  doSearch(q) {
    const res = document.getElementById('search-results');
    if (!q.trim()) { res.innerHTML = '<p class="text-xs text-gray-400 text-center py-4">Start typing to search…</p>'; return; }
    const hits = this.searchIndex.filter(item => item.keywords.toLowerCase().includes(q.toLowerCase()) || item.title.toLowerCase().includes(q.toLowerCase()));
    if (!hits.length) { res.innerHTML = '<p class="text-xs text-gray-400 text-center py-4">No results found.</p>'; return; }
    res.innerHTML = hits.map(h => `<div class="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer" onclick="app.closeSearch();window.location.href='${h.page.includes('#') ? h.page.replace('#', '.html#') : h.page + '.html'}'"><i class="fas fa-arrow-right text-primary text-xs"></i><span class="text-sm dark:text-white font-medium">${h.title}</span></div>`).join('');
  },

  searchFaculty(q) {
    const cards = document.querySelectorAll('#stem-faculty > div, #lang-faculty > div, #hum-faculty > div');
    let found = 0;
    cards.forEach(card => {
      const txt = card.textContent.toLowerCase();
      const match = !q || txt.includes(q.toLowerCase());
      card.style.display = match ? '' : 'none';
      if (match) found++;
    });
    const noRes = document.getElementById('faculty-no-results');
    if (noRes) noRes.classList.toggle('hidden', found > 0);
  },

  renderFaculty() {
    const renderCard = f => `<div class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover-lift">
      <div class="pt-8 pb-4 flex items-center justify-center bg-gray-50 dark:bg-gray-700/50">
        <div class="w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-gray-600 shadow-lg bg-gray-200 dark:bg-gray-600">
          <img src="${f.photo}" alt="${f.name}" class="w-full h-full object-cover" onerror="this.style.display='none';this.parentElement.innerHTML='<div class=\\'w-full h-full flex items-center justify-center\\'><i class=\\'fas fa-user text-3xl text-gray-400\\'></i></div>'">
        </div>
      </div>
      <div class="p-6 text-center"><h3 class="font-bold text-lg dark:text-white">${f.name}</h3>
      <p class="text-green-600 text-sm font-bold uppercase mb-2">${f.role}</p><p class="text-gray-500 text-xs">${f.creds}</p></div></div>`;
    const stem = document.getElementById('stem-faculty');
    if (stem) stem.innerHTML = this.facultyData.stem.map(renderCard).join('');
    const lang = document.getElementById('lang-faculty');
    if (lang) lang.innerHTML = this.facultyData.lang.map(renderCard).join('');
    const hum = document.getElementById('hum-faculty');
    if (hum) hum.innerHTML = this.facultyData.hum.map(renderCard).join('');
  },

  renderAboutSections() {
    const facilities = [
      {icon:"fa-city",color:"blue",title:"Buildings",desc:"Administrative Block, 4 Academic Blocks"},
      {icon:"fa-utensils",color:"green",title:"Dining",desc:"MPH with shift system"},
      {icon:"fa-flask",color:"purple",title:"Laboratories",desc:"Physics, Biology and Chemistry"},
      {icon:"fa-desktop",color:"red",title:"ICT Lab",desc:"30 computers"},
      {icon:"fa-wifi",color:"yellow",title:"Connectivity",desc:"24x7 campus-wide WiFi"},
      {icon:"fa-heartbeat",color:"teal",title:"Wellbeing",desc:"Dedicated counselling center"},
      {icon:"fa-tint",color:"blue",title:"Hygiene",desc:"Clean drinking water stations"}
    ];
    const facGrid = document.getElementById('facilities-grid');
    if (facGrid) facGrid.innerHTML = facilities.map(f => `
      <div class="flex items-start gap-4">
        <div class="w-10 h-10 bg-${f.color}-100 rounded-full flex-shrink-0 flex items-center justify-center text-${f.color}-600"><i class="fas ${f.icon}"></i></div>
        <div><h4 class="font-bold text-gray-800 dark:text-white">${f.title}</h4><p class="text-sm text-gray-600 dark:text-gray-400">${f.desc}</p></div>
      </div>`).join('');

    const sports = [
      {icon:"fa-futbol",color:"green-600",name:"Football Field"},
      {icon:"fa-basketball-ball",color:"orange-600",name:"Basketball Court"},
      {icon:"fa-volleyball-ball",color:"yellow-500",name:"Volleyball Court"},
      {icon:"fa-running",color:"blue-500",name:"Track & Field"}
    ];
    const sportsGrid = document.getElementById('sports-grid');
    if (sportsGrid) sportsGrid.innerHTML = sports.map(s => `
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center hover:bg-gray-50 dark:hover:bg-gray-700 transition">
        <i class="fas ${s.icon} text-4xl text-${s.color} mb-2"></i><p class="font-bold dark:text-white">${s.name}</p>
      </div>`).join('');

    const philo = [
      {icon:"fa-star",color:"yellow",title:"Holistic Development",desc:"Nurturing physical, mental, and spiritual growth."},
      {icon:"fa-brain",color:"blue",title:"Mindfulness & EQ",desc:"Cultivating emotional intelligence and awareness."},
      {icon:"fa-hands-helping",color:"green",title:"Community Service",desc:"Instilling civic responsibility and public service."},
      {icon:"fa-praying-hands",color:"red",title:"Bhutanese Values",desc:"Deep integration of culture into the curriculum."}
    ];
    const philoGrid = document.getElementById('philosophy-grid');
    if (philoGrid) philoGrid.innerHTML = philo.map(p => `
      <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-${p.color}-400 flex items-center gap-4 hover-lift">
        <div class="w-14 h-14 bg-${p.color}-100 rounded-full flex items-center justify-center text-${p.color}-600 flex-shrink-0 text-xl"><i class="fas ${p.icon}"></i></div>
        <div><h4 class="font-bold text-lg dark:text-white">${p.title}</h4><p class="text-sm text-gray-500 dark:text-gray-400">${p.desc}</p></div>
      </div>`).join('');

    const feedback = [
      {emoji:"👁️",title:"Individualized Attention",desc:"Personalized support for every student"},
      {emoji:"🔥",title:"Passionate Faculty",desc:"Dedicated and experienced teachers"},
      {emoji:"🤗",title:"Supportive Environment",desc:"Nurturing and caring atmosphere"}
    ];
    const feedbackGrid = document.getElementById('feedback-grid');
    if (feedbackGrid) feedbackGrid.innerHTML = feedback.map(f => `
      <div class="text-center p-4">
        <div class="w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow text-2xl">${f.emoji}</div>
        <h4 class="font-bold dark:text-white">${f.title}</h4><p class="text-sm text-gray-600 dark:text-gray-400">${f.desc}</p>
      </div>`).join('');
  },

  initScrollReveal() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
    }, {threshold: 0.1});
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  },

  toggleTheme() {
    document.documentElement.classList.toggle('dark');
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    const icon = document.getElementById('theme-icon');
    if (icon) icon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  },

  initSlideshow() {
    const slideshow = document.getElementById('hero-slideshow');
    if (!slideshow) return;
    this.slideshowImages = slideshow.querySelectorAll('.slideshow-img');
    this.slideshowDots = slideshow.querySelectorAll('.slideshow-dot');
    this.slideshowCaption = document.getElementById('slideshow-caption');
    this.currentSlide = 0;
    this.captions = ['Campus Life @ Tenzin','Our Students','Sports & Athletics','Modern Classrooms','Cultural Heritage'];
    this.slideInterval = setInterval(() => this.nextSlide(), 5000);
    this.slideshowDots.forEach((dot, i) => {
      dot.addEventListener('click', () => { this.goToSlide(i); this.resetSlideshowTimer(); });
    });
  },

  nextSlide() { this.goToSlide((this.currentSlide + 1) % this.slideshowImages.length); },

  goToSlide(i) {
    this.slideshowImages[this.currentSlide].classList.replace('opacity-100','opacity-0');
    this.slideshowDots[this.currentSlide].classList.replace('bg-white','bg-white/50');
    this.slideshowImages[i].classList.replace('opacity-0','opacity-100');
    this.slideshowDots[i].classList.replace('bg-white/50','bg-white');
    if (this.slideshowCaption) this.slideshowCaption.textContent = this.captions[i];
    this.currentSlide = i;
  },

  resetSlideshowTimer() {
    clearInterval(this.slideInterval);
    this.slideInterval = setInterval(() => this.nextSlide(), 5000);
  },

  fileStore: {},

  handleFilePreview(event, type) {
    const file = event.target.files?.[0] || event.dataTransfer?.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { this.toast('File too large (max 5MB)', 'error'); return; }
    this.fileStore[type] = file;
    const keyMap = { marksheet:'marksheet', scholarMarksheet:'scholar-marksheet', scholarCert:'scholar-cert' };
    const prefix = keyMap[type] || type;
    const icon = document.getElementById(prefix + '-icon');
    const text = document.getElementById(prefix + '-text');
    const fn = document.getElementById(prefix + '-filename');
    if (icon) icon.className = 'fas fa-check-circle text-3xl text-green-500 mb-2';
    if (text) text.innerText = file.name;
    if (fn) { fn.innerText = '✓ ' + file.name + ' (' + (file.size > 1024*1024 ? (file.size/1024/1024).toFixed(1)+' MB' : (file.size/1024).toFixed(0)+' KB') + ')'; fn.classList.remove('hidden'); }
    this.toast('File selected: ' + file.name, 'success');
  },

  fileToBase64(file) {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result.split(',')[1]);
      r.onerror = rej;
      r.readAsDataURL(file);
    });
  },

  async submitAdmission(form) {
    const btn = document.getElementById('submit-btn');
    const orig = btn.innerText;
    btn.disabled = true; btn.innerText = 'Submitting…';
    const fd = new FormData(form);
    const data = { formType:'admission', fullName:fd.get('fullName'), classApplying:fd.get('classApplying'), dob:fd.get('dob'), cid:fd.get('cid'), contact:fd.get('contact'), studentType:fd.get('studentType'), previousSchool:fd.get('previousSchool'), previousClass:fd.get('previousClass'), previousPercentage:fd.get('previousPercentage'), timestamp: new Date().toISOString() };
    const files = [];
    if (this.fileStore.marksheet) { const b = await this.fileToBase64(this.fileStore.marksheet); files.push({name:this.fileStore.marksheet.name, type:this.fileStore.marksheet.type, data:b}); }
    if (files.length) data.files = files;
    fetch(SCRIPT_URL, {method:'POST', body:JSON.stringify(data), headers:{'Content-Type':'text/plain;charset=utf-8'}})
      .then(() => {
        document.getElementById('admission-confirmation').classList.remove('hidden');
        this.toast('Application submitted successfully!', 'success');
        form.reset(); this.fileStore = {}; this.setStep(1);
      })
      .catch(() => this.toast('Submission failed. Please try again.', 'error'))
      .finally(() => { btn.disabled = false; btn.innerText = orig; });
  },

  async submitScholarship(form) {
    const btn = document.getElementById('scholar-submit-btn');
    const orig = btn.innerText;
    btn.disabled = true; btn.innerText = 'Submitting…';
    const fd = new FormData(form);
    const data = { formType:'scholarship', scholarName:fd.get('scholarName'), scholarClass:fd.get('scholarClass'), scholarCid:fd.get('scholarCid'), scholarContact:fd.get('scholarContact'), scholarCategory:fd.get('scholarCategory'), scholarReason:fd.get('scholarReason'), scholarPercentage:fd.get('scholarPercentage'), timestamp: new Date().toISOString() };
    const files = [];
    if (this.fileStore.scholarMarksheet) { const b = await this.fileToBase64(this.fileStore.scholarMarksheet); files.push({name:this.fileStore.scholarMarksheet.name, type:this.fileStore.scholarMarksheet.type, data:b}); }
    if (this.fileStore.scholarCert) { const b = await this.fileToBase64(this.fileStore.scholarCert); files.push({name:this.fileStore.scholarCert.name, type:this.fileStore.scholarCert.type, data:b}); }
    if (files.length) data.files = files;
    fetch(SCRIPT_URL, {method:'POST', body:JSON.stringify(data), headers:{'Content-Type':'text/plain;charset=utf-8'}})
      .then(() => {
        document.getElementById('scholarship-confirmation').classList.remove('hidden');
        this.toast('Scholarship application submitted!', 'success');
        form.reset(); this.fileStore = {};
      })
      .catch(() => this.toast('Submission failed. Please try again.', 'error'))
      .finally(() => { btn.disabled = false; btn.innerText = orig; });
  },

  toast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const div = document.createElement('div');
    div.className = `toast ${type}`;
    const icon = type==='success'?'fa-check-circle':type==='error'?'fa-exclamation-circle':'fa-info-circle';
    div.innerHTML = `<i class="fas ${icon}"></i> ${msg}`;
    container.appendChild(div);
    requestAnimationFrame(() => div.classList.add('show'));
    setTimeout(() => { div.classList.remove('show'); setTimeout(() => div.remove(), 400); }, 3500);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  app.init();

  const admissionForm = document.getElementById('admission-form');
  if (admissionForm) {
    admissionForm.addEventListener('submit', e => { e.preventDefault(); app.submitAdmission(admissionForm); });
  }

  const scholarshipForm = document.getElementById('scholarship-form');
  if (scholarshipForm) {
    scholarshipForm.addEventListener('submit', e => { e.preventDefault(); app.submitScholarship(scholarshipForm); });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = document.getElementById('contact-submit-btn');
      const orig = btn.innerText;
      btn.disabled = true; btn.innerText = 'Sending…';
      const fd = new FormData(this);
      const data = { formType:'contact', firstName:fd.get('firstName'), lastName:fd.get('lastName'), email:fd.get('email'), subject:fd.get('subject'), message:fd.get('message'), timestamp: new Date().toISOString() };
      fetch(SCRIPT_URL, {method:'POST', body:JSON.stringify(data), headers:{'Content-Type':'text/plain;charset=utf-8'}})
        .then(() => { app.toast('Message sent successfully!', 'success'); contactForm.reset(); })
        .catch(() => app.toast('Failed to send. Please try again.', 'error'))
        .finally(() => { btn.disabled = false; btn.innerText = orig; });
    });
  }

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); app.openSearch(); }
    if (e.key === 'Escape') { app.closeSearch(); app.closeLightbox(); }
    const lb = document.getElementById('lightbox');
    if (lb && lb.classList.contains('open')) {
      if (e.key === 'ArrowLeft') app.lbNav(-1);
      if (e.key === 'ArrowRight') app.lbNav(1);
    }
  });
});
