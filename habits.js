import { globalState, saveGlobalState } from './state.js';
import { defaultHabits } from './config.js';
import { initializeCheckboxes, updateProgress } from './ui.js';
import Swal from 'sweetalert2';

let dom = {};

export function initHabits() {
    dom = {
        habitosContainer: document.getElementById('habitos-container'),
        restoreDefaultsBtn: document.getElementById('restore-defaults-btn'),
        finalizeRoutineBtn: document.getElementById('finalize-routine-btn'),
        editRoutineBtn: document.getElementById('edit-routine-btn'),
        routineFinalizedMessage: document.getElementById('routine-finalized-message'),
        habitosSection: document.getElementById('habitos-section'),
    };

    dom.restoreDefaultsBtn.addEventListener('click', async () => {
        const result = await Swal.fire({
            title: 'Tem certeza?',
            text: "Deseja restaurar a rotina padrão? Todas as suas tarefas personalizadas serão perdidas.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'var(--primary-color)',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, restaurar!',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'themed-popup',
                title: 'themed-title',
                htmlContainer: 'themed-content'
            }
        });

        if (result.isConfirmed) {
            globalState.userHabits = JSON.parse(JSON.stringify(defaultHabits)); // Reset to a clean copy
            globalState.isRoutineFinalized = false; // Also reset the lock state
            globalState.tasksState = {}; // Clear checked states
            saveGlobalState();
            loadHabitState(); // Reload state and re-render
            initializeCheckboxes(); // Re-init checkboxes with fresh state
             Swal.fire({
                title: 'Restaurado!',
                text: 'Sua rotina padrão foi restaurada.',
                icon: 'success',
                confirmButtonColor: 'var(--primary-color)',
                customClass: {
                    popup: 'themed-popup',
                    title: 'themed-title',
                    htmlContainer: 'themed-content'
                }
            });
        }
    });

    dom.finalizeRoutineBtn.addEventListener('click', () => {
        Swal.fire({
            title: 'Finalizar Edição?',
            text: "Sua rotina será bloqueada para edição, focando apenas na execução. Você poderá editar novamente depois.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--primary-color)',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Sim, finalizar!',
            cancelButtonText: 'Cancelar',
             customClass: {
                popup: 'themed-popup',
                title: 'themed-title',
                htmlContainer: 'themed-content'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                toggleRoutineLockState(true);
            }
        });
    });

    dom.editRoutineBtn.addEventListener('click', () => {
        toggleRoutineLockState(false);
    });
}

function getHabits() {
    // Ensure we always have a valid habits object, defaulting if necessary
    return globalState.userHabits && Object.keys(globalState.userHabits).length > 0
        ? globalState.userHabits 
        : JSON.parse(JSON.stringify(defaultHabits));
}

function saveHabits(habits) {
    globalState.userHabits = habits;
    saveGlobalState();
    renderHabits();
    // After re-rendering, we need to re-initialize the checkboxes
    // to apply their saved checked/unchecked state and attach listeners.
    initializeCheckboxes(); 
}

