
// ----- Navigation -----
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 20);
  // Progress bar
  const doc = document.documentElement;
  const pct = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';
  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ----- Scroll reveal -----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }});
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ----- Tabs fonctionnement -----
function switchTab(id) {
  document.querySelectorAll('.tab-btn').forEach((b, i) => {
    b.classList.toggle('active', ['flux','roles','cycle'][i] === id);
  });
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
}

// ----- Guide sidebar -----
function switchGuide(id) {
  document.querySelectorAll('.guide-nav-item').forEach(b => b.classList.remove('actif'));
  event.currentTarget.classList.add('actif');
  document.querySelectorAll('.guide-panel').forEach(p => p.classList.remove('actif'));
  document.getElementById('guide-' + id).classList.add('actif');
}

// ----- FAQ accordion -----
function toggleFaq(el) {
  const wasOpen = el.classList.contains('ouvert');
  document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('ouvert'));
  if (!wasOpen) el.classList.add('ouvert');
}

// ----- Glossaire -----
const glossaireData = {
  'A': [
    { terme: 'Absence', def: "Fait pour un employé de ne pas être présent à son poste de travail pendant ses heures normales de travail.", exemple: "Ex. : Une absence injustifiée est une absence sans autorisation préalable ni justificatif valable." },
    { terme: 'Ancienneté', def: "Durée totale passée par un employé dans une entreprise depuis son embauche. L'ancienneté peut ouvrir droit à des avantages supplémentaires.", exemple: "Ex. : Après 5 ans d'ancienneté, un employé peut bénéficier d'un jour de congé supplémentaire." },
  ],
  'B': [
    { terme: 'Bulletin de paie', def: "Document remis chaque mois à l'employé récapitulant son salaire brut, les retenues (cotisations) et son salaire net à percevoir.", exemple: "Ex. : Le bulletin de paie est une pièce officielle que l'employé doit conserver." },
    { terme: 'Brut / Net', def: "Le salaire brut est le salaire avant déduction des cotisations sociales. Le salaire net est ce que l'employé reçoit réellement sur son compte.", exemple: "Ex. : Salaire brut : 500 000 FCFA. Après cotisations : Salaire net : 420 000 FCFA." },
  ],
  'C': [
    { terme: 'CDI', def: "Contrat à Durée Indéterminée. C'est le contrat de travail sans date de fin prévue, considéré comme la forme normale et stable d'emploi.", exemple: "Ex. : Un CDI offre une meilleure stabilité qu'un CDD car il n'a pas de date d'expiration." },
    { terme: 'CDD', def: "Contrat à Durée Déterminée. Contrat de travail avec une date de fin fixée dès la signature. Il ne peut être renouvelé qu'un nombre limité de fois.", exemple: "Ex. : Un contrat CDD de 6 mois pour remplacer un employé en congé maternité." },
    { terme: 'Congé annuel', def: "Période de repos payé à laquelle a droit chaque employé chaque année, calculée en fonction de son ancienneté et de son contrat.", exemple: "Ex. : Au Sénégal, tout employé a droit à au moins 24 jours ouvrables de congé annuel." },
    { terme: 'Cotisations sociales', def: "Montants prélevés sur le salaire brut de l'employé et versés aux organismes de protection sociale (retraite, sécurité sociale...)", exemple: "Ex. : Les cotisations couvrent notamment la retraite et la couverture maladie." },
  ],
  'E': [
    { terme: 'Effectif', def: "Nombre total d'employés travaillant dans une entreprise à un moment donné.", exemple: "Ex. : L'effectif de l'entreprise est de 142 personnes au 1er janvier 2025." },
    { terme: 'Entretien annuel', def: "Réunion formelle entre un manager et son collaborateur pour évaluer le travail accompli, fixer de nouveaux objectifs et discuter du développement professionnel.", exemple: "Ex. : L'entretien annuel se déroule généralement en fin d'année ou en début d'année suivante." },
  ],
  'F': [
    { terme: 'Fiche de poste', def: "Document décrivant de manière précise les responsabilités, les missions et les compétences requises pour occuper un poste donné.", exemple: "Ex. : La fiche de poste du comptable liste ses missions principales et les logiciels qu'il doit maîtriser." },
  ],
  'H': [
    { terme: 'Heure supplémentaire', def: "Heure travaillée au-delà de la durée légale ou contractuelle du travail. Elle est généralement mieux rémunérée que les heures normales.", exemple: "Ex. : Travailler 45 heures alors que le contrat prévoit 40 heures donne droit à 5 heures supplémentaires." },
  ],
  'P': [
    { terme: 'Paie', def: "Ensemble des opérations liées au calcul et au versement des salaires des employés. La paie est traitée mensuellement.", exemple: "Ex. : La paie du mois de juin inclut le salaire de base plus les primes de performance." },
    { terme: 'Prime', def: "Rémunération complémentaire versée en plus du salaire de base pour récompenser un résultat, une présence ou une compétence particulière.", exemple: "Ex. : Prime d'ancienneté, prime de résultats, prime de fin d'année..." },
  ],
  'R': [
    { terme: 'Recrutement', def: "Ensemble des actions visant à trouver et sélectionner un candidat pour occuper un poste vacant dans l'entreprise.", exemple: "Ex. : Le processus de recrutement comprend la rédaction de l'offre, les entretiens et la sélection finale." },
    { terme: 'Ressources Humaines (RH)', def: "Fonction de l'entreprise chargée de gérer tout ce qui concerne les personnes : recrutement, formation, paie, relations sociales, bien-être au travail.", exemple: "Ex. : Le département RH s'occupe de l'embauche, des contrats et du bien-être des employés." },
  ],
  'S': [
    { terme: 'Salaire', def: "Rémunération versée par l'employeur à l'employé en échange de son travail, définie dans le contrat de travail.", exemple: "Ex. : Le salaire est versé chaque mois et accompagné d'un bulletin de paie." },
    { terme: 'Solde de tout compte', def: "Document remis à l'employé lors de son départ, récapitulant toutes les sommes qui lui sont dues : dernière paie, congés non pris, indemnités...", exemple: "Ex. : L'employé signe le solde de tout compte pour confirmer avoir reçu ce qui lui était dû." },
  ],
};

