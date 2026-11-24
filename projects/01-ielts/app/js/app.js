/* IELTS Quest — app estática (sem build). */
(() => {
"use strict";
const D = window.IELTS;
["reading", "listening", "writing", "speaking", "vocab"].forEach(k => { D[k] = D[k] || []; });

/* ================= Utils ================= */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const todayStr = (d = new Date()) => d.toLocaleDateString("sv-SE"); // YYYY-MM-DD local
const addDays = (s, n) => { const d = new Date(s + "T12:00:00"); d.setDate(d.getDate() + n); return todayStr(d); };
const daysBetween = (a, b) => Math.round((new Date(b + "T12:00:00") - new Date(a + "T12:00:00")) / 864e5);
const fmt = sec => { sec = Math.max(0, Math.round(sec)); const m = Math.floor(sec / 60), s = sec % 60; return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`; };
const roundHalf = x => Math.round(x * 2) / 2;
const floorHalf = x => Math.floor(x * 2) / 2;
const bandStr = b => (b == null || isNaN(b)) ? "—" : (Number.isInteger(b) ? b.toFixed(1) : String(b));
const wordsOf = t => (t.match(/[A-Za-z0-9’'-]+/g) || []);
const SKILLS = {
  listening: { name: "Listening", em: "🎧", desc: "4 partes, 40 perguntas. Ouves uma vez. Áudio gerado pela voz do browser (inglês britânico)." },
  reading: { name: "Reading", em: "📖", desc: "Textos académicos com os tipos de pergunta oficiais. ~20 minutos por texto." },
  writing: { name: "Writing", em: "✍️", desc: "Task 1 (relatório de dados ou carta) e Task 2 (ensaio). Análise automática + autoavaliação com descritores." },
  speaking: { name: "Speaking", em: "🎙️", desc: "Partes 1, 2 e 3 com gravação, transcrição automática e respostas modelo." }
};
const byId = (skill, id) => D[skill].find(x => x.id === id);
const codeOf = o => String(o).trim().split(/[\s.)]+/)[0];

/* ================= State ================= */
const KEY = "ieltsQuest.v1";
const defaults = () => ({
  name: "Carolina", xp: 0, startDate: todayStr(), examDate: "2026-12-01", module: "academic",
  theme: "auto", rate: 0.95, voiceF: "", voiceM: "",
  results: {}, missions: {}, activeDays: [], review: {}, vocab: {}, badges: {}, drafts: {}, guideRead: {},
  stats: { words: 0, recordings: 0, vocabReviews: 0, mastered: 0 }
});
let S;
try { S = Object.assign(defaults(), JSON.parse(localStorage.getItem(KEY) || "{}")); } catch { S = defaults(); }
S.stats = Object.assign(defaults().stats, S.stats);
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch { /* storage indisponível */ } };

/* ================= Gamificação ================= */
const LEVELS = [0, 200, 500, 900, 1400, 2000, 2700, 3500, 4400, 5400, 6600];
const TITLES = ["Rookie", "Explorer", "Band 5 Bound", "Steady Learner", "Band 6 Builder", "Fluent Flyer", "Band 7 Chaser", "Precision Pro", "Band 8 Contender", "IELTS Master", "Legend"];
function levelInfo(xp = S.xp) {
  let l = 0; while (l < LEVELS.length - 1 && xp >= LEVELS[l + 1]) l++;
  const cur = LEVELS[l], next = LEVELS[l + 1] ?? cur + 1500;
  return { level: l + 1, title: TITLES[l], pct: Math.min(100, (xp - cur) / (next - cur) * 100), toNext: next - xp };
}
function streak() {
  const set = new Set(S.activeDays); let d = todayStr(), n = 0;
  if (!set.has(d)) d = addDays(d, -1);
  while (set.has(d)) { n++; d = addDays(d, -1); }
  return n;
}
function addXP(n, why) {
  const before = levelInfo().level;
  S.xp += n;
  const t = todayStr(); if (!S.activeDays.includes(t)) S.activeDays.push(t);
  save(); toast(`+${n} XP · ${why}`);
  const after = levelInfo();
  if (after.level > before) { confetti(); toast(`🎉 Subiste para o nível ${after.level}: ${after.title}!`); }
  checkBadges(); renderSide();
}
function checkBadges() {
  const res = Object.values(S.results).flat();
  const skills = new Set(res.map(r => r.skill));
  const anyBand7 = Object.keys(SKILLS).some(k => (skillBand(k) || 0) >= 7);
  const cond = {
    first: res.length > 0, streak3: streak() >= 3, streak7: streak() >= 7,
    perfect: res.some(r => r.total && r.score === r.total && (r.skill === "reading" || r.skill === "listening")),
    allskills: skills.size >= 4, words50: S.stats.vocabReviews >= 50, writer: S.stats.words >= 1000,
    speaker: S.stats.recordings >= 10, fixer: S.stats.mastered >= 15,
    mock: Object.keys(S.results).some(k => k.startsWith("mock-")), band7: anyBand7,
    day7: D.plan.every(d => dayProgress(d).pct === 100)
  };
  D.badges.forEach(b => {
    if (cond[b.id] && !S.badges[b.id]) { S.badges[b.id] = todayStr(); save(); toast(`${b.em} Conquista: ${b.name}`); confetti(); }
  });
}
function recordResult(key, r) {
  r.date = new Date().toISOString(); r.key = key;
  (S.results[key] = S.results[key] || []).push(r); save();
}
function skillResults(skill) { return Object.values(S.results).flat().filter(r => r.skill === skill && r.band != null).sort((a, b) => a.date.localeCompare(b.date)); }
function skillBand(skill) {
  const r = skillResults(skill).slice(-3); if (!r.length) return null;
  return roundHalf(r.reduce((a, x) => a + x.band, 0) / r.length);
}
function overallBand() {
  const b = Object.keys(SKILLS).map(skillBand); if (b.some(x => x == null)) return null;
  return roundHalf(b.reduce((a, x) => a + x, 0) / 4);
}
function rawToBand(table, correct, total) {
  const scaled = Math.round(correct / total * 40);
  for (const [min, band] of table) if (scaled >= min) return band;
  return 0;
}
const bestOf = key => (S.results[key] || []).reduce((b, r) => (!b || (r.band ?? 0) > (b.band ?? 0)) ? r : b, null);

/* ================= Missões do plano ================= */
function resolveMission(m) {
  const id = (S.module === "general" && m.gt) ? m.gt : m.id;
  switch (m.type) {
    case "reading": case "listening": case "writing": case "speaking": {
      const it = byId(m.type, id);
      return { href: `#/${m.type}/${id}`, title: it ? it.title || it.topic || id : id, sub: it ? subtitle(m.type, it) : "", icon: SKILLS[m.type].em, key: id };
    }
    case "vocab": return { href: `#/review/vocab?n=${m.count}`, title: `${m.count} flashcards de vocabulário`, sub: "Repetição espaçada (Leitner)", icon: "🧠" };
    case "review": return { href: "#/review/errors", title: "Rever os teus erros", sub: "Perguntas que falhaste voltam até as dominares", icon: "🔁" };
    case "guide": return { href: `#/guide/${id}`, title: m.label, sub: "Leitura", icon: "📚" };
    case "mock": return { href: `#/mock/${id}`, title: m.label, sub: "Condições de exame", icon: "🏁", key: "mock-" + id };
  }
}
function subtitle(skill, it) {
  if (skill === "listening") return `Parte ${it.part} · Set ${it.set} · ${countQ(it)} perguntas`;
  if (skill === "reading") return `${countQ(it)} perguntas · ${it.timeMinutes || 20} min · ${it.difficulty || ""}`;
  if (skill === "writing") return `Task ${it.task} · ${it.module === "general" ? "General Training" : "Academic"} · ${it.timeMinutes} min`;
  if (skill === "speaking") return `Parte ${it.part}${it.part === 2 ? " · cartão" : ` · ${(it.questions || []).length} perguntas`}`;
  return "";
}
const countQ = it => (it.groups || []).reduce((a, g) => a + g.questions.length, 0);
function missionDone(day, idx) {
  const m = D.plan[day - 1].missions[idx];
  if (S.missions[`d${day}-${idx}`]) return true;
  const r = resolveMission(m);
  return !!(r.key && S.results[r.key] && ["reading", "listening", "writing", "speaking", "mock"].includes(m.type));
}
function dayProgress(d) {
  const done = d.missions.filter((_, i) => missionDone(d.day, i)).length;
  return { done, total: d.missions.length, pct: Math.round(done / d.missions.length * 100) };
}
function currentDay() { return Math.min(7, Math.max(1, daysBetween(S.startDate, todayStr()) + 1)); }
let activeMission = null; // "d3-1" quando o utilizador entra por uma missão
function completeMission() {
  if (!activeMission || S.missions[activeMission]) return;
  S.missions[activeMission] = true; save();
  const day = +activeMission.split("-")[0].slice(1);
  const dp = dayProgress(D.plan[day - 1]);
  if (dp.pct === 100) { addXP(150, `Dia ${day} concluído!`); confetti(); }
}

/* ================= UI helpers ================= */
function toast(msg) {
  const el = document.createElement("div"); el.className = "toast"; el.textContent = msg;
  $("#toasts").appendChild(el); setTimeout(() => el.remove(), 3200);
}
function confetti() {
  const c = $("#confetti"), ctx = c.getContext("2d"); c.width = innerWidth; c.height = innerHeight;
  const cols = ["#4f46e5", "#7c3aed", "#db2777", "#0d9488", "#d97706", "#2563eb"];
  const P = Array.from({ length: 140 }, () => ({ x: innerWidth / 2, y: innerHeight / 3, vx: (Math.random() - .5) * 14, vy: Math.random() * -12 - 2, s: Math.random() * 6 + 4, c: cols[Math.random() * cols.length | 0], r: Math.random() * 6 }));
  let f = 0;
  (function loop() {
    ctx.clearRect(0, 0, c.width, c.height);
    P.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .35; p.r += .1; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .6); ctx.restore(); });
    if (++f < 110) requestAnimationFrame(loop); else ctx.clearRect(0, 0, c.width, c.height);
  })();
}
function copyText(t) {
  (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => toast("📋 Prompt copiado — cola-o no Claude"))
    .catch(() => { const ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); toast("📋 Prompt copiado"); });
}
let cleanups = [];
function cleanup() { cleanups.forEach(f => { try { f(); } catch { } }); cleanups = []; try { speechSynthesis.cancel(); } catch { } }
function mount(html) { const main = $("#main"); main.innerHTML = ""; const root = document.createElement("div"); root.innerHTML = html; main.appendChild(root); main.focus({ preventScroll: true }); scrollTo(0, 0); return root; }
function startCountdown(el, seconds, onEnd) {
  let left = seconds, h;
  const tick = () => {
    el.textContent = "⏱ " + fmt(left);
    el.classList.toggle("low", left <= Math.min(300, seconds * 0.15));
    if (left <= 0) { clearInterval(h); onEnd && onEnd(); return; }
    left--;
  };
  tick(); h = setInterval(tick, 1000); cleanups.push(() => clearInterval(h));
  return { stop: () => clearInterval(h), elapsed: () => seconds - left };
}
function ring(band, skill) {
  const p = band ? Math.round((band / 9) * 100) : 0;
  return `<div class="ring skill-${skill}" style="--p:${p}"><span>${bandStr(band)}</span></div>`;
}