function renderHabits() {
    const habits = getHabits();
    dom.habitosContainer.innerHTML = '';

    for (const key in habits) {
        if (!habits.hasOwnProperty(key)) continue;

        const routine = habits[key];
        const routineBlock = document.createElement('div');
        routineBlock.className = 'routine-block card';
        routineBlock.innerHTML = `
            <h3>${routine.title}</h3>
            <ul id="${key}-list"></ul>
            <form class="add-task-form">
                <input type="text" id="${key}-input" placeholder="Nova tarefa..." required>
                <button type="submit" class="add-task-btn" data-routine="${key}">Adicionar</button>
            </form>
        `;
        dom.habitosContainer.appendChild(routineBlock);

        const taskList = document.getElementById(`${key}-list`);
        if (routine.tasks.length === 0) {
            taskList.innerHTML = `<p class="empty-state">Nenhuma tarefa cadastrada ainda. Adicione tarefas para começar.</p>`;
        } else {
            routine.tasks.forEach((taskText, index) => {
                const li = document.createElement('li');
                // Create a more robust ID based on routine key and index
                const taskId = `task-${key}-${index}`; 
                li.innerHTML = `
                    <input type="checkbox" class="task-checkbox" id="${taskId}" data-task-text="${taskText}" data-category="Hábitos">
                    <span class="task-text">${taskText}</span>
                    <div class="task-actions">
                        <button type="button" class="edit-btn" data-routine="${key}" data-task-index="${index}">✏️</button>
                        <button type="button" class="delete-btn" data-routine="${key}" data-task-index="${index}">🗑️</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        }
    }
    // Attach event listeners for the newly rendered elements
    addHabitEventListeners();
}

function addHabitEventListeners() {
    // Use form submission for adding tasks to improve accessibility
    document.querySelectorAll('.add-task-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const routineKey = e.target.querySelector('.add-task-btn').dataset.routine;
            const input = document.getElementById(`${routineKey}-input`);
            const taskText = input.value.trim();

            if (taskText) {
                const habits = getHabits();
                if (habits[routineKey].tasks.includes(taskText)) {
                     Swal.fire({
                        title: 'Tarefa Duplicada',
                        text: 'Essa tarefa já existe na sua rotina.',
                        icon: 'warning',
                        confirmButtonColor: 'var(--primary-color)',
                        customClass: {
                            popup: 'themed-popup',
                            title: 'themed-title',
                            htmlContainer: 'themed-content'
                        }
                    });
                    return;
                }
                habits[routineKey].tasks.push(taskText);
                saveHabits(habits);
                input.value = '';
                input.focus(); // Keep focus on input for quick additions
            }
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const { routine, taskIndex } = btn.dataset;
            const habits = getHabits();
            const taskText = habits[routine].tasks[parseInt(taskIndex)];
            
            const result = await Swal.fire({
                title: 'Excluir Tarefa',
                text: `Tem certeza que deseja excluir "${taskText}"?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: 'var(--primary-color)',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, excluir!',
                cancelButtonText: 'Cancelar',
                customClass: {
                    popup: 'themed-popup',
                    title: 'themed-title',
                    htmlContainer: 'themed-content'
                }
            });

            if (result.isConfirmed) {
                habits[routine].tasks.splice(parseInt(taskIndex), 1);
                saveHabits(habits);
            }
        });
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const { routine, taskIndex } = btn.dataset;
            const habits = getHabits();
            const originalTaskText = habits[routine].tasks[parseInt(taskIndex)];

            const { value: newTaskText } = await Swal.fire({
                title: 'Editar tarefa',
                input: 'text',
                inputValue: originalTaskText,
                showCancelButton: true,
                confirmButtonText: 'Salvar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: 'var(--primary-color)',
                customClass: {
                    popup: 'themed-popup',
                    title: 'themed-title',
                    htmlContainer: 'themed-content',
                    input: 'themed-input'
                },
                inputValidator: (value) => {
                    if (!value || value.trim() === '') {
                        return 'Você precisa escrever algo!'
                    }
                }
            });

            if (newTaskText && newTaskText.trim() !== '' && newTaskText.trim() !== originalTaskText) {
                habits[routine].tasks[parseInt(taskIndex)] = newTaskText.trim();
                saveHabits(habits);
            }
        });
    });
}

export function toggleRoutineLockState(isLocked) {
    globalState.isRoutineFinalized = isLocked;
    
    if (isLocked) {
        dom.habitosSection.classList.add('routine-locked');
        dom.finalizeRoutineBtn.classList.add('hidden');
        dom.restoreDefaultsBtn.classList.add('hidden');
        dom.editRoutineBtn.classList.remove('hidden');
        dom.routineFinalizedMessage.classList.remove('hidden');
    } else {
        dom.habitosSection.classList.remove('routine-locked');
        dom.finalizeRoutineBtn.classList.remove('hidden');
        dom.restoreDefaultsBtn.classList.remove('hidden');
        dom.editRoutineBtn.classList.add('hidden');
        dom.routineFinalizedMessage.classList.add('hidden');
    }
    // Save the state change
    saveGlobalState();
}

export function loadHabitState() {
    const isFinalized = globalState.isRoutineFinalized;
    // Always render first to ensure the DOM is up-to-date with the state
    renderHabits();
    // Then apply the lock state visually
    toggleRoutineLockState(isFinalized);
    // Finally, initialize checkbox states
    initializeCheckboxes();
}