function buildGlossaire(data) {
  const container = document.getElementById('gloContenu');
  const lettresContainer = document.getElementById('gloLettres');
  container.innerHTML = '';
  lettresContainer.innerHTML = '';
  const lettres = Object.keys(data).sort();
  lettres.forEach(l => {
    const btn = document.createElement('button');
    btn.className = 'lettre-btn';
    btn.textContent = l;
    btn.onclick = () => {
      document.getElementById('glo-' + l)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.querySelectorAll('.lettre-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    };
    lettresContainer.appendChild(btn);

    const group = document.createElement('div');
    group.className = 'glossaire-group';
    group.id = 'glo-' + l;
    group.innerHTML = `<div class="glossaire-lettre-titre">${l}</div><div class="glossaire-items" id="items-${l}"></div>`;
    container.appendChild(group);

    const itemsContainer = document.getElementById('items-' + l);
    data[l].forEach(item => {
      const div = document.createElement('div');
      div.className = 'glossaire-item';
      div.dataset.terme = item.terme.toLowerCase();
      div.innerHTML = `<div class="glo-terme">${item.terme}</div><div class="glo-def">${item.def}</div>${item.exemple ? `<div class="glo-exemple">${item.exemple}</div>` : ''}`;
      itemsContainer.appendChild(div);
    });
  });
}

function filtrerGlossaire() {
  const q = document.getElementById('gloSearch').value.toLowerCase();
  document.querySelectorAll('.glossaire-item').forEach(item => {
    const match = item.dataset.terme.includes(q) ||
                  item.querySelector('.glo-def').textContent.toLowerCase().includes(q);
    item.style.display = match ? '' : 'none';
  });
  document.querySelectorAll('.glossaire-group').forEach(group => {
    const visible = [...group.querySelectorAll('.glossaire-item')].some(i => i.style.display !== 'none');
    group.style.display = visible ? '' : 'none';
  });
}

buildGlossaire(glossaireData);
