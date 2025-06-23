import { loadGlobalState } from './state.js';
import { initUI, setGreeting, initializeCheckboxes, setupNavigation } from './ui.js';
import { initHabits, loadHabitState } from './habits.js';
import { initFinance } from './finance.js';
import { initWorkouts } from './workouts.js';
import { initPerformance } from './performance.js';

document.addEventListener('DOMContentLoaded', () => {
    // High-level initialization flow
    loadGlobalState();
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
});