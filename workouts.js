import { globalState, saveGlobalState } from './state.js';
import { workoutPlans, dietPlans } from './config.js';
import { logPerformanceEvent } from './performance.js';

let dom = {};
let userWorkoutChoices = { gender: null, goal: null, level: null };
let userDietChoice = { goal: null, option: null };

function getTodayPerformanceLog() {
    const todayKey = new Date().toISOString().split('T')[0];
    if (!globalState.performance.log[todayKey]) {
        // Ensure the log structure is initialized correctly for the day
        globalState.performance.log[todayKey] = { habits: 0, workout: false, dietPercentage: 0 };
    }
    return globalState.performance.log[todayKey];
}

export function initWorkouts() {
    dom = {
        treinosSection: document.getElementById('treinos-section'),
        workoutSetup: document.getElementById('workout-setup'),
        workoutPlanDisplay: document.getElementById('workout-plan-display'),
        dietSetup: document.getElementById('diet-setup'),
        dietOptionsDisplay: document.getElementById('diet-options-display'),
        dietPlanDisplay: document.getElementById('diet-plan-display'),
        workoutActions: document.getElementById('workout-actions'),
        dietActions: document.getElementById('diet-actions'),
        logWorkoutBtn: document.getElementById('log-workout-btn'),
        logDietBtn: document.getElementById('log-diet-btn'),
        workoutLoggedToday: document.getElementById('workout-logged-today'),
        dietLoggedToday: document.getElementById('diet-logged-today'),
        setupQuestions: document.querySelectorAll('#workout-setup .setup-question'),
    };

    attachEventListeners();
    loadWorkoutAndDietState();
}

function loadWorkoutAndDietState() {
    // This function will be called on init and when the section is shown
    const todayStr = new Date().toDateString();
    if (globalState.lastVisitDate !== todayStr) {
        // This reset is now handled centrally in state.js load function
    }
    renderWorkoutPlan();
    renderDietPlan();
    updateWorkoutDietLogStatus();
}

function attachEventListeners() {
    dom.treinosSection.addEventListener('click', (e) => {
        if (e.target.classList.contains('choice-btn')) {
            const { type, value } = e.target.dataset;
            handleChoice(type, value);
        }
        if (e.target.id === 'reset-workout-btn') {
            globalState.workoutPlan = { gender: null, goal: null, level: null };
            saveGlobalState();
            userWorkoutChoices = { gender: null, goal: null, level: null };
            dom.workoutPlanDisplay.classList.add('hidden');
            dom.workoutPlanDisplay.innerHTML = '';
            dom.workoutSetup.classList.remove('hidden');
            
            // Reset question visibility
            dom.setupQuestions.forEach(q => q.classList.add('hidden'));
            dom.workoutSetup.querySelector('[data-question="gender"]').classList.remove('hidden');
        }
        if (e.target.id === 'reset-diet-btn') {
            globalState.dietPlan = { goal: null, option: null, checkedMeals: {} };
            saveGlobalState();
            userDietChoice = { goal: null, option: null };
            dom.dietPlanDisplay.classList.add('hidden');
            dom.dietPlanDisplay.innerHTML = '';
            dom.dietOptionsDisplay.classList.add('hidden');
            dom.dietOptionsDisplay.innerHTML = '';
            dom.dietSetup.classList.remove('hidden');
            dom.dietActions.classList.add('hidden');
        }
    });

    dom.logWorkoutBtn.addEventListener('click', () => {
        logPerformanceEvent('workout', true);
        updateWorkoutDietLogStatus();
    });

    // The log-diet-btn is hidden, logic is now tied to checkboxes
}

