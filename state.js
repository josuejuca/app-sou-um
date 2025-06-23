export let globalState = {};

export const defaultGlobalState = {
    userName: null,
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
    workoutPlan: { gender: null, goal: null },
    dietPlan: { goal: null },
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
            alert("Erro ao carregar seus dados salvos. Pode ser necessário redefinir os dados se o problema persistir.");
            savedState = {}; 
        }
    }

    const deepMerge = (target, source) => {
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                deepMerge(target[key], source[key]);
            } else {
                if (source.hasOwnProperty(key)) {
                     target[key] = source[key];
                }
            }
        }
         return target;
    };
    
    globalState = JSON.parse(JSON.stringify(defaultGlobalState));
    deepMerge(globalState, savedState);
}