/* ============================================================
   LUMIÈRE LOCALE — CINÉMATCH
   Mix V1 hero/fidélité + jeu semaine V2
   ============================================================ */

/* DONNÉES */

const IMG = (id, w = 500) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

const FILMS = [
  {
    id: "lampions",
    title: "Sous les lampions",
    genre: "Drame",
    dur: "1h32",
    badge: "Long",
    img: IMG("1533174072545-7a4b6ad7a6c3"),
    tags: ["auteur", "adulte", "engage"]
  },
  {
    id: "herbes",
    title: "Les mauvaises herbes",
    genre: "Comédie",
    dur: "1h48",
    badge: "Long",
    img: IMG("1444930694458-01babf71870c"),
    tags: ["famille", "feelgood", "grandpublic"]
  },
  {
    id: "echappees",
    title: "Les échappées",
    genre: "Documentaire",
    dur: "22min",
    badge: "Court",
    img: IMG("1469854523086-cc02fe5d8800"),
    tags: ["auteur", "curieux", "engage", "court"]
  },
  {
    id: "contrejour",
    title: "À contre-jour",
    genre: "Thriller",
    dur: "1h27",
    badge: "Long",
    img: IMG("1509248961158-e54f6934749c"),
    tags: ["adulte", "moderne", "engage"]
  },
  {
    id: "vagues",
    title: "Le bruit des vagues",
    genre: "Romance",
    dur: "18min",
    badge: "Court",
    img: IMG("1505118380757-91f5f5632de0"),
    tags: ["famille", "jeune", "moderne", "feelgood", "court"]
  }
];

const SALLES = [
  {
    id: "rex",
    name: "Le Rex",
    sub: "Salle art & essai",
    likes: ["auteur", "engage", "curieux", "adulte"],
    bestDays: ["jeu", "ven", "sam"],
    bestTimes: ["18h00", "20h30"],
    seats: 650,
    say: [
      "J’aime les films ",
      { t: "auteur", w: "d’auteur" },
      " et ",
      { t: "engage", w: "engagés" },
      ", pour un public ",
      { t: "adulte", w: "adulte" },
      " et ",
      { t: "curieux", w: "curieux" },
      "."
    ]
  },
  {
    id: "melies",
    name: "Ciné Méliès",
    sub: "Jeune public & famille",
    likes: ["famille", "feelgood", "grandpublic"],
    bestDays: ["mer", "sam", "dim"],
    bestTimes: ["14h30", "18h00"],
    seats: 820,
    say: [
      "Ici on aime rire en ",
      { t: "famille", w: "famille" },
      " : des films ",
      { t: "feelgood", w: "feel-good" },
      " pour le ",
      { t: "grandpublic", w: "grand public" },
      "."
    ]
  },
  {
    id: "entracte",
    name: "L’Entracte",
    sub: "Cinéma de quartier",
    likes: ["jeune", "moderne", "court", "engage"],
    bestDays: ["ven", "sam"],
    bestTimes: ["18h00", "20h30"],
    seats: 430,
    say: [
      "On cherche des films ",
      { t: "court", w: "courts" },
      ", ",
      { t: "moderne", w: "modernes" },
      " et ",
      { t: "engage", w: "engagés" },
      ", pour un public ",
      { t: "jeune", w: "jeune" },
      "."
    ]
  }
];

const DAYS = [
  { k: "lun", l: "Lun" },
  { k: "mar", l: "Mar" },
  { k: "mer", l: "Mer" },
  { k: "jeu", l: "Jeu" },
  { k: "ven", l: "Ven" },
  { k: "sam", l: "Sam" },
  { k: "dim", l: "Dim" }
];

const TIMES = ["14h30", "18h00", "20h30"];
const ROWS = SALLES.flatMap((s) => TIMES.map((time) => ({ sid: s.id, time })));
const GOAL = 5;

const TAG_LABELS = {
  auteur: "Auteur",
  adulte: "Adulte",
  engage: "Engagé",
  famille: "Famille",
  feelgood: "Feel-good",
  grandpublic: "Grand public",
  curieux: "Curieux",
  court: "Court",
  moderne: "Moderne",
  jeune: "Jeune"
};

