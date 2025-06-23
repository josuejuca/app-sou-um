import { globalState, saveGlobalState } from './state.js';
import { workoutPlans, dietPlans } from './config.js';
import { logPerformanceEvent } from './performance.js';

let dom = {};
let userWorkoutChoices = { gender: null, goal: null };
let userDietChoice = { goal: null };

export function initWorkouts() {
    dom = {
        treinosSection: document.getElementById('treinos-section'),
        workoutSetup: document.getElementById('workout-setup'),
        workoutPlanDisplay: document.getElementById('workout-plan-display'),
        dietSetup: document.getElementById('diet-setup'),
        dietPlanDisplay: document.getElementById('diet-plan-display'),
        workoutActions: document.getElementById('workout-actions'),
        dietActions: document.getElementById('diet-actions'),
        logWorkoutBtn: document.getElementById('log-workout-btn'),
        logDietBtn: document.getElementById('log-diet-btn'),
    };

    attachEventListeners();
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
            globalState.workoutPlan = { gender: null, goal: null };
            saveGlobalState();
            userWorkoutChoices = { gender: null, goal: null };
            dom.workoutPlanDisplay.classList.add('hidden');
            dom.workoutPlanDisplay.innerHTML = '';
            dom.workoutSetup.classList.remove('hidden');
            dom.workoutActions.classList.add('hidden');
            dom.workoutSetup.querySelector('[data-type="gender"]').parentElement.parentElement.classList.remove('hidden');
            dom.workoutSetup.querySelector('[data-type="goal"]').parentElement.parentElement.classList.add('hidden');
        }
        if (e.target.id === 'reset-diet-btn') {
            globalState.dietPlan = { goal: null };
            saveGlobalState();
            userDietChoice = { goal: null };
            dom.dietPlanDisplay.classList.add('hidden');
            dom.dietPlanDisplay.innerHTML = '';
            dom.dietSetup.classList.remove('hidden');
            dom.dietActions.classList.add('hidden');
        }
    });

    dom.logWorkoutBtn.addEventListener('click', () => {
        logPerformanceEvent('workout');
        updateWorkoutDietLogStatus();
    });

    dom.logDietBtn.addEventListener('click', () => {
        logPerformanceEvent('diet');
        updateWorkoutDietLogStatus();
    });
}

function renderWorkoutPlan() {
    const planData = globalState.workoutPlan;
    if (planData && planData.gender && planData.goal) {
        userWorkoutChoices = planData;
        const plan = workoutPlans[planData.gender][planData.goal];

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
                        ${plan.workouts[day].map(exercise => `<li>${exercise}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
        html += `</div><button class="reset-plan-btn" id="reset-workout-btn">Alterar Plano</button>`;
        dom.workoutPlanDisplay.innerHTML = html;
    }
}

function renderDietPlan() {
    const planData = globalState.dietPlan;
     if (planData && planData.goal) {
        userDietChoice = planData;
        const plan = dietPlans[planData.goal];

        dom.dietSetup.classList.add('hidden');
        dom.dietPlanDisplay.classList.remove('hidden');
        dom.dietActions.classList.remove('hidden');
        updateWorkoutDietLogStatus();

        let html = `
            <div class="card diet-card">
                <h3>${plan.title}</h3>
                <ul>
                    ${Object.entries(plan.meals).map(([meal, description]) => `<li><strong>${meal}:</strong> ${description}</li>`).join('')}
                </ul>
            </div>
        `;
         html += `<button class="reset-plan-btn" id="reset-diet-btn">Alterar Plano</button>`;
        dom.dietPlanDisplay.innerHTML = html;
    }
}

function handleChoice(type, value) {
    if (type === 'gender' || type === 'goal') {
        userWorkoutChoices[type] = value;
        const genderQuestion = dom.workoutSetup.querySelector('[data-type="gender"]').parentElement.parentElement;
        const goalQuestion = dom.workoutSetup.querySelector('[data-type="goal"]').parentElement.parentElement;
        
        if (userWorkoutChoices.gender) {
            genderQuestion.classList.add('hidden');
            goalQuestion.classList.remove('hidden');
        }
        if (userWorkoutChoices.gender && userWorkoutChoices.goal) {
            globalState.workoutPlan = userWorkoutChoices;
            saveGlobalState();
            renderWorkoutPlan();
        }
    } else if (type === 'diet-goal') {
        userDietChoice.goal = value;
        globalState.dietPlan = userDietChoice;
        saveGlobalState();
        renderDietPlan();
    }
}

function getTodayPerformanceLog() {
    const todayKey = new Date().toISOString().split('T')[0];
    if (!globalState.performance.log[todayKey]) {
        globalState.performance.log[todayKey] = { habits: 0, workout: false, diet: false };
    }
    return globalState.performance.log[todayKey];
}

function updateWorkoutDietLogStatus() {
    const todayLog = getTodayPerformanceLog();
    
    if (todayLog.workout) {
        dom.logWorkoutBtn.disabled = true;
        dom.logWorkoutBtn.textContent = 'Treino de hoje concluído!';
    } else {
        dom.logWorkoutBtn.disabled = false;
        dom.logWorkoutBtn.textContent = '✅ Marcar treino de hoje como concluído';
    }

    if (todayLog.diet) {
        dom.logDietBtn.disabled = true;
        dom.logDietBtn.textContent = 'Dieta de hoje registrada!';
    } else {
        dom.logDietBtn.disabled = false;
        dom.logDietBtn.textContent = '✅ Segui o plano alimentar hoje';
    }
}