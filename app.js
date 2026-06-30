import { analyzeRecruitment } from './analyzer.js';

/* ============================================================
   APPLICATION STATE
   ============================================================ */
const state = {
  candidatesList: [],
  activeCandidateId: null,
  currentWeights: {
    required_skills: 40, certifications: 15, experience: 15,
    education: 10, additional_skills: 10, project_relevance: 10
  },
  leaderboardSort: { key: 'score', dir: 'desc' },
  leaderboardFilter: 'all',
  vacancyMeta: { title: '', department: '', location: '', type: '', date: '' }
};

/* ============================================================
   DOM ELEMENT CACHE
   ============================================================ */
const el = {};
function cacheDom() {
  // Screens
  el.screenInput = document.getElementById('screen-input');
  el.screenLoading = document.getElementById('screen-loading');
  el.screenLeaderboard = document.getElementById('screen-leaderboard');
  el.screenDashboard = document.getElementById('screen-dashboard');
  // Inputs
  el.inputJd = document.getElementById('input-jd');
  el.inputResume = document.getElementById('input-resume');
  el.selectCandidateVariant = document.getElementById('select-candidate-variant');
  el.dropZone = document.getElementById('drop-zone');
  el.fileInput = document.getElementById('file-input');
  el.bulkDropZone = document.getElementById('bulk-drop-zone');
  el.bulkFileInput = document.getElementById('bulk-file-input');
  el.bulkFileCount = document.getElementById('bulk-file-count');
  // Buttons
  el.btnRunAnalysis = document.getElementById('btn-run-analysis');
  el.btnRunBulk = document.getElementById('btn-run-bulk');
  el.btnNewAnalysis = document.getElementById('btn-new-analysis');
  el.btnBackLeaderboard = document.getElementById('btn-back-leaderboard');
  el.btnClearSession = document.getElementById('btn-clear-session');
  el.btnCompareTrigger = document.getElementById('btn-compare-trigger');
  el.btnCompareSidebar = document.getElementById('btn-compare-sidebar');
  el.btnExportPdf = document.getElementById('btn-export-pdf');
  el.btnExportJson = document.getElementById('btn-export-json');
  // Template bar
  el.templateBtnContainer = document.getElementById('template-btn-container');
  el.sidebarCandidatesContainer = document.getElementById('sidebar-candidates-container');
  el.dashboardSlidersContainer = document.getElementById('dashboard-sliders-container');
  // Loading screen
  el.loadingTitle = document.getElementById('loading-title');
  el.loadingStepText = document.getElementById('loading-step-text');
  el.loadingProgressBar = document.getElementById('loading-progress-bar');
  el.batchProgressInfo = document.getElementById('batch-progress-info');
  el.batchCounterText = document.getElementById('batch-counter-text');
  el.batchNameText = document.getElementById('batch-name-text');
  // Leaderboard
  el.lbTotalCount = document.getElementById('lb-total-count');
  el.lbAvgScore = document.getElementById('lb-avg-score');
  el.lbFlaggedCount = document.getElementById('lb-flagged-count');
  el.topPickCard = document.getElementById('top-pick-card');
  el.topPickName = document.getElementById('top-pick-name');
  el.topPickSummary = document.getElementById('top-pick-summary');
  el.topPickScore = document.getElementById('top-pick-score');
  el.filterBar = document.getElementById('filter-bar');
  el.leaderboardTbody = document.getElementById('leaderboard-tbody');
  // Dashboard fields
  el.scoreVal = document.getElementById('dashboard-score-val');
  el.scoreRadialFill = document.getElementById('dashboard-radial-fill');
  el.categoryBadge = document.getElementById('dashboard-category-badge');
  el.rankPct = document.getElementById('dashboard-rank-pct');
  el.recruiterSummary = document.getElementById('dashboard-recruiter-summary');
  el.barsContainer = document.getElementById('dashboard-bars-container');
  el.explainableContainer = document.getElementById('dashboard-explainable-container');
  // Mini gauges
  el.gaugeFillAgility = document.getElementById('gauge-fill-agility');
  el.gaugeValAgility = document.getElementById('gauge-val-agility');
  el.gaugeDescAgility = document.getElementById('gauge-desc-agility');
  el.gaugeFillUniqueness = document.getElementById('gauge-fill-uniqueness');
  el.gaugeValUniqueness = document.getElementById('gauge-val-uniqueness');
  el.gaugeDescUniqueness = document.getElementById('gauge-desc-uniqueness');
  // Certs
  el.certCredibility = document.getElementById('dashboard-cert-credibility');
  el.certScore = document.getElementById('dashboard-cert-score');
  el.certsTbody = document.getElementById('dashboard-certs-tbody');
  // Fraud detection
  el.fraudVerificationScore = document.getElementById('fraud-verification-score');
  el.fraudRiskBadge = document.getElementById('fraud-risk-badge');
  el.fraudFlagsContainer = document.getElementById('fraud-flags-container');
  // Org benefit
  el.orgCrossVal = document.getElementById('org-cross-val');
  el.orgCostVal = document.getElementById('org-cost-val');
  el.orgMentorVal = document.getElementById('org-mentor-val');
  el.orgInnovateVal = document.getElementById('org-innovate-val');
  el.orgBenefitSummary = document.getElementById('org-benefit-summary');
  // Right column
  el.talentsBadges = document.getElementById('dashboard-talents-badges');
  el.talentsInsight = document.getElementById('dashboard-talents-insight');
  el.gapsBadges = document.getElementById('dashboard-gaps-badges');
  el.learningPath = document.getElementById('dashboard-learning-path');
  el.projectsContainer = document.getElementById('dashboard-projects-container');
  el.riskCard = document.getElementById('dashboard-risk-card');
  el.riskLevel = document.getElementById('dashboard-risk-level');
  el.riskReasons = document.getElementById('dashboard-risk-reasons');
  el.interviewContainer = document.getElementById('dashboard-interview-container');
  el.rawJson = document.getElementById('dashboard-raw-json');
  el.jsonHeader = document.getElementById('json-viewer-header');
  el.jsonContent = document.getElementById('json-viewer-content');
  el.jsonToggleIcon = document.getElementById('json-toggle-icon');
  // Modal
  el.compareModal = document.getElementById('compare-modal');
  el.btnCloseModal = document.getElementById('btn-close-modal');
  el.compareTableHead = document.getElementById('compare-table-head');
  el.compareTableBody = document.getElementById('compare-table-body');
  // Vacancy inputs
  el.inputJobTitle = document.getElementById('input-job-title');
  el.inputDepartment = document.getElementById('input-department');
  el.inputLocation = document.getElementById('input-location');
  el.inputEmpType = document.getElementById('input-emp-type');
  // Vacancy info bar
  el.vacancyInfoBar = document.getElementById('vacancy-info-bar');
  el.vacancyBarTitle = document.getElementById('vacancy-bar-title');
  el.vacancyBarDept = document.getElementById('vacancy-bar-dept');
  el.vacancyBarLocation = document.getElementById('vacancy-bar-location');
  el.vacancyBarType = document.getElementById('vacancy-bar-type');
  el.vacancyBarDate = document.getElementById('vacancy-bar-date');
  el.vacancyBarApplicants = document.getElementById('vacancy-bar-applicants');
  // Breadcrumb
  el.breadcrumbBar = document.getElementById('breadcrumb-bar');
  el.breadcrumbLeaderboard = document.getElementById('breadcrumb-leaderboard');
  el.breadcrumbCandidateName = document.getElementById('breadcrumb-candidate-name');
  // Particles
  el.particlesBg = document.getElementById('particles-bg');
}

