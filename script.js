// =======================
// GLOBAL STATE
// =======================
let currentLegalType = null; // 'impressum' | 'privacy'

// =======================
// MAIN
// =======================
document.addEventListener('DOMContentLoaded', () => {

  // =======================
  // LANGUAGE
  // =======================
  let lang = localStorage.getItem('language') || 'eng';

  const updateLangUI = (activeLang) => {
    // Видаляємо active у всіх, потім додаємо тільки одній
    document.querySelectorAll('.lang-toggle').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById(activeLang);
    if (activeBtn) activeBtn.classList.add('active');
    
    document.documentElement.lang = activeLang === 'eng' ? 'en' : activeLang === 'de' ? 'de' : 'ua';
  };

  document.querySelectorAll('.lang-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      lang = btn.id; // Оновлюємо глобальну змінну
      localStorage.setItem('language', lang);
      updateLangUI(lang); // Оновлюємо кнопки
      switchLanguage(lang); // Перекладаємо текст
    });
  });

  // Встановлюємо початковий стан
  updateLangUI(lang);
  switchLanguage(lang);

  // =======================
  // THEME
  // =======================
  const themeCheckbox = document.getElementById('theme-checkbox');
  let theme = localStorage.getItem('theme') || 'dark';

  document.body.classList.add(theme + '-theme');
  themeCheckbox.checked = theme === 'light';
  updateSliderIcon(theme);

  themeCheckbox.addEventListener('change', () => {
    theme = themeCheckbox.checked ? 'light' : 'dark';
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(theme + '-theme');
    localStorage.setItem('theme', theme);
    updateSliderIcon(theme);
  });

  // =======================
  // SMOOTH SCROLL
  // =======================
  document.getElementById('view-projects').addEventListener('click', () => {
    document.getElementById('projects')
      .scrollIntoView({ behavior: 'smooth' });
  });

  // =======================
  // CONTACT BUTTON
  // =======================
  document.querySelector('.contact button')
    .addEventListener('click', () => {
      window.location.href = 'mailto:drankoserhiy1993@gmail.com';
    });

  // =======================

  // MODAL

  // =======================

  const modal = document.getElementById("legal-modal");

  const textContainer = document.getElementById("legal-text-content");

  const closeBtn = document.querySelector(".close-modal");



  const getCurrentLang = () =>

    localStorage.getItem('language') || 'eng';



  // Open Impressum

  document.getElementById("open-impressum")

    .addEventListener('click', (e) => {

      e.preventDefault();

      const lang = getCurrentLang();

      currentLegalType = 'impressum';

      textContainer.innerHTML = legalData.impressum[lang];

      modal.style.display = "block";
	  
	  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

    });



  // Open Privacy

  document.getElementById("open-privacy")

    .addEventListener('click', (e) => {

      e.preventDefault();

      const lang = getCurrentLang();

      currentLegalType = 'privacy';

      textContainer.innerHTML = legalData.privacy[lang];

      modal.style.display = "block";
	  
	  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

    });



  // Close modal

  closeBtn.onclick = () => {

    modal.style.display = "none";

    currentLegalType = null;

  };



  window.onclick = (e) => {

    if (e.target === modal) {

      modal.style.display = "none";

      currentLegalType = null;

    }

  };

});
// =======================
// FUNCTIONS
// =======================
function switchLanguage(lang) {
  document.querySelectorAll('[data-eng]').forEach(el => {
    el.textContent = el.dataset[lang] || el.dataset.eng;
  });

  const cvLink = document.getElementById('cv-download-link');
  if (cvLink) {
    cvLink.href = `assets/cv/Serhiy_Dranko-CV-${lang}.pdf`;
  }

  // 🔥 UPDATE OPEN MODAL LANGUAGE
  const modal = document.getElementById("legal-modal");
  const textContainer = document.getElementById("legal-text-content");

  if (modal && modal.style.display === "block" && currentLegalType) {
    textContainer.innerHTML =
      legalData[currentLegalType][lang];
  }
}

function updateSliderIcon(theme) {
  const slider = document.querySelector('.slider');
  // Теперь мы всегда рисуем обе иконки, 
  // они зафиксированы по краям благодаря justify-content: space-between
  slider.innerHTML = '<span>🌙</span><span>☀️</span>';
}


