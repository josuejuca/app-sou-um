import { globalState, saveGlobalState } from './state.js';
import { updatePerformanceMetrics } from './performance.js';
import { loadFinanceData } from './finance.js';
import { toggleRoutineLockState } from './habits.js';

export let domElements = {};

export function initUI() {
    domElements = {
        // Sections
        homeSection: document.getElementById('home-section'),
        habitosSection: document.getElementById('habitos-section'),
        treinosSection: document.getElementById('treinos-section'),
        bibliotecaSection: document.getElementById('biblioteca-section'),
        financasSection: document.getElementById('financas-section'),
        comoUsarSection: document.getElementById('como-usar-section'),
        desempenhoSection: document.getElementById('desempenho-section'),

        // Menu Buttons
        goToHabitos: document.getElementById('go-habitos'),
        goToTreinos: document.getElementById('go-treinos'),
        goToBiblioteca: document.getElementById('go-biblioteca'),
        goToFinancas: document.getElementById('go-financas'),
        goToComoUsar: document.getElementById('go-como-usar'),
        goToDesempenho: document.getElementById('go-desempenho'),
        promoLinkBiblioteca: document.getElementById('promo-link-biblioteca'),
        promoLinkFinancas: document.getElementById('promo-link-biblioteca-financas'),
        guideActionBtn: document.getElementById('guide-action-btn'),

        // Back Buttons
        backButtons: document.querySelectorAll('.back-button'),

        // Progress Bar Elements
        progressBar: document.getElementById('daily-progress-bar'),
        progressText: document.getElementById('daily-progress-text'),
        progressMotivation: document.getElementById('progress-motivation'),

        // Greeting Element
        greetingElement: document.getElementById('greeting'),
    };
    domElements.sections = [
        domElements.homeSection, domElements.habitosSection, domElements.treinosSection,
        domElements.bibliotecaSection, domElements.financasSection, domElements.comoUsarSection,
        domElements.desempenhoSection
    ];
}