/* ============================================================
   INITIALIZATION
   ============================================================ */
function init() {
  cacheDom();
  initTemplates();
  initWeightsSliders();
  initDragAndDrop();
  initBulkDragAndDrop();
  setupEventListeners();
  generateParticles();
  // Restore session if available
  if (sessionStorage.getItem('rec_candidates')) {
    try {
      state.candidatesList = JSON.parse(sessionStorage.getItem('rec_candidates'));
      if (sessionStorage.getItem('rec_vacancy_meta')) {
        state.vacancyMeta = JSON.parse(sessionStorage.getItem('rec_vacancy_meta'));
      }
      if (state.candidatesList.length > 1) {
        showScreen('leaderboard');
      } else if (state.candidatesList.length === 1) {
        state.activeCandidateId = 0;
        showScreen('dashboard');
        renderDashboard();
        renderSidebarCandidates();
      }
    } catch (e) { sessionStorage.removeItem('rec_candidates'); }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/* ============================================================
   SCREEN ROUTING
   ============================================================ */
function showScreen(screen) {
  el.screenInput.style.display = screen === 'input' ? 'block' : 'none';
  el.screenLoading.style.display = screen === 'loading' ? 'block' : 'none';
  el.screenLeaderboard.style.display = screen === 'leaderboard' ? 'block' : 'none';
  el.screenDashboard.style.display = screen === 'dashboard' ? 'block' : 'none';
  // Header button visibility
  el.btnBackLeaderboard.style.display = screen === 'dashboard' && state.candidatesList.length > 1 ? 'inline-flex' : 'none';
  el.btnCompareTrigger.style.display = (screen === 'leaderboard' || screen === 'dashboard') && state.candidatesList.length > 1 ? 'inline-flex' : 'none';
  if (screen === 'leaderboard') { renderLeaderboard(); renderVacancyBar(); }
  if (screen === 'dashboard') { renderBreadcrumb(); }
}

/* ============================================================
   TEMPLATE MANAGEMENT
   ============================================================ */
function initTemplates() {
  el.templateBtnContainer.innerHTML = '';
  window.REC_TEMPLATES.forEach((tmpl, idx) => {
    const btn = document.createElement('button');
    btn.className = `btn ${idx === 0 ? 'btn-accent' : ''}`;
    const icon = tmpl.isBulk ? 'fa-users' : 'fa-code';
    btn.innerHTML = `<i class="fa-solid ${icon}"></i> ${tmpl.title}`;
    btn.addEventListener('click', () => {
      Array.from(el.templateBtnContainer.children).forEach(c => c.classList.remove('btn-accent'));
      btn.classList.add('btn-accent');
      loadTemplate(tmpl);
    });
    el.templateBtnContainer.appendChild(btn);
  });
  if (window.REC_TEMPLATES.length > 0) loadTemplate(window.REC_TEMPLATES[0]);
}

function loadTemplate(tmpl) {
  el.inputJd.value = tmpl.jobDescription.trim();
  // Fill vacancy details from template metadata
  if (el.inputJobTitle) el.inputJobTitle.value = tmpl.jobTitle || '';
  if (el.inputDepartment) el.inputDepartment.value = tmpl.department || 'Information Technology';
  if (el.inputLocation) el.inputLocation.value = tmpl.location || '';
  if (el.inputEmpType) el.inputEmpType.value = tmpl.employmentType || 'Full-Time';
  el.selectCandidateVariant.innerHTML = '';
  tmpl.candidates.forEach((cand, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = cand.name;
    el.selectCandidateVariant.appendChild(opt);
  });
  if (tmpl.candidates.length > 0) {
    el.inputResume.value = tmpl.candidates[0].resume.trim();
  }
  el.selectCandidateVariant.onchange = (e) => {
    const selectedIdx = e.target.value;
    if (tmpl.candidates[selectedIdx]) {
      el.inputResume.value = tmpl.candidates[selectedIdx].resume.trim();
    }
  };
  // Store template reference for bulk loading
  el.templateBtnContainer._currentTemplate = tmpl;
}

/* ============================================================
   WEIGHT SLIDERS (INPUT PAGE)
   ============================================================ */
function initWeightsSliders() {
  const ids = ['skills', 'certs', 'exp', 'edu', 'add', 'proj'];
  ids.forEach(id => {
    const slider = document.getElementById(`slider-w-${id}`);
    const valLabel = document.getElementById(`val-w-${id}`);
    const key = getWeightKey(id);
    slider.value = state.currentWeights[key];
    valLabel.textContent = `${slider.value}%`;
    slider.addEventListener('input', () => {
      valLabel.textContent = `${slider.value}%`;
      state.currentWeights[key] = parseInt(slider.value);
      validateWeights();
    });
  });
  validateWeights();
}

function getWeightKey(id) {
  const map = { skills: 'required_skills', certs: 'certifications', exp: 'experience', edu: 'education', add: 'additional_skills', proj: 'project_relevance' };
  return map[id];
}

function validateWeights() {
  const sum = Object.values(state.currentWeights).reduce((a, b) => a + b, 0);
  const sumLabel = document.getElementById('val-w-total');
  const summaryBox = document.getElementById('weight-summary-box');
  sumLabel.textContent = `${sum}%`;
  if (sum === 100) {
    summaryBox.className = 'weight-summary valid';
    summaryBox.innerHTML = `<span>Total Weights:</span> <strong style="color: var(--excellent);">${sum}% ✓</strong>`;
    el.btnRunAnalysis.disabled = false;
    el.btnRunBulk.disabled = false;
  } else {
    summaryBox.className = 'weight-summary invalid';
    summaryBox.innerHTML = `<span>Total Weights:</span> <strong style="color: var(--weak);">${sum}% (Must = 100%)</strong>`;
    el.btnRunAnalysis.disabled = true;
    el.btnRunBulk.disabled = true;
  }
}

/* ============================================================
   DRAG & DROP (SINGLE + BULK)
   ============================================================ */
function initDragAndDrop() {
  el.dropZone.addEventListener('click', (e) => { e.stopPropagation(); el.fileInput.value = ''; el.fileInput.click(); });
  el.fileInput.addEventListener('change', (e) => handleSingleFile(e.target.files[0]));
  el.dropZone.addEventListener('dragover', (e) => { e.preventDefault(); e.stopPropagation(); el.dropZone.classList.add('dragover'); });
  el.dropZone.addEventListener('dragleave', (e) => { e.stopPropagation(); el.dropZone.classList.remove('dragover'); });
  el.dropZone.addEventListener('drop', (e) => { e.preventDefault(); e.stopPropagation(); el.dropZone.classList.remove('dragover'); handleSingleFile(e.dataTransfer.files[0]); });
}

function initBulkDragAndDrop() {
  el.bulkDropZone.addEventListener('click', (e) => { e.stopPropagation(); el.bulkFileInput.value = ''; el.bulkFileInput.click(); });
  el.bulkFileInput.addEventListener('change', (e) => handleBulkFiles(e.target.files));
  el.bulkDropZone.addEventListener('dragover', (e) => { e.preventDefault(); e.stopPropagation(); el.bulkDropZone.classList.add('dragover'); });
  el.bulkDropZone.addEventListener('dragleave', (e) => { e.stopPropagation(); el.bulkDropZone.classList.remove('dragover'); });
  el.bulkDropZone.addEventListener('drop', (e) => { e.preventDefault(); e.stopPropagation(); el.bulkDropZone.classList.remove('dragover'); handleBulkFiles(e.dataTransfer.files); });
}

function handleSingleFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const content = e.target.result;
      if (file.name.endsWith('.json')) {
        const parsed = JSON.parse(content);
        el.inputResume.value = parsed.resume || parsed.candidate_resume || content;
      } else { el.inputResume.value = content; }
    } catch (err) { alert("Error reading file: " + err.message); }
  };
  reader.readAsText(file);
}

