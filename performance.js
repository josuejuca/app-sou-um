import { globalState, saveGlobalState } from './state.js';
import { achievementsList } from './config.js';
import { Chart, registerables } from 'chart.js';
import Swal from 'sweetalert2';

Chart.register(...registerables);

let dom = {};
let categoryPieChart = null;

export function initPerformance() {
    dom = {
        streakDisplay: document.getElementById('streak-display'),
        totalTasksDisplay: document.getElementById('total-tasks-display'),
        performanceMotivation: document.getElementById('performance-motivation'),
        achievementsContainer: document.getElementById('achievements-container'),
        chartsContainer: document.querySelector('.charts-container'),
    };
    checkAchievements();
}

function getTodayPerformanceLog() {
    const todayKey = new Date().toISOString().split('T')[0];
    if (!globalState.performance.log[todayKey]) {
        globalState.performance.log[todayKey] = { habits: 0, workout: false, dietPercentage: 0 };
    }
    return globalState.performance.log[todayKey];
}

export function logPerformanceEvent(type, value = 1) {
    const todayLog = getTodayPerformanceLog();

    if (type === 'habits') {
        todayLog.habits = document.querySelectorAll('#habitos-section .task-checkbox:checked').length;
    } else if (type === 'workout') {
        todayLog.workout = value; // value is boolean
    } else if (type === 'dietPercentage') {
        todayLog.dietPercentage = value; // value is percentage
    }

    // Streak is now updated based on completing all habit tasks
    // Or should it be based on any activity? Let's stick to habits for now.
    // updateStreak(true);
    saveGlobalState();
}

export function logAchievementCompletion() {
    globalState.performance.completedFinanceGoals = (globalState.performance.completedFinanceGoals || 0) + 1;
    checkAchievements();
    saveGlobalState();
}

function updateStreak(isTaskCompleted) {
    if (!isTaskCompleted) return;

    const today = new Date().toDateString();
    let perf = globalState.performance;

    if (perf.lastCompletedDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (perf.lastCompletedDate === yesterday.toDateString()) {
            perf.streak++;
        } else {
            perf.streak = 1;
        }
        perf.lastCompletedDate = today;
    }

    checkAchievements();
    saveGlobalState();
}

function checkAchievements() {
    const perf = globalState.performance;
    const today = new Date().toISOString().split('T')[0];

    if (perf.streak >= 3 && !perf.achievements['executor-3-dias']) perf.achievements['executor-3-dias'] = today;
    if (perf.streak >= 7 && !perf.achievements['soldado-1-pct']) perf.achievements['soldado-1-pct'] = today;
    if (perf.streak >= 15 && !perf.achievements['sargento-1-pct']) perf.achievements['sargento-1-pct'] = today;
    if (perf.streak >= 30 && !perf.achievements['tenente-1-pct']) perf.achievements['tenente-1-pct'] = today;
    if (perf.streak >= 60 && !perf.achievements['coronel-1-pct']) perf.achievements['coronel-1-pct'] = today;

    if (perf.completedFinanceGoals >= 1 && !perf.achievements['blindagem-financeira']) perf.achievements['blindagem-financeira'] = today;

    // Check for "Trimestre Blindado"
    const monthlyTracking = globalState.finance.monthlyTracking || {};
    const sortedKeys = Object.keys(monthlyTracking).sort();
    let consecutivePositiveMonths = 0;
    if (sortedKeys.length >= 3) {
        for (let i = sortedKeys.length - 1; i >= 0; i--) {
            const key = sortedKeys[i];
            const prevKey = i > 0 ? sortedKeys[i-1] : null;
            const monthData = monthlyTracking[key];
            const balance = monthData.income - monthData.expenses;

            if (balance > 0) {
                // Check if the previous month is consecutive
                if (prevKey) {
                    const [year, month] = key.split('-').map(Number);
                    const [prevYear, prevMonth] = prevKey.split('-').map(Number);

                    const d = new Date(year, month - 1);
                    d.setMonth(d.getMonth() - 1);

                    if (d.getFullYear() === prevYear && (d.getMonth() + 1) === prevMonth) {
                        consecutivePositiveMonths++;
                    } else {
                        consecutivePositiveMonths = 1; // Reset if not consecutive
                    }
                } else {
                    consecutivePositiveMonths = 1;
                }

                if(consecutivePositiveMonths >= 3) {
                    break; // Found 3 consecutive
                }
            } else {
                consecutivePositiveMonths = 0; // Reset if negative balance
            }
        }
    }

    if (consecutivePositiveMonths >= 3 && !perf.achievements['trimestre-blindado']) {
        perf.achievements['trimestre-blindado'] = today;
        Swal.fire({
            icon: 'success',
            title: 'Conquista Desbloqueada!',
            text: 'Parabéns! Você conquistou o Trimestre Blindado! 3 meses seguidos de controle financeiro e saldo no verde.',
            confirmButtonColor: 'var(--primary-color)',
            customClass: {
                popup: 'themed-popup',
                title: 'themed-title',
                htmlContainer: 'themed-content'
            }
        });
    }
}

