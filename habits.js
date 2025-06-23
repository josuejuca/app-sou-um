import { globalState, saveGlobalState } from './state.js';
import { defaultHabits } from './config.js';
import { initializeCheckboxes } from './ui.js';

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

    dom.restoreDefaultsBtn.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja restaurar a rotina padrão? Todas as suas tarefas personalizadas serão perdidas.')) {
            globalState.userHabits = null;
            saveGlobalState();
            renderHabits();
            initializeCheckboxes();
        }
    });

    dom.finalizeRoutineBtn.addEventListener('click', () => {
        toggleRoutineLockState(true);
        saveGlobalState();
    });

    dom.editRoutineBtn.addEventListener('click', () => {
        toggleRoutineLockState(false);
        saveGlobalState();
    });
}

function getHabits() {
    const habits = globalState.userHabits;
    return habits ? habits : JSON.parse(JSON.stringify(defaultHabits));
}

function saveHabits(habits) {
    globalState.userHabits = habits;
    saveGlobalState();
    renderHabits();
    initializeCheckboxes();
}

function renderHabits() {
    const habits = getHabits();
    dom.habitosContainer.innerHTML = '';

    for (const key in habits) {
        const routine = habits[key];
        const routineBlock = document.createElement('div');
        routineBlock.className = 'routine-block card';
        routineBlock.innerHTML = `
            <h3>${routine.title}</h3>
            <ul id="${key}-list"></ul>
            <div class="add-task-form">
                <input type="text" id="${key}-input" placeholder="Nova tarefa...">
                <button class="add-task-btn" data-routine="${key}">Adicionar</button>
            </div>
        `;
        dom.habitosContainer.appendChild(routineBlock);

        const taskList = document.getElementById(`${key}-list`);
        if (routine.tasks.length === 0) {
            taskList.innerHTML = `<p class="empty-state">Nenhuma tarefa cadastrada ainda. Clique em 'Adicionar' para começar.</p>`;
        } else {
            routine.tasks.forEach(taskText => {
                const li = document.createElement('li');
                const taskId = `task-${key}-${taskText.replace(/\s+/g, '-')}`;
                li.innerHTML = `
                    <input type="checkbox" class="task-checkbox" id="${taskId}" data-category="Hábitos">
                    <span class="task-text">${taskText}</span>
                    <div class="task-actions">
                        <button class="edit-btn" data-routine="${key}" data-task="${taskText}">✏️</button>
                        <button class="delete-btn" data-routine="${key}" data-task="${taskText}">🗑️</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        }
    }
    addHabitEventListeners();
}

function addHabitEventListeners() {
    document.querySelectorAll('.add-task-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const routineKey = btn.dataset.routine;
            const input = document.getElementById(`${routineKey}-input`);
            const taskText = input.value.trim();
            if (taskText) {
                const habits = getHabits();
                habits[routineKey].tasks.push(taskText);
                saveHabits(habits);
                input.value = '';
            }
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;
            const { routine, task } = btn.dataset;
            const habits = getHabits();
            habits[routine].tasks = habits[routine].tasks.filter(t => t !== task);
            saveHabits(habits);
        });
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const { routine, task } = btn.dataset;
            const newTaskText = prompt('Editar tarefa:', task);
            if (newTaskText && newTaskText.trim() !== '') {
                const habits = getHabits();
                const taskIndex = habits[routine].tasks.findIndex(t => t === task);
                if (taskIndex > -1) {
                    habits[routine].tasks[taskIndex] = newTaskText.trim();
                    saveHabits(habits);
                }
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
}

export function loadHabitState() {
    const isFinalized = globalState.isRoutineFinalized;
    toggleRoutineLockState(isFinalized);
    renderHabits();
}