async function handleBulkFiles(fileList) {
  if (!fileList || fileList.length === 0) return;
  const resumeTexts = [];
  for (const file of fileList) {
    const text = await readFileAsync(file);
    resumeTexts.push(text);
  }
  el.inputResume.value = resumeTexts.join('\n===\n');
  el.bulkFileCount.textContent = `${fileList.length} files loaded — ready for bulk assessment`;
}

function readFileAsync(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsText(file);
  });
}

/* ============================================================
   EVENT LISTENERS
   ============================================================ */
function setupEventListeners() {
  el.btnRunAnalysis.addEventListener('click', runSingleAnalysis);
  el.btnRunBulk.addEventListener('click', runBulkAnalysis);
  el.btnNewAnalysis.addEventListener('click', () => showScreen('input'));
  el.btnBackLeaderboard.addEventListener('click', () => showScreen('leaderboard'));
  el.btnClearSession.addEventListener('click', clearSession);
  el.jsonHeader.addEventListener('click', () => {
    const isHidden = el.jsonContent.style.display === 'none';
    el.jsonContent.style.display = isHidden ? 'block' : 'none';
    el.jsonToggleIcon.innerHTML = isHidden ? '<i class="fa-solid fa-chevron-up"></i>' : '<i class="fa-solid fa-chevron-down"></i>';
  });
  el.btnExportPdf.addEventListener('click', () => window.print());
  el.btnExportJson.addEventListener('click', copyJsonToClipboard);
  el.btnCompareTrigger.addEventListener('click', openComparisonModal);
  el.btnCompareSidebar.addEventListener('click', openComparisonModal);
  el.btnCloseModal.addEventListener('click', () => { el.compareModal.style.display = 'none'; });
  window.addEventListener('click', (e) => { if (e.target === el.compareModal) el.compareModal.style.display = 'none'; });
  // Leaderboard filter buttons
  el.filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    state.leaderboardFilter = btn.dataset.filter;
    el.filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderLeaderboard();
  });
}

/* ============================================================
   SINGLE ANALYSIS WORKFLOW
   ============================================================ */
function runSingleAnalysis() {
  const weightSum = Object.values(state.currentWeights).reduce((a, b) => a + b, 0);
  if (weightSum !== 100) { alert(`Scoring weights must total exactly 100%. Current total: ${weightSum}%. Please adjust the sliders before running.`); return; }
  const jd = el.inputJd.value.trim();
  const resume = el.inputResume.value.trim();
  if (!jd || !resume) { alert("Please fill in both the Job Description and the Candidate Resume."); return; }
  captureVacancyMeta();
  // Check if resume contains delimiter — suggest bulk instead
  if (resume.includes('\n===\n') || resume.includes('\n===')) {
    const useBulk = confirm("It looks like your resume field contains multiple resumes separated by ===. Would you like to run a Bulk Assessment instead?");
    if (useBulk) { runBulkAnalysis(); return; }
  }
  showScreen('loading');
  el.batchProgressInfo.style.display = 'none';
  el.loadingTitle.textContent = 'Evaluating Candidate Suitability';
  const steps = [
    { p: 20, t: "Scanning resume structure and extracting data..." },
    { p: 50, t: "Matching skills, certifications, and experience..." },
    { p: 75, t: "Running fraud detection and verifying claims..." },
    { p: 90, t: "Calculating organizational benefit potential..." },
    { p: 100, t: "Assessment complete. Rendering report..." }
  ];
  let i = 0;
  const iv = setInterval(() => {
    if (i < steps.length) {
      el.loadingProgressBar.style.width = `${steps[i].p}%`;
      el.loadingStepText.textContent = steps[i].t;
      i++;
    } else {
      clearInterval(iv);
      const report = analyzeRecruitment(jd, resume, state.currentWeights);
      addCandidate(jd, resume, report);
      state.activeCandidateId = state.candidatesList.length - 1;
      saveSession();
      showScreen('dashboard');
      renderDashboard();
      renderSidebarCandidates();
    }
  }, 300);
}

/* ============================================================
   BULK ANALYSIS WORKFLOW
   ============================================================ */
function runBulkAnalysis() {
  const weightSum = Object.values(state.currentWeights).reduce((a, b) => a + b, 0);
  if (weightSum !== 100) { alert(`Scoring weights must total exactly 100%. Current total: ${weightSum}%. Please adjust the sliders before running.`); return; }
  const jd = el.inputJd.value.trim();
  if (!jd) { alert("Please fill in the Job Description."); return; }
  captureVacancyMeta();
  let resumeTexts = [];
  // Check for bulk template first
  const currentTmpl = el.templateBtnContainer._currentTemplate;
  if (currentTmpl && currentTmpl.isBulk) {
    resumeTexts = currentTmpl.candidates.map(c => c.resume.trim());
  }
  // If no bulk template or textarea has content, parse from textarea
  const textAreaContent = el.inputResume.value.trim();
  if (textAreaContent) {
    // Split by === delimiter
    const splits = textAreaContent.split(/\n\s*===\s*\n/);
    if (splits.length > 1) {
      resumeTexts = splits.map(s => s.trim()).filter(s => s.length > 20);
    } else if (resumeTexts.length === 0) {
      // No delimiter found and no bulk template — treat as single resume
      resumeTexts = [textAreaContent];
    }
  }
  if (resumeTexts.length === 0) { alert("No resumes found. Upload files, paste resumes separated by ===, or select a bulk template."); return; }
  // Clear previous session for fresh bulk analysis
  state.candidatesList = [];
  showScreen('loading');
  el.loadingTitle.textContent = `Processing ${resumeTexts.length} Candidate Resumes`;
  el.batchProgressInfo.style.display = 'flex';
  el.loadingProgressBar.style.width = '0%';
  let processed = 0;
  const total = resumeTexts.length;
  function processNext() {
    if (processed >= total) {
      saveSession();
      el.loadingProgressBar.style.width = '100%';
      el.loadingStepText.textContent = 'All candidates assessed. Building leaderboard...';
      el.batchNameText.textContent = 'Complete!';
      setTimeout(() => showScreen('leaderboard'), 400);
      return;
    }
    const resume = resumeTexts[processed];
    const report = analyzeRecruitment(jd, resume, state.currentWeights);
    addCandidate(jd, resume, report);
    processed++;
    const pct = Math.round((processed / total) * 100);
    el.loadingProgressBar.style.width = `${pct}%`;
    el.batchCounterText.textContent = `Processing ${processed} / ${total}`;
    el.batchNameText.textContent = report.candidate_name;
    el.loadingStepText.textContent = `Analyzing: ${report.candidate_name}...`;
    setTimeout(processNext, 120);
  }
  processNext();
}

