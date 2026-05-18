const RAW_TASKS = [
  // ADMINISTRAÇÃO
  {area:"ADMINISTRAÇÃO", name:"Planejamento de Aplicação das Classes e Especialidades", pts:200},
  {area:"ADMINISTRAÇÃO", name:"Reunião Regional Ordinária 1º Semestre", pts:400},
  {area:"ADMINISTRAÇÃO", name:"3ª Visita do Regional para Diagnóstico", pts:300},
  {area:"ADMINISTRAÇÃO", name:"Reunião Regional Ordinária 2º Semestre", pts:400},
  {area:"ADMINISTRAÇÃO", name:"1ª Visita do Regional para Diagnóstico", pts:300},
  {area:"ADMINISTRAÇÃO", name:"Inventário do Almoxarifado e da Biblioteca do Clube", pts:200},
  {area:"ADMINISTRAÇÃO", name:"Ranking SGC", pts:200},
  {area:"ADMINISTRAÇÃO", name:"2ª Visita do Regional para Diagnóstico", pts:300},
  {area:"ADMINISTRAÇÃO", name:"Planejamento Completo Votado pela Comissão da Igreja", pts:200},
  {area:"ADMINISTRAÇÃO", name:"Membros do Clube 100% Assegurados", pts:0},
  {area:"ADMINISTRAÇÃO", name:"Atualização", pts:200},
  // DISCIPULADO
  {area:"DISCIPULADO", name:"Impacto Esperança (17/10)", pts:200},
  {area:"DISCIPULADO", name:"Concluir a Classe Bíblica", pts:800},
  {area:"DISCIPULADO", name:"Semana da Primavera (19-26/09)", pts:200},
  {area:"DISCIPULADO", name:"Visita a Autoridade", pts:200},
  {area:"DISCIPULADO", name:"Semana do Lenço", pts:200},
  {area:"DISCIPULADO", name:"Clube Atendendo a Comunidade", pts:200},
  {area:"DISCIPULADO", name:"Voz dos Pampas", pts:800},
  {area:"DISCIPULADO", name:"Dia do Amigo", pts:200},
  {area:"DISCIPULADO", name:"Semana Santa", pts:200},
  // IDENTIDADE
  {area:"IDENTIDADE", name:"Clube do Livro MDA", pts:200},
  {area:"IDENTIDADE", name:"Cavaleiro Fiel", pts:650},
  {area:"IDENTIDADE", name:"Ano Bíblico", pts:650},
  {area:"IDENTIDADE", name:"Dez Dias de Clamor", pts:200},
  {area:"IDENTIDADE", name:"Dia do Aventureiro ou Desbravador", pts:200},
  {area:"IDENTIDADE", name:"Escola Sabatina — 3º Trim.", pts:200},
  {area:"IDENTIDADE", name:"Escola Sabatina — 2º Trim.", pts:200},
  {area:"IDENTIDADE", name:"Especialidade", pts:700},
  // LIDERANÇA
  {area:"LIDERANÇA", name:"CTBD — Módulo Secretaria", pts:200},
  {area:"LIDERANÇA", name:"Conselheiro Padrão", pts:200},
  {area:"LIDERANÇA", name:"CTBD — Módulo Tesouraria", pts:200},
  {area:"LIDERANÇA", name:"CTBD — Módulo Capelania", pts:200},
  {area:"LIDERANÇA", name:"Instrutor Bíblico Padrão", pts:200},
  {area:"LIDERANÇA", name:"Unidade Nota 10", pts:200},
  {area:"LIDERANÇA", name:"Conclusão das Classes Conforme o Planejamento", pts:800},
  {area:"LIDERANÇA", name:"Curso de Formação de Líderes (10–12/07)", pts:200},
  {area:"LIDERANÇA", name:"CTBD — Módulo Conselheiro", pts:200},
  {area:"LIDERANÇA", name:"Fábrica de Líderes", pts:200},
  {area:"LIDERANÇA", name:"CTBD — Módulo Diretoria", pts:200},
  {area:"LIDERANÇA", name:"Rede Familiar ou Discípulos Teen (≥13 anos)", pts:200},
  // REGISTRO DE ATIVIDADE
  {area:"REGISTRO DE ATIVIDADE", name:"Número de Classes Concluídas no Ano", pts:200},
  {area:"REGISTRO DE ATIVIDADE", name:"Número de Especialidades Realizadas no Ano", pts:200},
  {area:"REGISTRO DE ATIVIDADE", name:"Aventuri ANRS ou Campori de Área", pts:800},
  {area:"REGISTRO DE ATIVIDADE", name:"Pontuação por Mérito", pts:1000},
  {area:"REGISTRO DE ATIVIDADE", name:"Evento Regional", pts:400},
  {area:"REGISTRO DE ATIVIDADE", name:"Número de Novos Membros Não Adventistas", pts:200},
  {area:"REGISTRO DE ATIVIDADE", name:"Número de Batismos do Ano", pts:200},
  {area:"REGISTRO DE ATIVIDADE", name:"Tarefa que Passou", pts:300},
];
 