function renderWorkoutPlan() {
    const planData = globalState.workoutPlan;
    if (planData && planData.gender && planData.goal && planData.level) {
        userWorkoutChoices = planData;
        const plan = workoutPlans[planData.gender]?.[planData.goal]?.[planData.level];

        if (!plan) {
            console.error("Plano de treino não encontrado para a seleção:", planData);
            // Optionally reset the plan if it's invalid
            globalState.workoutPlan = { gender: null, goal: null, level: null };
            saveGlobalState();
            dom.workoutSetup.classList.remove('hidden');
            return;
        }

        dom.workoutSetup.classList.add('hidden');
        dom.workoutPlanDisplay.classList.remove('hidden');
        dom.workoutActions.classList.remove('hidden');
        updateWorkoutDietLogStatus();

        let html = `<div class="card-container">`;
        for (const day in plan.workouts) {
            html += `
                <div class="card workout-card">
                    <h3>${day}</h3>
                    <ul>
                        ${plan.workouts[day].map(exercise => {
                            let itemHtml = `<li>${exercise}</li>`;
                            if (['polichinelo', 'mountain climber', 'burpees', 'pular corda', 'corrida'].some(term => exercise.toLowerCase().includes(term))) {
                                itemHtml += `<li class="exercise-note">Ou substitua por outro cárdio intenso por 30–60s: corrida, corda, escada, air bike...</li>`;
                            }
                            return itemHtml;
                        }).join('')}
                    </ul>
                </div>
            `;
        }
        html += `</div><button class="reset-plan-btn" id="reset-workout-btn">Alterar Plano de Treino</button>`;
        dom.workoutPlanDisplay.innerHTML = html;
    }
}

function renderDietPlan() {
    const planData = globalState.dietPlan;
    
    if (planData && planData.goal && planData.option) {
        userDietChoice = planData;
        const plan = dietPlans[planData.goal]?.[planData.option];

        if (!plan) {
            console.error("Plano de dieta não encontrado:", planData);
            return;
        }

        dom.dietSetup.classList.add('hidden');
        dom.dietOptionsDisplay.classList.add('hidden');
        dom.dietPlanDisplay.classList.remove('hidden');
        dom.dietActions.classList.remove('hidden');
        updateWorkoutDietLogStatus();

        let mealItemsHtml = Object.entries(plan.meals).map(([meal, description], index) => {
            const mealId = `meal-${index}`;
            const isChecked = planData.checkedMeals[mealId] || false;
            return `
                <li class="meal-item ${isChecked ? 'completed' : ''}">
                    <input type="checkbox" id="${mealId}" class="meal-checkbox" data-meal-id="${mealId}" ${isChecked ? 'checked' : ''}>
                    <label class="meal-details" for="${mealId}">
                        <strong>${meal}</strong>
                        <span>${description}</span>
                    </label>
                </li>
            `;
        }).join('');

        let html = `
            <div class="card diet-card">
                <h3>${plan.title}</h3>
                <p class="guide-text">Marque cada refeição realizada para acompanhar sua adesão diária.</p>
                <div id="diet-adherence-progress">
                     <div id="diet-adherence-progress-bar"><div id="diet-adherence-progress-bar-inner"></div></div>
                </div>
                <div id="diet-congrats-message" class="diet-congrats-message hidden"></div>
                <ul id="meal-list">${mealItemsHtml}</ul>
            </div>
        `;
        html += `<button class="reset-plan-btn" id="reset-diet-btn">Alterar Plano Alimentar</button>`;
        dom.dietPlanDisplay.innerHTML = html;

        attachMealCheckboxListeners();
        updateDietAdherenceProgress();
    }
}

function renderDietOptions(goal) {
    const options = dietPlans[goal];
    if (!options) return;

    dom.dietSetup.classList.add('hidden');
    dom.dietOptionsDisplay.classList.remove('hidden');
    
    let optionsHtml = `<h3>Ótima escolha! Agora, selecione uma das opções de dieta para ${goal.replace('-', ' ')}:</h3>`;
    for (const key in options) {
        const option = options[key];
        optionsHtml += `
            <div class="diet-option-card">
                <h4>${option.title}</h4>
                <p>${option.description}</p>
                <button class="select-diet-btn" data-option-key="${key}">Selecionar</button>
            </div>
        `;
    }
    dom.dietOptionsDisplay.innerHTML = optionsHtml;

    dom.dietOptionsDisplay.querySelectorAll('.select-diet-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const optionKey = e.target.dataset.optionKey;
            globalState.dietPlan.option = optionKey;
            saveGlobalState();
            renderDietPlan();
        });
    });
}