/* ================= Text-to-speech (Listening) ================= */
const TTS = {
  voices: [],
  load() { try { this.voices = speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang)); } catch { this.voices = []; } },
  pick(gender) {
    const saved = gender === "female" ? S.voiceF : S.voiceM;
    if (saved) { const v = this.voices.find(v => v.name === saved); if (v) return v; }
    const gb = this.voices.filter(v => /en[-_]GB/i.test(v.lang));
    const pool = gb.length ? gb : this.voices;
    const fem = /female|woman|serena|kate|martha|stephanie|susan|hazel|libby|sonia|maisie|mia|emma|amy|fiona|moira|karen|samantha|victoria|tessa|zira|aria|jenny|sara|natasha|catherine/i;
    const mal = /\bmale|daniel|arthur|oliver|george|ryan|thomas|rishi|james|guy|david|mark|alex|fred|william|lee|gordon/i;
    const isF = v => fem.test(v.name), isM = v => !isF(v) && mal.test(v.name);
    return (gender === "female" ? pool.find(isF) : pool.find(isM)) || pool[0] || null;
  },
  split(text) { return text.length < 220 ? [text] : text.match(/[^.!?]+[.!?]+["']?|\S[^.!?]*$/g) || [text]; },
  play(lines, speakers, { onLine, onEnd } = {}) {
    const queue = [];
    lines.forEach((l, i) => this.split(l.t).forEach(t => queue.push({ i, t, s: l.s })));
    const fCount = {}; let stopped = false, k = 0;
    const voiceFor = s => {
      const sp = speakers[s] || { voice: "female" };
      const sameGenderIdx = speakers.slice(0, s).filter(x => x.voice === sp.voice).length;
      fCount[s] = sameGenderIdx;
      return { v: this.pick(sp.voice), pitch: (sp.voice === "male" ? 0.9 : 1.08) + sameGenderIdx * 0.12 };
    };
    const next = () => {
      if (stopped) return;
      if (k >= queue.length) { onEnd && onEnd(); return; }
      const q = queue[k]; const u = new SpeechSynthesisUtterance(q.t);
      const { v, pitch } = voiceFor(q.s); if (v) u.voice = v; u.lang = (v && v.lang) || "en-GB"; u.rate = S.rate; u.pitch = pitch;
      const done = () => { if (stopped) return; k++; setTimeout(next, queue[k] && queue[k].i !== q.i ? 380 : 60); };
      u.onend = done; u.onerror = e => { if (e.error !== "interrupted" && e.error !== "canceled") done(); };
      onLine && onLine(q.i, lines.length); speechSynthesis.speak(u);
    };
    speechSynthesis.cancel(); setTimeout(next, 120);
    return { stop() { stopped = true; speechSynthesis.cancel(); }, pause() { speechSynthesis.pause(); }, resume() { speechSynthesis.resume(); } };
  },
  say(text, gender = "female") { const u = new SpeechSynthesisUtterance(text); const v = this.pick(gender); if (v) u.voice = v; u.lang = "en-GB"; u.rate = S.rate; speechSynthesis.cancel(); speechSynthesis.speak(u); }
};
if ("speechSynthesis" in window) { TTS.load(); speechSynthesis.onvoiceschanged = () => TTS.load(); }

/* ================= Perguntas (Reading/Listening) ================= */
const norm = s => String(s ?? "").toLowerCase().replace(/[’‘]/g, "'").replace(/(\d),(\d)/g, "$1$2").replace(/[^a-z0-9'\- ]/g, " ").replace(/\s+/g, " ").trim();
function isCorrect(g, q, val) {
  if (val == null || val === "") return false;
  if (g.type === "gap") { const v = norm(val); return [q.answer, ...(q.accept || [])].some(a => norm(a) === v); }
  if (g.type === "match" || g.type === "mcq") return String(val).toLowerCase() === String(q.answer).toLowerCase();
  return String(val).toUpperCase() === String(q.answer).toUpperCase();
}
function optLabel(g, q, code) {
  const list = g.type === "match" ? g.options : q.options;
  return (list || []).find(o => codeOf(o).toLowerCase() === String(code).toLowerCase()) || code;
}
function qHTML(g, q, key, val, graded) {
  const dis = graded ? "disabled" : "";
  let ctrl = "";
  if (g.type === "tfng" || g.type === "ynng") {
    const opts = g.type === "tfng" ? ["TRUE", "FALSE", "NOT GIVEN"] : ["YES", "NO", "NOT GIVEN"];
    ctrl = `<div class="choices">${opts.map(o => `<button type="button" class="choice ${val === o ? "sel" : ""}" data-k="${key}" data-v="${o}" ${dis}>${o}</button>`).join("")}</div>`;
  } else if (g.type === "mcq") {
    ctrl = `<div class="choices col">${(q.options || []).map(o => { const c = codeOf(o); return `<button type="button" class="choice ${val === c ? "sel" : ""}" data-k="${key}" data-v="${esc(c)}" ${dis}>${esc(o)}</button>`; }).join("")}</div>`;
  } else if (g.type === "match") {
    ctrl = `<select class="select" data-k="${key}" ${dis}><option value="">— escolher —</option>${(g.options || []).map(o => { const c = codeOf(o); return `<option value="${esc(c)}" ${val === c ? "selected" : ""}>${esc(o)}</option>`; }).join("")}</select>`;
  } else {
    ctrl = `<input class="gap-input" data-k="${key}" value="${esc(val || "")}" placeholder="resposta" autocomplete="off" autocapitalize="off" spellcheck="false" ${dis}>`;
  }
  const prompt = esc(q.prompt).replace(/_{2,}/, `<b>(${q.n}) ________</b>`);
  let fb = "", cls = "";
  if (graded) {
    const ok = isCorrect(g, q, val); cls = ok ? "correct" : "wrong";
    const yours = val ? (g.type === "match" || g.type === "mcq" ? optLabel(g, q, val) : val) : "— (em branco)";
    const right = g.type === "match" || g.type === "mcq" ? optLabel(g, q, q.answer) : [q.answer, ...(q.accept || [])].filter((v, i, a) => a.indexOf(v) === i).join(" / ");
    fb = `<div class="fb ${ok ? "ok" : "bad"}">
      <p><span class="lbl">${ok ? "✓ Correto" : "✗ Incorreto"}</span> · A tua resposta: <b>${esc(yours)}</b>${ok ? "" : ` · Resposta certa: <b>${esc(right)}</b>`}</p>
      <p><span class="lbl">Porquê:</span> ${esc(q.explanation)}</p>
      <p><span class="lbl">💡 Próxima vez:</span> ${esc(q.tip)}</p></div>`;
  }
  return `<div class="q ${cls}" data-q="${key}"><div class="qp"><span class="qn">${q.n}</span>${prompt}</div>${ctrl}${fb}</div>`;
}
function groupsHTML(item, ans, graded) {
  return item.groups.map(g => {
    const nums = g.questions.map(q => q.n);
    return `<div class="qgroup"><div class="eyebrow">Perguntas ${Math.min(...nums)}–${Math.max(...nums)} · ${esc((D.strategies[g.type] || {}).name || g.type)}</div>
      <div class="instr">${esc(g.instructions)}</div>
      ${g.type === "match" && g.options ? `<div class="optlist">${g.options.map(o => `<div>${esc(o)}</div>`).join("")}</div>` : ""}
      ${g.questions.map(q => qHTML(g, q, `${item.id}:${q.n}`, ans[`${item.id}:${q.n}`], graded)).join("")}</div>`;
  }).join("");
}
function bindAnswers(root, ans, onChange) {
  root.addEventListener("click", e => {
    const b = e.target.closest(".choice[data-k]"); if (!b || b.disabled) return;
    ans[b.dataset.k] = b.dataset.v;
    $$(`.choice[data-k="${b.dataset.k}"]`, root).forEach(x => x.classList.toggle("sel", x === b));
    onChange && onChange();
  });
  root.addEventListener("change", e => { const s = e.target.closest("select[data-k]"); if (s) { ans[s.dataset.k] = s.value; onChange && onChange(); } });
  root.addEventListener("input", e => { const s = e.target.closest("input.gap-input[data-k]"); if (s) { ans[s.dataset.k] = s.value; onChange && onChange(); } });
}
function gradeItems(items, ans) {
  let score = 0, total = 0; const byType = {}; const wrong = [];
  items.forEach(it => it.groups.forEach(g => g.questions.forEach(q => {
    const k = `${it.id}:${q.n}`, ok = isCorrect(g, q, ans[k]);
    total++; if (ok) score++; else wrong.push({ it, g, q, k });
    const t = byType[g.type] = byType[g.type] || { ok: 0, n: 0 }; t.n++; if (ok) t.ok++;
  })));
  return { score, total, byType, wrong };
}
function recosHTML(res, timeUsed, timeAllowed) {
  const out = [];
  Object.entries(res.byType).sort((a, b) => a[1].ok / a[1].n - b[1].ok / b[1].n).forEach(([t, v]) => {
    const pct = v.ok / v.n;
    if (pct < 0.75 && D.strategies[t]) out.push(`<div class="reco"><b>${esc(D.strategies[t].name)}: ${v.ok}/${v.n}</b><ul class="clean">${D.strategies[t].tips.slice(0, 3).map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`);
  });
  if (timeAllowed && timeUsed > timeAllowed * 0.98) out.push(`<div class="reco"><b>⏱ Gestão de tempo</b><p>Esgotaste o tempo. Na próxima: limite de ~1,5 min por pergunta; se travares, responde por eliminação, marca e avança — não há penalização por errar.</p></div>`);
  const tips = [...new Set(res.wrong.map(w => w.q.tip).filter(Boolean))].slice(0, 3);
  if (tips.length) out.push(`<div class="reco"><b>🎯 As 3 lições mais importantes deste teste</b><ul class="clean">${tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>`);
  if (!res.wrong.length) out.push(`<div class="reco"><b>💎 Perfeito!</b><p>Sobe a dificuldade: faz o próximo em modo exame e com menos 3 minutos.</p></div>`);
  return out.join("");
}
function typeBars(byType) {
  return `<div class="bars">${Object.entries(byType).map(([t, v]) => { const p = Math.round(v.ok / v.n * 100); const col = p >= 75 ? "var(--ok)" : p >= 50 ? "var(--warn)" : "var(--bad)"; return `<div class="bar"><span>${esc((D.strategies[t] || {}).name || t)}</span><div class="track"><i style="width:${p}%;background:${col}"></i></div><b>${v.ok}/${v.n}</b></div>`; }).join("")}</div>`;
}
function addWrongToReview(skill, wrong) {
  wrong.forEach(w => { S.review[w.k] = { skill, id: w.it.id, n: w.q.n, box: 1, due: todayStr() }; });
  save();
}

/* ================= Views ================= */
const routes = {};
function router() {
  cleanup();
  const [path, qs] = (location.hash.slice(1) || "/").split("?");
  const params = new URLSearchParams(qs || "");
  activeMission = params.get("m");
  const parts = path.split("/").filter(Boolean);
  const name = parts[0] || "home";
  $$("[data-route]").forEach(a => a.classList.toggle("active", a.dataset.route === name));
  $("#sidebar").classList.remove("open");
  (routes[name] || routes.home)(parts.slice(1), params);
  renderSide();
}
function renderSide() {
  const li = levelInfo();
  $("#sideXp").innerHTML = `<div class="spread"><b>Nível ${li.level}</b><span class="chip pri">${S.xp} XP</span></div><small>${li.title}</small><div class="xpbar" style="margin-top:8px"><i style="width:${li.pct}%"></i></div><div class="spread" style="margin-top:8px"><small>🔥 ${streak()} dia(s)</small><small>🏅 ${Object.keys(S.badges).length}/${D.badges.length}</small></div>`;
}

/* ---------- Início ---------- */
routes.home = () => {
  const li = levelInfo(), day = currentDay(), d = D.plan[day - 1], dp = dayProgress(d);
  const toExam = daysBetween(todayStr(), S.examDate);
  const ob = overallBand();
  const root = mount(`
    <section class="hero">
      <div class="eyebrow" style="color:rgba(255,255,255,.8)">Dia ${day} de 7 · ${esc(d.title)}</div>
      <h1>Olá, ${esc(S.name)} 👋</h1>
      <p>${toExam > 0 ? `Faltam <b>${toExam} dia(s)</b> para o exame.` : toExam === 0 ? "<b>É hoje!</b> Respira fundo — estás preparada." : "Exame concluído — atualiza a data nas definições se precisares."} Missão de hoje: ${esc(d.focus)}</p>
      <div class="xpbar"><i style="width:${li.pct}%"></i></div>
      <small style="color:rgba(255,255,255,.85)">Nível ${li.level} · ${li.title} · faltam ${li.toNext} XP</small>
      <div class="hero-stats">
        <div class="hero-stat"><b>${bandStr(ob)}</b><small>Banda global estimada</small></div>
        <div class="hero-stat"><b>🔥 ${streak()}</b><small>Dias seguidos</small></div>
        <div class="hero-stat"><b>${dp.done}/${dp.total}</b><small>Missões de hoje</small></div>
        <div class="hero-stat"><b>${S.xp}</b><small>XP total</small></div>
      </div>
    </section>
    <div class="grid g2" style="margin-top:18px">
      <section class="card">
        <div class="spread"><h2>🗓️ Missões do dia ${day}</h2><a class="btn sm" href="#/plan?d=${day}">Ver plano</a></div>
        <p class="muted">${esc(d.why)}</p>
        ${missionsHTML(d)}
      </section>
      <section class="stack">
        <div class="grid g2">${Object.entries(SKILLS).map(([k, s]) => `
          <a class="card skill-tile skill-${k}" href="#/${k}">
            <div class="spread"><div><div class="eyebrow">${s.em} ${s.name}</div><small>${skillResults(k).length} treino(s)</small></div>${ring(skillBand(k), k)}</div>
          </a>`).join("")}</div>
        <div class="card"><div class="spread"><h3>🔁 Revisão espaçada</h3><a class="btn sm" href="#/review">Abrir</a></div>
          <p class="muted" style="margin:0">${dueErrors().length} erro(s) para rever hoje · ${dueVocab(999).length} flashcards disponíveis</p></div>
      </section>
    </div>
    <section class="card" style="margin-top:18px"><h2>🏅 Conquistas</h2>${badgesHTML()}</section>`);
  return root;
};
function missionsHTML(d) {
  return d.missions.map((m, i) => {
    const r = resolveMission(m), done = missionDone(d.day, i);
    const sep = r.href.includes("?") ? "&" : "?";
    return `<a class="mission skill-${m.type} ${done ? "done" : ""}" href="${r.href}${sep}m=d${d.day}-${i}">
      <span class="ico">${r.icon}</span><span class="grow"><b>${esc(r.title)}</b><small>${esc(r.sub)} · ~${m.min} min</small></span>
      <span class="check">${done ? "✓" : ""}</span></a>`;
  }).join("");
}
function badgesHTML() {
  return `<div class="badges">${D.badges.map(b => `<div class="badge ${S.badges[b.id] ? "on" : ""}" title="${esc(b.desc)}"><span class="em">${b.em}</span><b>${esc(b.name)}</b><small>${esc(b.desc)}</small></div>`).join("")}</div>`;
}

/* ---------- Plano ---------- */
routes.plan = (_, p) => {
  let sel = +(p.get("d") || currentDay());
  const root = mount(`<div class="page-head"><h1>🗺️ Plano de 7 dias</h1><p>Prática deliberada: cada dia mistura treino focado, componentes de manutenção e revisão dos erros. Começou a <b>${esc(S.startDate)}</b> · exame a <b>${esc(S.examDate)}</b>.</p></div>
    <div class="daymap" id="daymap"></div><section class="card" id="dayDetail" style="margin-top:16px"></section>`);
  const draw = () => {
    $("#daymap", root).innerHTML = D.plan.map(d => { const dp = dayProgress(d); return `<button class="day ${d.day === currentDay() ? "today" : ""} ${d.day === sel ? "sel" : ""} ${dp.pct === 100 ? "complete" : ""}" data-d="${d.day}"><small>Dia ${d.day} · ${esc(addDays(S.startDate, d.day - 1).slice(5))}</small><b>${esc(d.title)}</b><div class="mini"><i style="width:${dp.pct}%"></i></div></button>`; }).join("");
    const d = D.plan[sel - 1], dp = dayProgress(d);
    $("#dayDetail", root).innerHTML = `<div class="spread"><div><div class="eyebrow">Dia ${d.day} · ${dp.done}/${dp.total} missões · ~${d.missions.reduce((a, m) => a + m.min, 0)} min</div><h2>${esc(d.title)}</h2></div>${dp.pct === 100 ? '<span class="chip ok">✓ Concluído</span>' : ""}</div>
      <p><b>Foco:</b> ${esc(d.focus)}</p><p class="muted">💼 ${esc(d.why)}</p>${missionsHTML(d)}`;
  };
  root.addEventListener("click", e => { const b = e.target.closest("[data-d]"); if (b) { sel = +b.dataset.d; draw(); } });
  draw();
};

/* ---------- Listas por componente ---------- */
function listView(skill) {
  const s = SKILLS[skill], items = D[skill];
  const sb = skillBand(skill);
  let groups;
  if (skill === "listening") groups = [["Set A — treino", items.filter(i => i.set === "A")], ["Set B — usado no simulado", items.filter(i => i.set !== "A")]];
  else if (skill === "writing") groups = [["Task 1 — Academic", items.filter(i => i.task === 1 && i.module !== "general")], ["Task 1 — General Training (cartas)", items.filter(i => i.task === 1 && i.module === "general")], ["Task 2 — Ensaio", items.filter(i => i.task === 2)]];
  else if (skill === "speaking") groups = [1, 2, 3].map(p => [`Parte ${p}`, items.filter(i => i.part === p)]);
  else groups = [["Textos", items]];
  mount(`<div class="page-head skill-${skill}"><div class="spread"><div><h1>${s.em} ${s.name}</h1><p>${esc(s.desc)}</p></div>${ring(sb, skill)}</div></div>
    ${!items.length ? `<div class="card empty">Conteúdo ainda não carregado.</div>` : ""}
    ${groups.filter(g => g[1].length).map(([t, arr]) => `<h3 style="margin:18px 0 10px">${t}</h3>${arr.map((it, i) => {
      const best = bestOf(it.id);
      return `<a class="ex-item skill-${skill}" href="#/${skill}/${it.id}"><span class="badge-num">${i + 1}</span><span class="grow"><b>${esc(it.title || it.topic)}</b><br><small>${esc(subtitle(skill, it))}</small></span>
      ${best ? `<span class="chip ok">${best.total ? `${best.score}/${best.total} · ` : ""}Banda ${bandStr(best.band)}</span>` : `<span class="chip">Novo</span>`}</a>`;
    }).join("")}`).join("")}`);
}
["reading", "listening", "writing", "speaking"].forEach(sk => {
  const ex = { reading: readingView, listening: listeningView, writing: writingView, speaking: speakingView }[sk];
  routes[sk] = parts => parts[0] ? ex(parts[0].split(","), { key: parts[0] }) : listView(sk);
});

/* ---------- Reading ---------- */
function readingView(ids, opt = {}) {
  const items = ids.map(id => byId("reading", id)).filter(Boolean);
  if (!items.length) return notFound();
  const exam = !!opt.exam, key = opt.key || ids.join(",");
  const seconds = (opt.minutes || items.reduce((a, i) => a + (i.timeMinutes || 20), 0)) * 60;
  const ans = {}; let cur = 0, graded = false, timer, started = Date.now();
  const total = items.reduce((a, i) => a + countQ(i), 0);
  const root = mount(`<div class="ex-top"><div><div class="eyebrow">📖 Reading ${exam ? "· Simulado" : ""}</div><b>${esc(items.length > 1 ? `${items.length} textos · ${total} perguntas` : items[0].title)}</b></div>
    <div class="row"><span class="chip" id="answered">0/${total}</span><span class="timer" id="timer"></span><button class="btn primary" id="submit">Entregar</button></div></div>
    ${items.length > 1 ? `<div class="tabs" id="tabs">${items.map((it, i) => `<button class="tab ${i ? "" : "active"}" data-t="${i}">Texto ${i + 1}</button>`).join("")}</div>` : ""}
    <div id="resultBox"></div><div class="split" id="split"></div>`);
  const drawPassage = () => {
    const it = items[cur];
    $("#split", root).innerHTML = `<article class="card passage"><div class="eyebrow">Reading Passage ${cur + 1}</div><h2>${esc(it.title)}</h2>
      ${it.paragraphs.map(p => `<div class="para"><b>${esc(p.label || "")}</b><p>${esc(p.text)}</p></div>`).join("")}</article>
      <section class="card">${groupsHTML(it, ans, graded)}${items.length > 1 && cur < items.length - 1 ? `<button class="btn" data-t="${cur + 1}">Texto seguinte →</button>` : ""}</section>`;
  };
  const updCount = () => { $("#answered", root).textContent = `${Object.values(ans).filter(v => v).length}/${total}`; };
  bindAnswers(root, ans, updCount);
  root.addEventListener("click", e => {
    const t = e.target.closest("[data-t]"); if (!t) return;
    cur = +t.dataset.t; $$(".tab", root).forEach((x, i) => x.classList.toggle("active", i === cur)); drawPassage(); scrollTo({ top: 0, behavior: "smooth" });
  });
  const submit = (auto) => {
    if (graded) return;
    const blanks = total - Object.values(ans).filter(v => v).length;
    if (!auto && blanks && !confirm(`Tens ${blanks} pergunta(s) em branco. Entregar mesmo assim? (No exame, nunca deixes em branco.)`)) return;
    graded = true; timer && timer.stop();
    const res = gradeItems(items, ans);
    const table = S.module === "general" ? D.bandTables.readingGeneral : D.bandTables.readingAcademic;
    const band = rawToBand(table, res.score, res.total);
    const used = (Date.now() - started) / 1000;
    recordResult(key, { skill: "reading", ids, score: res.score, total: res.total, band, secs: Math.round(used), exam });
    addWrongToReview("reading", res.wrong);
    addXP(50 + res.score * 10, `Reading ${res.score}/${res.total}`);
    completeMission();
    if (res.score === res.total) confetti();
    $("#submit", root).disabled = true;
    $("#resultBox", root).innerHTML = resultCard(res, band, used, seconds, "reading");
    drawPassage(); scrollTo({ top: 0, behavior: "smooth" });
  };
  $("#submit", root).onclick = () => submit(false);
  timer = startCountdown($("#timer", root), seconds, () => { toast("⏱ Tempo esgotado — entregue automaticamente"); submit(true); });
  drawPassage();
}
function resultCard(res, band, used, allowed, skill) {
  const pct = Math.round(res.score / res.total * 100);
  return `<section class="card" style="margin-bottom:18px"><div class="grid g2">
    <div class="result-hero"><div class="eyebrow">Resultado</div><div class="big">${res.score}/${res.total}</div><p>${pct}% · <b>Banda estimada ${bandStr(band)}</b> · ${fmt(used)} usados de ${fmt(allowed)}</p>
      <small>Conversão proporcional a 40 perguntas (tabela ${skill === "reading" ? (S.module === "general" ? "General Training" : "Academic") : "Listening"}). Os erros foram para a <a href="#/review/errors">Revisão</a>.</small></div>
    <div><h3>Desempenho por tipo de pergunta</h3>${typeBars(res.byType)}</div></div>
    <h3 style="margin-top:14px">📌 Recomendações para a próxima vez</h3>${recosHTML(res, used, allowed)}
    <p class="muted" style="margin-top:12px">Abaixo tens cada pergunta com a resposta certa, a explicação e a dica.</p></section>`;
}

/* ---------- Listening ---------- */
function listeningView(ids, opt = {}) {
  const items = ids.map(id => byId("listening", id)).filter(Boolean);
  if (!items.length) return notFound();
  const key = opt.key || ids.join(",");
  let exam = !!opt.exam, graded = false, player = null, playing = false, paused = false, plays = 0, sec = 0;
  const ans = {}, total = items.reduce((a, i) => a + countQ(i), 0);
  const allLines = []; items.forEach((it, si) => { allLines.push({ s: -1, t: `Part ${it.part}. ${it.context}`, si }); it.script.forEach(l => allLines.push({ ...l, si })); });
  const hasTTS = "speechSynthesis" in window;
  const root = mount(`<div class="ex-top"><div><div class="eyebrow">🎧 Listening ${opt.exam ? "· Simulado" : ""}</div><b>${esc(items.length > 1 ? `${items.length} partes · ${total} perguntas` : `Parte ${items[0].part}: ${items[0].title}`)}</b></div>
    <div class="row"><span class="chip" id="answered">0/${total}</span><button class="btn primary" id="submit">Entregar</button></div></div>
    <div id="resultBox"></div>
    <section class="card stack">
      ${!hasTTS ? `<div class="notice"><b>Sem síntese de voz:</b> este browser não suporta áudio gerado. Usa Chrome, Edge ou Safari.</div>` : ""}
      <div class="player"><button class="btn primary lg" id="play">▶ Ouvir</button><button class="btn" id="pause" disabled>⏸ Pausa</button>
        <div class="wave"><i id="prog" style="width:0"></i></div><span class="chip" id="where">Pronto</span></div>
      <div class="row">${opt.exam ? `<span class="chip warn">Modo exame: o áudio toca uma vez, sem pausas</span>` : `<label class="row"><input type="checkbox" id="examMode"> Modo exame (ouvir só uma vez, sem pausa)</label>`}
        <label class="row">Velocidade <select class="select" id="rate" style="min-width:auto">${[0.85, 0.9, 0.95, 1, 1.05, 1.1].map(r => `<option ${r === S.rate ? "selected" : ""}>${r}</option>`).join("")}</select></label></div>
      <p class="muted" style="margin:0">💡 Antes de carregar em ▶, usa 30–60 s para ler as perguntas e prever o tipo de resposta (número, nome, lugar…).</p>
    </section>
    <div id="qs" style="margin-top:16px"></div>`);
  const draw = () => {
    $("#qs", root).innerHTML = items.map(it => `<section class="card"><div class="eyebrow">Parte ${it.part} · ${esc(it.title)}</div><p class="muted">${esc(it.context)}</p>${groupsHTML(it, ans, graded)}
      ${graded ? `<details><summary>📜 Transcrição (com respostas nas falas)</summary>${it.script.map(l => `<div class="script-line"><b>${esc((it.speakers[l.s] || {}).name || "")}:</b> ${esc(l.t)}</div>`).join("")}</details>` : ""}</section>`).join("");
  };
  bindAnswers(root, ans, () => { $("#answered", root).textContent = `${Object.values(ans).filter(v => v).length}/${total}`; });
  const examChk = $("#examMode", root); if (examChk) examChk.onchange = () => { exam = examChk.checked; };
  $("#rate", root).onchange = e => { S.rate = +e.target.value; save(); };
  const playBtn = $("#play", root), pauseBtn = $("#pause", root);
  playBtn.onclick = () => {
    if (!hasTTS) return;
    if (exam && plays >= 1) { toast("Modo exame: só se ouve uma vez"); return; }
    if (playing) { player.stop(); playing = false; playBtn.textContent = "▶ Ouvir de novo"; pauseBtn.disabled = true; return; }
    plays++; playing = true; paused = false; playBtn.textContent = exam ? "⏹ Parar" : "⏹ Parar"; pauseBtn.disabled = exam;
    const speakers = []; // mapear speakers por linha
    const lines = allLines.map(l => l.s === -1 ? { s: 0, t: l.t, narr: true, si: l.si } : l);
    player = {
      parts: lines, idx: 0,
      ctl: null
    };
    let curSi = -1;
    const run = (from) => {
      // tocar por secções para usar os speakers certos
      const segs = []; lines.forEach((l, i) => { if (i < from) return; const last = segs[segs.length - 1]; if (!last || last.si !== l.si) segs.push({ si: l.si, ls: [l], start: i }); else last.ls.push(l); });
      let k = 0;
      const nextSeg = () => {
        if (!playing) return;
        if (k >= segs.length) { playing = false; playBtn.textContent = exam ? "✓ Áudio terminado" : "▶ Ouvir de novo"; pauseBtn.disabled = true; $("#where", root).textContent = "Fim do áudio"; if (exam) playBtn.disabled = true; return; }
        const sg = segs[k++], it = items[sg.si];
        const spk = [{ name: "Narrator", voice: "female" }, ...it.speakers];
        const ls = sg.ls.map(l => ({ s: l.narr ? 0 : l.s + 1, t: l.t }));
        curSi = sg.si;
        player.ctl = TTS.play(ls, spk, {
          onLine: (i) => { const gi = sg.start + i; $("#prog", root).style.width = `${(gi + 1) / lines.length * 100}%`; $("#where", root).textContent = `Parte ${it.part} · ${i + 1}/${ls.length}`; },
          onEnd: () => setTimeout(nextSeg, 900)
        });
        player.stop = () => player.ctl && player.ctl.stop();
      };
      nextSeg();
    };
    player.stop = () => {};
    run(0);
  };
  pauseBtn.onclick = () => {
    if (!player || !player.ctl) return;
    if (!paused) { player.ctl.pause(); paused = true; pauseBtn.textContent = "▶ Continuar"; } else { player.ctl.resume(); paused = false; pauseBtn.textContent = "⏸ Pausa"; }
  };
  cleanups.push(() => { playing = false; player && player.stop && player.stop(); });
  const t0 = Date.now();
  $("#submit", root).onclick = () => {
    if (graded) return;
    const blanks = total - Object.values(ans).filter(v => v).length;
    if (blanks && !confirm(`Tens ${blanks} pergunta(s) em branco. Entregar? (No exame, escreve sempre um palpite.)`)) return;
    graded = true; playing = false; player && player.stop && player.stop();
    const res = gradeItems(items, ans), band = rawToBand(D.bandTables.listening, res.score, res.total);
    recordResult(key, { skill: "listening", ids, score: res.score, total: res.total, band, exam, plays });
    addWrongToReview("listening", res.wrong);
    addXP(50 + res.score * 10, `Listening ${res.score}/${res.total}`);
    completeMission();
    if (res.score === res.total) confetti();
    $("#submit", root).disabled = true;
    const used = (Date.now() - t0) / 1000;
    $("#resultBox", root).innerHTML = resultCard(res, band, used, 0, "listening").replace(/ · [0-9:]+ usados de 00:00/, "") +
      (plays > 1 ? `<div class="notice" style="margin-bottom:16px"><b>Atenção:</b> ouviste o áudio ${plays} vezes. No exame só ouves uma — da próxima ativa o modo exame.</div>` : "");
    draw(); scrollTo({ top: 0, behavior: "smooth" });
  };
  draw();
}

/* ---------- Writing ---------- */
const LINKERS = ["however", "moreover", "furthermore", "in addition", "additionally", "therefore", "consequently", "as a result", "thus", "hence", "nevertheless", "nonetheless", "although", "even though", "whereas", "while", "on the other hand", "in contrast", "by contrast", "similarly", "likewise", "for example", "for instance", "such as", "in particular", "notably", "firstly", "secondly", "finally", "overall", "in conclusion", "to sum up", "in summary", "meanwhile", "subsequently", "despite", "in spite of", "due to", "owing to", "this means", "which", "that said"];
const STOP = new Set("the a an and or but of to in on at for with by from is are was were be been being it its this that these those as than then there their they them he she his her we our you your i my me not no so if into over under about also more most less very can could will would should may might must has have had do does did which who whom what when where why how such each other some any all both up down out one two".split(" "));
function analyseText(text, task, module) {
  const words = wordsOf(text), wc = words.length;
  const paras = text.split(/\n\s*\n|\n/).map(p => p.trim()).filter(Boolean);
  const sentences = text.split(/(?<=[.!?])\s+/).filter(s => wordsOf(s).length > 2);
  const low = " " + text.toLowerCase().replace(/\s+/g, " ") + " ";
  const linkers = LINKERS.filter(l => low.includes(" " + l + " ") || low.includes(" " + l + ",") || low.includes(" " + l + "."));
  const freq = {}; words.forEach(w => { const k = w.toLowerCase(); if (k.length > 3 && !STOP.has(k)) freq[k] = (freq[k] || 0) + 1; });
  const repeated = Object.entries(freq).filter(([, n]) => n >= 4).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const contractions = (text.match(/\b\w+'(t|s|re|ve|ll|d|m)\b/gi) || []).filter(c => !/'s$/i.test(c) || /\b(it|that|there|what|he|she)'s\b/i.test(c));
  const informal = ["a lot of", "lots of", "stuff", "things", "kids", "gonna", "wanna", "really", "pretty much", "nowadays", "ok", "okay", "big"].filter(w => low.includes(" " + w + " "));
  const opinion = /\b(i think|i believe|in my opinion|in my view|i agree|i disagree|i would argue|this essay (will )?argue)/i.test(text);
  const min = task === 1 ? 150 : 250;
  const warnings = [];
  if (wc < min) warnings.push(`Tens ${wc} palavras — abaixo do mínimo de ${min}. No exame isto penaliza ${task === 1 ? "Task Achievement" : "Task Response"}.`);
  if (wc > min * 1.6) warnings.push(`Texto longo (${wc} palavras). Mais palavras ≠ melhor nota; aumenta o risco de erros e de falta de tempo.`);
  if (paras.length < (task === 1 ? 3 : 4)) warnings.push(`Só ${paras.length} parágrafo(s). Recomendado: ${task === 1 ? "introdução + overview + 2 parágrafos de detalhe" : "introdução + 2–3 parágrafos de desenvolvimento + conclusão"}.`);
  if (task === 1 && module !== "general" && opinion) warnings.push("Task 1 Academic não leva opinião pessoal — descreve só os dados.");
  if (task === 1 && module !== "general" && !/\b(overall|in general|it is clear|generally|in summary)\b/i.test(text)) warnings.push("Não encontrei um overview explícito (ex.: 'Overall, ...'). Sem overview a Task Achievement fica limitada à banda 5–6.");
  if (task === 2 && !opinion) warnings.push("Não encontrei uma posição explícita (ex.: 'I firmly believe...'). Em Task 2 a posição deve ser clara na introdução e na conclusão.");
  if (module !== "general" && contractions.length) warnings.push(`Contrações em registo académico: ${[...new Set(contractions)].slice(0, 5).join(", ")} → escreve por extenso.`);
  if (informal.length) warnings.push(`Linguagem informal: "${informal.join('", "')}" → substitui por alternativas formais (ex.: 'a lot of' → 'a considerable number of').`);
  if (linkers.length < 4) warnings.push("Poucos conectores variados. Usa uma mistura de contraste (whereas, however), adição (moreover) e consequência (consequently).");
  const avgLen = sentences.length ? Math.round(wc / sentences.length) : 0;
  if (avgLen > 30) warnings.push(`Frases muito longas (média ${avgLen} palavras). Para quem pensa em português, frases de 15–25 palavras reduzem erros.`);
  return { wc, paras: paras.length, sentences: sentences.length, avgLen, linkers, repeated, warnings, min };
}
function chartHTML(ch) {
  if (!ch) return "";
  const cols = ["#4f46e5", "#db2777", "#0d9488", "#d97706", "#2563eb", "#7c3aed"];
  const unit = ch.unit || "";
  if (ch.type === "table") {
    return `<div class="chartbox"><b>${esc(ch.title)}</b>${unit ? ` <small>(${esc(unit)})</small>` : ""}<table style="margin-top:8px"><tr><th></th>${ch.labels.map(l => `<th>${esc(l)}</th>`).join("")}</tr>${ch.series.map(s => `<tr><td>${esc(s.name)}</td>${s.values.map(v => `<td>${esc(v)}</td>`).join("")}</tr>`).join("")}</table></div>`;
  }
  if (ch.type === "pie") {
    const s = ch.series[0], tot = s.values.reduce((a, b) => a + b, 0); let ang = -Math.PI / 2;
    const slices = s.values.map((v, i) => { const a = v / tot * Math.PI * 2, x1 = 150 + 110 * Math.cos(ang), y1 = 150 + 110 * Math.sin(ang); ang += a; const x2 = 150 + 110 * Math.cos(ang), y2 = 150 + 110 * Math.sin(ang); return `<path d="M150 150 L${x1} ${y1} A110 110 0 ${a > Math.PI ? 1 : 0} 1 ${x2} ${y2} Z" fill="${cols[i % 6]}" stroke="var(--surface)" stroke-width="2"/>`; }).join("");
    const legend = ch.labels.map((l, i) => `<g transform="translate(300 ${40 + i * 26})"><rect width="14" height="14" rx="3" fill="${cols[i % 6]}"/><text x="22" y="12" font-size="13" fill="currentColor">${esc(l)}: ${s.values[i]}${esc(unit)}</text></g>`).join("");
    return `<div class="chartbox"><b>${esc(ch.title)}</b>${s.name ? ` <small>(${esc(s.name)})</small>` : ""}<svg viewBox="0 0 560 300" role="img" aria-label="${esc(ch.title)}">${slices}${legend}</svg></div>`;
  }
  const W = 620, H = 300, L = 52, R = 16, T = 16, B = 46;
  const all = ch.series.flatMap(s => s.values); const max = Math.max(...all) * 1.05 || 1;
  const raw = max / 5, p10 = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map(m => m * p10).find(s => s >= raw); const top = step * 5;
  const y = v => T + (H - T - B) * (1 - v / top), n = ch.labels.length, cw = (W - L - R) / n;
  let grid = ""; for (let i = 0; i <= 5; i++) { const v = top / 5 * i; grid += `<line x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}" stroke="currentColor" opacity=".12"/><text x="${L - 8}" y="${y(v) + 4}" font-size="11" text-anchor="end" fill="currentColor" opacity=".7">${+v.toFixed(1)}</text>`; }
  const xl = ch.labels.map((l, i) => `<text x="${L + cw * i + cw / 2}" y="${H - B + 18}" font-size="11.5" text-anchor="middle" fill="currentColor">${esc(l)}</text>`).join("");
  let marks = "";
  if (ch.type === "line") {
    marks = ch.series.map((s, si) => `<polyline fill="none" stroke="${cols[si % 6]}" stroke-width="2.5" points="${s.values.map((v, i) => `${L + cw * i + cw / 2},${y(v)}`).join(" ")}"/>${s.values.map((v, i) => `<circle cx="${L + cw * i + cw / 2}" cy="${y(v)}" r="3.5" fill="${cols[si % 6]}"><title>${esc(s.name)} ${esc(ch.labels[i])}: ${v}${esc(unit)}</title></circle>`).join("")}`).join("");
  } else {
    const k = ch.series.length, bw = Math.min(28, (cw * 0.8) / k);
    marks = ch.series.map((s, si) => s.values.map((v, i) => `<rect x="${L + cw * i + cw / 2 - (bw * k) / 2 + si * bw}" y="${y(v)}" width="${bw - 2}" height="${y(0) - y(v)}" rx="3" fill="${cols[si % 6]}"><title>${esc(s.name)} ${esc(ch.labels[i])}: ${v}${esc(unit)}</title></rect>`).join("")).join("");
  }
  const legend = `<div class="row" style="margin-top:6px">${ch.series.map((s, i) => `<span class="row" style="gap:6px;font-size:.85rem"><i style="width:12px;height:12px;border-radius:3px;background:${cols[i % 6]};display:inline-block"></i>${esc(s.name)}</span>`).join("")}</div>`;
  return `<div class="chartbox"><b>${esc(ch.title)}</b>${unit ? ` <small>(${esc(unit)})</small>` : ""}<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(ch.title)}">${grid}<line x1="${L}" x2="${W - R}" y1="${y(0)}" y2="${y(0)}" stroke="currentColor" opacity=".4"/>${xl}${marks}</svg>${legend}</div>`;
}
function chartAsText(ch) {
  if (!ch) return "";
  return `CHART (${ch.type}) "${ch.title}"${ch.unit ? ` [unit: ${ch.unit}]` : ""}\nColumns: ${ch.labels.join(" | ")}\n${ch.series.map(s => `${s.name}: ${s.values.join(" | ")}`).join("\n")}\n`;
}
function bandPickerHTML(crits, picks, prefix) {
  return crits.map(c => `<div class="crit"><div class="spread"><b>${c.key} · ${esc(c.name)}</b><span class="chip pri" id="${prefix}-${c.key}-v">${picks[c.key] ? "Banda " + picks[c.key] : "por avaliar"}</span></div>
    <div class="bandpick">${[4, 5, 6, 7, 8, 9].map(b => `<button type="button" data-crit="${prefix}|${c.key}" data-b="${b}" class="${picks[c.key] === b ? "sel" : ""}">${b}</button>`).join("")}</div>
    <div class="desc" id="${prefix}-${c.key}-d">${picks[c.key] ? esc(c.d[Math.max(5, picks[c.key])]) : "Escolhe a banda que melhor descreve o teu texto — compara com a resposta modelo. Passa por cada número para ver o descritor."}</div></div>`).join("");
}
function bindBandPicker(root, crits, picksByPrefix, onChange) {
  const show = (btn, persist) => {
    const [prefix, key] = btn.dataset.crit.split("|"), b = +btn.dataset.b, c = crits[prefix].find(x => x.key === key);
    $(`#${prefix}-${key}-d`, root).textContent = `Banda ${b}: ${c.d[Math.max(5, Math.min(9, b))]}${b === 4 ? " (ou abaixo)" : ""}`;
    if (persist) { picksByPrefix[prefix][key] = b; $$(`[data-crit="${prefix}|${key}"]`, root).forEach(x => x.classList.toggle("sel", x === btn)); $(`#${prefix}-${key}-v`, root).textContent = "Banda " + b; onChange(); }
  };
  root.addEventListener("click", e => { const b = e.target.closest("[data-crit]"); if (b) show(b, true); });
  root.addEventListener("mouseover", e => { const b = e.target.closest("[data-crit]"); if (b) show(b, false); });
}
function writingView(ids, opt = {}) {
  const items = ids.map(id => byId("writing", id)).filter(Boolean);
  if (!items.length) return notFound();
  const key = opt.key || ids.join(","), exam = !!opt.exam;
  const seconds = (opt.minutes || items.reduce((a, i) => a + (i.timeMinutes || 20), 0)) * 60;
  let cur = 0, submitted = false, timer;
  const texts = Object.fromEntries(items.map(i => [i.id, S.drafts[i.id] || ""]));
  const picks = Object.fromEntries(items.map(i => [i.id, {}]));
  const root = mount(`<div class="ex-top"><div><div class="eyebrow">✍️ Writing ${exam ? "· Simulado" : ""}</div><b>${esc(items.length > 1 ? "Task 1 + Task 2" : items[0].title)}</b></div>
    <div class="row"><span class="timer" id="timer"></span><button class="btn primary" id="submit">Entregar e ver feedback</button></div></div>
    ${items.length > 1 ? `<div class="tabs">${items.map((it, i) => `<button class="tab ${i ? "" : "active"}" data-t="${i}">Task ${it.task}</button>`).join("")}</div><p class="muted">💡 Sugestão: Task 1 ~20 min, Task 2 ~40 min. A Task 2 vale o dobro.</p>` : ""}
    <div id="wbody"></div>`);
  const drawEditor = () => {
    const it = items[cur];
    $("#wbody", root).innerHTML = `<div class="split"><section class="card"><div class="eyebrow">Writing Task ${it.task} · ${it.module === "general" ? "General Training" : "Academic"} · mínimo ${it.minWords} palavras</div>
      <p style="white-space:pre-wrap;font-weight:500">${esc(it.prompt)}</p>${chartHTML(it.chart)}</section>
      <section class="card"><textarea class="essay" id="essay" placeholder="Escreve aqui a tua resposta em inglês…" spellcheck="false">${esc(texts[it.id])}</textarea>
      <div class="spread" style="margin-top:8px"><span class="wc" id="wc"></span><small class="muted">Corretor ortográfico desligado, como no exame.</small></div></section></div>`;
    const ta = $("#essay", root), wc = $("#wc", root);
    const upd = () => { const n = wordsOf(ta.value).length; wc.textContent = `${n} / ${it.minWords} palavras`; wc.style.color = n >= it.minWords ? "var(--ok)" : "var(--muted)"; };
    let deb; ta.oninput = () => { texts[it.id] = ta.value; upd(); clearTimeout(deb); deb = setTimeout(() => { S.drafts[it.id] = ta.value; save(); }, 600); };
    upd();
  };
  root.addEventListener("click", e => { const t = e.target.closest("[data-t]"); if (t && !submitted) { cur = +t.dataset.t; $$(".tab", root).forEach((x, i) => x.classList.toggle("active", i === cur)); drawEditor(); } });
  const submit = (auto) => {
    if (submitted) return;
    const short = items.filter(i => wordsOf(texts[i.id]).length < 30);
    if (!auto && short.length && !confirm("Há tarefas quase vazias. Entregar mesmo assim?")) return;
    submitted = true; timer && timer.stop();
    S.stats.words += items.reduce((a, i) => a + wordsOf(texts[i.id]).length, 0); save();
    $("#submit", root).classList.add("hide");
    $$(".tabs", root).forEach(t => t.remove());
    drawFeedback();
    scrollTo({ top: 0, behavior: "smooth" });
  };
  const critsFor = it => it.task === 1 ? D.criteria.writing1 : D.criteria.writing2;
  const drawFeedback = () => {
    const blocks = items.map(it => {
      const a = analyseText(texts[it.id], it.task, it.module), crits = critsFor(it);
      return `<section class="card stack"><div class="spread"><h2>Task ${it.task} · ${esc(it.title)}</h2><span class="chip">${a.wc} palavras</span></div>
        <div class="kv"><div><b>${a.wc}</b><small>palavras (mín. ${a.min})</small></div><div><b>${a.paras}</b><small>parágrafos</small></div><div><b>${a.avgLen}</b><small>palavras/frase</small></div><div><b>${a.linkers.length}</b><small>conectores diferentes</small></div></div>
        <div><h3>🔍 Análise automática</h3>${a.warnings.length ? `<ul class="clean">${a.warnings.map(w => `<li>⚠️ ${esc(w)}</li>`).join("")}</ul>` : `<p>✅ Sem alertas estruturais. Agora foca-te na precisão gramatical e no vocabulário.</p>`}
          ${a.linkers.length ? `<p><b>Conectores usados:</b> ${a.linkers.map(l => `<span class="chip">${esc(l)}</span>`).join(" ")}</p>` : ""}
          ${a.repeated.length ? `<p><b>Palavras repetidas:</b> ${a.repeated.map(([w, n]) => `<span class="chip warn">${esc(w)} ×${n}</span>`).join(" ")} → varia com sinónimos ou referência (this, such, the latter).</p>` : ""}</div>
        <details open><summary>📝 O teu texto</summary><div class="model">${esc(texts[it.id] || "(vazio)")}</div></details>
        <details open><summary>⭐ Resposta modelo (banda ${it.modelBand || 8})</summary><div class="model">${esc(it.modelAnswer)}</div></details>
        <div class="grid g2"><div><h3>✅ O que o examinador procura</h3><ul class="clean">${(it.keyFeatures || []).map(k => `<li><label class="row" style="align-items:flex-start;flex-wrap:nowrap"><input type="checkbox"> <span>${esc(k)}</span></label></li>`).join("")}</ul><small class="muted">Marca o que incluíste.</small></div>
          <div><h3>💬 Linguagem útil</h3><ul class="clean">${(it.usefulLanguage || []).map(k => `<li>${esc(k)}</li>`).join("")}</ul></div></div>
        <div class="reco"><b>🎯 Erros comuns a evitar da próxima vez</b><ul class="clean">${(it.commonMistakes || []).map(k => `<li>${esc(k)}</li>`).join("")}</ul></div>
        <div><h3>🧑‍⚖️ Autoavaliação com os descritores</h3>${bandPickerHTML(crits, picks[it.id], it.id)}</div>
        <div class="row"><button class="btn" data-ai="${it.id}">📋 Copiar prompt para examinador AI</button><small class="muted">Cola no Claude para uma avaliação detalhada pelos descritores oficiais.</small></div>
      </section>`;
    }).join("");
    $("#wbody", root).innerHTML = blocks + `<section class="card" style="margin-top:16px"><div class="spread"><div><h2>Banda de Writing estimada: <span id="wband">—</span></h2><small class="muted">${items.length > 1 ? "Task 2 vale o dobro da Task 1." : "Média dos 4 critérios."}</small></div><button class="btn primary" id="saveW" disabled>Guardar avaliação (+XP)</button></div></section>`;
    const crits = Object.fromEntries(items.map(i => [i.id, critsFor(i)]));
    const compute = () => {
      const tb = items.map(i => { const p = picks[i.id], ks = critsFor(i).map(c => c.key); if (ks.some(k => !p[k])) return null; return floorHalf(ks.reduce((a, k) => a + p[k], 0) / 4); });
      if (tb.some(b => b == null)) return null;
      if (items.length === 1) return { band: tb[0], tb };
      const w = items.map(i => i.task === 2 ? 2 : 1);
      return { band: roundHalf(tb.reduce((a, b, i) => a + b * w[i], 0) / w.reduce((a, b) => a + b, 0)), tb };
    };
    bindBandPicker(root, crits, picks, () => { const c = compute(); $("#wband", root).textContent = c ? bandStr(c.band) : "—"; $("#saveW", root).disabled = !c; });
    root.addEventListener("click", e => {
      const b = e.target.closest("[data-ai]"); if (!b) return;
      const it = byId("writing", b.dataset.ai), txt = texts[it.id];
      copyText(`You are a certified IELTS Writing examiner. Assess my IELTS ${it.module === "general" ? "General Training" : "Academic"} Writing Task ${it.task} response strictly using the official public band descriptors (${it.task === 1 ? "Task Achievement" : "Task Response"}, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy).
Give me: (1) a band for each criterion with a short justification quoting my text, (2) the overall task band, (3) 3 strengths, (4) the 3 highest-impact priorities to improve, (5) corrections of my 5 weakest sentences (original → corrected → why), (6) one of my paragraphs rewritten at band 8.
Reply in European Portuguese (PT-PT); keep quotes and corrections in English. I am a Portuguese native speaker taking the exam next week.

TASK PROMPT:
${it.prompt}
${chartAsText(it.chart)}
MY RESPONSE (${wordsOf(txt).length} words):
${txt}`);
    });
    $("#saveW", root).onclick = () => {
      const c = compute(); if (!c) return;
      recordResult(key, { skill: "writing", ids, band: c.band, taskBands: c.tb, words: items.map(i => wordsOf(texts[i.id]).length), exam });
      items.forEach(i => delete S.drafts[i.id]); save();
      addXP(100 * items.length, "Writing avaliado"); completeMission(); confetti();
      $("#saveW", root).disabled = true; $("#saveW", root).textContent = "✓ Guardado";
    };
  };
  $("#submit", root).onclick = () => submit(false);
  timer = startCountdown($("#timer", root), seconds, () => { toast("⏱ Tempo esgotado — no exame terias de parar aqui"); if (exam) submit(true); });
  drawEditor();
}

/* ---------- Speaking ---------- */
const FILLERS = ["um", "uh", "er", "erm", "ah", "like", "you know", "i mean", "sort of", "kind of", "basically", "actually"];
function speakingView(ids, opt = {}) {
  const items = ids.map(id => byId("speaking", id)).filter(Boolean);
  if (!items.length) return notFound();
  const key = opt.key || ids.join(","), exam = !!opt.exam;
  const steps = [];
  items.forEach(it => {
    if (it.part === 2) steps.push({ it, part: 2, q: it.cueCard ? it.cueCard.title : it.topic, sample: (it.sampleAnswers[0] || {}).a });
    else (it.questions || []).forEach((q, i) => steps.push({ it, part: it.part, q, sample: ((it.sampleAnswers || []).find(s => s.q === q) || it.sampleAnswers[i] || {}).a }));
  });
  const rec = steps.map(() => ({ text: "", secs: 0, url: null }));
  let si = 0, recording = false, mediaRec = null, stream = null, recog = null, t0 = 0, tick = null, prepTimer = null;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const canRec = !!(navigator.mediaDevices && window.MediaRecorder);
  const root = mount(`<div class="ex-top"><div><div class="eyebrow">🎙️ Speaking ${exam ? "· Simulado" : ""}</div><b>${esc(items.map(i => `P${i.part}: ${i.topic}`).join(" · "))}</b></div>
    <div class="row"><span class="chip" id="stepc"></span><span class="timer" id="clock">00:00</span></div></div>
    ${!SR ? `<div class="notice" style="margin-bottom:14px"><b>Transcrição automática indisponível</b> neste browser (usa Chrome/Edge/Safari). A gravação de áudio e a autoavaliação continuam a funcionar.</div>` : ""}
    <div id="sbody"></div>`);
  const stopAll = () => {
    recording = false; clearInterval(tick); prepTimer && prepTimer.stop();
    try { recog && recog.stop(); } catch { } recog = null;
    try { mediaRec && mediaRec.state !== "inactive" && mediaRec.stop(); } catch { }
    try { stream && stream.getTracks().forEach(t => t.stop()); } catch { } stream = null;
  };
  cleanups.push(stopAll);
  const drawStep = () => {
    const st = steps[si], it = st.it;
    $("#stepc", root).textContent = `Pergunta ${si + 1}/${steps.length}`;
    const target = st.part === 1 ? "20–40 s (2–4 frases)" : st.part === 2 ? "1 min de preparação + 1:30–2:00 a falar" : "45–90 s (opinião + razão + exemplo)";
    $("#sbody", root).innerHTML = `<section class="card stack">
      <div class="spread"><span class="chip pri">Parte ${st.part} · ${esc(it.topic)}</span><small class="muted">🎯 Alvo: ${target}</small></div>
      ${st.part === 2 && it.cueCard ? `<div class="cue"><h3>${esc(it.cueCard.title)}</h3><p style="margin:0">You should say:</p><ul class="clean">${it.cueCard.bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul><p style="margin:0">${esc(it.cueCard.close || "")}</p></div>
        <div id="prepBox"><div class="row"><button class="btn" id="prep">⏳ Começar 1 min de preparação</button><span class="timer hide" id="prepT"></span></div><textarea class="essay" id="notes" style="min-height:90px;margin-top:10px;font-family:var(--font);font-size:.95rem" placeholder="Notas rápidas (palavras-chave, não frases)"></textarea></div>`
        : `<div class="bigq">${esc(st.q)}</div>`}
      <div class="row"><button class="btn" id="listen">🔊 Ouvir a pergunta</button>
        ${canRec ? `<button class="btn primary lg" id="recBtn">🎙️ Gravar resposta</button>` : `<button class="btn primary lg" id="recBtn">⏱ Responder (sem gravação)</button>`}
        <span id="recState" class="muted"></span></div>
      <div class="transcript" id="tr">${rec[si].text ? esc(rec[si].text) : `<span class="interim">${SR ? "A transcrição aparece aqui enquanto falas…" : "Fala em voz alta; usa o cronómetro."}</span>`}</div>
      ${rec[si].url ? `<audio controls src="${rec[si].url}" style="width:100%"></audio>` : ""}
      ${!exam && rec[si].secs ? `<details><summary>⭐ Ver resposta modelo (banda 8)</summary><div class="model">${esc(st.sample || "")}</div></details>` : ""}
      <div class="spread"><button class="btn" id="prev" ${si ? "" : "disabled"}>← Anterior</button>
        ${si < steps.length - 1 ? `<button class="btn primary" id="next">Seguinte →</button>` : `<button class="btn ok" id="finish">Terminar e ver feedback</button>`}</div></section>`;
    $("#listen", root).onclick = () => TTS.say(st.part === 2 ? `Now, I'm going to give you a topic and I'd like you to talk about it for one to two minutes. ${st.q}` : st.q, "male");
    const prep = $("#prep", root);
    if (prep) prep.onclick = () => { prep.disabled = true; const pt = $("#prepT", root); pt.classList.remove("hide"); prepTimer = startCountdown(pt, 60, () => { toast("⏱ Fim da preparação — começa a falar"); startRec(); }); };
    $("#recBtn", root).onclick = () => recording ? stopRec() : startRec();
    $("#prev", root).onclick = () => { stopAll(); si--; drawStep(); };
    const nx = $("#next", root); if (nx) nx.onclick = () => { stopAll(); si++; drawStep(); };
    const fin = $("#finish", root); if (fin) fin.onclick = () => { stopAll(); setTimeout(drawSummary, 300); };
  };
  const startRec = async () => {
    if (recording) return;
    prepTimer && prepTimer.stop();
    const st = steps[si], idx = si;
    rec[idx].text = ""; let finalText = "";
    recording = true; t0 = Date.now();
    $("#recBtn", root).textContent = "⏹ Parar"; $("#recBtn", root).classList.add("rec");
    $("#recState", root).innerHTML = `<span class="pulse"></span> a gravar`;
    const limit = st.part === 2 ? 120 : st.part === 1 ? 60 : 120;
    tick = setInterval(() => { const s = (Date.now() - t0) / 1000; $("#clock", root).textContent = fmt(s); if (s >= limit) { toast(st.part === 2 ? "⏱ 2 minutos — o examinador interrompia aqui" : "⏱ Tempo suficiente — resume e conclui"); stopRec(); } }, 250);
    if (canRec) {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const chunks = []; mediaRec = new MediaRecorder(stream);
        mediaRec.ondataavailable = e => e.data.size && chunks.push(e.data);
        mediaRec.onstop = () => { rec[idx].url = URL.createObjectURL(new Blob(chunks, { type: mediaRec.mimeType || "audio/webm" })); if (si === idx && !recording) drawStep(); };
        mediaRec.start();
      } catch { toast("🎤 Sem acesso ao microfone — continua sem gravação"); }
    }
    if (SR) {
      try {
        recog = new SR(); recog.lang = "en-GB"; recog.continuous = true; recog.interimResults = true;
        recog.onresult = e => {
          let interim = "";
          for (let i = e.resultIndex; i < e.results.length; i++) { const r = e.results[i]; if (r.isFinal) finalText += r[0].transcript + " "; else interim += r[0].transcript; }
          rec[idx].text = finalText.trim();
          const tr = $("#tr", root); if (tr && si === idx) tr.innerHTML = `${esc(finalText)}<span class="interim">${esc(interim)}</span>`;
        };
        recog.onend = () => { if (recording && si === idx) { try { recog.start(); } catch { } } };
        recog.start();
      } catch { }
    }
  };
  const stopRec = () => {
    if (!recording) return;
    rec[si].secs = Math.round((Date.now() - t0) / 1000);
    S.stats.recordings++; save();
    stopAll();
    $("#recBtn", root).textContent = "🔁 Gravar de novo"; $("#recBtn", root).classList.remove("rec");
    setTimeout(() => drawStep(), canRec ? 350 : 0);
  };
  const drawSummary = () => {
    const allText = rec.map(r => r.text).join(" "), words = wordsOf(allText), secs = rec.reduce((a, r) => a + r.secs, 0);
    const low = " " + allText.toLowerCase() + " ";
    const fillers = FILLERS.map(f => [f, (low.match(new RegExp(`\\b${f}\\b`, "g")) || []).length]).filter(x => x[1]);
    const uniq = new Set(words.map(w => w.toLowerCase())).size;
    const wpm = secs ? Math.round(words.length / (secs / 60)) : 0;
    const answered = rec.filter(r => r.secs).length;
    const linkers = LINKERS.filter(l => low.includes(" " + l + " "));
    const recos = [];
    if (answered < steps.length) recos.push(`Respondeste a ${answered}/${steps.length} perguntas. No exame, responde sempre — mesmo que seja "That's not something I've thought much about, but I'd say…".`);
    if (SR && words.length) {
      if (wpm && wpm < 100) recos.push(`Ritmo de ${wpm} palavras/min (alvo natural: 120–160). Treina com 'chunks' prontos: "What I really like about it is…", "The main reason is that…".`);
      if (wpm > 180) recos.push(`Ritmo de ${wpm} palavras/min — muito rápido. Abranda e usa pausas naturais nas vírgulas; ajuda a pronúncia e a precisão.`);
      const p1 = rec.filter((r, i) => steps[i].part === 1 && r.secs);
      if (p1.length && p1.reduce((a, r) => a + wordsOf(r.text).length, 0) / p1.length < 25) recos.push("Respostas da Parte 1 curtas. Usa a fórmula Resposta + Razão + Exemplo (2–4 frases).");
      if (linkers.length < 3) recos.push("Poucos conectores no discurso. Experimenta: 'on the other hand', 'having said that', 'for instance', 'which means that'.");
      if (fillers.reduce((a, f) => a + f[1], 0) > words.length * 0.04) recos.push("Muitos 'fillers'. Troca-os por frases de ganhar tempo: 'That's an interesting question…', 'Let me think about that for a second…'.");
      if (uniq / Math.max(1, words.length) < 0.45 && words.length > 80) recos.push("Vocabulário repetitivo. Antes de cada resposta pensa em 1 colocação menos comum relacionada com o tema (ver 'Linguagem útil').");
    }
    recos.push("Pronúncia (típico de falantes de português): diferencia 'th' (think/this), pronuncia o -s/-ed finais e marca o acento das palavras (deVELopment, PHOtograph, phoTOgraphy).");
    const picks = {};
    $("#sbody", root).innerHTML = `<section class="card stack"><h2>📊 Análise da tua prestação</h2>
      <div class="kv"><div><b>${answered}/${steps.length}</b><small>respostas</small></div><div><b>${fmt(secs)}</b><small>tempo a falar</small></div><div><b>${SR ? words.length : "—"}</b><small>palavras transcritas</small></div><div><b>${SR && wpm ? wpm : "—"}</b><small>palavras/min</small></div><div><b>${SR && words.length ? Math.round(uniq / words.length * 100) + "%" : "—"}</b><small>variedade lexical</small></div><div><b>${fillers.reduce((a, f) => a + f[1], 0)}</b><small>fillers</small></div></div>
      <h3>📌 Recomendações para a próxima vez</h3>${recos.map(r => `<div class="reco">${esc(r)}</div>`).join("")}
      <h3>🗂️ Pergunta a pergunta</h3>
      ${steps.map((st, i) => `<details ${i === 0 ? "open" : ""}><summary>P${st.part} · ${esc(st.q)} ${rec[i].secs ? `<span class="chip">${fmt(rec[i].secs)}</span>` : `<span class="chip bad">sem resposta</span>`}</summary>
        ${rec[i].url ? `<audio controls src="${rec[i].url}" style="width:100%;margin:8px 0"></audio>` : ""}
        <p><b>A tua resposta (transcrição):</b> ${esc(rec[i].text || "—")}</p>
        <p><b>⭐ Resposta modelo:</b></p><div class="model">${esc(st.sample || "")}</div></details>`).join("")}
      <div class="grid g2">${items.map(it => `<div><h3>💬 Linguagem útil · ${esc(it.topic)}</h3><ul class="clean">${(it.usefulLanguage || []).map(x => `<li>${esc(x)}</li>`).join("")}</ul><h3>💡 Dicas</h3><ul class="clean">${(it.tips || []).map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>
      <h3>🧑‍⚖️ Autoavaliação (ouve as tuas gravações)</h3>${bandPickerHTML(D.criteria.speaking, picks, "sp")}
      <div class="spread"><button class="btn" id="aiS">📋 Copiar prompt para examinador AI</button><div class="row"><b>Banda: <span id="sband">—</span></b><button class="btn primary" id="saveS" disabled>Guardar (+XP)</button></div></div></section>`;
    const compute = () => { const ks = D.criteria.speaking.map(c => c.key); if (ks.some(k => !picks[k])) return null; return roundHalf(ks.reduce((a, k) => a + picks[k], 0) / 4); };
    bindBandPicker(root, { sp: D.criteria.speaking }, { sp: picks }, () => { const b = compute(); $("#sband", root).textContent = bandStr(b); $("#saveS", root).disabled = b == null; });
    $("#aiS", root).onclick = () => copyText(`You are a certified IELTS Speaking examiner. Below are automatic transcripts of my answers (speech-to-text: ignore punctuation and obvious recognition errors; you cannot judge pronunciation reliably, so comment on it only cautiously).
Assess Fluency and Coherence, Lexical Resource and Grammatical Range and Accuracy using the official public band descriptors. Give: a band per criterion with justification, 3 strengths, 3 priorities, and for 3 of my answers an upgraded band-8 version that keeps my ideas. Reply in European Portuguese (PT-PT), keep English examples in English.

${steps.map((st, i) => `Part ${st.part} — Q: ${st.q}\nMy answer (${rec[i].secs}s): ${rec[i].text || "(no transcript)"}`).join("\n\n")}`);
    $("#saveS", root).onclick = () => {
      const b = compute(); if (b == null) return;
      recordResult(key, { skill: "speaking", ids, band: b, secs, words: words.length, exam });
      addXP(80 * items.length, "Speaking avaliado"); completeMission(); confetti();
      $("#saveS", root).disabled = true; $("#saveS", root).textContent = "✓ Guardado";
    };
  };
  drawStep();
}

/* ---------- Revisão (erros + vocabulário) ---------- */
const BOX_DAYS = [0, 0, 1, 2, 4]; // caixa 1..4 → intervalo (dias)
const dueErrors = () => Object.entries(S.review).filter(([, r]) => r.due <= todayStr());
function dueVocab(n) {
  const t = todayStr();
  const due = D.vocab.filter(v => S.vocab[v.id] && S.vocab[v.id].due <= t);
  const fresh = D.vocab.filter(v => !S.vocab[v.id]);
  return [...due, ...fresh].slice(0, n);
}
routes.review = (parts, p) => {
  if (parts[0] === "errors") return reviewErrors();
  if (parts[0] === "vocab") return reviewVocab(+(p.get("n") || 15));
  const errs = Object.values(S.review), due = dueErrors().length;
  const vb = [1, 2, 3, 4, 5].map(b => D.vocab.filter(v => (S.vocab[v.id] || {}).box === b).length);
  mount(`<div class="page-head"><h1>🔁 Revisão espaçada</h1><p>Sistema Leitner: o que falhas volta amanhã; o que acertas volta cada vez mais tarde. É a forma mais eficiente de transformar erros em pontos.</p></div>
    <div class="grid g2">
      <a class="card skill-tile skill-review" href="#/review/errors"><h2>❌ → ✅ Os teus erros</h2><p class="muted">${due} para hoje · ${errs.length} em revisão · ${S.stats.mastered} dominados</p><span class="btn primary">${due ? "Rever agora" : "Nada para hoje"}</span></a>
      <a class="card skill-tile skill-vocab" href="#/review/vocab?n=15"><h2>🧠 Vocabulário IELTS</h2><p class="muted">${D.vocab.length} flashcards · ${dueVocab(999).length} disponíveis hoje</p>
        <div class="bars">${vb.map((n, i) => `<div class="bar"><span>Caixa ${i + 1}</span><div class="track"><i style="width:${D.vocab.length ? n / D.vocab.length * 100 : 0}%;background:var(--primary)"></i></div><b>${n}</b></div>`).join("")}</div>
        <span class="btn primary" style="margin-top:8px">Treinar 15 cartas</span></a>
    </div>`);
};
function findQ(skill, id, n) {
  const it = byId(skill, id); if (!it) return null;
  for (const g of it.groups) { const q = g.questions.find(q => q.n === n); if (q) return { it, g, q }; }
  return null;
}
function reviewErrors() {
  const queue = dueErrors().map(([k, r]) => ({ k, r, f: findQ(r.skill, r.id, r.n) })).filter(x => x.f);
  let i = 0, done = 0;
  const root = mount(`<div class="page-head"><a href="#/review">← Revisão</a><h1>❌ → ✅ Rever erros</h1><p>Responde de novo. Acertas → a pergunta sobe de caixa. Depois de 3 acertos espaçados, fica dominada.</p></div><div id="rv"></div>`);
  const draw = () => {
    if (i >= queue.length) {
      $("#rv", root).innerHTML = `<div class="card empty"><h2>${queue.length ? "🎉 Revisão concluída!" : "Nada para rever hoje"}</h2><p>${queue.length ? `Acertaste ${done}/${queue.length}.` : "Faz exercícios de Reading/Listening — os teus erros aparecem aqui automaticamente."}</p><a class="btn primary" href="#/">Voltar ao início</a></div>`;
      if (queue.length) { addXP(10 + done * 5, "Revisão de erros"); completeMission(); }
      else if (activeMission) completeMission();
      return;
    }
    const { k, r, f } = queue[i], ans = {};
    $("#rv", root).innerHTML = `<section class="card"><div class="spread"><span class="chip pri">${SKILLS[r.skill].em} ${esc(f.it.title)} · caixa ${r.box}</span><small>${i + 1}/${queue.length}</small></div>
      <div class="instr" style="margin-top:12px;font-size:.9rem;font-style:italic">${esc(f.g.instructions)}</div>
      ${f.g.type === "match" && f.g.options ? `<div class="optlist">${f.g.options.map(o => `<div>${esc(o)}</div>`).join("")}</div>` : ""}
      <div id="qbox">${qHTML(f.g, f.q, k, "", false)}</div>
      <details><summary>${r.skill === "reading" ? "📖 Ver o texto" : "📜 Ver a transcrição"}</summary>${r.skill === "reading" ? f.it.paragraphs.map(p => `<p><b>${esc(p.label)}</b> ${esc(p.text)}</p>`).join("") : f.it.script.map(l => `<div class="script-line"><b>${esc((f.it.speakers[l.s] || {}).name || "")}:</b> ${esc(l.t)}</div>`).join("")}</details>
      <div class="row" style="margin-top:12px"><button class="btn primary" id="chk">Verificar</button></div></section>`;
    bindAnswers($("#rv", root), ans);
    $("#chk", root).onclick = () => {
      const ok = isCorrect(f.g, f.q, ans[k]);
      $("#qbox", root).innerHTML = qHTML(f.g, f.q, k, ans[k], true);
      if (ok) { done++; r.box++; if (r.box > 4) { delete S.review[k]; S.stats.mastered++; toast("🏆 Erro dominado!"); } else r.due = addDays(todayStr(), BOX_DAYS[r.box]); }
      else { r.box = 1; r.due = addDays(todayStr(), 1); }
      save();
      $("#chk", root).outerHTML = `<button class="btn primary" id="nxt">Seguinte →</button>`;
      $("#nxt", root).onclick = () => { i++; draw(); };
    };
  };
  draw();
}
function reviewVocab(n) {
  const cards = dueVocab(n); let i = 0, known = 0;
  const root = mount(`<div class="page-head"><a href="#/review">← Revisão</a><h1>🧠 Flashcards</h1><p>Lê o termo, tenta dizer o significado e usá-lo numa frase em voz alta, depois vira o cartão.</p></div><div id="fc"></div>`);
  const draw = () => {
    if (i >= cards.length) {
      $("#fc", root).innerHTML = `<div class="card empty"><h2>🎉 Sessão concluída</h2><p>Sabias ${known}/${cards.length}. As que falhaste voltam amanhã.</p><div class="row" style="justify-content:center"><a class="btn" href="#/review">Revisão</a><a class="btn primary" href="#/">Início</a></div></div>`;
      if (cards.length) { addXP(cards.length * 2, "Vocabulário"); completeMission(); }
      return;
    }
    const c = cards[i];
    $("#fc", root).innerHTML = `<div class="spread" style="max-width:560px;margin:0 auto 10px"><span class="chip pri">${esc(c.category)}</span><small>${i + 1}/${cards.length}</small></div>
      <div class="flash" id="flash"><div class="flash-inner"><div class="flash-face"><div class="term">${esc(c.term)}</div><small class="muted" style="margin-top:10px">toca para virar</small></div>
      <div class="flash-face back"><div class="term" style="font-size:1.2rem">${esc(c.term)}</div><p style="margin:10px 0 6px;font-weight:600">${esc(c.meaning)}</p><p class="muted"><i>${esc(c.example)}</i></p></div></div></div>
      <div class="row" style="justify-content:center;margin-top:16px"><button class="btn" id="say">🔊 Ouvir</button><button class="btn danger" data-g="0">✗ Não sabia</button><button class="btn" data-g="1">≈ Mais ou menos</button><button class="btn ok" data-g="2">✓ Sabia</button></div>`;
    $("#flash", root).onclick = () => $("#flash", root).classList.toggle("flipped");
    $("#say", root).onclick = () => TTS.say(`${c.term}. ${c.example}`);
  };
  root.addEventListener("click", e => {
    const b = e.target.closest("[data-g]"); if (!b) return;
    const g = +b.dataset.g, c = cards[i], v = S.vocab[c.id] || { box: 1 };
    v.box = g === 0 ? 1 : g === 1 ? Math.max(1, v.box) : Math.min(5, v.box + 1);
    v.due = addDays(todayStr(), g === 0 ? 0 : [0, 1, 2, 3, 5, 7][v.box]);
    if (g === 2) known++;
    S.vocab[c.id] = v; S.stats.vocabReviews++; save(); i++; draw();
  });
  draw();
}

/* ---------- Simulado ---------- */
routes.mock = parts => {
  const M = D.mocks;
  if (parts[0]) {
    const s = parts[0], key = "mock-" + s;
    if (s === "listening") return listeningView(M.listening, { exam: true, key });
    if (s === "reading") return readingView(M.reading, { exam: true, key, minutes: 60 });
    if (s === "writing") return writingView(M.writing[S.module] || M.writing.academic, { exam: true, key, minutes: 60 });
    if (s === "speaking") return speakingView(M.speaking, { exam: true, key });
  }
  const cards = [["listening", "~32 min", "4 partes seguidas, ouves uma vez."], ["reading", "60 min", "3 textos, 40 perguntas, sem tempo extra."], ["writing", "60 min", "Task 1 + Task 2, entrega automática no fim."], ["speaking", "11–14 min", "Partes 1, 2 e 3 seguidas."]];
  const bands = cards.map(([s]) => (bestOf("mock-" + s) || {}).band);
  const all = bands.every(b => b != null) ? roundHalf(bands.reduce((a, b) => a + b, 0) / 4) : null;
  mount(`<div class="page-head"><h1>🏁 Simulado completo</h1><p>Faz no dia 6, em condições reais: sem telemóvel, sem pausas entre Listening, Reading e Writing (≈ 2h40). As respostas certas e recomendações aparecem só no fim de cada componente.</p></div>
    ${all != null ? `<section class="card result-hero" style="margin-bottom:16px"><div class="eyebrow">Banda global do simulado</div><div class="big">${bandStr(all)}</div></section>` : ""}
    <div class="grid g2">${cards.map(([s, t, d], i) => `<a class="card skill-tile skill-${s}" href="#/mock/${s}"><div class="spread"><div><div class="eyebrow">${SKILLS[s].em} ${SKILLS[s].name} · ${t}</div><p class="muted" style="margin:6px 0 0">${d}</p></div>${ring(bands[i], s)}</div></a>`).join("")}</div>`);
};

/* ---------- Guia ---------- */
routes.guide = parts => {
  const id = parts[0];
  const strat = `<div class="grid g2">${Object.values(D.strategies).map(s => `<div class="card"><h3>${esc(s.name)}</h3><ul class="clean">${s.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>`).join("")}</div>`;
  if (id && D.guide[id]) {
    const g = D.guide[id];
    const root = mount(`<div class="page-head"><a href="#/guide">← Guia</a><h1>${esc(g.title)}</h1></div><section class="card">${id === "strategies" ? strat : g.html}</section>
      <div class="row" style="margin-top:16px"><button class="btn primary" id="read">✓ Marcar como lido</button></div>`);
    $("#read", root).onclick = () => { if (!S.guideRead[id]) { S.guideRead[id] = true; save(); addXP(20, "Guia lido"); } completeMission(); location.hash = "#/"; };
    return;
  }
  mount(`<div class="page-head"><h1>📚 Guia oficial</h1><p>Baseado no formato e nos critérios de avaliação públicos do IELTS (ielts.org, British Council, IDP).</p></div>
    <div class="grid g2">${Object.entries(D.guide).map(([k, g]) => `<a class="card skill-tile skill-guide" href="#/guide/${k}"><h3>${esc(g.title)}</h3><span class="muted">${S.guideRead[k] ? "✓ Lido" : "Abrir →"}</span></a>`).join("")}</div>
    <section class="card" style="margin-top:16px"><h2>Tabelas de conversão (estimativa)</h2><div class="table-wrap"><table class="t"><tr><th>Banda</th><th>Listening</th><th>Reading Academic</th><th>Reading GT</th></tr>
    ${[9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5].map(b => { const f = t => { const r = D.bandTables[t].find(x => x[1] === b); return r ? `${r[0]}+` : "—"; }; return `<tr><td><b>${bandStr(b)}</b></td><td>${f("listening")}/40</td><td>${f("readingAcademic")}/40</td><td>${f("readingGeneral")}/40</td></tr>`; }).join("")}</table></div></section>`);
};

/* ---------- Definições ---------- */
routes.settings = () => {
  const root = mount(`<div class="page-head"><h1>⚙️ Definições</h1></div>
    <section class="card">
      <label class="field"><span>Nome</span><input id="name" value="${esc(S.name)}"></label>
      <label class="field"><span>Data do exame</span><input type="date" id="exam" value="${esc(S.examDate)}"></label>
      <label class="field"><span>Início do plano (Dia 1)</span><input type="date" id="start" value="${esc(S.startDate)}"></label>
      <label class="field"><span>Módulo</span><select id="module"><option value="academic" ${S.module === "academic" ? "selected" : ""}>Academic</option><option value="general" ${S.module === "general" ? "selected" : ""}>General Training</option></select></label>
      <label class="field"><span>Tema</span><select id="theme">${[["auto", "Automático"], ["light", "Claro"], ["dark", "Escuro"]].map(([v, l]) => `<option value="${v}" ${S.theme === v ? "selected" : ""}>${l}</option>`).join("")}</select></label>
    </section>
    <section class="card"><h2>🔊 Vozes do Listening</h2><p class="muted">${TTS.voices.length} vozes inglesas disponíveis neste dispositivo. Vozes "Google UK English" (Chrome) ou "Daniel/Serena" (Safari) soam mais naturais.</p>
      <label class="field"><span>Voz feminina</span><select id="vf"><option value="">Automática</option>${TTS.voices.map(v => `<option ${S.voiceF === v.name ? "selected" : ""}>${esc(v.name)}</option>`).join("")}</select></label>
      <label class="field"><span>Voz masculina</span><select id="vm"><option value="">Automática</option>${TTS.voices.map(v => `<option ${S.voiceM === v.name ? "selected" : ""}>${esc(v.name)}</option>`).join("")}</select></label>
      <button class="btn" id="test">▶ Testar vozes</button></section>
    <section class="card"><h2>💾 Progresso</h2><p class="muted">O progresso fica guardado neste browser. Exporta para mudar de dispositivo.</p>
      <div class="row"><button class="btn" id="exp">⬇ Exportar</button><label class="btn">⬆ Importar<input type="file" id="imp" accept="application/json" class="hide"></label><button class="btn danger" id="reset">Apagar tudo</button></div></section>`);
  const bind = (id, f) => { $("#" + id, root).onchange = e => { f(e.target.value); save(); applyTheme(); renderSide(); toast("✓ Guardado"); }; };
  bind("name", v => S.name = v); bind("exam", v => S.examDate = v); bind("start", v => S.startDate = v);
  bind("module", v => S.module = v); bind("theme", v => S.theme = v); bind("vf", v => S.voiceF = v); bind("vm", v => S.voiceM = v);
  $("#test", root).onclick = () => TTS.play([{ s: 0, t: "Good morning. This is the female voice." }, { s: 1, t: "And this is the male voice. Good luck with your exam!" }], [{ voice: "female" }, { voice: "male" }]);
  $("#exp", root).onclick = () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(S, null, 2)], { type: "application/json" })); a.download = `ielts-quest-${todayStr()}.json`; a.click(); };
  $("#imp", root).onchange = e => { const f = e.target.files[0]; if (!f) return; f.text().then(t => { S = Object.assign(defaults(), JSON.parse(t)); save(); toast("✓ Importado"); router(); }).catch(() => toast("Ficheiro inválido")); };
  $("#reset", root).onclick = () => { if (confirm("Apagar todo o progresso?")) { S = defaults(); save(); router(); } };
};

function notFound() { mount(`<div class="card empty"><h2>Exercício não encontrado</h2><a class="btn primary" href="#/">Voltar</a></div>`); }
function applyTheme() { if (S.theme === "auto") document.documentElement.removeAttribute("data-theme"); else document.documentElement.dataset.theme = S.theme; }

/* ================= Boot ================= */
applyTheme();
$("#moreBtn").onclick = () => $("#sidebar").classList.toggle("open");
document.addEventListener("click", e => { const sb = $("#sidebar"); if (sb.classList.contains("open") && !sb.contains(e.target) && !e.target.closest("#moreBtn")) sb.classList.remove("open"); });
addEventListener("hashchange", router);
router();
window.__IELTS_STATE = () => S; // debug
})();