const AREA_ICONS = {
  "ADMINISTRAÇÃO": "🗂️",
  "DISCIPULADO": "✝️",
  "IDENTIDADE": "🌟",
  "LIDERANÇA": "🎖️",
  "REGISTRO DE ATIVIDADE": "📋"
};
 
const STATUS_LABELS = {
  none:"Sem progresso", done:"Concluída", denied:"Negada", wip:"Em andamento"
};
const STATUS_COLORS = {
  none:"var(--gray)", done:"var(--green)", denied:"var(--red)", wip:"var(--yellow)"
};
 
// ─── FIREBASE CONFIG ───────────────────────────────────────────────────────
// 1. Acesse https://console.firebase.google.com
// 2. Crie um projeto → clique em "Adicionar app" → ícone Web (</>)
// 3. No menu lateral: Build → Realtime Database → Criar banco → modo teste
// 4. Volte em Configurações do projeto e copie o firebaseConfig
// 5. Cole os valores abaixo substituindo cada "COLE_AQUI":
const firebaseConfig = {
  apiKey:            "AIzaSyCpx_vEdag_hEgW4t1yPJcy7qBQ3uLuJpY",
  authDomain:        "pequenos-sentinelas.firebaseapp.com",
  databaseURL:       "https://pequenos-sentinelas-default-rtdb.firebaseio.com",
  projectId:         "pequenos-sentinelas",
  storageBucket:     "pequenos-sentinelas.firebasestorage.app",
  messagingSenderId: "851954424134",
  appId:             "1:851954424134:web:83029e402ba206aa6eed47"
};
// ───────────────────────────────────────────────────────────────────────────
 
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const stateRef = db.ref('ps_state');
 
let state = {};
let dbReady = false;
 
function initState() {
  RAW_TASKS.forEach((t,i) => {
    if (!state[i]) state[i] = {status:'none', earned:0};
  });
}
 
// Escuta mudanças em tempo real → atualiza em todos os dispositivos automaticamente
stateRef.on('value', snapshot => {
  const data = snapshot.val();
  if (data) state = data;
  initState();
  if (!dbReady) {
    dbReady = true;
    build();
    updateProgress();
    applyAuthState();
    document.getElementById('loading-overlay').style.display = 'none';
  } else {
    RAW_TASKS.forEach((_,i) => updateRow(i));
    updateProgress();
    applyAuthState();
  }
});
 
async function save() {
  try {
    await stateRef.set(state);
    showToast('Salvo ✓');
  } catch(e) {
    showToast('Erro ao salvar ✗');
    console.error(e);
  }
}
 
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 1800);
}
 
function getEarned(i) {
  const s = state[i].status;
  if (s === 'done') return RAW_TASKS[i].pts;
  if (s === 'denied') return 0;
  if (s === 'wip') return Math.floor(RAW_TASKS[i].pts / 2);
  return 0;
}
 
