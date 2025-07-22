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
    
    // Daily Reset Logic - run right after loading state
    const todayStr = new Date().toDateString();
    if (globalState.lastVisitDate !== todayStr) {
        globalState.lastVisitDate = todayStr;
        // Reset daily-specific states but keep the configurations
        globalState.tasksState = {}; // Reset habit checks
        if (globalState.dietPlan && globalState.dietPlan.checkedMeals) {
             globalState.dietPlan.checkedMeals = {}; // Reset diet checks
        }
        saveGlobalState();
    }
    
    initUI();
    setGreeting();
    
    // Initialize each feature module
    initHabits();
    initFinance();
    initWorkouts();
    initPerformance();

    // After modules are ready, setup UI that depends on them
    loadHabitState(); // This loads habit data and sets the initial lock state
    initializeCheckboxes();
    setupNavigation();
});