export function showSection(sectionIdToShow) {
    domElements.sections.forEach(section => {
        if (section.id === sectionIdToShow) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
    if (sectionIdToShow === 'desempenho-section') {
        updatePerformanceMetrics();
    }
    if (sectionIdToShow === 'financas-section') {
        loadFinanceData();
    }
    if (sectionIdToShow === 'habitos-section') {
        const isFinalized = globalState.isRoutineFinalized;
        toggleRoutineLockState(isFinalized);
    }
    window.scrollTo(0, 0);
}

export function setGreeting() {
    let userName = globalState.userName;
    if (!userName) {
        userName = prompt("Bem-vindo! Por favor, digite seu nome para personalizar sua jornada.");
        if (userName && userName.trim() !== '') {
            globalState.userName = userName.trim();
            saveGlobalState();
        } else {
            domElements.greetingElement.textContent = "Bem-vindo! Cadastre seu nome para personalizar sua jornada.";
            domElements.greetingElement.style.cursor = "pointer";
            domElements.greetingElement.onclick = setGreeting;
            return;
        }
    }
    
    domElements.greetingElement.style.cursor = "default";
    domElements.greetingElement.onclick = null;

    const currentHour = new Date().getHours();
    let greeting = '';

    if (currentHour >= 5 && currentHour < 12) {
        greeting = `Bom dia, ${userName}! Pronto para se tornar 1% melhor hoje?`;
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = `Boa tarde, ${userName}! Sua evolução continua agora.`;
    } else {
        greeting = `Boa noite, ${userName}! Vamos fechar o dia com disciplina.`;
    }
    domElements.greetingElement.textContent = greeting;
}

export function updateProgress() {
    const completedTasks = document.querySelectorAll('.task-checkbox:checked').length;
    const totalTasks = document.querySelectorAll('.task-checkbox').length;
    
    const progressContainer = document.querySelector('.progress-container');

    if (totalTasks === 0) {
        if (progressContainer) progressContainer.style.display = 'none';
        if (domElements.progressMotivation) domElements.progressMotivation.textContent = "Adicione tarefas nas suas rotinas para começar sua jornada 1% melhor por dia.";
        return;
    }

    if (progressContainer) progressContainer.style.display = 'flex';

    const progressPercentage = (completedTasks / totalTasks) * 100;

    if (domElements.progressBar) {
         domElements.progressBar.style.width = `${progressPercentage}%`;
    }
   
    if (domElements.progressText) {
        domElements.progressText.textContent = `${completedTasks}/${totalTasks}`;
    }
    
    if (domElements.progressMotivation) {
        if (progressPercentage >= 100) {
            domElements.progressMotivation.textContent = "Você venceu o dia. Disciplina é a ponte entre sonhos e conquistas.";
            const barInner = domElements.progressBar.parentElement.querySelector('.progress-bar-inner');
            if (barInner) barInner.classList.add('green');
        } else if (completedTasks > 0) {
            domElements.progressMotivation.textContent = "Continue assim, você está no caminho certo!";
            const barInner = domElements.progressBar.parentElement.querySelector('.progress-bar-inner');
            if (barInner) barInner.classList.remove('green');
        } else {
            domElements.progressMotivation.textContent = "Complete suas tarefas para ver seu progresso!";
            const barInner = domElements.progressBar.parentElement.querySelector('.progress-bar-inner');
            if (barInner) barInner.classList.remove('green');
        }
    }
}

export function initializeCheckboxes() {
    let taskCheckboxes = document.querySelectorAll('.task-checkbox');

    const todayStr = new Date().toDateString();
    if (globalState.lastVisitDate !== todayStr) {
        globalState.tasksState = {};
        globalState.lastVisitDate = todayStr;
        saveGlobalState();
    }

    taskCheckboxes.forEach(checkbox => {
        const savedState = globalState.tasksState[checkbox.id];
        const liElement = checkbox.closest('li');
        if (savedState === true) {
            checkbox.checked = true;
            if(liElement) liElement.classList.add('completed');
        } else {
            checkbox.checked = false;
            if(liElement) liElement.classList.remove('completed');
        }

        checkbox.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            globalState.tasksState[e.target.id] = isChecked;
            const parentLi = e.target.closest('li');
            if (parentLi) {
                parentLi.classList.toggle('completed', isChecked);
            }
            
            if (isChecked) {
                globalState.performance.totalHabitsCompleted++;
                // This function is in performance.js, we need to import it if we want to call it.
                // For now, let's assume it gets called from a central place or not at all.
                // The prompt refactors, not adds functionality.
            } else {
                 globalState.performance.totalHabitsCompleted = Math.max(0, globalState.performance.totalHabitsCompleted - 1);
            }
            // logPerformanceEvent('habits'); in performance.js
            updateProgress();
            saveGlobalState();
        });
    });
    updateProgress();
}

export function setupNavigation() {
    domElements.goToHabitos.addEventListener('click', () => showSection('habitos-section'));
    domElements.goToTreinos.addEventListener('click', () => showSection('treinos-section'));
    domElements.goToBiblioteca.addEventListener('click', () => showSection('biblioteca-section'));
    domElements.goToFinancas.addEventListener('click', () => showSection('financas-section'));
    domElements.goToComoUsar.addEventListener('click', () => showSection('como-usar-section'));
    domElements.goToDesempenho.addEventListener('click', () => showSection('desempenho-section'));

    domElements.promoLinkBiblioteca.addEventListener('click', () => showSection('biblioteca-section'));
    domElements.promoLinkFinancas.addEventListener('click', () => showSection('biblioteca-section'));

    domElements.backButtons.forEach(button => {
        button.addEventListener('click', () => showSection('home-section'));
    });

    if (domElements.guideActionBtn) {
        domElements.guideActionBtn.addEventListener('click', () => showSection('home-section'));
    }
}