export function updatePerformanceMetrics() {
    const perf = globalState.performance;
    const totalHabitTasks = document.querySelectorAll('#habitos-section .task-checkbox').length;
    const completedHabitTasks = document.querySelectorAll('#habitos-section .task-checkbox:checked').length;

    // Update streak if all habits are done for the day
    if (totalHabitTasks > 0 && completedHabitTasks === totalHabitTasks) {
        updateStreak(true);
    }

    const today = new Date();
    const lastDate = perf.lastCompletedDate ? new Date(perf.lastCompletedDate) : null;
    if(lastDate) {
        const diffTime = Math.abs(today - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 1) {
            perf.streak = 0;
            saveGlobalState();
        }
    }

    dom.streakDisplay.textContent = `${perf.streak} dia(s)`;
    dom.totalTasksDisplay.textContent = perf.totalHabitsCompleted;

    renderPerformanceCharts();

    dom.achievementsContainer.innerHTML = '';
    for(const key in achievementsList) {
        const achievement = achievementsList[key];
        const unlockedDate = perf.achievements[key];
        const isUnlocked = !!unlockedDate;

        const medalEl = document.createElement('div');
        medalEl.className = `achievement-medal ${isUnlocked ? 'unlocked' : ''}`;
        medalEl.innerHTML = `
            <div class="icon">${achievement.icon}</div>
            <h4>${achievement.name}</h4>
            <p>${achievement.description}</p>
            ${isUnlocked ? `<p class="achievement-date">Conquistado em: ${new Date(unlockedDate).toLocaleDateString('pt-BR')}</p>` : ''}
        `;
        dom.achievementsContainer.appendChild(medalEl);
    }

    const totalTasks = document.querySelectorAll('.task-checkbox').length;
    const completedTasks = document.querySelectorAll('.task-checkbox:checked').length;
    if (perf.streak > 2 || perf.totalHabitsCompleted > 20) {
        dom.performanceMotivation.textContent = "Você está no caminho dos 1%! Continue executando.";
    } else if (totalTasks > 0 && completedTasks === totalTasks) {
        dom.performanceMotivation.textContent = "Parabéns, Executor! Você avançou 1% hoje. Continue firme.";
    } else if (completedTasks > 0) {
        dom.performanceMotivation.textContent = "Continue assim, você está no caminho certo!";
    } else {
        dom.performanceMotivation.textContent = "Comece sua jornada! Complete uma tarefa.";
    }
}