function handleChoice(type, value) {
    if (type === 'gender' || type === 'goal' || type === 'level') {
        userWorkoutChoices[type] = value;
        
        // Logic to show next question
        const genderQuestion = dom.workoutSetup.querySelector('[data-question="gender"]');
        const goalQuestion = dom.workoutSetup.querySelector('[data-question="goal"]');
        const levelQuestion = dom.workoutSetup.querySelector('[data-question="level"]');
        
        if (type === 'gender') {
            genderQuestion.classList.add('hidden');
            goalQuestion.classList.remove('hidden');
        } else if (type === 'goal') {
            goalQuestion.classList.add('hidden');
            levelQuestion.classList.remove('hidden');
        }

        // If all choices are made, save and render
        if (userWorkoutChoices.gender && userWorkoutChoices.goal && userWorkoutChoices.level) {
            globalState.workoutPlan = userWorkoutChoices;
            saveGlobalState();
            renderWorkoutPlan();
        }
    } else if (type === 'diet-goal') {
        userDietChoice.goal = value;
        // Reset checked meals when goal changes
        globalState.dietPlan = { goal: value, option: null, checkedMeals: {} };
        saveGlobalState();
        renderDietOptions(value);
    }
}

function attachMealCheckboxListeners() {
    const mealList = document.getElementById('meal-list');
    if (!mealList) return;

    mealList.addEventListener('change', e => {
        if (e.target.classList.contains('meal-checkbox')) {
            const mealId = e.target.dataset.mealId;
            const isChecked = e.target.checked;
            globalState.dietPlan.checkedMeals[mealId] = isChecked;
            e.target.closest('.meal-item').classList.toggle('completed', isChecked);
            updateDietAdherenceProgress(); // This will save and log performance
        }
    });
}

function updateDietAdherenceProgress() {
    const totalMeals = document.querySelectorAll('.meal-checkbox').length;
    if (totalMeals === 0) return;

    const completedMeals = document.querySelectorAll('.meal-checkbox:checked').length;
    const percentage = totalMeals > 0 ? (completedMeals / totalMeals) * 100 : 0;

    const progressBarInner = document.getElementById('diet-adherence-progress-bar-inner');
    const congratsMessage = document.getElementById('diet-congrats-message');

    if (progressBarInner) {
        progressBarInner.style.width = `${percentage}%`;
        progressBarInner.textContent = `${percentage.toFixed(0)}%`;
    }

    if (congratsMessage) {
        if (percentage >= 100) {
            congratsMessage.textContent = 'Parabéns! Você cumpriu 100% da sua dieta hoje! Mente disciplinada, corpo em evolução.';
            congratsMessage.classList.remove('hidden');
        } else {
            congratsMessage.classList.add('hidden');
        }
    }

    // Log the percentage to performance data
    logPerformanceEvent('dietPercentage', percentage);
    saveGlobalState(); // Save state after every change
}

function updateWorkoutDietLogStatus() {
    const todayLog = getTodayPerformanceLog();

    if (todayLog.workout) {
        dom.logWorkoutBtn.classList.add('hidden');
        dom.workoutLoggedToday.classList.remove('hidden');
    } else {
        dom.logWorkoutBtn.classList.remove('hidden');
        dom.workoutLoggedToday.classList.add('hidden');
    }

    // The diet log status is now implicitly handled by the checked boxes and progress bar
    // No need for a separate button or message here, as the UI is self-explanatory.
    dom.dietLoggedToday.classList.add('hidden');
    dom.logDietBtn.classList.add('hidden');
}