// =======================
// LEGAL CONTENT
// =======================
const legalData = {
  impressum: {
    eng: `
      <h2>Legal Notice (Impressum)</h2>
      <p><strong>Information according to § 5 TMG</strong></p>
      <p>Serhiy Dranko<br>Schleestr. 4<br>41199 Moenchengladbach, Germany</p>
      <p><strong>Contact</strong><br>Email: drankoserhiy1993@gmail.com</p>
    `,
    de: `
      <h2>Impressum</h2>
      <p><strong>Angaben gemäß § 5 TMG</strong></p>
      <p>Serhiy Dranko<br>Schleestr. 4<br>41199 Mönchengladbach, Deutschland</p>
      <p><strong>Kontakt</strong><br>E-Mail: drankoserhiy1993@gmail.com</p>
    `,
    ua: `
      <h2>Юридична інформація (Impressum)</h2>
      <p><strong>Згідно з § 5 TMG</strong></p>
      <p>Сергій Дранко<br>Schleestr. 4<br>41199 Менхенгладбах, Німеччина</p>
      <p><strong>Контакти</strong><br>Email: drankoserhiy1993@gmail.com</p>
    `
  },

  privacy: {
    eng: `
      <h2>Privacy Policy (Datenschutzerklärung)</h2>
      <p><strong>1. Data Protection</strong><br>
        The use of this website is possible without providing personal data. If you contact us via email, your data is provided on a voluntary basis.</p>
        <p><strong>2. Hosting and Server Log Files</strong><br>
        This website is hosted by <strong>GitHub Pages</strong>. The hosting provider automatically collects and stores information in server log files (IP address, browser type, time of request). This is technically necessary for the operation of the site.</p>
        <p><strong>3. Contact</strong><br>
        If you send us an email, your details will be stored for the purpose of processing the request.</p>
        <p><strong>4. Your Rights</strong><p>You have the right to request information about your stored data, its origin, and its purpose at any time free of charge. You also have the right to request that this data be corrected or deleted.</p>
	`,
    de: `
      <h2>Datenschutzerklärung</h2>
      <p><strong>1. Datenschutz auf einen Blick</strong><br>
        Die Nutzung dieser Webseite ist ohne Angabe personenbezogener Daten möglich. Sofern Sie uns eine E-Mail senden (z.B. über einen Kontakt-Link), erfolgt die Preisgabe Ihrer Daten auf freiwilliger Basis.</p>
        <p><strong>2. Hosting und Server-Log-Dateien</strong><br>
        Diese Webseite wird bei <strong>GitHub Pages</strong> (GitHub Inc.) gehostet. Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt (z.B. IP-Adresse, Browsertyp, Referrer URL, Uhrzeit der Anfrage). Dies ist technisch notwendig, um die Sicherheit und Stabilität der Webseite zu gewährleisten.</p>
        <p><strong>3. Kontaktaufnahme</strong><br>
        Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben aus der E-Mail inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
        <p><strong>4. Ihre Rechte</strong><br>
        Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten.</p>
	`,
    ua: `
      <h2>Політика конфіденційності (Datenschutzerklärung)</h2>
      <p><strong>1. Захист даних</strong><br>
        Користування цим сайтом можливе без надання персональних даних. Якщо ви надсилаєте нам електронний лист, ви надаєте свої дані на добровільній основі.</p>
        <p><strong>2. Хостинг та лог-файли</strong><br>
        Цей сайт розміщено на платформі <strong>GitHub Pages</strong>. Провайдер автоматично збирає та зберігає інформацію у лог-файлах сервера (IP-адреса, тип браузера, час запиту). Це технічно необхідно для стабільної роботи сайту.</p>
        <p><strong>3. Зв'язок з нами</strong><br>
        Якщо ви звертаєтесь до нас через імейл, ваші дані будуть використані виключно для обробки вашого запиту.</p>
		<p><strong>4. Ваші права</strong><p>Ви маєте право в будь-який час безкоштовно отримати інформацію про ваші збережені дані, їх походження та мету зберігання. Ви також маєте право вимагати виправлення або видалення цих даних.</p>
    `
  }
};