function renderPerformanceCharts() {
    if (!dom.chartsContainer.querySelector('canvas')) {
        dom.chartsContainer.innerHTML = `
            <div class="chart-wrapper">
                <canvas id="categoryPieChart"></canvas>
            </div>
            <div id="category-bars-container" class="chart-wrapper">
            </div>
        `;
    }

    const ctx = document.getElementById('categoryPieChart').getContext('2d');
    const log = globalState.performance.log || {};

    let habitDays = 0, workoutDays = 0, dietDays = 0;
    let totalDietPercentage = 0;

    Object.values(log).forEach(day => {
        if (day.habits > 0) habitDays++;
        if (day.workout) workoutDays++;
        if (day.dietPercentage > 0) {
            dietDays++;
            totalDietPercentage += day.dietPercentage;
        }
    });

    // Theme-aware chart colors
    const isLightTheme = globalState.theme === 'light';
    const pieBgColors = isLightTheme 
        ? ['rgba(25, 118, 210, 0.7)', 'rgba(66, 165, 245, 0.7)', 'rgba(0, 137, 123, 0.7)'] 
        : ['rgba(192, 160, 98, 0.7)', 'rgba(230, 210, 168, 0.7)', 'rgba(0, 128, 128, 0.7)'];
    const pieBorderColors = isLightTheme
        ? ['#1976D2', '#42A5F5', '#00897B']
        : ['#C0A062', '#E6D2A8', '#008080'];
    const textColor = isLightTheme ? '#212121' : 'white';

    const data = {
        labels: ['Dias com Hábitos', 'Dias de Treino', 'Dias de Dieta'],
        datasets: [{
            label: 'Distribuição de Foco',
            data: [habitDays, workoutDays, dietDays],
            backgroundColor: pieBgColors,
            borderColor: pieBorderColors,
            borderWidth: 1
        }]
    };

    if(categoryPieChart) categoryPieChart.destroy();

    if (habitDays === 0 && workoutDays === 0 && dietDays === 0) {
        if(dom.chartsContainer) dom.chartsContainer.innerHTML = `<p class="empty-state">Complete tarefas, treinos e dietas para ver seus gráficos de desempenho aqui!</p>`;
        return;
    }

    categoryPieChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top', labels: { color: textColor } },
                title: { display: true, text: 'Distribuição de Atividades', color: textColor }
            }
        }
    });

    const barsContainer = document.getElementById('category-bars-container');
    barsContainer.innerHTML = '';
    const totalDaysWithLogs = Object.keys(log).length;

    // Calculate total possible habit completions
    const totalHabitsInRoutines = document.querySelectorAll('#habitos-section .task-checkbox').length;
    let totalPossibleHabitCompletions = 0;
    if (totalHabitsInRoutines > 0) {
        // This is a rough estimate. A more accurate way would be to store total tasks per day.
        totalPossibleHabitCompletions = totalDaysWithLogs * totalHabitsInRoutines;
    }

    const totalCompletedHabits = Object.values(log).reduce((sum, day) => sum + (day.habits || 0), 0);
    const habitsPercent = totalPossibleHabitCompletions > 0 ? (totalCompletedHabits / totalPossibleHabitCompletions * 100) : 0;

    const dietAdherencePercent = dietDays > 0 ? (totalDietPercentage / dietDays) : 0;

    const barsData = [
        { label: 'Adesão aos Hábitos (Geral)', value: habitsPercent.toFixed(0), text: `${habitsPercent.toFixed(0)}%`, type: 'percent' },
        { label: 'Adesão à Dieta (Média)', value: dietAdherencePercent.toFixed(0), text: `${dietAdherencePercent.toFixed(0)}%`, type: 'percent' },
        { label: 'Dias de Treino', value: workoutDays, of: totalDaysWithLogs, type: 'days' },
    ];

    barsData.forEach(item => {
        let percentage = item.value;
        let text = item.text;

        if (item.type === 'days') {
            percentage = item.of > 0 ? (item.value / item.of * 100) : 0;
            text = `${item.value}/${item.of} dias`;
        }

        const colorClass = percentage >= 80 ? 'green' : percentage >= 50 ? 'orange' : 'red';

        const barEl = document.createElement('div');
        barEl.className = 'category-bar-item';
        barEl.innerHTML = `
            <p>${item.label}</p>
            <div class="progress-bar performance-bar">
                <div class="progress-bar-inner performance-bar-inner ${colorClass}" style="width: ${percentage}%">${text}</div>
            </div>
        `;
        barsContainer.appendChild(barEl);
    });
}