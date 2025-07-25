import { globalState, saveGlobalState } from './state.js';
import { updatePerformanceMetrics } from './performance.js';
import { loadFinanceData } from './finance.js';
import { toggleRoutineLockState, loadHabitState } from './habits.js';
import { libraryContent } from './config.js';
import Swal from 'sweetalert2';

export let domElements = {};

export function initUI() {
    domElements = {
        // Sections
        homeSection: document.getElementById('home-section'),
        habitosSection: document.getElementById('habitos-section'),
        treinosSection: document.getElementById('treinos-section'),
        bibliotecaSection: document.getElementById('biblioteca-section'),
        bibliotecaContentSection: document.getElementById('biblioteca-content-section'),
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
        backButtonLibrary: document.querySelector('.back-button-library'),

        // Progress Bar Elements
        progressBar: document.getElementById('daily-progress-bar'),
        progressText: document.getElementById('daily-progress-text'),
        progressMotivation: document.getElementById('progress-motivation'),

        // Greeting Element
        greetingElement: document.getElementById('greeting'),

        // Library content
        libraryCategoriesContainer: document.getElementById('library-categories-container'),
        libraryContentTitle: document.getElementById('library-content-title'),
        libraryContentBody: document.getElementById('library-content-body'),
        libraryContentAction: document.getElementById('library-content-action'),

        // Theme Toggle
        themeToggleButton: document.getElementById('theme-toggle-btn'),
    };
    domElements.sections = [
        domElements.homeSection, domElements.habitosSection, domElements.treinosSection,
        domElements.bibliotecaSection, domElements.financasSection, domElements.comoUsarSection,
        domElements.desempenhoSection, domElements.bibliotecaContentSection
    ];

    domElements.themeToggleButton.addEventListener('click', toggleTheme);
}

export function applyTheme() {
    const theme = globalState.theme || 'dark';
    document.body.dataset.theme = theme;
    if (domElements.themeToggleButton) {
        domElements.themeToggleButton.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

function toggleTheme() {
    globalState.theme = globalState.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
    saveGlobalState();
    // Re-render charts with new theme colors if the performance section is active
    if (domElements.desempenhoSection.classList.contains('active')) {
        updatePerformanceMetrics();
    }
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
        // Ensure the habit state is fully reloaded and rendered correctly
        // when navigating to the section.
        loadHabitState();
    }
    window.scrollTo(0, 0);
}

export async function setGreeting() {
    let userName = globalState.userName;
    if (!userName) {
        const { value: name } = await Swal.fire({
            title: 'Bem-vindo(a) ao Sou 1%!',
            text: 'Digite seu nome para personalizar sua jornada.',
            input: 'text',
            inputPlaceholder: 'Seu nome aqui...',
            confirmButtonText: 'Começar!',
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonColor: 'var(--primary-color)',
            customClass: {
                popup: 'themed-popup',
                title: 'themed-title',
                htmlContainer: 'themed-content',
                input: 'themed-input'
            },
            inputValidator: (value) => {
                if (!value || value.trim().length < 2) {
                    return 'Por favor, digite um nome válido.'
                }
            }
        });
        
        userName = name;

        if (userName && userName.trim() !== '') {
            globalState.userName = userName.trim();
            saveGlobalState();
        } else {
             // This branch is less likely now due to validator, but keep as fallback
            domElements.greetingElement.textContent = "Bem-vindo! Clique aqui para definir seu nome.";
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

function showLibraryContent(category) {
    showSection('biblioteca-content-section');
    const content = libraryContent[category];

    if (content) {
        domElements.libraryContentTitle.innerHTML = content.title;
        domElements.libraryContentBody.innerHTML = content.content;

        let actionsHtml = '';
        if (content.actions && content.actions.length > 0) {
            content.actions.forEach(action => {
                if (action.type === 'button') {
                    actionsHtml += `<a href="${action.link}" target="_blank" rel="noopener noreferrer" class="library-action-button">${action.text}</a>`;
                } else if (action.type === 'text') {
                    actionsHtml += `<div class="library-action-text">${action.content}</div>`;
                }
            });
        }
        domElements.libraryContentAction.innerHTML = actionsHtml;

    } else {
        domElements.libraryContentTitle.textContent = 'Em breve';
        domElements.libraryContentBody.innerHTML = '<p>Este conteúdo está sendo preparado e estará disponível em breve. Continue focado em suas metas diárias!</p>';
        domElements.libraryContentAction.innerHTML = '';
    }
}

export function updateProgress() {
    const completedHabitTasks = document.querySelectorAll('#habitos-section .task-checkbox:checked').length;
    const totalHabitTasks = document.querySelectorAll('#habitos-section .task-checkbox').length;
    
    // This is a proxy for daily progress, can be enhanced later
    const allTasks = totalHabitTasks;
    const completedTasks = completedHabitTasks;
    
    const progressContainer = document.querySelector('.progress-container');

    if (allTasks === 0) {
        if (progressContainer) progressContainer.style.display = 'none';
        if (domElements.progressMotivation) domElements.progressMotivation.textContent = "Adicione tarefas em 'Hábitos e Rotinas' para começar sua jornada.";
        return;
    }

    if (progressContainer) progressContainer.style.display = 'flex';

    const progressPercentage = (completedTasks / allTasks) * 100;

    if (domElements.progressBar) {
         domElements.progressBar.style.width = `${progressPercentage}%`;
    }
   
    if (domElements.progressText) {
        domElements.progressText.textContent = `${completedTasks}/${allTasks}`;
    }
    
    if (domElements.progressMotivation) {
        if (progressPercentage >= 100) {
            domElements.progressMotivation.textContent = "Você venceu o dia. Disciplina é a ponte entre sonhos e conquistas.";
        } else if (completedTasks > 0) {
            domElements.progressMotivation.textContent = "Continue assim, você está no caminho certo!";
        } else {
            domElements.progressMotivation.textContent = "Complete suas tarefas para ver seu progresso!";
        }
    }
}

export function initializeCheckboxes() {
    let taskCheckboxes = document.querySelectorAll('.task-checkbox');

    // The daily reset logic is now centralized in script.js
    // This function just needs to apply the current state.

    taskCheckboxes.forEach(checkbox => {
        // Use the task's text content as the key for state, ensuring consistency
        const taskText = checkbox.dataset.taskText;
        const savedState = globalState.tasksState[taskText];
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
            const textKey = e.target.dataset.taskText;
            globalState.tasksState[textKey] = isChecked;

            const parentLi = e.target.closest('li');
            if (parentLi) {
                parentLi.classList.toggle('completed', isChecked);
            }
            
            // This logic was flawed, it shouldn't modify the total.
            // totalHabitsCompleted is a historical counter, not daily.
            // It should only be incremented. We can refine this later if needed.
            // For now, let's just update progress.
            
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

    if (domElements.libraryCategoriesContainer) {
        domElements.libraryCategoriesContainer.addEventListener('click', (e) => {
            const card = e.target.closest('.library-category-card');
            if (card) {
                const category = card.dataset.category;
                showLibraryContent(category);
            }
        });
    }

    if (domElements.backButtonLibrary) {
        domElements.backButtonLibrary.addEventListener('click', () => showSection('biblioteca-section'));
    }
}