const ROLES = {
  real: {
    desc: "Tu joues, tu gagnes des <b>points</b>, et tu comprends <b>comment une salle choisit</b> — pour mieux placer ton film.",
    hero:
      "Place les films dans les bonnes séances, fais grimper ton audience et débloque de vrais avantages. Lumière Locale, version réalisateur.",
    introTitle: "Ton défi de réalisateur·rice",
    introBody:
      "Observe la ligne éditoriale des salles, repère les horaires favorables et programme chaque film là où son public a le plus de chances d’être au rendez-vous.",
    catTitle: "Ton catalogue · 5 films",
    stickyTitle: "Prêt·e à diffuser ton film ?",
    tiers: [
      { name: "Talent Découverte", min: 0 },
      { name: "Talent Repéré", min: 1000 },
      { name: "Talent Sélectionné", min: 2500 },
      { name: "Talent Ambassadeur", min: 5000 }
    ],
    rewards: [
      { ico: "🎟️", cost: 200, t: "Teaser mis en avant" },
      { ico: "📊", cost: 400, t: "Fiche audience" },
      { ico: "🤝", cost: 700, t: "Mise en relation" },
      { ico: "🎬", cost: 1200, t: "Promo dédiée" }
    ],
    convertSub: "On te met en relation avec les salles qui matchent ton film.",
    form: {
      kicker: "Espace réalisateur·rice",
      title: "Lance ton projet",
      sub: "On te met en relation avec des salles qui collent à ton film.",
      org: "Production",
      cta: "Lancer mon projet",
      convertCta: "Trouver mes salles",
      done: "On revient vers toi avec des salles qui matchent ton film."
    }
  },

  diff: {
    desc: "Tu repères les <b>projets prometteurs</b> et tu <b>cumules des points</b> qui réduisent tes commissions.",
    hero:
      "Programme les bons films aux bons créneaux, maximise ton audience et débloque des avantages pensés pour les salles.",
    introTitle: "Ton défi de diffuseur / salle",
    introBody:
      "Choisis les projets qui correspondent à ta ligne éditoriale, cale-les au bon jour et au bon horaire, puis mesure le potentiel d’audience de ta semaine.",
    catTitle: "Projets à programmer · 5 films",
    stickyTitle: "Prêt·e à programmer ?",
    tiers: [
      { name: "Salle Découverte", min: 0 },
      { name: "Salle Active", min: 1000 },
      { name: "Salle Programmée", min: 2500 },
      { name: "Salle Référente", min: 5000 }
    ],
    rewards: [
      { ico: "🎥", cost: 200, t: "Sélection perso" },
      { ico: "⏳", cost: 300, t: "Réservation prioritaire" },
      { ico: "⭐", cost: 800, t: "Commission réduite" },
      { ico: "🏆", cost: 1200, t: "Exclusivité 30 jours" }
    ],
    convertSub: "On t’envoie une sélection de projets taillés pour ta salle.",
    form: {
      kicker: "Espace diffuseur / salle",
      title: "Trouve ton prochain film",
      sub: "On t’envoie une sélection de projets pour ta ligne éditoriale.",
      org: "Nom de la salle",
      cta: "Trouver un projet",
      convertCta: "Recevoir ma sélection",
      done: "On t’envoie une sélection de projets pour ta salle."
    }
  }
};

const EARN_TABLE = [
  ["Jouer à CinéMatch", 150],
  ["Laisser ses coordonnées", 100],
  ["Programmer un film", 800],
  ["Mise en relation", 300],
  ["Séance + réalisateur", 1000],
  ["2ᵉ film programmé", 1200]
];

const BADGES = [
  {
    id: "parfait",
    name: "Match parfait",
    desc: "Toutes les séances collent à leur public.",
    test: (ctx) => ctx.sessions.length >= GOAL && ctx.perfectCount === ctx.sessions.length
  },
  {
    id: "prime",
    name: "Prime time",
    desc: "Au moins 3 bons films placés sur un horaire fort.",
    test: (ctx) =>
      ctx.sessions.filter((x) => x.good && ["18h00", "20h30"].includes(x.time)).length >= 3
  },
  {
    id: "maestro",
    name: "Maestro de la prog",
    desc: "Plus de 2 500 spectateurs sur la semaine.",
    test: (ctx) => ctx.audience >= 2500
  },
  {
    id: "weekend",
    name: "Roi·ne du week-end",
    desc: "3 bonnes séances sur samedi ou dimanche.",
    test: (ctx) => ctx.sessions.filter((x) => x.good && isWeekend(x.day)).length >= 3
  },
  {
    id: "public",
    name: "Coup de cœur public",
    desc: "Une salle affiche presque complet.",
    test: (ctx) => ctx.sessions.some((x) => x.fillPct >= 0.9)
  },
  {
    id: "complete",
    name: "Semaine bouclée",
    desc: "Les 5 séances sont programmées.",
    test: (ctx) => ctx.sessions.length >= GOAL
  }
];

