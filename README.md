<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CinéMatch — Lumière Locale</title>
<style>
  :root{
    --navy:#0E1A3C; --navy2:#16264F; --navy3:#1f3461;
    --gold:#E8B53C; --gold-soft:#F2D58A; --cream:#F4F1E9; --ink:#1C2742;
    --green:#1E7A4D; --red:#C75D58;
    --line:rgba(255,255,255,.10); --shadow:0 10px 30px rgba(0,0,0,.28);
  }
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{height:100%}
  body{
    font-family:'Calibri','Segoe UI',system-ui,sans-serif;
    background:radial-gradient(1200px 600px at 80% -10%, #1b2c57 0%, transparent 60%), var(--navy);
    color:var(--cream); min-height:100vh; padding:24px; display:flex; justify-content:center;
  }
  .app{width:100%;max-width:1180px}

  /* HEADER */
  .topbar{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:14px}
  .logo{font-family:Georgia,'Bookman Old Style',serif;font-weight:800;font-size:30px;letter-spacing:.5px}
  .logo .cine{color:#fff}.logo .match{color:var(--gold)}
  .logo small{display:block;font-family:Calibri,sans-serif;font-weight:600;font-size:11px;letter-spacing:3px;color:var(--gold-soft);margin-top:2px}
  .stats{display:flex;gap:10px;flex-wrap:wrap}
  .stat{background:var(--navy2);border:1px solid var(--line);border-radius:12px;padding:8px 16px;min-width:118px}
  .stat .k{font-size:10px;letter-spacing:1.5px;color:var(--gold-soft);font-weight:700}
  .stat .v{font-size:20px;font-weight:800;color:#fff;margin-top:2px}
  .stat .v small{font-size:12px;font-weight:600;color:var(--gold-soft)}

  /* ROLE SWITCH */
  .rolebar{display:flex;align-items:center;gap:14px;flex-wrap:wrap;background:var(--navy2);
    border:1px solid var(--line);border-radius:14px;padding:12px 16px;margin-bottom:18px}
  .role-toggle{display:flex;background:var(--navy);border-radius:10px;padding:4px;gap:4px}
  .role-toggle button{font-family:inherit;font-weight:800;font-size:13px;border:none;cursor:pointer;
    padding:9px 18px;border-radius:8px;background:transparent;color:var(--gold-soft);transition:.15s}
  .role-toggle button.active{background:var(--gold);color:var(--navy)}
  .role-desc{font-size:12.5px;color:#aab3cc;flex:1;min-width:220px;line-height:1.4}
  .role-desc b{color:#fff}

  /* LAYOUT */
  .board{display:grid;grid-template-columns:320px 1fr;gap:18px;align-items:start}
  .panel{background:var(--navy2);border:1px solid var(--line);border-radius:16px;padding:16px;box-shadow:var(--shadow)}
  .panel h2{font-size:12px;letter-spacing:1.5px;color:var(--gold);font-weight:800;margin-bottom:12px}
  .hint{display:block;font-size:11.5px;color:var(--gold-soft);font-weight:400;letter-spacing:0;text-transform:none;margin-top:4px}

  /* FILM CARDS */
  .film{position:relative;background:var(--navy3);border:1px solid var(--line);border-radius:14px;
    padding:8px;margin-bottom:11px;cursor:grab;transition:transform .12s,box-shadow .12s,border-color .12s,opacity .2s;user-select:none;overflow:hidden}
  .film:hover{transform:translateY(-2px);border-color:var(--gold);box-shadow:0 6px 16px rgba(0,0,0,.3)}
  .film.dragging{opacity:.45}
  .film.placed{opacity:.34;pointer-events:none;filter:grayscale(.4)}
  .film.selected{border-color:var(--gold);box-shadow:0 0 0 2px var(--gold) inset}
  .teaser{position:relative;width:100%;height:96px;border-radius:10px;overflow:hidden;margin-bottom:8px}
  .teaser svg{display:block;width:100%;height:100%}
  .teaser .play{position:absolute;inset:0;display:grid;place-items:center}
  .teaser .play span{width:34px;height:34px;border-radius:50%;background:rgba(14,26,60,.55);
    border:2px solid rgba(255,255,255,.85);display:grid;place-items:center;backdrop-filter:blur(2px)}
  .teaser .play span::before{content:"";border-left:11px solid #fff;border-top:7px solid transparent;border-bottom:7px solid transparent;margin-left:3px}
  .teaser .fmt{position:absolute;top:7px;left:7px;font-size:9px;font-weight:800;letter-spacing:.5px;
    background:rgba(14,26,60,.72);color:var(--gold-soft);padding:3px 7px;border-radius:20px}
  .teaser .dur{position:absolute;bottom:7px;right:7px;font-size:9.5px;font-weight:700;
    background:rgba(14,26,60,.72);color:#fff;padding:2px 7px;border-radius:6px}
  .film .title{font-size:14px;font-weight:800;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:0 2px}
  .film .sub{font-size:10.5px;color:var(--gold-soft);margin-top:2px;padding:0 2px}
  .tag{display:inline-block;font-size:9px;font-weight:700;letter-spacing:.4px;padding:2px 6px;border-radius:20px;
    background:rgba(232,181,60,.16);color:var(--gold-soft);margin:5px 2px 0 2px}

  /* ROOMS */
  .rooms{display:grid;gap:14px}
  .room{background:var(--navy3);border:1px solid var(--line);border-radius:16px;padding:14px}
  .room-head{display:flex;align-items:center;gap:10px;margin-bottom:4px}
  .room-emoji{font-size:22px}
  .room-name{font-size:15px;font-weight:800;color:#fff}
  .room-want{font-size:11px;color:var(--gold-soft);font-style:italic}
  .room-prefs{font-size:10.5px;color:#aab3cc;margin:6px 0 10px}
  .slot{margin-top:8px;border:2px dashed rgba(255,255,255,.18);border-radius:12px;min-height:62px;
    display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.4);font-size:13px;
    transition:border-color .15s,background .15s;padding:8px;text-align:center}
  .slot.over{border-color:var(--gold);background:rgba(232,181,60,.08)}
  .slot.filled{border-style:solid;justify-content:space-between;color:#fff}
  .slot-film{display:flex;gap:10px;align-items:center;min-width:0}
  .slot-film .mini{width:46px;height:34px;border-radius:6px;overflow:hidden;flex:0 0 auto}
  .slot-film .mini svg{width:100%;height:100%;display:block}
  .slot-film .t{font-size:13px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .slot-film .s{font-size:10px;color:var(--gold-soft)}
  .slot .score-bubble{font-weight:800;font-size:13px;padding:4px 10px;border-radius:20px;flex:0 0 auto}
  .score-good{background:rgba(30,122,77,.25);color:#7fe0a8}
  .score-mid{background:rgba(232,181,60,.22);color:var(--gold-soft)}
  .score-low{background:rgba(199,93,88,.22);color:#f0a6a2}
  .remove{background:none;border:none;color:rgba(255,255,255,.5);cursor:pointer;font-size:18px;line-height:1;padding:0 2px;flex:0 0 auto}
  .remove:hover{color:#fff}

  /* ACTION BAR */
  .actionbar{margin-top:18px;display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap}
  .progress{font-size:13px;color:var(--gold-soft)}
  .progress b{color:#fff}
  .btn{font-family:inherit;font-weight:800;font-size:14px;border:none;border-radius:12px;padding:13px 26px;cursor:pointer;transition:transform .1s,filter .15s;letter-spacing:.3px}
  .btn:active{transform:translateY(1px)}
  .btn-primary{background:var(--gold);color:var(--navy)}
  .btn-primary:hover{filter:brightness(1.06)}
  .btn-primary:disabled{opacity:.4;cursor:not-allowed}
  .btn-ghost{background:transparent;color:var(--gold-soft);border:1px solid var(--line)}
  .btn-ghost:hover{border-color:var(--gold)}

  /* END SCREEN */
  .overlay{position:fixed;inset:0;background:rgba(7,13,30,.86);backdrop-filter:blur(4px);
    display:none;align-items:flex-start;justify-content:center;padding:24px;z-index:50;overflow-y:auto}
  .overlay.show{display:flex;animation:fade .3s ease}
  @keyframes fade{from{opacity:0}to{opacity:1}}
  .modal{background:linear-gradient(180deg,var(--navy2),var(--navy));border:1px solid var(--line);
    border-radius:22px;max-width:580px;width:100%;padding:30px;box-shadow:var(--shadow);
    animation:pop .35s cubic-bezier(.2,.9,.3,1.3);margin:auto}
  @keyframes pop{from{transform:scale(.92);opacity:0}to{transform:scale(1);opacity:1}}
  .modal .rank{font-size:13px;letter-spacing:3px;font-weight:800;color:var(--gold);text-align:center}
  .modal .big{font-family:Georgia,serif;font-size:52px;font-weight:800;color:#fff;margin:4px 0;line-height:1;text-align:center}
  .modal .big small{font-size:20px;color:var(--gold-soft)}
  .stars{font-size:24px;letter-spacing:4px;margin:4px 0 10px;text-align:center}
  .modal .verdict{font-size:17px;font-weight:800;color:#fff;text-align:center;margin-bottom:4px}
  .modal .msg{font-size:13px;color:var(--gold-soft);line-height:1.5;text-align:center;margin-bottom:18px}

  /* fidélité */
  .tier-card{background:var(--navy3);border:1px solid var(--line);border-radius:14px;padding:14px 16px;margin-bottom:16px}
  .tier-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:9px}
  .tier-now{font-size:12px;color:var(--gold-soft)}
  .tier-now b{color:#fff;font-size:14px}
  .tier-next{font-size:11px;color:#aab3cc;text-align:right}
  .bar{height:9px;background:var(--navy);border-radius:20px;overflow:hidden;border:1px solid var(--line)}
  .bar i{display:block;height:100%;background:linear-gradient(90deg,var(--gold),var(--gold-soft));border-radius:20px;transition:width .8s cubic-bezier(.2,.9,.3,1)}
  .tier-msg{font-size:11px;color:var(--gold-soft);margin-top:8px}

  .rew-h{font-size:11px;letter-spacing:1.5px;font-weight:800;color:var(--gold);margin:4px 0 10px}
  .reward{display:flex;align-items:center;gap:12px;background:var(--navy3);border:1px solid var(--line);
    border-radius:12px;padding:10px 12px;margin-bottom:9px;transition:.15s}
  .reward.locked{opacity:.55}
  .reward .ico{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;font-size:19px;flex:0 0 auto;background:rgba(232,181,60,.14)}
  .reward .info{flex:1;min-width:0}
  .reward .rt{font-size:13.5px;font-weight:800;color:#fff}
  .reward .rc{font-size:11px;color:var(--gold-soft);margin-top:1px}
  .reward .rcost{font-size:11px;font-weight:800;flex:0 0 auto;text-align:right}
  .reward .claim{font-family:inherit;font-weight:800;font-size:11.5px;border:none;border-radius:8px;
    padding:7px 12px;cursor:pointer;background:var(--gold);color:var(--navy);transition:.15s;flex:0 0 auto}
  .reward .claim:hover{filter:brightness(1.06)}
  .reward .claim.claimed{background:var(--green);color:#fff}
  .reward .need{font-size:11px;font-weight:800;color:#aab3cc;flex:0 0 auto;text-align:right;white-space:nowrap}

  .modal .quote{font-size:12px;font-style:italic;color:#aab3cc;border-top:1px solid var(--line);
    padding-top:14px;margin:16px 0;text-align:center;line-height:1.5}
  .modal .actions{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
  .toast{position:fixed;left:50%;bottom:26px;transform:translateX(-50%) translateY(20px);
    background:var(--green);color:#fff;font-weight:700;font-size:13px;padding:12px 20px;border-radius:12px;
    box-shadow:var(--shadow);opacity:0;pointer-events:none;transition:.3s;z-index:60}
  .toast.show{opacity:1;transform:translateX(-50%) translateY(0)}

  /* barème déroulant */
  .earn{background:var(--navy3);border:1px solid var(--line);border-radius:14px;padding:14px 16px;margin-bottom:16px}
  .earn-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px}
  .earn-toggle{font-family:inherit;font-weight:800;font-size:11px;border:none;cursor:pointer;
    background:transparent;color:var(--gold);padding:0}
  .earn-toggle:hover{text-decoration:underline}
  .earn-row{display:flex;align-items:center;justify-content:space-between;gap:10px;
    padding:7px 0;border-bottom:1px solid var(--line);font-size:12.5px}
  .earn-row:last-child{border-bottom:none}
  .earn-row .lab{color:#dfe4f2}
  .earn-row .pt{font-weight:800;color:var(--gold);flex:0 0 auto}
  .earn-row.is-game{background:rgba(232,181,60,.10);border-radius:8px;padding:7px 10px;margin:2px 0;border-bottom:none}
  .earn-row.is-game .lab{color:#fff;font-weight:700}
  .earn-row.is-game .lab::after{content:" ✓ acquis";color:#7fe0a8;font-size:10.5px;font-weight:800}

  /* formulaire */
  .form-modal{position:relative;max-width:480px}
  .form-close{position:absolute;top:16px;right:16px;background:none;border:none;color:#aab3cc;
    font-size:18px;cursor:pointer;line-height:1}
  .form-close:hover{color:#fff}
  .form-title{font-family:Georgia,serif;font-size:26px;font-weight:800;color:#fff;text-align:center;margin:2px 0 2px}
  .field{margin-bottom:12px}
  .field label{display:block;font-size:11.5px;font-weight:700;color:var(--gold-soft);margin-bottom:5px;letter-spacing:.3px}
  .field input,.field select,.field textarea{width:100%;font-family:inherit;font-size:13.5px;color:#fff;
    background:var(--navy);border:1px solid var(--line);border-radius:10px;padding:11px 13px;outline:none;transition:.15s}
  .field input:focus,.field select:focus,.field textarea:focus{border-color:var(--gold)}
  .field textarea{resize:vertical;min-height:64px}
  .field select{appearance:none;cursor:pointer}
  .form-note{font-size:11px;color:#aab3cc;font-style:italic;margin:4px 0 10px;text-align:center}
  .form-check{width:60px;height:60px;border-radius:50%;background:var(--green);color:#fff;font-size:30px;
    font-weight:800;display:grid;place-items:center;margin:6px auto 14px}

  @media(max-width:820px){
    .board{grid-template-columns:1fr}
    .catalogue{order:2}
    body{padding:14px}
  }
</style>
</head>
<body>
<div class="app">

  <div class="topbar">
    <div class="logo"><span class="cine">CINÉ</span><span class="match">MATCH</span>
      <small>LUMIÈRE LOCALE · LE JEU DES BONS FILMS, AUX BONNES SALLES</small>
    </div>
    <div class="stats">
      <div class="stat"><div class="k">SALLES REMPLIES</div><div class="v"><span id="filledCount">0</span><small> / 3</small></div></div>
      <div class="stat"><div class="k">AUDIENCE SIMULÉE</div><div class="v"><span id="audience">0</span><small> spect.</small></div></div>
      <div class="stat"><div class="k">POINTS FIDÉLITÉ</div><div class="v"><span id="score">0</span><small> pts</small></div></div>
    </div>
  </div>

  <div class="rolebar">
    <div class="role-toggle">
      <button id="roleReal" class="active">🎬 Je suis réalisateur·rice</button>
      <button id="roleDiff">🏛️ Je suis diffuseur / salle</button>
    </div>
    <div class="role-desc" id="roleDesc"></div>
  </div>

  <div class="board">
    <div class="panel catalogue">
      <h2 id="catTitle">TON CATALOGUE — 5 TEASERS
        <span class="hint">Glisse un teaser vers une salle, ou clique un teaser puis une salle.</span>
      </h2>
      <div id="catalogue"></div>
    </div>
    <div class="rooms" id="rooms"></div>
  </div>

  <div class="actionbar">
    <div class="progress">Programme les 3 salles, puis valide ta semaine. <b id="progressMsg"></b></div>
    <div style="display:flex;gap:10px">
      <button class="btn btn-ghost" id="resetBtn">Recommencer</button>
      <button class="btn btn-primary" id="validateBtn" disabled>Valider ma programmation</button>
    </div>
  </div>
</div>

<div class="overlay" id="overlay">
  <div class="modal">
    <div class="rank" id="rank">RÉSULTAT</div>
    <div class="big"><span id="finalScore">0</span><small> pts gagnés</small></div>
    <div class="stars" id="stars"></div>
    <div class="verdict" id="verdict"></div>
    <div class="msg" id="endMsg"></div>

    <div class="tier-card">
      <div class="tier-top">
        <div class="tier-now">Ton niveau&nbsp;: <b id="tierName">—</b></div>
        <div class="tier-next" id="tierNext"></div>
      </div>
      <div class="bar"><i id="tierBar" style="width:0%"></i></div>
      <div class="tier-msg" id="tierMsg"></div>
    </div>

    <div class="rew-h" id="rewH">CE QUE TES POINTS DÉBLOQUENT</div>
    <div id="rewards"></div>

    <div class="earn">
      <div class="earn-top">
        <div class="rew-h" style="margin:0">AUTRES FAÇONS DE GAGNER DES POINTS</div>
        <button class="earn-toggle" id="earnToggle">Voir tout le barème ▾</button>
      </div>
      <div id="earnList"></div>
    </div>

    <div class="quote" id="quote"></div>
    <div class="actions">
      <button class="btn btn-ghost" id="replayBtn">Continuer à cumuler</button>
      <button class="btn btn-primary" id="ctaBtn">Lancer mon projet →</button>
    </div>
  </div>
</div>

<!-- FORMULAIRE DE CONTACT FICTIF -->
<div class="overlay" id="formOverlay">
  <div class="modal form-modal">
    <button class="form-close" id="formClose" title="Fermer">✕</button>
    <div class="rank" id="formKicker">LUMIÈRE LOCALE</div>
    <div class="form-title" id="formTitle">Lancer mon projet</div>
    <div class="msg" id="formSub" style="margin-bottom:18px"></div>

    <div id="formBody">
      <div class="field"><label id="lblName">Nom complet</label><input id="fName" type="text" placeholder="Ex. Camille Durand"></div>
      <div class="field" id="fieldStructure"><label id="lblStructure">Société / structure</label><input id="fStructure" type="text" placeholder="Ex. Production indépendante"></div>
      <div class="field"><label>Adresse e-mail</label><input id="fEmail" type="email" placeholder="prenom@exemple.fr"></div>
      <div class="field"><label id="lblSubject">Objet</label>
        <select id="fSubject"></select>
      </div>
      <div class="field"><label id="lblMsg">Message</label><textarea id="fMsg" rows="3" placeholder="Quelques mots sur ton projet…"></textarea></div>
      <div class="form-note" id="formNote"></div>
      <button class="btn btn-primary" id="formSubmit" style="width:100%;margin-top:6px">Envoyer ma demande</button>
    </div>

    <div id="formDone" style="display:none;text-align:center">
      <div class="form-check">✓</div>
      <div class="verdict" style="margin-bottom:6px">Demande envoyée !</div>
      <div class="msg" id="formDoneMsg"></div>
      <button class="btn btn-primary" id="formDoneBtn" style="margin-top:18px">Retour au jeu</button>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>

<script>
/* =======================================================================
   TEASERS — illustrations fictives générées en SVG (pas de photo réelle).
   Chaque film a une "scène" abstraite + ambiance colorée selon le genre.
   ======================================================================= */
function teaserSVG(f){
  const g = f.grad;
  return `<svg viewBox="0 0 200 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg-${f.id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${g[0]}"/><stop offset="1" stop-color="${g[1]}"/>
      </linearGradient>
      <radialGradient id="gl-${f.id}" cx="0.5" cy="0.35" r="0.7">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.35"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="200" height="100" fill="url(#bg-${f.id})"/>
    <rect width="200" height="100" fill="url(#gl-${f.id})"/>
    ${f.scene}
    <rect width="200" height="100" fill="#0E1A3C" opacity="0.12"/>
  </svg>`;
}

/* scènes par film (silhouettes simples, évocatrices) */
const SCENES = {
  lampions:`<g opacity="0.9">
    ${[30,60,90,120,150,170].map((x,i)=>`<line x1="${x}" y1="0" x2="${x}" y2="${22+i*3}" stroke="#fff" stroke-width="1" opacity="0.5"/><circle cx="${x}" cy="${22+i*3}" r="${5-i*0.3}" fill="#FFE9A8"/>`).join("")}
    <rect x="0" y="74" width="200" height="26" fill="#000" opacity="0.35"/>
    <circle cx="100" cy="88" r="8" fill="#1C2742" opacity="0.6"/></g>`,
  herbes:`<g>
    ${[20,45,70,95,120,145,170].map(x=>`<path d="M${x} 100 Q ${x-5} 60 ${x} 40 Q ${x+5} 60 ${x} 100" fill="#7FB06B" opacity="0.7"/>`).join("")}
    <circle cx="150" cy="30" r="14" fill="#FFE9A8" opacity="0.9"/></g>`,
  echappees:`<g>
    <path d="M0 70 L60 45 L110 60 L160 38 L200 55 L200 100 L0 100 Z" fill="#2C3E50" opacity="0.55"/>
    <path d="M0 82 L50 70 L120 80 L200 68 L200 100 L0 100 Z" fill="#1C2742" opacity="0.6"/>
    <circle cx="40" cy="28" r="9" fill="#fff" opacity="0.85"/></g>`,
  contrejour:`<g>
    <rect x="86" y="20" width="28" height="80" fill="#0E1A3C" opacity="0.7"/>
    <circle cx="100" cy="34" r="20" fill="#FFCF6B" opacity="0.55"/>
    <rect x="0" y="86" width="200" height="14" fill="#000" opacity="0.4"/></g>`,
  vagues:`<g>
    <path d="M0 60 Q 50 48 100 60 T 200 60 V100 H0 Z" fill="#3E7CB1" opacity="0.6"/>
    <path d="M0 72 Q 50 62 100 72 T 200 72 V100 H0 Z" fill="#2A5C8A" opacity="0.7"/>
    <circle cx="155" cy="30" r="13" fill="#FFE9A8" opacity="0.85"/></g>`
};

const FILMS = [
  { id:"lampions", title:"Sous les lampions", genre:"Drame", dur:"1h32", format:"LONG-MÉTRAGE",
    grad:["#7A3B52","#C75D58"], traits:["auteur","adulte","engage"] },
  { id:"herbes", title:"Les mauvaises herbes", genre:"Comédie", dur:"1h48", format:"LONG-MÉTRAGE",
    grad:["#8A6D1F","#E8B53C"], traits:["famille","feelgood","grandpublic"] },
  { id:"echappees", title:"Les échappées", genre:"Documentaire", dur:"22 min", format:"COURT-MÉTRAGE",
    grad:["#1E5A45","#1E7A4D"], traits:["auteur","curieux","engage","court"] },
  { id:"contrejour", title:"À contre-jour", genre:"Thriller", dur:"1h27", format:"LONG-MÉTRAGE",
    grad:["#39477A","#5B6FB5"], traits:["adulte","moderne","engage"] },
  { id:"vagues", title:"Le bruit des vagues", genre:"Romance", dur:"18 min", format:"COURT-MÉTRAGE",
    grad:["#4B3E78","#7E6FC0"], traits:["famille","jeune","moderne","feelgood","court"] },
];
FILMS.forEach(f=> f.scene = SCENES[f.id]);

const ROOMS = [
  { id:"rex", name:"Le Rex", emoji:"🎭", want:"Salle art & essai — films d'auteur",
    prefs:"Aime les drames, documentaires et films engagés. Public adulte, curieux.",
    likes:["auteur","engage","curieux","adulte"] },
  { id:"famille", name:"Ciné Famille", emoji:"🍿", want:"Salle familiale — grand public",
    prefs:"Aime les comédies et films feel-good. Public familial.",
    likes:["famille","feelgood","grandpublic"] },
  { id:"entracte", name:"L'Entracte", emoji:"🎟️", want:"Salle jeune public / étudiante",
    prefs:"Cherche des films courts, modernes et engageants. Public jeune.",
    likes:["jeune","moderne","court","engage"] },
];

const BASE=600, PER_MATCH=420, MISMATCH_PEN=140;
const PLAY_POINTS=150;      // « Jouer à CinéMatch = 150 pts » (barème PPTX), acquis à la validation
const PERF_PER_MATCH=250;   // bonus de performance par bonne correspondance film/salle
function scoreFor(film,room){
  const m=film.traits.filter(t=>room.likes.includes(t)).length;
  let s=BASE+m*PER_MATCH; if(m===0)s-=MISMATCH_PEN; return Math.max(120,Math.round(s));
}
function tierFor(film,room){
  const m=film.traits.filter(t=>room.likes.includes(t)).length;
  return m>=2?"good":m===1?"mid":"low";
}

/* =======================================================================
   RÔLES — adaptent pitch, vocabulaire, paliers et récompenses
   ======================================================================= */
const ROLES = {
  real:{
    label:"réalisateur·rice",
    desc:"En jouant, tu gagnes des <b>points fidélité</b>, tu découvres les <b>salles partenaires</b> et tu fais de la veille sur les autres films programmés. Comprends comment un diffuseur choisit — pour mieux placer ton film.",
    cta:"Lancer mon projet →",
    tiers:[
      {name:"Talent Découverte", min:0,    next:1000},
      {name:"Talent Repéré",     min:1000, next:2500},
      {name:"Talent Sélectionné",min:2500, next:5000},
      {name:"Talent Ambassadeur",min:5000, next:null},
    ],
    rewards:[
      {ico:"🎟️", cost:200, t:"Teaser mis en avant 2 semaines", c:"Ton film remonte dans le catalogue"},
      {ico:"📊", cost:400, t:"Fiche audience détaillée", c:"Quelles salles / publics matchent ton film"},
      {ico:"🤝", cost:700, t:"Mise en relation prioritaire", c:"Présenté en direct à une salle partenaire"},
      {ico:"🎬", cost:1200,t:"Accompagnement promo dédié", c:"Plan de diffusion sur-mesure Lumière Locale"},
    ],
    earnKey:[
      ["Jouer à CinéMatch","150"],
      ["Laisser ses coordonnées","100"],
      ["Demander une mise en relation","300"],
      ["Programmer un film proposé","800"],
      ["Séance avec présence du réalisateur","1 000"],
    ],
    earnAll:[
      ["Jouer à CinéMatch","150"],
      ["Laisser ses coordonnées","100"],
      ["Consulter le catalogue 1 min","50"],
      ["Ajouter un film en favori (max 5)","30"],
      ["Demander une sélection personnalisée","200"],
      ["Demander une mise en relation","300"],
      ["Programmer un film proposé","800"],
      ["Séance avec présence du réalisateur","1 000"],
      ["Partager les résultats d'audience","400"],
      ["2ᵉ film programmé (+500 / film ensuite)","1 200"],
      ["Recommander une autre salle","700"],
    ]
  },
  diff:{
    label:"diffuseur / programmateur·rice",
    desc:"Parcours les <b>teasers de projets prometteurs</b> de façon ludique, repère ceux qui colleraient à ta salle, et <b>cumule des points</b> qui réduisent tes commissions et débloquent des avantages de programmation.",
    cta:"Trouver un projet →",
    tiers:[
      {name:"Salle Découverte", min:0,    next:1000},
      {name:"Salle Active",     min:1000, next:2500},
      {name:"Salle Programmée", min:2500, next:5000},
      {name:"Salle Référente",  min:5000, next:null},
    ],
    rewards:[
      {ico:"🎞️", cost:200, t:"Sélection personnalisée", c:"3 films adaptés à ta ligne éditoriale"},
      {ico:"⏳", cost:300, t:"Réservation prioritaire 7 j", c:"Bloque un film avant les autres salles"},
      {ico:"💸", cost:800, t:"Commission réduite 18 %", c:"Au lieu de 20 % sur ta prochaine prog."},
      {ico:"⭐", cost:1200,t:"Exclusivité locale 30 j", c:"Un film rien que pour ta salle, ta zone"},
    ],
    earnKey:[
      ["Jouer à CinéMatch","150"],
      ["Demander une sélection personnalisée","200"],
      ["Programmer un film proposé","800"],
      ["Recommander une autre salle","700"],
      ["2ᵉ film programmé (+500 / film ensuite)","1 200"],
    ],
    earnAll:[
      ["Jouer à CinéMatch","150"],
      ["Laisser ses coordonnées","100"],
      ["Consulter le catalogue 1 min","50"],
      ["Ajouter un film en favori (max 5)","30"],
      ["Demander une sélection personnalisée","200"],
      ["Demander une mise en relation","300"],
      ["Programmer un film proposé","800"],
      ["Séance avec présence du réalisateur","1 000"],
      ["Partager les résultats d'audience","400"],
      ["2ᵉ film programmé (+500 / film ensuite)","1 200"],
      ["Recommander une autre salle","700"],
    ]
  }
};
let role="real";

/* Barème officiel (PPTX p.10) — autres façons de cumuler des points */
const POINTS_RULES = [
  {act:"Jouer à CinéMatch", pts:150},
  {act:"Laisser ses coordonnées", pts:100},
  {act:"Demander une mise en relation", pts:300},
  {act:"Programmer un film proposé", pts:800},
  {act:"Recommander une autre salle", pts:700},
];

/* =======================================================================
   ÉTAT
   ======================================================================= */
let placement={}, selectedFilm=null, claimed={};

const catEl=document.getElementById("catalogue");
const roomsEl=document.getElementById("rooms");

function renderRole(){
  const r=ROLES[role];
  document.getElementById("roleReal").classList.toggle("active",role==="real");
  document.getElementById("roleDiff").classList.toggle("active",role==="diff");
  document.getElementById("roleDesc").innerHTML=r.desc;
  document.getElementById("catTitle").innerHTML =
    (role==="real"?"TON CATALOGUE — 5 TEASERS":"TEASERS À PROGRAMMER — 5 PROJETS")+
    `<span class="hint">${role==="real"?"Vois comment les salles choisissent : place chaque teaser dans la salle qui le ferait vibrer.":"Repère les projets qui collent à tes salles : glisse chaque teaser vers la bonne salle."}</span>`;
}

function renderCatalogue(){
  catEl.innerHTML="";
  FILMS.forEach(f=>{
    const placed=Object.values(placement).includes(f.id);
    const div=document.createElement("div");
    div.className="film"+(placed?" placed":"")+(selectedFilm===f.id?" selected":"");
    div.draggable=!placed; div.dataset.film=f.id;
    div.innerHTML=`
      <div class="teaser">
        ${teaserSVG(f)}
        <div class="fmt">${f.format}</div>
        <div class="dur">${f.dur}</div>
        <div class="play"><span></span></div>
      </div>
      <div class="title">${f.title}</div>
      <div class="sub">${f.genre}</div>
      <div>${f.traits.slice(0,3).map(t=>`<span class="tag">${t}</span>`).join("")}</div>`;
    div.addEventListener("dragstart",e=>{ if(placed){e.preventDefault();return;}
      e.dataTransfer.setData("text/plain",f.id); div.classList.add("dragging"); });
    div.addEventListener("dragend",()=>div.classList.remove("dragging"));
    div.addEventListener("click",()=>{ if(placed)return;
      selectedFilm=(selectedFilm===f.id)?null:f.id; renderCatalogue(); });
    catEl.appendChild(div);
  });
}

function miniSVG(f){
  return `<svg viewBox="0 0 200 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="m-${f.id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${f.grad[0]}"/><stop offset="1" stop-color="${f.grad[1]}"/>
    </linearGradient></defs><rect width="200" height="100" fill="url(#m-${f.id})"/>${f.scene}</svg>`;
}

function renderRooms(){
  roomsEl.innerHTML="";
  ROOMS.forEach(room=>{
    const film=FILMS.find(f=>f.id===placement[room.id]);
    const card=document.createElement("div"); card.className="room";
    let slotInner;
    if(film){
      const t=tierFor(film,room), sc=scoreFor(film,room);
      const cls=t==="good"?"score-good":t==="mid"?"score-mid":"score-low";
      const label=t==="good"?"Parfait":t==="mid"?"Correct":"Hors public";
      slotInner=`<div class="slot-film"><div class="mini">${miniSVG(film)}</div>
          <div><div class="t">${film.title}</div><div class="s">${film.genre} · ${film.dur}</div></div></div>
        <div style="display:flex;align-items:center;gap:8px">
          <span class="score-bubble ${cls}">${label} · +${sc}</span>
          <button class="remove" title="Retirer" data-room="${room.id}">✕</button></div>`;
    } else {
      slotInner=`<span>Dépose un teaser ici &nbsp;·&nbsp; ${room.want.split("—")[0].trim()}</span>`;
    }
    card.innerHTML=`<div class="room-head"><span class="room-emoji">${room.emoji}</span>
        <div><div class="room-name">${room.name}</div><div class="room-want">${room.want}</div></div></div>
      <div class="room-prefs">${room.prefs}</div>
      <div class="slot ${film?'filled':''}" data-room="${room.id}">${slotInner}</div>`;
    const slot=card.querySelector(".slot");
    slot.addEventListener("dragover",e=>{e.preventDefault();slot.classList.add("over");});
    slot.addEventListener("dragleave",()=>slot.classList.remove("over"));
    slot.addEventListener("drop",e=>{e.preventDefault();slot.classList.remove("over");
      const fid=e.dataTransfer.getData("text/plain"); if(fid)placeFilm(room.id,fid);});
    slot.addEventListener("click",e=>{ if(e.target.classList.contains("remove"))return;
      if(selectedFilm){placeFilm(room.id,selectedFilm);selectedFilm=null;} });
    const rm=card.querySelector(".remove");
    if(rm)rm.addEventListener("click",()=>{delete placement[room.id];refresh();});
    roomsEl.appendChild(card);
  });
}

function placeFilm(roomId,filmId){
  for(const r in placement){if(placement[r]===filmId)delete placement[r];}
  placement[roomId]=filmId; refresh();
}
function totals(){
  let audience=0, matchSum=0;
  for(const r in placement){
    const room=ROOMS.find(x=>x.id===r), film=FILMS.find(f=>f.id===placement[r]);
    if(room&&film){
      audience+=scoreFor(film,room);
      matchSum+=film.traits.filter(t=>room.likes.includes(t)).length; // qualité du ciblage
    }
  }
  const filled=Object.keys(placement).length;
  const perfBonus=matchSum*PERF_PER_MATCH;                 // bonus lié à la perf
  const points = filled>0 ? PLAY_POINTS+perfBonus : 0;     // 150 acquis + bonus
  return {audience,points,perfBonus,filled};
}
function refresh(){
  renderCatalogue(); renderRooms();
  const {audience,points,filled}=totals();
  document.getElementById("filledCount").textContent=filled;
  document.getElementById("audience").textContent=audience.toLocaleString("fr-FR");
  document.getElementById("score").textContent=points.toLocaleString("fr-FR");
  document.getElementById("validateBtn").disabled=filled<3;
  document.getElementById("progressMsg").textContent=
    filled<3?`Encore ${3-filled} salle(s) à remplir.`:"Tout est prêt — valide ta semaine !";
}

/* =======================================================================
   ÉCRAN DE FIN — programme de fidélité
   ======================================================================= */
let currentScore=0;
function endGame(){
  const {points,perfBonus,filled}=totals(); currentScore=points; claimed={};
  // calibrage des étoiles sur la perf de ciblage (indépendant du barème de points)
  let maxAudience=0;
  ROOMS.forEach(room=>{let best=0;FILMS.forEach(f=>{best=Math.max(best,scoreFor(f,room));});maxAudience+=best;});
  maxAudience=Math.round(maxAudience*1.12);
  let audience=0;
  for(const r in placement){const room=ROOMS.find(x=>x.id===r),film=FILMS.find(f=>f.id===placement[r]);if(room&&film)audience+=scoreFor(film,room);}
  const ratio=audience/maxAudience;
  const stars=ratio>=.92?5:ratio>=.78?4:ratio>=.6?3:ratio>=.4?2:1;
  const verdicts={
    5:["Programmation parfaite","Chaque salle a trouvé son film idéal."],
    4:["Excellente programmation","Très bon ciblage des publics."],
    3:["Bonne programmation","Certains films ne sont pas dans la salle qui les fera vibrer."],
    2:["Programmation à revoir","Plusieurs films sont mal placés."],
    1:["Salles mal remplies","Les films et les publics ne se rencontrent pas — c'est là qu'on intervient."]
  };
  document.getElementById("finalScore").textContent=points.toLocaleString("fr-FR");
  document.getElementById("stars").innerHTML=
    Array.from({length:5},(_,i)=>`<span style="color:${i<stars?'var(--gold)':'#3a466b'}">★</span>`).join("");
  document.getElementById("rank").textContent="TA SEMAINE EST BOUCLÉE";
  document.getElementById("verdict").textContent=verdicts[stars][0];
  const r=ROLES[role];
  document.getElementById("endMsg").innerHTML=
    verdicts[stars][1]+`<br><br><b style="color:#fff">${PLAY_POINTS} pts</b> pour avoir joué `+
    `<span style="color:#7fe0a8">+ ${perfBonus.toLocaleString("fr-FR")} pts</span> de bonus performance `+
    `= <b style="color:#fff">${points.toLocaleString("fr-FR")} points fidélité</b>.<br>`+
    `Profites-en maintenant, ou continue à cumuler pour atteindre le palier suivant.`;
  document.getElementById("ctaBtn").textContent=r.cta;
  document.getElementById("quote").innerHTML= role==="real"
    ? "« Ton film mérite la bonne salle, le bon public, le bon moment. C'est exactement le rôle de Lumière Locale. »"
    : "« Les bons films pour ta salle existent déjà. Lumière Locale crée le lien entre tes salles et leur public. »";
  renderFidelity();
  renderEarn();
  document.getElementById("overlay").classList.add("show");
  document.querySelector(".overlay").scrollTop=0;
}

function currentTier(score){
  const tiers=ROLES[role].tiers;
  let cur=tiers[0];
  for(const t of tiers){ if(score>=t.min)cur=t; }
  return cur;
}
function renderFidelity(){
  const r=ROLES[role], score=currentScore;
  const tier=currentTier(score);
  document.getElementById("tierName").textContent=tier.name;
  let pct,nextTxt,msg;
  if(tier.next){
    const span=tier.next-tier.min, prog=score-tier.min;
    pct=Math.min(100,Math.round(prog/span*100));
    const remain=tier.next-score;
    const nextTier=r.tiers[r.tiers.indexOf(tier)+1];
    nextTxt=`Plus que <b style="color:#fff">${remain.toLocaleString("fr-FR")} pts</b><br>→ ${nextTier.name}`;
    msg=`Encore ${remain.toLocaleString("fr-FR")} points et tu débloques le niveau « ${nextTier.name} » et ses avantages.`;
  } else { pct=100; nextTxt="Niveau maximum 🏆"; msg="Tu es au sommet du programme : tous les avantages te sont ouverts."; }
  document.getElementById("tierNext").innerHTML=nextTxt;
  document.getElementById("tierMsg").textContent=msg;
  setTimeout(()=>{document.getElementById("tierBar").style.width=pct+"%";},120);

  const wrap=document.getElementById("rewards"); wrap.innerHTML="";
  r.rewards.forEach((rw,i)=>{
    const unlocked=score>=rw.cost;
    const isClaimed=claimed[i];
    const row=document.createElement("div");
    row.className="reward"+(unlocked?"":" locked");
    let right;
    if(!unlocked){ right=`<div class="need">Encore ${(rw.cost-score).toLocaleString("fr-FR")} pts</div>`; }
    else { right=`<button class="claim${isClaimed?' claimed':''}" data-i="${i}">${isClaimed?'✓ Activé':'J’en profite'}</button>`; }
    row.innerHTML=`<div class="ico">${rw.ico}</div>
      <div class="info"><div class="rt">${rw.t}</div><div class="rc">${rw.c}</div></div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
        <div class="rcost" style="color:${unlocked?'#7fe0a8':'#aab3cc'}">${rw.cost.toLocaleString("fr-FR")} pts</div>
        ${right}</div>`;
    const btn=row.querySelector(".claim");
    if(btn)btn.addEventListener("click",()=>{
      const idx=+btn.dataset.i;
      if(claimed[idx])return;
      claimed[idx]=true; btn.classList.add("claimed"); btn.textContent="✓ Activé";
      showToast(`Avantage activé : ${r.rewards[idx].t}. L'équipe Lumière Locale te recontacte.`);
    });
    wrap.appendChild(row);
  });
}

function showToast(msg){
  const t=document.getElementById("toast"); t.textContent=msg; t.classList.add("show");
  clearTimeout(showToast._t); showToast._t=setTimeout(()=>t.classList.remove("show"),3200);
}

/* barème (court par défaut, complet au clic) */
let earnExpanded=false;
function renderEarn(){
  const r=ROLES[role];
  const list=earnExpanded?r.earnAll:r.earnKey;
  const wrap=document.getElementById("earnList"); wrap.innerHTML="";
  list.forEach(([lab,pt])=>{
    const isGame = lab.startsWith("Jouer à CinéMatch");
    const row=document.createElement("div");
    row.className="earn-row"+(isGame?" is-game":"");
    row.innerHTML=`<span class="lab">${lab}</span><span class="pt">+${pt} pts</span>`;
    wrap.appendChild(row);
  });
  document.getElementById("earnToggle").textContent=
    earnExpanded ? "Réduire le barème ▴" : "Voir tout le barème ▾";
}
document.getElementById("earnToggle").addEventListener("click",()=>{
  earnExpanded=!earnExpanded; renderEarn();
});

/* CONTRÔLES */
document.getElementById("validateBtn").addEventListener("click",endGame);
document.getElementById("replayBtn").addEventListener("click",()=>{document.getElementById("overlay").classList.remove("show");});
document.getElementById("resetBtn").addEventListener("click",resetGame);
document.getElementById("ctaBtn").addEventListener("click",openForm);

/* =======================================================================
   FORMULAIRE DE CONTACT FICTIF (adapté au rôle)
   Pour brancher au vrai site : remplacer openForm()/submitForm() par une
   redirection — ex. window.location.href = role==="real" ? "/contact-realisateur" : "/catalogue-diffuseur";
   ======================================================================= */
const FORM_CONFIG = {
  real:{
    kicker:"ESPACE RÉALISATEUR·RICE",
    title:"Lancer mon projet",
    sub:"Présente ton film à Lumière Locale : on identifie les salles et les publics qui lui correspondent.",
    structure:"Société / production",
    structurePh:"Ex. Production indépendante",
    subject:"Objet de la demande",
    subjects:["Diffuser mon film","Être mis en relation avec des salles","Accompagnement promotion","Autre"],
    msgLabel:"Présente ton projet",
    msgPh:"Titre, format, genre, où tu en es…",
    note:"Démo — aucune donnée n'est envoyée.",
    done:"Ton projet est bien arrivé. L'équipe Lumière Locale te recontacte sous 48 h pour trouver les bonnes salles."
  },
  diff:{
    kicker:"ESPACE DIFFUSEUR / SALLE",
    title:"Trouver un projet",
    sub:"Dis-nous ce que cherche ta salle : on te propose des films indépendants adaptés à ta ligne et ton public.",
    structure:"Nom de la salle",
    structurePh:"Ex. Cinéma Le Rex",
    subject:"Ce que tu cherches",
    subjects:["Recevoir une sélection personnalisée","Programmer un film vu dans le jeu","Réserver un film en priorité","Autre"],
    msgLabel:"Ta ligne éditoriale",
    msgPh:"Type de salle, public habituel, genres recherchés…",
    note:"Démo — aucune donnée n'est envoyée.",
    done:"Bien reçu ! Lumière Locale te prépare une sélection de films adaptée à ta salle et te recontacte rapidement."
  }
};
function openForm(){
  const c=FORM_CONFIG[role];
  document.getElementById("formKicker").textContent=c.kicker;
  document.getElementById("formTitle").textContent=c.title;
  document.getElementById("formSub").textContent=c.sub;
  document.getElementById("lblStructure").textContent=c.structure;
  document.getElementById("fStructure").placeholder=c.structurePh;
  document.getElementById("lblSubject").textContent=c.subject;
  document.getElementById("fSubject").innerHTML=c.subjects.map(s=>`<option>${s}</option>`).join("");
  document.getElementById("lblMsg").textContent=c.msgLabel;
  document.getElementById("fMsg").placeholder=c.msgPh;
  document.getElementById("formNote").textContent=c.note;
  // reset état
  document.getElementById("formBody").style.display="block";
  document.getElementById("formDone").style.display="none";
  ["fName","fStructure","fEmail","fMsg"].forEach(id=>document.getElementById(id).value="");
  document.getElementById("formOverlay").classList.add("show");
  document.getElementById("formOverlay").scrollTop=0;
}
function closeForm(){ document.getElementById("formOverlay").classList.remove("show"); }
document.getElementById("formClose").addEventListener("click",closeForm);
document.getElementById("formDoneBtn").addEventListener("click",closeForm);
document.getElementById("formOverlay").addEventListener("click",e=>{
  if(e.target.id==="formOverlay") closeForm();
});
document.getElementById("formSubmit").addEventListener("click",()=>{
  const name=document.getElementById("fName").value.trim();
  const email=document.getElementById("fEmail").value.trim();
  if(!name||!email){ showToast("Renseigne au moins ton nom et ton e-mail."); return; }
  document.getElementById("formDoneMsg").textContent=FORM_CONFIG[role].done;
  document.getElementById("formBody").style.display="none";
  document.getElementById("formDone").style.display="block";
});
document.getElementById("roleReal").addEventListener("click",()=>{role="real";renderRole();});
document.getElementById("roleDiff").addEventListener("click",()=>{role="diff";renderRole();});

function resetGame(){
  placement={};selectedFilm=null;claimed={};
  document.getElementById("overlay").classList.remove("show"); refresh();
}

renderRole(); refresh();
</script>
</body>
</html># lumi-relocale
cinématch
