import Swal from 'sweetalert2';
export let globalState = {};

export const defaultGlobalState = {
    userName: null,
    theme: 'dark', // 'dark' or 'light'
    lastVisitDate: null,
    userHabits: null, 
    isRoutineFinalized: false,
    tasksState: {},
    finance: {
        netIncome: 0,
        expenses: [],
        savingsGoal: { total: 0, saved: 0 },
        achievement: { name: '', needed: 0, saved: 0 },
        balanceVisible: true,
        monthlyTracking: {},
        lastArchiveDate: null,
    },
    workoutPlan: { gender: null, goal: null, level: null },
    dietPlan: { goal: null, option: null, checkedMeals: {} },
    performance: {
        log: {}, 
        streak: 0,
        lastCompletedDate: null,
        totalHabitsCompleted: 0,
        achievements: {}, 
        completedFinanceGoals: 0,
    }
};

export function saveGlobalState() {
    localStorage.setItem('sou1percentState', JSON.stringify(globalState));
}

export function loadGlobalState() {
    const savedStateString = localStorage.getItem('sou1percentState');
    let savedState = {};

    if (savedStateString) {
        try {
            savedState = JSON.parse(savedStateString);
            if (typeof savedState !== 'object' || savedState === null) {
                savedState = {}; 
            }
        } catch (error) {
            console.error("Error parsing saved state from localStorage:", error);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao carregar dados',
                text: 'Não foi possível carregar seus dados salvos. Se o problema persistir, pode ser necessário limpar os dados do site no seu navegador.',
                confirmButtonColor: 'var(--primary-color)',
                customClass: {
                    popup: 'themed-popup',
                    title: 'themed-title',
                    htmlContainer: 'themed-content'
                }
            });
            savedState = {}; 
        }
    }

    // Set default state first
    globalState = JSON.parse(JSON.stringify(defaultGlobalState));

    // Deep merge saved state into default state
    const deepMerge = (target, source) => {
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                deepMerge(target[key], source[key]);
            } else if (source.hasOwnProperty(key)) {
                // Only assign if the property exists in the source, to avoid overwriting with undefined
                if (source[key] !== undefined) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    
    deepMerge(globalState, savedState);

    // Daily Reset Logic is now handled on DOMContentLoaded in script.js to ensure state is fully loaded
}