/* ÉTAT */

const STORE_KEY = "lumiere-locale-cinematch-mix";

const state = {
  role: "real",
  points: 0,
  grid: {},
  played: false
};

let selectedId = null;
let dragId = null;
let revealed = false;
let resultShown = false;
let stickyShown = false;
let toastTimer = null;
let lastFocus = null;

/* HELPERS */

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const film = (id) => FILMS.find((f) => f.id === id);
const salle = (id) => SALLES.find((s) => s.id === id);
const tagLabel = (tag) => TAG_LABELS[tag] || tag;

const isWeekend = (day) => day === "sam" || day === "dim";

const cellKey = (sid, time, day) => `${sid}|${time}|${day}`;

const parseCellKey = (key) => {
  const [sid, time, day] = key.split("|");
  return { sid, time, day };
};

function save() {
  try {
    localStorage.setItem(
      STORE_KEY,
      JSON.stringify({
        role: state.role,
        points: state.points,
        grid: state.grid,
        played: state.played
      })
    );
  } catch (e) {}
}

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");

    if (saved.role && ROLES[saved.role]) state.role = saved.role;
    if (typeof saved.points === "number") state.points = saved.points;
    if (saved.grid && typeof saved.grid === "object") state.grid = saved.grid;

    if (saved.played) {
      state.played = true;
      revealed = true;
    }
  } catch (e) {}
}

function usedFilms() {
  return new Set(Object.values(state.grid));
}

function countSessions() {
  return Object.keys(state.grid).length;
}

function currentTier() {
  const tiers = ROLES[state.role].tiers;
  let tier = tiers[0];

  for (const t of tiers) {
    if (state.points >= t.min) tier = t;
  }

  return tier;
}

function nextTier() {
  return ROLES[state.role].tiers.find((t) => t.min > state.points) || null;
}

/* CALCUL AUDIENCE */

function sessionStats(sid, day, time, fid) {
  const s = salle(sid);
  const f = film(fid);

  if (!s || !f) {
    return {
      audience: 0,
      fillPct: 0,
      good: false,
      overlap: 0,
      quality: "bad"
    };
  }

  const overlap = f.tags.filter((tag) => s.likes.includes(tag)).length;

  const tagFit = Math.min(1, overlap / 2);
  const dayFit = s.bestDays.includes(day) ? 1 : isWeekend(day) ? 0.55 : 0.35;
  const timeFit = s.bestTimes.includes(time) ? 1 : time === "20h30" ? 0.55 : 0.45;

  const fillPct = Math.max(0.14, Math.min(1, 0.45 * tagFit + 0.35 * dayFit + 0.2 * timeFit));
  const audience = Math.round(s.seats * fillPct);

  const good = overlap > 0 && s.bestDays.includes(day) && s.bestTimes.includes(time);

  const quality = good
    ? "good"
    : overlap > 0 && (dayFit >= 0.55 || timeFit >= 0.55)
      ? "mid"
      : "bad";

  return {
    audience,
    fillPct,
    good,
    overlap,
    quality
  };
}

function liveAudience() {
  return Object.entries(state.grid).reduce((sum, [key, fid]) => {
    const { sid, time, day } = parseCellKey(key);
    return sum + sessionStats(sid, day, time, fid).audience;
  }, 0);
}

function buildContext() {
  const sessions = [];

  for (const [key, fid] of Object.entries(state.grid)) {
    const { sid, time, day } = parseCellKey(key);
    const stats = sessionStats(sid, day, time, fid);

    sessions.push({
      sid,
      time,
      day,
      fid,
      ...stats
    });
  }

  const audience = sessions.reduce((sum, s) => sum + s.audience, 0);
  const perfectCount = sessions.filter((s) => s.good).length;

  return {
    sessions,
    audience,
    perfectCount
  };
}