function addCandidate(jd, resume, report) {
  state.candidatesList.push({
    id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
    name: report.candidate_name,
    jd, resume, report,
    weights: { ...state.currentWeights }
  });
}

function saveSession() {
  sessionStorage.setItem('rec_candidates', JSON.stringify(state.candidatesList));
  sessionStorage.setItem('rec_vacancy_meta', JSON.stringify(state.vacancyMeta));
}

function clearSession() {
  if (confirm("Clear all candidate profiles in this session?")) {
    state.candidatesList = [];
    state.activeCandidateId = null;
    state.vacancyMeta = { title: '', department: '', location: '', type: '', date: '' };
    sessionStorage.removeItem('rec_candidates');
    sessionStorage.removeItem('rec_vacancy_meta');
    showScreen('input');
  }
}

/* ============================================================
   VACANCY METADATA CAPTURE & RENDERING
   ============================================================ */
function captureVacancyMeta() {
  state.vacancyMeta = {
    title: el.inputJobTitle?.value?.trim() || 'Untitled Vacancy',
    department: el.inputDepartment?.value || 'General',
    location: el.inputLocation?.value?.trim() || 'Not Specified',
    type: el.inputEmpType?.value || 'Full-Time',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
}

function renderVacancyBar() {
  if (!el.vacancyInfoBar) return;
  const vm = state.vacancyMeta;
  if (!vm.title) { el.vacancyInfoBar.style.display = 'none'; return; }
  el.vacancyInfoBar.style.display = 'flex';
  if (el.vacancyBarTitle) el.vacancyBarTitle.textContent = vm.title;
  if (el.vacancyBarDept) el.vacancyBarDept.textContent = vm.department;
  if (el.vacancyBarLocation) el.vacancyBarLocation.textContent = vm.location;
  if (el.vacancyBarType) el.vacancyBarType.textContent = vm.type;
  if (el.vacancyBarDate) el.vacancyBarDate.textContent = vm.date || 'Today';
  if (el.vacancyBarApplicants) el.vacancyBarApplicants.textContent = state.candidatesList.length;
}

function renderBreadcrumb() {
  if (!el.breadcrumbBar) return;
  const cand = state.candidatesList[state.activeCandidateId];
  if (el.breadcrumbCandidateName) {
    el.breadcrumbCandidateName.textContent = cand ? cand.name : 'Candidate';
  }
  if (el.breadcrumbLeaderboard) {
    el.breadcrumbLeaderboard.onclick = () => {
      if (state.candidatesList.length > 1) showScreen('leaderboard');
      else showScreen('input');
    };
  }
}

function getAvatarInitials(name) {
  if (!name) return '??';
  const parts = name.replace(/\(.*\)/g, '').trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
}

function getAvatarColor(name) {
  const colors = [
    'linear-gradient(135deg, #6366f1, #818cf8)', 'linear-gradient(135deg, #a855f7, #c084fc)',
    'linear-gradient(135deg, #06b6d4, #22d3ee)', 'linear-gradient(135deg, #10b981, #34d399)',
    'linear-gradient(135deg, #f59e0b, #fbbf24)', 'linear-gradient(135deg, #ef4444, #f87171)',
    'linear-gradient(135deg, #ec4899, #f472b6)', 'linear-gradient(135deg, #8b5cf6, #a78bfa)'
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function animateCounter(element, target, duration = 800) {
  if (!element) return;
  let start = 0;
  const startTime = performance.now();
  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function generateParticles() {
  if (!el.particlesBg) return;
  el.particlesBg.innerHTML = '';
  const count = 25;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;
    p.style.animationDelay = `${Math.random() * 20}s`;
    p.style.animationDuration = `${15 + Math.random() * 20}s`;
    el.particlesBg.appendChild(p);
  }
}

/* ============================================================
   LEADERBOARD RENDERING
   ============================================================ */
function renderLeaderboard() {
  const list = state.candidatesList;
  if (list.length === 0) return;
  // Stats
  const avg = Math.round(list.reduce((s, c) => s + c.report.overall_score, 0) / list.length);
  const flagged = list.filter(c => c.report.fraud_detection && c.report.fraud_detection.fraud_risk_level !== 'Low').length;
  
  animateCounter(el.lbTotalCount, list.length);
  animateCounter(el.lbAvgScore, avg);
  animateCounter(el.lbFlaggedCount, flagged);
  
  // Sort
  const sorted = [...list].sort((a, b) => {
    const sk = state.leaderboardSort.key;
    let va, vb;
    if (sk === 'score') { va = a.report.overall_score; vb = b.report.overall_score; }
    else if (sk === 'name') { va = a.name.toLowerCase(); vb = b.name.toLowerCase(); }
    else if (sk === 'fraud') { va = a.report.fraud_detection?.verification_score || 100; vb = b.report.fraud_detection?.verification_score || 100; }
    else if (sk === 'benefit') { va = a.report.organizational_benefit?.score || 0; vb = b.report.organizational_benefit?.score || 0; }
    else { va = a.report.overall_score; vb = b.report.overall_score; }
    if (typeof va === 'string') return state.leaderboardSort.dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    return state.leaderboardSort.dir === 'asc' ? va - vb : vb - va;
  });
  // Filter
  let filtered = sorted;
  const f = state.leaderboardFilter;
  if (f === 'excellent') filtered = sorted.filter(c => c.report.candidate_category === 'Excellent');
  else if (f === 'strong') filtered = sorted.filter(c => c.report.candidate_category === 'Strong');
  else if (f === 'moderate') filtered = sorted.filter(c => c.report.candidate_category === 'Moderate');
  else if (f === 'weak') filtered = sorted.filter(c => c.report.candidate_category === 'Weak');
  else if (f === 'flagged') filtered = sorted.filter(c => c.report.fraud_detection && c.report.fraud_detection.fraud_risk_level !== 'Low');
  // Top pick
  const topPick = sorted[0];
  if (topPick) {
    el.topPickCard.style.display = 'flex';
    el.topPickName.textContent = topPick.name;
    el.topPickScore.textContent = topPick.report.overall_score;
    el.topPickSummary.textContent = `Out of ${list.length} applicants, ${topPick.name} is the strongest match with a ${topPick.report.overall_score}% suitability score (${topPick.report.candidate_category}). ${topPick.report.fraud_detection && topPick.report.fraud_detection.fraud_risk_level !== 'Low' ? '⚠️ Note: This candidate has verification flags.' : 'No verification concerns detected.'}`;
  }
  // Render table rows
  el.leaderboardTbody.innerHTML = '';
  filtered.forEach((cand, idx) => {
    const globalIdx = state.candidatesList.indexOf(cand);
    const rank = sorted.indexOf(cand) + 1;
    const r = cand.report;
    const cat = r.candidate_category.toLowerCase();
    const fraudData = r.fraud_detection || { verification_score: 100, fraud_risk_level: 'Low', flags: [] };
    const orgData = r.organizational_benefit || { score: 0 };
    const talentCount = (r.hidden_talent_detection?.detected_skills || []).filter(s => s !== 'None').length;
    const tr = document.createElement('tr');
    if (rank === 1) tr.classList.add('top-pick');
    if (fraudData.fraud_risk_level === 'High') tr.classList.add('flagged');
    // Rank badge
    let rankClass = 'rank-other';
    if (rank === 1) rankClass = 'rank-1';
    else if (rank === 2) rankClass = 'rank-2';
    else if (rank === 3) rankClass = 'rank-3';
    // Category color
    let catColor = 'var(--weak)';
    if (cat === 'excellent') catColor = 'var(--excellent)';
    else if (cat === 'strong') catColor = 'var(--strong)';
    else if (cat === 'moderate') catColor = 'var(--moderate)';
    // Fraud color
    let fraudColor = 'var(--excellent)';
    if (fraudData.fraud_risk_level === 'High') fraudColor = 'var(--weak)';
    else if (fraudData.fraud_risk_level === 'Medium') fraudColor = 'var(--moderate)';
    
    const initials = getAvatarInitials(cand.name);
    const avatarBg = getAvatarColor(cand.name);

    tr.innerHTML = `
      <td><span class="rank-badge ${rankClass}">${rank}</span></td>
      <td>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <span class="avatar-circle" style="background: ${avatarBg};">${initials}</span>
          <strong style="color: #fff;">${cand.name}</strong>
        </div>
      </td>
      <td>
        <span style="font-weight: 800; font-size: 1rem; color: ${catColor};">${r.overall_score}</span>
        <div style="width: 80px; height: 4px; background: var(--bg-tertiary); border-radius: 2px; margin-top: 4px;">
          <div style="width: ${r.overall_score}%; height: 100%; background: ${catColor}; border-radius: 2px;"></div>
        </div>
      </td>
      <td><span style="color: ${catColor}; font-weight: 600; font-size: 0.8rem; text-transform: uppercase;">${r.candidate_category}</span></td>
      <td>
        <span style="font-weight: 700; color: ${fraudColor};">${fraudData.verification_score}/100</span>
        ${fraudData.fraud_risk_level !== 'Low' ? `<span class="risk-level-badge level-${fraudData.fraud_risk_level.toLowerCase()}" style="margin-left: 0.3rem; font-size: 0.65rem;">${fraudData.fraud_risk_level}</span>` : ''}
      </td>
      <td>${talentCount > 0 ? `<span style="color: var(--secondary); font-weight: 600;">${talentCount} found</span>` : '<span style="color: var(--text-dim);">None</span>'}</td>
      <td><span style="font-weight: 700; color: var(--accent);">${orgData.score}/100</span></td>
      <td><button class="btn" style="font-size: 0.75rem; padding: 0.3rem 0.6rem;" data-idx="${globalIdx}"><i class="fa-solid fa-eye"></i> View</button></td>
    `;
    tr.querySelector('button').addEventListener('click', (e) => {
      e.stopPropagation();
      viewCandidate(globalIdx);
    });
    tr.addEventListener('click', () => viewCandidate(globalIdx));
    el.leaderboardTbody.appendChild(tr);
  });
  // Column sorting
  document.querySelectorAll('.leaderboard-table th[data-sort]').forEach(th => {
    th.onclick = () => {
      const sortKey = th.dataset.sort;
      if (state.leaderboardSort.key === sortKey) {
        state.leaderboardSort.dir = state.leaderboardSort.dir === 'desc' ? 'asc' : 'desc';
      } else {
        state.leaderboardSort.key = sortKey;
        state.leaderboardSort.dir = 'desc';
      }
      renderLeaderboard();
    };
  });
}

function viewCandidate(idx) {
  state.activeCandidateId = idx;
  showScreen('dashboard');
  renderDashboard();
  renderSidebarCandidates();
}

/* ============================================================
   SIDEBAR CANDIDATES LIST
   ============================================================ */
function renderSidebarCandidates() {
  el.sidebarCandidatesContainer.innerHTML = '';
  state.candidatesList.forEach((cand, idx) => {
    const item = document.createElement('div');
    item.className = `candidate-item ${idx === state.activeCandidateId ? 'active' : ''}`;
    const cb = document.createElement('input');
    cb.type = 'checkbox'; cb.value = cand.id; cb.className = 'candidate-compare-checkbox'; cb.style.cursor = 'pointer';
    cb.onclick = (e) => e.stopPropagation();
    const info = document.createElement('div');
    info.className = 'candidate-item-info';
    info.innerHTML = `<div class="candidate-item-name">${cand.name}</div><div class="candidate-item-sub">Score</div>`;
    const cat = cand.report.candidate_category.toLowerCase();
    const badge = document.createElement('div');
    badge.className = `candidate-item-score cat-${cat}`;
    badge.textContent = cand.report.overall_score;
    const clickArea = document.createElement('div');
    clickArea.style.cssText = 'display:flex;flex:1;align-items:center;justify-content:space-between;overflow:hidden;gap:0.5rem;cursor:pointer;';
    clickArea.appendChild(info);
    clickArea.appendChild(badge);
    clickArea.addEventListener('click', () => { state.activeCandidateId = idx; renderDashboard(); renderSidebarCandidates(); });
    item.appendChild(cb);
    item.appendChild(clickArea);
    el.sidebarCandidatesContainer.appendChild(item);
  });
}

/* ============================================================
   MAIN DASHBOARD RENDERING
   ============================================================ */
function renderDashboard() {
  const cand = state.candidatesList[state.activeCandidateId];
  if (!cand) return;
  const r = cand.report;
  // Hero scores
  el.scoreVal.textContent = r.overall_score;
  el.categoryBadge.textContent = r.candidate_category;
  el.categoryBadge.className = `score-badge cat-${r.candidate_category.toLowerCase()}`;
  el.rankPct.textContent = r.ranking_percentage;
  const offset = 377 - (377 * (r.overall_score / 100));
  el.scoreRadialFill.style.strokeDashoffset = offset;
  let strokeColor = 'var(--primary)';
  if (r.overall_score >= 90) strokeColor = 'var(--excellent)';
  else if (r.overall_score >= 75) strokeColor = 'var(--strong)';
  else if (r.overall_score >= 60) strokeColor = 'var(--moderate)';
  else strokeColor = 'var(--weak)';
  el.scoreRadialFill.style.stroke = strokeColor;
  el.recruiterSummary.textContent = r.recruiter_summary;
  // Score breakdown
  renderScoreBars(r.score_breakdown);
  renderDashboardWeightsSliders(cand);
  // Mini gauges
  setMiniGauge('agility', r.learning_agility.score); el.gaugeDescAgility.textContent = r.learning_agility.reason;
  setMiniGauge('uniqueness', r.candidate_uniqueness.score); el.gaugeDescUniqueness.textContent = r.candidate_uniqueness.reason;
  // Explainable AI
  el.explainableContainer.innerHTML = '';
  r.explainable_ranking.forEach(insight => {
    let icon = 'fa-circle-info', cls = 'info';
    if (insight.includes('matched:') || insight.includes('found:') || insight.includes('met:')) { icon = 'fa-circle-check'; cls = 'success'; }
    else if (insight.includes('gap') || insight.includes('No core') || insight.includes('No prof')) { icon = 'fa-triangle-exclamation'; cls = 'warning'; }
    const div = document.createElement('div'); div.className = 'explain-item';
    div.innerHTML = `<span class="explain-icon ${cls}"><i class="fa-solid ${icon}"></i></span><span>${insight}</span>`;
    el.explainableContainer.appendChild(div);
  });
  // Certs
  el.certCredibility.textContent = r.certificate_quality_analysis.credibility_rating;
  el.certScore.textContent = `${r.certificate_quality_analysis.certificate_score}/100`;
  el.certsTbody.innerHTML = '';
  const rCerts = r.certificate_quality_analysis.recognized_certifications;
  if (rCerts.length > 0) {
    rCerts.forEach(cs => {
      const parts = cs.match(/([^:]+):\s*([^(]+)\s*\(([^)]+)\)/);
      if (parts) {
        const tr = document.createElement('tr');
        const lvl = parts[3].toLowerCase().includes('high') ? 'high' : 'medium';
        tr.innerHTML = `<td><strong>${parts[1].trim()}</strong></td><td>${parts[2].trim()}</td><td><span class="cred-badge ${lvl}">${parts[3].trim()}</span></td>`;
        el.certsTbody.appendChild(tr);
      }
    });
  } else {
    el.certsTbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:var(--text-dim);">No recognized certifications detected.</td></tr>';
  }
  // 🔍 FRAUD DETECTION
  renderFraudSection(r.fraud_detection);
  // Hidden talents
  el.talentsBadges.innerHTML = '';
  const talents = r.hidden_talent_detection.detected_skills;
  if (talents.length > 0 && talents[0] !== 'None') {
    talents.forEach(sk => {
      const b = document.createElement('span'); b.className = 'skill-badge skill-badge-talent';
      b.innerHTML = `<i class="fa-solid fa-sparkles"></i> ${sk}`; el.talentsBadges.appendChild(b);
    });
  } else { el.talentsBadges.innerHTML = '<span style="font-size:0.8rem;color:var(--text-dim);">None identified</span>'; }
  el.talentsInsight.textContent = r.hidden_talent_detection.insight;
  // Skill gaps
  el.gapsBadges.innerHTML = '';
  const gaps = r.skill_gap_analysis.missing_skills;
  if (gaps.length > 0 && gaps[0] !== 'None identified') {
    gaps.forEach(sk => { const b = document.createElement('span'); b.className = 'skill-badge skill-badge-gap'; b.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> ${sk}`; el.gapsBadges.appendChild(b); });
  } else { el.gapsBadges.innerHTML = '<span class="skill-badge" style="background:rgba(16,185,129,0.08);color:#a7f3d0;border-color:rgba(16,185,129,0.2);"><i class="fa-solid fa-circle-check"></i> Zero Gaps</span>'; }
  el.learningPath.innerHTML = '';
  (r.skill_gap_analysis.recommended_courses || []).forEach(course => {
    const d = document.createElement('div'); d.className = 'learning-path-item';
    d.innerHTML = `<i class="fa-solid fa-circle-play"></i> <span>${course}</span>`; el.learningPath.appendChild(d);
  });
  // 💎 ORG BENEFIT
  renderOrgBenefit(r.organizational_benefit);
  // Projects
  el.projectsContainer.innerHTML = '';
  (r.project_analysis || []).forEach(proj => {
    const card = document.createElement('div'); card.className = 'project-card';
    const techBadges = proj.matching_technologies.map(t => `<span class="project-tech-badge">${t}</span>`).join('');
    let sc = 'var(--text-muted)';
    if (proj.relevance_score >= 80) sc = 'var(--excellent)';
    else if (proj.relevance_score >= 60) sc = 'var(--moderate)';
    card.innerHTML = `
      <div class="project-header"><span class="project-name">${proj.project_name}</span><span class="project-score" style="color:${sc};background:rgba(255,255,255,0.03);">${proj.relevance_score}%</span></div>
      <div class="project-tech">${techBadges}</div>
      <div class="project-impact"><strong style="font-size:0.75rem;color:var(--accent);display:block;margin-bottom:0.15rem;text-transform:uppercase;">Business Impact</strong>${proj.business_impact}</div>`;
    el.projectsContainer.appendChild(card);
  });
  // Hiring Risk
  const risk = r.hiring_risk;
  el.riskLevel.textContent = `${risk.level} Risk`;
  el.riskLevel.className = `risk-level-badge level-${risk.level.toLowerCase()}`;
  el.riskCard.style.borderColor = risk.level === 'High' ? 'rgba(239,68,68,0.3)' : risk.level === 'Medium' ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.06)';
  el.riskReasons.innerHTML = '';
  risk.reasons.forEach(reason => { const li = document.createElement('li'); li.className = 'risk-reason-item'; li.textContent = reason; el.riskReasons.appendChild(li); });
  // Interview Questions
  renderInterviewQuestions(r.interview_questions);
  // Raw JSON
  el.rawJson.textContent = JSON.stringify(r, null, 2);
}

/* ============================================================
   FRAUD DETECTION RENDERING
   ============================================================ */
function renderFraudSection(fraud) {
  if (!fraud) {
    el.fraudVerificationScore.textContent = '—';
    el.fraudRiskBadge.textContent = 'N/A';
    el.fraudFlagsContainer.innerHTML = '<div class="no-fraud-message"><i class="fa-solid fa-circle-info"></i> Fraud detection data unavailable.</div>';
    return;
  }
  el.fraudVerificationScore.textContent = fraud.verification_score;
  let scoreColor = 'var(--excellent)';
  if (fraud.fraud_risk_level === 'High') scoreColor = 'var(--weak)';
  else if (fraud.fraud_risk_level === 'Medium') scoreColor = 'var(--moderate)';
  el.fraudVerificationScore.style.color = scoreColor;
  el.fraudRiskBadge.textContent = `${fraud.fraud_risk_level} Risk`;
  el.fraudRiskBadge.className = `risk-level-badge level-${fraud.fraud_risk_level.toLowerCase()}`;
  el.fraudFlagsContainer.innerHTML = '';
  if (fraud.flags.length === 0) {
    el.fraudFlagsContainer.innerHTML = '<div class="no-fraud-message"><i class="fa-solid fa-circle-check"></i> No fraudulent indicators detected. Resume appears authentic.</div>';
    return;
  }
  fraud.flags.forEach(flag => {
    const typeIcons = {
      timeline_mismatch: 'fa-calendar-xmark', skill_project_gap: 'fa-puzzle-piece',
      buzzword_stuffing: 'fa-comment-slash', inflated_metrics: 'fa-chart-line',
      missing_identity: 'fa-user-slash', unverifiable_certs: 'fa-certificate'
    };
    const div = document.createElement('div');
    div.className = `fraud-flag-item severity-${flag.severity}`;
    div.innerHTML = `
      <span class="fraud-flag-icon"><i class="fa-solid ${typeIcons[flag.type] || 'fa-flag'}"></i></span>
      <div>
        <strong style="text-transform:capitalize;font-size:0.8rem;">${flag.type.replace(/_/g, ' ')}</strong>
        <div style="margin-top:0.15rem;">${flag.detail}</div>
      </div>`;
    el.fraudFlagsContainer.appendChild(div);
  });
}

/* ============================================================
   ORG BENEFIT RENDERING
   ============================================================ */
function renderOrgBenefit(org) {
  if (!org) {
    el.orgCrossVal.textContent = '—'; el.orgCostVal.textContent = '—';
    el.orgMentorVal.textContent = '—'; el.orgInnovateVal.textContent = '—';
    el.orgBenefitSummary.textContent = 'Organizational benefit data unavailable.';
    return;
  }
  el.orgCrossVal.textContent = `${org.cross_functional_value}/100`;
  el.orgCostVal.textContent = `${org.cost_savings_potential}/100`;
  el.orgMentorVal.textContent = `${org.mentoring_ability}/100`;
  el.orgInnovateVal.textContent = `${org.innovation_potential}/100`;
  el.orgBenefitSummary.textContent = org.summary;
}

/* ============================================================
   HELPER RENDERERS
   ============================================================ */
function renderScoreBars(breakdown) {
  el.barsContainer.innerHTML = '';
  const labels = {
    required_skills: { name: 'Required Skills Match', icon: 'fa-code' },
    certifications: { name: 'Certifications Value', icon: 'fa-certificate' },
    experience: { name: 'Experience Alignment', icon: 'fa-briefcase' },
    education: { name: 'Education Level', icon: 'fa-graduation-cap' },
    additional_skills: { name: 'Additional Skills', icon: 'fa-sparkles' },
    project_relevance: { name: 'Project Relevance', icon: 'fa-diagram-project' }
  };
  for (const [key, val] of Object.entries(breakdown)) {
    const item = document.createElement('div'); item.className = 'bar-item';
    item.innerHTML = `
      <div class="bar-label-row"><span class="bar-label-name"><i class="fa-solid ${labels[key]?.icon || 'fa-chart-bar'}"></i> ${labels[key]?.name || key}</span><span class="bar-label-val">${val}/100</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:0%;"></div></div>`;
    el.barsContainer.appendChild(item);
    setTimeout(() => { const fill = item.querySelector('.bar-fill'); if (fill) fill.style.width = `${val}%`; }, 50);
  }
}

function setMiniGauge(type, val) {
  const fill = type === 'agility' ? el.gaugeFillAgility : el.gaugeFillUniqueness;
  const num = type === 'agility' ? el.gaugeValAgility : el.gaugeValUniqueness;
  num.textContent = val;
  fill.style.strokeDashoffset = 188 - (188 * (val / 100));
}

function renderInterviewQuestions(questions) {
  el.interviewContainer.innerHTML = '';
  const categories = [
    { key: 'technical', title: 'Technical Focus', icon: 'fa-terminal' },
    { key: 'project_based', title: 'Project Experience', icon: 'fa-diagram-project' },
    { key: 'behavioral', title: 'Behavioral & Adaptability', icon: 'fa-people-group' },
    { key: 'certification_based', title: 'Certification Validation', icon: 'fa-award' }
  ];
  categories.forEach((cat, idx) => {
    const list = questions[cat.key] || [];
    if (!list.length) return;
    const acc = document.createElement('div'); acc.className = `accordion ${idx === 0 ? 'active' : ''}`;
    const header = document.createElement('button'); header.className = 'accordion-header';
    header.innerHTML = `<span><i class="fa-solid ${cat.icon}" style="margin-right:0.5rem;color:var(--primary);"></i> ${cat.title} (${list.length})</span><span class="icon"><i class="fa-solid ${idx === 0 ? 'fa-chevron-up' : 'fa-chevron-down'}"></i></span>`;
    const content = document.createElement('div'); content.className = 'accordion-content';
    const qList = document.createElement('div'); qList.className = 'question-list';
    list.forEach(qText => {
      const qItem = document.createElement('div'); qItem.className = 'question-item';
      const textSpan = document.createElement('span'); textSpan.className = 'question-text'; textSpan.textContent = qText;
      const copyBtn = document.createElement('button'); copyBtn.className = 'btn-icon'; copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i>';
      copyBtn.addEventListener('click', () => { navigator.clipboard.writeText(qText); copyBtn.innerHTML = '<i class="fa-solid fa-check" style="color:var(--excellent);"></i>'; setTimeout(() => copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i>', 1500); });
      qItem.appendChild(textSpan); qItem.appendChild(copyBtn); qList.appendChild(qItem);
    });
    content.appendChild(qList); acc.appendChild(header); acc.appendChild(content);
    header.addEventListener('click', () => {
      const isActive = acc.classList.contains('active');
      el.interviewContainer.querySelectorAll('.accordion').forEach(a => { a.classList.remove('active'); a.querySelector('.icon').innerHTML = '<i class="fa-solid fa-chevron-down"></i>'; });
      if (!isActive) { acc.classList.add('active'); header.querySelector('.icon').innerHTML = '<i class="fa-solid fa-chevron-up"></i>'; }
    });
    el.interviewContainer.appendChild(acc);
  });
}

/* ============================================================
   DASHBOARD REAL-TIME WEIGHT SLIDERS
   ============================================================ */
function renderDashboardWeightsSliders(activeCand) {
  el.dashboardSlidersContainer.innerHTML = '';
  const labels = { required_skills: 'Skills', certifications: 'Certs', experience: 'Exp', education: 'Edu', additional_skills: 'Add.', project_relevance: 'Projects' };
  const w = activeCand.weights;
  for (const [key, val] of Object.entries(w)) {
    const item = document.createElement('div'); item.className = 'slider-item';
    item.innerHTML = `<div class="slider-header" style="font-size:0.75rem;"><span>${labels[key]||key}</span><span class="val" style="color:var(--primary);">${val}%</span></div><input type="range" class="slider-input" min="0" max="100" value="${val}" style="height:4px;">`;
    const slider = item.querySelector('.slider-input');
    const valLabel = item.querySelector('.val');
    slider.addEventListener('input', (e) => {
      const nv = parseInt(e.target.value);
      valLabel.textContent = `${nv}%`;
      w[key] = nv;
      // Validate total weights before recalculating
      const dashTotal = Object.values(w).reduce((a, b) => a + b, 0);
      const dashStatus = el.dashboardSlidersContainer.parentElement.querySelector('.dash-weight-status');
      if (dashStatus) dashStatus.remove();
      const statusEl = document.createElement('div');
      statusEl.className = 'dash-weight-status';
      if (dashTotal !== 100) {
        statusEl.innerHTML = `<span style="color:var(--weak);font-size:0.75rem;font-weight:600;padding:0.4rem 0.6rem;display:block;text-align:center;background:rgba(239,68,68,0.08);border-radius:6px;margin-top:0.5rem;">⚠ Total: ${dashTotal}% (Must = 100%)</span>`;
        el.dashboardSlidersContainer.parentElement.appendChild(statusEl);
        return; // Don't recalculate with invalid weights
      }
      statusEl.innerHTML = `<span style="color:var(--excellent);font-size:0.75rem;font-weight:600;padding:0.4rem 0.6rem;display:block;text-align:center;background:rgba(16,185,129,0.08);border-radius:6px;margin-top:0.5rem;">✓ Total: 100%</span>`;
      el.dashboardSlidersContainer.parentElement.appendChild(statusEl);
      const nr = analyzeRecruitment(activeCand.jd, activeCand.resume, w);
      activeCand.report = nr;
      state.candidatesList[state.activeCandidateId] = activeCand;
      saveSession();
      el.scoreVal.textContent = nr.overall_score;
      el.categoryBadge.textContent = nr.candidate_category;
      el.categoryBadge.className = `score-badge cat-${nr.candidate_category.toLowerCase()}`;
      el.rankPct.textContent = nr.ranking_percentage;
      const newOffset = 377 - (377 * (nr.overall_score / 100));
      el.scoreRadialFill.style.strokeDashoffset = newOffset;
      let ns = 'var(--primary)';
      if (nr.overall_score >= 90) ns = 'var(--excellent)'; else if (nr.overall_score >= 75) ns = 'var(--strong)'; else if (nr.overall_score >= 60) ns = 'var(--moderate)'; else ns = 'var(--weak)';
      el.scoreRadialFill.style.stroke = ns;
      updateBars(nr.score_breakdown);
      renderSidebarCandidates();
      el.rawJson.textContent = JSON.stringify(nr, null, 2);
    });
    el.dashboardSlidersContainer.appendChild(item);
  }
}

function updateBars(breakdown) {
  const bars = el.barsContainer.querySelectorAll('.bar-item');
  const keys = Object.keys(breakdown);
  bars.forEach((b, i) => {
    const key = keys[i];
    if (key !== undefined) {
      const val = breakdown[key];
      const vt = b.querySelector('.bar-label-val'); if (vt) vt.textContent = `${val}/100`;
      const fill = b.querySelector('.bar-fill'); if (fill) fill.style.width = `${val}%`;
    }
  });
}

/* ============================================================
   COPY JSON & COMPARISON MODAL
   ============================================================ */
function copyJsonToClipboard() {
  const cand = state.candidatesList[state.activeCandidateId];
  if (!cand) return;
  navigator.clipboard.writeText(JSON.stringify(cand.report, null, 2)).then(() => {
    el.btnExportJson.innerHTML = '<i class="fa-solid fa-check" style="color:var(--excellent);"></i> Copied!';
    setTimeout(() => { el.btnExportJson.innerHTML = '<i class="fa-solid fa-copy"></i> Copy Raw JSON'; }, 2000);
  });
}

function openComparisonModal() {
  const cbs = document.querySelectorAll('.candidate-compare-checkbox:checked');
  const ids = Array.from(cbs).map(cb => cb.value);
  let compareCandidates = ids.length > 0 ? state.candidatesList.filter(c => ids.includes(c.id)) : [...state.candidatesList];
  if (compareCandidates.length === 0) { alert("No profiles to compare."); return; }
  el.compareTableHead.innerHTML = '<th>Criteria</th>';
  compareCandidates.forEach(c => {
    const th = document.createElement('th');
    th.innerHTML = `<div style="font-weight:700;color:#fff;">${c.name}</div><div style="font-size:0.75rem;color:var(--text-muted);font-weight:normal;">Score: ${c.report.overall_score}/100</div>`;
    el.compareTableHead.appendChild(th);
  });
  el.compareTableBody.innerHTML = '';
  const metrics = [
    { name: 'Overall Score', get: r => r.overall_score, fmt: 'bar' },
    { name: 'Category', get: r => r.candidate_category, fmt: 'cat' },
    { name: 'Skills Match', get: r => r.score_breakdown.required_skills, fmt: 'num' },
    { name: 'Certifications', get: r => r.score_breakdown.certifications, fmt: 'num' },
    { name: 'Experience', get: r => r.score_breakdown.experience, fmt: 'num' },
    { name: 'Verification Score', get: r => r.fraud_detection?.verification_score || 100, fmt: 'num' },
    { name: 'Fraud Risk', get: r => r.fraud_detection?.fraud_risk_level || 'Low', fmt: 'risk' },
    { name: 'Org Benefit', get: r => r.organizational_benefit?.score || 0, fmt: 'num' },
    { name: 'Uniqueness', get: r => r.candidate_uniqueness.score, fmt: 'num' },
    { name: 'Learning Agility', get: r => r.learning_agility.score, fmt: 'num' }
  ];
  metrics.forEach(m => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td style="font-weight:500;font-size:0.85rem;color:var(--text-muted);"><i class="fa-solid fa-angle-right" style="margin-right:0.4rem;font-size:0.7rem;color:var(--primary);"></i> ${m.name}</td>`;
    compareCandidates.forEach(c => {
      const td = document.createElement('td');
      const val = m.get(c.report);
      if (m.fmt === 'bar') {
        let color = val >= 90 ? 'var(--excellent)' : val >= 75 ? 'var(--strong)' : val >= 60 ? 'var(--moderate)' : 'var(--weak)';
        td.innerHTML = `<div style="font-weight:700;font-size:1rem;color:${color};">${val}%</div><div class="comparison-progress-bar"><div class="comparison-progress-fill" style="width:${val}%;background-color:${color};"></div></div>`;
      } else if (m.fmt === 'cat') {
        let color = val === 'Excellent' ? 'var(--excellent)' : val === 'Strong' ? 'var(--strong)' : val === 'Moderate' ? 'var(--moderate)' : 'var(--weak)';
        td.innerHTML = `<span style="font-weight:700;color:${color};font-size:0.85rem;text-transform:uppercase;">${val}</span>`;
      } else if (m.fmt === 'risk') {
        let color = val === 'High' ? 'var(--weak)' : val === 'Medium' ? 'var(--moderate)' : 'var(--excellent)';
        td.innerHTML = `<span style="font-weight:600;color:${color};">${val}</span>`;
      } else {
        td.innerHTML = `<span style="font-weight:600;font-size:0.85rem;color:var(--accent);">${val}/100</span>`;
      }
      tr.appendChild(td);
    });
    el.compareTableBody.appendChild(tr);
  });
  el.compareModal.style.display = 'flex';
}
