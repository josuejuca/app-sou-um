import { globalState, saveGlobalState, loadGlobalState } from './state.js';
import { initUI, setGreeting, initializeCheckboxes, setupNavigation, applyTheme } from './ui.js';
import { initHabits, loadHabitState } from './habits.js';
import { initFinance } from './finance.js';
import { initWorkouts } from './workouts.js';
import { initPerformance } from './performance.js';

document.addEventListener('DOMContentLoaded', () => {
    // High-level initialization flow
    loadGlobalState();
    applyTheme(); // Apply theme first to avoid flash of wrong theme
    initUI();
    setGreeting();
    
    // Initialize each feature module
    initHabits();
    initFinance();
    initWorkouts();
    initPerformance();

    // After modules are ready, setup UI that depends on them
    loadHabitState();
    initializeCheckboxes();
    setupNavigation();

    // Initial check for daily reset logic
    const todayStr = new Date().toDateString();
    if (globalState.lastVisitDate !== todayStr) {
        globalState.lastVisitDate = todayStr;
        // Reset daily-specific states but keep the configurations
        globalState.tasksState = {}; // For habits
        if (globalState.dietPlan) {
            globalState.dietPlan.checkedMeals = {}; // For diet
        }
        if(globalState.performance.log) {
            const todayKey = new Date().toISOString().split('T')[0];
            if(globalState.performance.log[todayKey]) {
                globalState.performance.log[todayKey].workout = false; // Reset daily workout log
            }
        }
        saveGlobalState();
    }
});