function scoreOf(ctx) {
  const maxAudience = ctx.sessions.reduce((sum, session) => {
    return sum + salle(session.sid).seats;
  }, 0);

  if (!maxAudience) return 0;

  return Math.round(Math.min(100, (ctx.audience / maxAudience) * 100));
}

/* RENDER CATALOGUE */

function renderCatalogue() {
  const placed = usedFilms();

  $("#catalogue").innerHTML = FILMS.map((f) => {
    return `
      <article 
        class="film ${placed.has(f.id) ? "placed" : ""} ${selectedId === f.id ? "selected" : ""}" 
        draggable="${state.played ? "false" : "true"}"
        data-id="${f.id}"
        tabindex="0"
        role="button"
        aria-label="${f.title}. Clique puis choisis une séance."
      >
        <div class="poster" style="background-image:url('${f.img}')">
          <span class="badge">${f.badge}</span>
          <div class="ov">
            <div class="title">${f.title}</div>
            <div class="meta">${f.genre} · ${f.dur}</div>
            <div class="tags">
              ${f.tags.map((tag) => `<span class="tag">${tagLabel(tag)}</span>`).join("")}
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");

  wireFilms();
}

/* RENDER GRILLE */

function renderGrid() {
  const selectedFilm = selectedId ? film(selectedId) : null;

  const header = `
    <div class="grid-corner">Salle · horaire</div>
    ${DAYS.map((d) => `<div class="day-head">${d.l}</div>`).join("")}
  `;

  const rows = ROWS.map((row) => {
    const s = salle(row.sid);
    const target =
      selectedFilm && selectedFilm.tags.some((tag) => s.likes.includes(tag));

    const sayHtml = s.say.map((part) => {
      if (typeof part === "string") return part;

      const match = selectedFilm && selectedFilm.tags.includes(part.t);

      return `<span class="kw ${match ? "match" : ""}">${part.w}</span>`;
    }).join("");

    return `
      <div class="salle-head ${target ? "target" : ""}">
        <div class="salle-title">${s.name}</div>
        <div class="salle-sub">${s.sub}</div>
        <span class="salle-time">${row.time}</span>
        <p class="say">${sayHtml}</p>
      </div>

      ${DAYS.map((d) => renderCell(s, row.time, d, selectedFilm)).join("")}
    `;
  }).join("");

  $("#weekGrid").innerHTML = header + rows;

  wireGrid();
  updateGameHud();
}

function renderCell(s, time, d, selectedFilm) {
  const key = cellKey(s.id, time, d.k);
  const fid = state.grid[key];
  const placed = fid ? film(fid) : null;

  const classes = ["cell"];

  if (selectedFilm) {
    const tagMatch = selectedFilm.tags.some((tag) => s.likes.includes(tag));
    const best = tagMatch && s.bestDays.includes(d.k) && s.bestTimes.includes(time);

    if (tagMatch) classes.push("hint");
    if (best) classes.push("hint-strong");
  }

  if (placed && revealed) {
    const stats = sessionStats(s.id, d.k, time, fid);
    classes.push("revealed", stats.quality);
  }

  if (!placed) {
    return `
      <div class="${classes.join(" ")}" data-cell="${key}" title="${s.name} · ${d.l} · ${time}">
        <div class="empty"><span class="plus">+</span></div>
      </div>
    `;
  }

  const stats = sessionStats(s.id, d.k, time, fid);

  return `
    <div class="${classes.join(" ")}" data-cell="${key}" title="${s.name} · ${d.l} · ${time}">
      <div class="slot-card" style="background-image:url('${placed.img}')">
        ${
          !state.played
            ? `<button class="rm" data-rm="${key}" aria-label="Retirer">×</button>`
            : ""
        }

        <div class="slot-info">
          <div class="slot-title">${placed.title}</div>
          <div class="slot-meta">${d.l} · ${time}</div>
          <div class="slot-aud">${stats.audience.toLocaleString("fr-FR")} spectateurs</div>
        </div>
      </div>
    </div>
  `;
}

function updateGameHud() {
  const n = countSessions();

  $("#sessCount").textContent = `${n}/${GOAL}`;
  $("#weekProg").style.width = `${Math.min(100, (n / GOAL) * 100)}%`;

  if (revealed) {
    const total = liveAudience();
    animateNumber($("#audTotal"), Number($("#audTotal").dataset.value || 0), total, 500);
    $("#audTotal").dataset.value = total;
    pulseAudience();
  } else {
    $("#audTotal").textContent = "?";
    $("#audTotal").dataset.value = 0;
  }

  if (state.played) {
    $("#playBtn").disabled = true;
    $("#playBtn").textContent = "Semaine projetée";
    $("#playHint").textContent =
      "Cette semaine est jouée. Vide la grille pour programmer une nouvelle semaine.";
  } else {
    $("#playBtn").disabled = n < GOAL;
    $("#playBtn").textContent = "Lancer la projection";

    $("#playHint").textContent =
      n < GOAL
        ? `Place encore ${GOAL - n} séance${GOAL - n > 1 ? "s" : ""} pour lancer ta semaine.`
        : "Ta semaine est prête — lance la projection.";
  }
}

/* ACTIONS FILMS / GRILLE */

function selectFilm(id) {
  if (state.played) {
    toast("Semaine déjà projetée · vide la grille pour rejouer");
    return;
  }

  selectedId = selectedId === id ? null : id;
  closePicker();
  renderCatalogue();
  renderGrid();
}

function placeAt(key, fid) {
  if (state.played) return;

  closePicker();

  for (const existingKey of Object.keys(state.grid)) {
    if (state.grid[existingKey] === fid) {
      delete state.grid[existingKey];
    }
  }

  state.grid[key] = fid;
  selectedId = null;
  revealed = false;
  state.played = false;

  save();
  hideResult();
  renderCatalogue();
  renderGrid();
}

function clearAt(key) {
  if (state.played) return;

  closePicker();

  delete state.grid[key];
  revealed = false;

  save();
  hideResult();
  renderCatalogue();
  renderGrid();
}

function wireFilms() {
  $$(".film").forEach((el) => {
    const id = el.dataset.id;

    el.addEventListener("click", () => selectFilm(id));

    el.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectFilm(id);
      }
    });

    el.addEventListener("dragstart", (event) => {
      if (state.played) {
        event.preventDefault();
        return;
      }

      dragId = id;
      el.classList.add("dragging");

      event.dataTransfer.setData("text/plain", id);
      event.dataTransfer.effectAllowed = "move";
    });

    el.addEventListener("dragend", () => {
      dragId = null;
      el.classList.remove("dragging");
    });
  });
}

function wireGrid() {
  $$(".cell").forEach((cell) => {
    const key = cell.dataset.cell;

    cell.addEventListener("dragover", (event) => {
      if (state.played) return;

      event.preventDefault();
      cell.classList.add("over");
    });

    cell.addEventListener("dragleave", () => {
      cell.classList.remove("over");
    });

    cell.addEventListener("drop", (event) => {
      if (state.played) return;

      event.preventDefault();
      cell.classList.remove("over");

      const fid = dragId || event.dataTransfer.getData("text/plain");

      if (fid) placeAt(key, fid);
    });

    cell.addEventListener("click", (event) => {
      if (state.played) {
        toast("Semaine déjà projetée · vide la grille pour rejouer");
        return;
      }

      if (event.target.closest("[data-rm]")) return;

      if (state.grid[key]) {
        clearAt(key);
      } else if (selectedId) {
        placeAt(key, selectedId);
      } else {
        openPicker(key, cell);
      }
    });
  });

  $$("[data-rm]").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.stopPropagation();
      clearAt(btn.dataset.rm);
    });
  });
}

/* PICKER */

function openPicker(key, cellEl) {
  closePicker();

  const { sid, time, day } = parseCellKey(key);
  const s = salle(sid);
  const d = DAYS.find((x) => x.k === day);

  const placed = usedFilms();

  const picker = document.createElement("div");
  picker.id = "picker";
  picker.className = "picker";

  picker.innerHTML = `
    <div class="pk-top">
      <div>
        <div class="pk-title">${s.name} · ${d.l} · ${time}</div>
        <div class="pk-sub">Choisis le film qui plaira à ce public.</div>
      </div>

      <button class="pk-close" type="button" aria-label="Fermer">×</button>
    </div>

    <div class="pk-list">
      ${FILMS.map((f) => {
        return `
          <button class="pk-item" type="button" data-pick="${f.id}">
            <img src="${f.img}" alt="">
            <span>
              <b>${f.title}${placed.has(f.id) ? " · déjà placé" : ""}</b>
              <small>${f.genre} · ${f.dur}</small>
              <span class="pk-tags">
                ${f.tags.map((tag) => `<span>${tagLabel(tag)}</span>`).join("")}
              </span>
            </span>
          </button>
        `;
      }).join("")}
    </div>
  `;

  document.body.appendChild(picker);
  positionPicker(picker, cellEl);

  $(".pk-close", picker).addEventListener("click", closePicker);

  $$(".pk-item", picker).forEach((btn) => {
    btn.addEventListener("click", () => placeAt(key, btn.dataset.pick));
  });
}

function positionPicker(picker, cellEl) {
  const rect = cellEl.getBoundingClientRect();
  const width = Math.min(300, window.innerWidth - 20);

  picker.style.width = `${width}px`;

  let left = rect.right + 10 + window.scrollX;

  if (left + width > window.scrollX + window.innerWidth - 10) {
    left = rect.left + window.scrollX - width - 10;
  }

  if (left < window.scrollX + 10) {
    left = window.scrollX + 10;
  }

  let top = rect.top + window.scrollY;

  requestAnimationFrame(() => {
    const height = picker.offsetHeight;

    if (top + height > window.scrollY + window.innerHeight - 10) {
      top = window.scrollY + window.innerHeight - height - 10;
    }

    if (top < window.scrollY + 10) {
      top = window.scrollY + 10;
    }

    picker.style.left = `${left}px`;
    picker.style.top = `${top}px`;
  });
}

function closePicker() {
  const picker = $("#picker");
  if (picker) picker.remove();
}

document.addEventListener(
  "mousedown",
  (event) => {
    if (
      $("#picker") &&
      !event.target.closest("#picker") &&
      !event.target.closest(".cell")
    ) {
      closePicker();
    }
  },
  true
);

/* RÉSULTAT */

function play() {
  if (state.played || countSessions() < GOAL) return;

  revealed = true;
  state.played = true;

  const ctx = buildContext();
  const score = scoreOf(ctx);
  const unlocked = BADGES.filter((badge) => badge.test(ctx));

  const gained = 150 + Math.round(score * 1.5) + unlocked.length * 75;

  addPoints(gained, true);
  save();

  renderGrid();
  renderResult(ctx, score, unlocked, `+${gained} points fidélité`, true);

  if (score >= 70 || unlocked.length >= 3) {
    burstConfetti();
  }

  $("#result").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  showSticky();
}

function renderResult(ctx, score, unlocked, creditMsg, animate) {
  $("#result").classList.add("show");

  if (animate) {
    animateNumber($("#rScore"), 0, score, 900);
  } else {
    $("#rScore").textContent = score;
  }

  $("#rStars").textContent = starsFor(score);
  $("#rVerdict").textContent = verdictFor(score);
  $("#rAudience").textContent = ctx.audience.toLocaleString("fr-FR");
  $("#rPts").textContent = creditMsg;

  $("#rBadges").innerHTML = BADGES.map((badge) => {
    const on = unlocked.some((b) => b.id === badge.id);

    return `
      <div class="badge-result ${on ? "on" : ""}">
        <strong>${on ? "✓" : "○"} ${badge.name}</strong>
        <p>${badge.desc}</p>
      </div>
    `;
  }).join("");

  resultShown = true;
}

function restoreResult() {
  const ctx = buildContext();

  if (!ctx.sessions.length) return;

  const score = scoreOf(ctx);
  const unlocked = BADGES.filter((badge) => badge.test(ctx));

  renderResult(ctx, score, unlocked, "Semaine projetée · résultat enregistré", false);
}

function hideResult() {
  if (!resultShown) return;

  $("#result").classList.remove("show");
  resultShown = false;
}

function starsFor(score) {
  const full = Math.max(0, Math.min(5, Math.round(score / 20)));
  return "★".repeat(full) + "☆".repeat(5 - full);
}

function verdictFor(score) {
  if (score >= 85) {
    return "Excellent programme : chaque film trouve son public et les créneaux sont très bien choisis.";
  }

  if (score >= 65) {
    return "Très bonne semaine : les salles sont bien remplies et les choix sont cohérents.";
  }

  if (score >= 45) {
    return "Correct, mais quelques séances pourraient mieux matcher avec le public.";
  }

  return "Semaine difficile : revois les jours, les horaires et les salles pour booster l’audience.";
}

/* FIDÉLITÉ */

function renderHud() {
  const role = ROLES[state.role];
  const tier = currentTier();
  const next = nextTier();

  $("#tierName").textContent = tier.name;
  $("#ptsNow").textContent = state.points.toLocaleString("fr-FR");
  $("#hudMiniPts").textContent = state.points.toLocaleString("fr-FR");

  let percent;
  let from;
  let to;

  if (next) {
    const span = next.min - tier.min;

    percent = Math.max(0, Math.min(100, ((state.points - tier.min) / span) * 100));
    from = tier.name;
    to = `${(next.min - state.points).toLocaleString("fr-FR")} pts → ${next.name}`;
  } else {
    percent = 100;
    from = tier.name;
    to = "Niveau max ✦";
  }

  $("#lvlBar").style.width = `${percent}%`;
  $("#lvlFrom").textContent = from;
  $("#lvlTo").textContent = to;

  $("#rewardStrip").innerHTML = role.rewards.map((reward) => {
    const unlocked = state.points >= reward.cost;

    return `
      <div class="rwd ${unlocked ? "unlocked" : ""}">
        <div class="ic">${unlocked ? "✓" : reward.ico}</div>
        <div class="t">${reward.t}</div>
        <div class="cost">${unlocked ? "Débloqué" : `${reward.cost} pts`}</div>
      </div>
    `;
  }).join("");
}

function addPoints(amount, silent = false) {
  const before = currentTier().name;

  state.points += amount;
  save();
  renderHud();

  if (!silent) {
    toast(`+${amount} points`);
  }

  const after = currentTier().name;

  if (after !== before) {
    setTimeout(() => {
      toast(`Niveau débloqué : ${after}`);
      burstConfetti();
    }, 700);
  }
}

function renderEarn() {
  $("#earnTable").innerHTML = EARN_TABLE.map(([label, points]) => {
    return `
      <span class="chip">
        <span class="label">${label}</span>
        <span class="pts">${points}</span>
      </span>
    `;
  }).join("");
}

/* PROFIL */

function setRole(key) {
  state.role = key;
  save();

  const role = ROLES[key];

  $("#roleReal").classList.toggle("active", key === "real");
  $("#roleDiff").classList.toggle("active", key === "diff");

  $("#roleDesc").innerHTML = role.desc;
  $("#heroLead").textContent = role.hero;
  $("#roleIntroTitle").textContent = role.introTitle;
  $("#roleIntroBody").textContent = role.introBody;
  $("#catTitle").textContent = role.catTitle;

  $("#stickyTitle").textContent = role.stickyTitle;
  $("#convertSub").textContent = role.convertSub;
  $("#convertCta").textContent = role.form.convertCta;

  $("#formKicker").textContent = role.form.kicker;
  $("#modalTitle").textContent = role.form.title;
  $("#formSub").textContent = role.form.sub;
  $("#orgLabel").textContent = role.form.org;
  $("#formCtaTxt").textContent = role.form.cta;
  $("#formDoneMsg").textContent = role.form.done;

  renderHud();
}

/* MODAL CONTACT */

function openModal() {
  lastFocus = document.activeElement;

  $("#modalBack").classList.add("show");
  $("#modalLive").style.display = "block";
  $("#formDone").style.display = "none";

  setTimeout(() => {
    $("#f-name").focus();
  }, 80);
}

function closeModal() {
  $("#modalBack").classList.remove("show");

  if (lastFocus) {
    lastFocus.focus();
  }
}

function wireContact() {
  ["navCta", "stickyBtn", "convertBtn"].forEach((id) => {
    const el = $(`#${id}`);
    if (el) el.addEventListener("click", openModal);
  });

  $("#modalClose").addEventListener("click", closeModal);

  $("#modalBack").addEventListener("click", (event) => {
    if (event.target === $("#modalBack")) {
      closeModal();
    }
  });

  $("#contactForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const name = $("#f-name").value.trim();
    const email = $("#f-email").value.trim();

    if (!name) {
      $("#f-name").focus();
      return;
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      $("#f-email").focus();
      return;
    }

    $("#modalLive").style.display = "none";
    $("#formDone").style.display = "block";

    addPoints(100, true);
    toast("+100 points · coordonnées enregistrées");
    burstConfetti();

    /*
      Prototype :
      brancher ici un envoi réel de formulaire.

      Exemple :
      fetch("/api/contact", {
        method: "POST",
        body: new FormData(event.currentTarget)
      });
    */
  });
}