function updateProgress() {
  let total = 0, possible = 15000;
  RAW_TASKS.forEach((_,i) => total += getEarned(i));
  document.getElementById('score-display').innerHTML = `${total.toLocaleString('pt-BR')} <span>/ 15.000 pts</span>`;
  const pct = Math.min(100, (total / possible) * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('pct-label').textContent = pct.toFixed(1) + '%';
  const done = Object.values(state).filter(s => s.status === 'done').length;
  document.getElementById('done-label').textContent = done;
}
 
function updateRow(i) {
  const dot = document.getElementById('dot-' + i);
  const pts = document.getElementById('pts-' + i);
  const s = state[i].status;
  dot.className = 'status-dot-btn dot-' + (s === 'none' ? 'none' : s === 'done' ? 'done' : s === 'denied' ? 'denied' : 'wip');
  const earned = getEarned(i);
  pts.innerHTML = `<span class="pts-earned">${earned}</span><span class="pts-sep">/</span><span class="pts-total">${RAW_TASKS[i].pts}</span>`;
}
 
// Build table
function build() {
  const areas = [...new Set(RAW_TASKS.map(t => t.area))];
  const section = document.getElementById('table-section');
  let globalIdx = 0;
 
  areas.forEach(area => {
    const tasks = RAW_TASKS.map((t,i) => ({...t,i})).filter(t => t.area === area);
    const areaPts = tasks.reduce((s,t) => s + t.pts, 0);
    const areaId = area.replace(/\s+/g, '_');
 
    const grp = document.createElement('div');
    grp.className = 'area-group';
    grp.id = 'group-' + areaId;
 
    grp.innerHTML = `
      <div class="area-header" onclick="toggleArea('${areaId}')">
        <span class="area-icon">${AREA_ICONS[area]||'📌'}</span>
        <span class="area-title">${area}</span>
        <span class="area-points" id="area-pts-${areaId}">${areaPts} pts</span>
        <span class="chevron">▼</span>
      </div>
      <div class="area-body">
        <table>
          <thead><tr>
            <th>Atividade</th>
            <th>Status</th>
            <th>Pontos</th>
          </tr></thead>
          <tbody id="tbody-${areaId}"></tbody>
        </table>
      </div>
    `;
    section.appendChild(grp);
 
    const tbody = grp.querySelector(`#tbody-${areaId}`);
    let areaLocalIdx = 0;
    tasks.forEach(t => {
      const i = t.i;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <button class="task-btn" onclick="openModal(${i})">
            <span class="task-idx">T${String(i+1).padStart(2,'0')}</span>
            ${t.name}
          </button>
        </td>
        <td class="status-cell">
          <button class="status-dot-btn dot-none" id="dot-${i}" onclick="openPopup(event,${i})"></button>
        </td>
        <td class="pts-cell">
          <span class="pts-display" id="pts-${i}">
            <span class="pts-earned">0</span><span class="pts-sep">/</span><span class="pts-total">${t.pts}</span>
          </span>
        </td>
      `;
      tbody.appendChild(tr);
      updateRow(i);
      areaLocalIdx++;
    });
  });
}
 
function toggleArea(areaId) {
  const grp = document.getElementById('group-' + areaId);
  grp.classList.toggle('collapsed');
}
 
// POPUP
let activePopupIdx = null;
const popup = document.getElementById('status-popup');
 
function openPopup(e, i) {
  if (!isAdmin) return;
  e.stopPropagation();
  activePopupIdx = i;
  const btn = document.getElementById('dot-' + i);
  const r = btn.getBoundingClientRect();
  popup.style.top = (r.bottom + window.scrollY + 6) + 'px';
  popup.style.left = Math.max(8, r.left + window.scrollX - 50) + 'px';
  popup.classList.add('open');
}
 
popup.querySelectorAll('.status-opt').forEach(opt => {
  opt.addEventListener('click', e => {
    e.stopPropagation();
    const s = opt.dataset.s;
    if (activePopupIdx !== null) {
      state[activePopupIdx].status = s;
      state[activePopupIdx].earned = getEarned(activePopupIdx);
      updateRow(activePopupIdx);
      updateProgress();
      save();
    }
    popup.classList.remove('open');
    activePopupIdx = null;
  });
});
 
document.addEventListener('click', () => {
  popup.classList.remove('open');
  activePopupIdx = null;
});
 
// MODAL
function openModal(i) {
  const t = RAW_TASKS[i];
  const s = state[i].status;
  document.getElementById('modal-area').textContent = t.area;
  document.getElementById('modal-title').textContent = t.name;
  document.getElementById('modal-total').textContent = t.pts + ' pts';
  document.getElementById('modal-earned').textContent = getEarned(i) + ' pts';
  document.getElementById('modal-status').textContent = STATUS_LABELS[s];
  document.getElementById('modal-status').style.color = STATUS_COLORS[s];
  document.getElementById('modal-overlay').classList.add('open');
}
 
document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('modal-overlay').classList.remove('open');
});
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay'))
    document.getElementById('modal-overlay').classList.remove('open');
});
 
// AUTH
const ADMIN_USER = 'secretaria';
const ADMIN_PASS = 'aventureiros';
let isAdmin = sessionStorage.getItem('ps_admin') === '1';
 
function applyAuthState() {
  const btn = document.getElementById('login-btn');
  if (isAdmin) {
    btn.textContent = '🔓';
    btn.classList.add('logged-in');
    btn.title = 'Logada como Secretaria';
  } else {
    btn.textContent = '🔒';
    btn.classList.remove('logged-in');
    btn.title = 'Área restrita';
  }
  // Update all dots to readonly if not admin
  document.querySelectorAll('.status-dot-btn').forEach(d => {
    if (isAdmin) d.classList.remove('readonly');
    else d.classList.add('readonly');
  });
}
 
function openLoginModal() {
  const overlay = document.getElementById('login-modal-overlay');
  document.getElementById('login-form-wrap').style.display = isAdmin ? 'none' : 'block';
  document.getElementById('logout-wrap').style.display = isAdmin ? 'block' : 'none';
  document.getElementById('login-error').textContent = '';
  document.getElementById('login-user').value = '';
  document.getElementById('login-pass').value = '';
  overlay.classList.add('open');
}
 
function closeLoginModal() {
  document.getElementById('login-modal-overlay').classList.remove('open');
}
 
function doLogin() {
  const u = document.getElementById('login-user').value.trim();
  const p = document.getElementById('login-pass').value;
  if (u === ADMIN_USER && p === ADMIN_PASS) {
    isAdmin = true;
    sessionStorage.setItem('ps_admin', '1');
    applyAuthState();
    closeLoginModal();
    showToast('Bem-vinda, Secretaria! ✓');
  } else {
    document.getElementById('login-error').textContent = 'Usuário ou senha incorretos.';
  }
}
 
function doLogout() {
  isAdmin = false;
  sessionStorage.removeItem('ps_admin');
  applyAuthState();
  closeLoginModal();
  showToast('Sessão encerrada.');
}
 
// Enter key on login fields
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('login-modal-overlay').classList.contains('open') && !isAdmin) {
    doLogin();
  }
});
 
// Close login modal on overlay click
document.getElementById('login-modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('login-modal-overlay')) closeLoginModal();
});
 
// build() e updateProgress() são chamados pelo listener do Firebase acima