/* STICKY CTA */

function showSticky() {
  if (stickyShown) return;

  stickyShown = true;
  $("#stickyCta").classList.add("show");
}

window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 620) showSticky();
  },
  { passive: true }
);

/* FX */

function toast(message) {
  $("#toastTxt").textContent = message;
  $("#toast").classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    $("#toast").classList.remove("show");
  }, 2600);
}

function animateNumber(el, from, to, duration) {
  const start = performance.now();

  function step(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(from + (to - from) * eased);

    el.textContent = value.toLocaleString("fr-FR");

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function pulseAudience() {
  const card = $(".game-hud article");

  if (!card) return;

  card.classList.remove("pulse");
  void card.offsetWidth;
  card.classList.add("pulse");
}

function burstConfetti() {
  const colors = ["#ffc83d", "#ffe6a3", "#46e0a8", "#8a9bff", "#ff5d7a", "#b06bff"];

  for (let i = 0; i < 34; i++) {
    const confetti = document.createElement("div");

    confetti.className = "confetti";
    confetti.style.left = `${45 + Math.random() * 10}vw`;
    confetti.style.background = colors[i % colors.length];

    document.body.appendChild(confetti);

    const dx = (Math.random() - 0.5) * 60;
    const dy = 60 + Math.random() * 40;
    const rot = Math.random() * 720;

    confetti.animate(
      [
        {
          transform: "translate(0,0) rotate(0deg)",
          opacity: 1
        },
        {
          transform: `translate(${dx}vw, ${dy}vh) rotate(${rot}deg)`,
          opacity: 0
        }
      ],
      {
        duration: 1400 + Math.random() * 700,
        easing: "cubic-bezier(.2,.7,.3,1)"
      }
    );

    setTimeout(() => confetti.remove(), 2200);
  }
}

/* RESET OPTIONNEL */

function resetDemo() {
  state.points = 0;
  state.grid = {};
  state.played = false;

  selectedId = null;
  revealed = false;
  resultShown = false;

  try {
    localStorage.removeItem(STORE_KEY);
  } catch (e) {}

  save();
  hideResult();
  renderCatalogue();
  renderGrid();
  renderHud();

  toast("Démo réinitialisée");
}

/* INIT */

function init() {
  load();

  renderEarn();
  renderCatalogue();
  renderGrid();
  setRole(state.role);
  renderHud();
  wireContact();

  $("#roleReal").addEventListener("click", () => setRole("real"));
  $("#roleDiff").addEventListener("click", () => setRole("diff"));

  $("#playBtn").addEventListener("click", play);

  $("#clearBtn").addEventListener("click", () => {
    closePicker();

    state.grid = {};
    state.played = false;
    selectedId = null;
    revealed = false;

    save();
    hideResult();
    renderCatalogue();
    renderGrid();

    toast("Nouvelle semaine — à toi de jouer !");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePicker();

      if ($("#modalBack").classList.contains("show")) {
        closeModal();
      }
    }
  });

  if (state.played) {
    restoreResult();
  }

  /*
    Pour réinitialiser rapidement la démo :
    ouvrir la page avec ?reset=1
  */
  if (new URLSearchParams(window.location.search).get("reset") === "1") {
    resetDemo();

    const url = new URL(window.location.href);
    url.searchParams.delete("reset");
    window.history.replaceState({}, "", url);
  }
}

init();
