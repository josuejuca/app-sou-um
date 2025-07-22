import { globalState, saveGlobalState, defaultGlobalState } from './state.js';
import { logAchievementCompletion } from './performance.js';
import Swal from 'sweetalert2';

let dom = {};
let financeData = {};

export function initFinance() {
    dom = {
        netIncomeInput: document.getElementById('net-income'),
        expenseList: document.getElementById('expense-list'),
        addExpenseForm: document.getElementById('add-expense-form'),
        totalExpensesEl: document.getElementById('total-expenses'),
        finalBalanceEl: document.getElementById('final-balance'),
        toggleBalanceVisibilityBtn: document.getElementById('toggle-balance-visibility'),
        savingsGoalSetup: document.getElementById('savings-goal-setup'),
        savingsGoalProgress: document.getElementById('savings-goal-progress'),
        savingsGoalTotalInput: document.getElementById('savings-goal-total-input'),
        savingsGoalSavedInput: document.getElementById('savings-goal-saved-input'),
        editSavingsGoalBtn: document.getElementById('edit-savings-goal-btn'),
        setSavingsGoalBtn: document.getElementById('set-savings-goal-btn'),
        savingsGoalProgressBarInner: document.getElementById('savings-goal-progress-bar-inner'),
        savingsGoalPercentageText: document.getElementById('savings-goal-percentage-text'),
        savingsGoalRemainingEl: document.getElementById('savings-goal-remaining'),
        monthlySavingsProgress: document.getElementById('monthly-savings-progress'),
        achievementView: document.getElementById('achievement-view'),
        achievementProgress: document.getElementById('achievement-progress'),
        saveAchievementBtn: document.getElementById('save-achievement-btn'),
        editAchievementBtn: document.getElementById('edit-achievement-btn'),
        achievementNameInput: document.getElementById('achievement-name'),
        achievementValueInput: document.getElementById('achievement-value'),
        achievementSavedInput: document.getElementById('achievement-saved'),
        achievementProgressTitle: document.getElementById('achievement-progress-title'),
        achievementProgressBarInner: document.getElementById('achievement-progress-bar-inner'),
        achievementCurrentSavedEl: document.getElementById('achievement-current-saved'),
        achievementTotalNeededEl: document.getElementById('achievement-total-needed'),
        achievementRemainingEl: document.getElementById('achievement-remaining'),
        achievementComplete: document.getElementById('achievement-complete'),
        newAchievementBtn: document.getElementById('new-achievement-btn'),
        monthlyTrackingList: document.getElementById('monthly-tracking-list'),
        archiveMonthBtn: document.getElementById('archive-month-btn'),
        addPreviousMonthBtn: document.getElementById('add-previous-month-btn'),
        archiveMonthFormContainer: document.getElementById('archive-month-form-container'),
    };
    
    attachEventListeners();
    loadFinanceData();
}

function showArchiveButtons(shouldShow) {
    if (shouldShow) {
        dom.archiveMonthBtn.classList.remove('hidden');
        dom.addPreviousMonthBtn.classList.remove('hidden');
    } else {
        dom.archiveMonthBtn.classList.add('hidden');
        dom.addPreviousMonthBtn.classList.add('hidden');
    }
}

function attachEventListeners() {
    dom.netIncomeInput.addEventListener('input', (e) => {
        financeData.netIncome = parseFloat(e.target.value) || 0;
        saveFinanceData();
        updateFinanceUI();
    });

    dom.setSavingsGoalBtn.addEventListener('click', () => {
        const total = parseFloat(dom.savingsGoalTotalInput.value) || 0;
        const saved = parseFloat(dom.savingsGoalSavedInput.value) || 0;

        if (total <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Meta Inválida',
                text: 'Por favor, defina uma meta de poupança maior que zero.',
                confirmButtonColor: 'var(--primary-color)',
                customClass: {
                    popup: 'themed-popup',
                    title: 'themed-title',
                    htmlContainer: 'themed-content'
                }
            });
            return;
        }

        financeData.savingsGoal.total = total;
        financeData.savingsGoal.saved = saved;
        
        saveFinanceData();
        updateSavingsGoalUI();
    });

    dom.editSavingsGoalBtn.addEventListener('click', () => {
        dom.savingsGoalSetup.classList.remove('hidden');
        dom.savingsGoalProgress.classList.add('hidden');
        dom.savingsGoalTotalInput.value = financeData.savingsGoal.total || '';
        dom.savingsGoalSavedInput.value = financeData.savingsGoal.saved || '';
    });

    dom.toggleBalanceVisibilityBtn.addEventListener('click', () => {
        financeData.balanceVisible = !financeData.balanceVisible;
        saveFinanceData();
        updateFinanceUI();
    });

    dom.addExpenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('expense-name');
        const amountInput = document.getElementById('expense-amount');
        const name = nameInput.value.trim();
        const amount = parseFloat(amountInput.value);

        if (name && amount > 0) {
            financeData.expenses.push({ name, amount });
            saveFinanceData();
            updateFinanceUI();
            nameInput.value = '';
            amountInput.value = '';
        }
    });

    dom.expenseList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-expense-btn')) {
            const index = parseInt(e.target.dataset.index, 10);
            financeData.expenses.splice(index, 1);
            saveFinanceData();
            updateFinanceUI();
        }
    });
    
    dom.saveAchievementBtn.addEventListener('click', () => {
        const name = dom.achievementNameInput.value.trim();
        const needed = parseFloat(dom.achievementValueInput.value) || 0;
        const saved = parseFloat(dom.achievementSavedInput.value) || 0;

        if (name && needed > 0) {
            financeData.achievement = { name, needed, saved };
            saveFinanceData();
            updateAchievementUI();
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Dados Incompletos',
                text: 'Por favor, preencha o nome e um valor válido para o objetivo.',
                confirmButtonColor: 'var(--primary-color)',
                customClass: {
                    popup: 'themed-popup',
                    title: 'themed-title',
                    htmlContainer: 'themed-content'
                }
            });
        }
    });

    dom.editAchievementBtn.addEventListener('click', () => {
        dom.achievementView.classList.remove('hidden');
        dom.achievementProgress.classList.add('hidden');
    });

    dom.newAchievementBtn.addEventListener('click', () => {
        financeData.achievement = { name: '', needed: 0, saved: 0 };
        dom.achievementNameInput.value = '';
        dom.achievementValueInput.value = '';
        dom.achievementSavedInput.value = '';
        saveFinanceData();
        updateAchievementUI();
        if (globalState.performance.achievements['blindagem-financeira']) {
             // If already achieved, don't reset the count
        } else {
             financeData.completedFinanceGoals = 0; // Reset for new goal attempt
        }
    });

    dom.monthlyTrackingList.addEventListener('click', handleMonthlyListClick);

    dom.archiveMonthBtn.addEventListener('click', () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const totalExpenses = financeData.expenses.reduce((sum, exp) => sum + exp.amount, 0);

        const recordData = {
            year,
            month,
            data: { income: financeData.netIncome, expenses: totalExpenses },
            isNew: true,
            key: `new-${Date.now()}`
        };
        
        dom.archiveMonthFormContainer.innerHTML = generateMonthRecordForm(recordData);
        dom.archiveMonthFormContainer.classList.remove('hidden');
        showArchiveButtons(false);
        
        // Attach listener for the newly created form
        const form = dom.archiveMonthFormContainer.querySelector('.edit-month-form');
        form.addEventListener('click', (e) => {
            if(e.target.classList.contains('save-month-btn')) {
                handleSaveMonth(form, true);
            }
            if(e.target.classList.contains('cancel-edit-btn')) {
                dom.archiveMonthFormContainer.innerHTML = '';
                dom.archiveMonthFormContainer.classList.add('hidden');
                showArchiveButtons(true);
            }
        });
    });

    dom.addPreviousMonthBtn.addEventListener('click', () => {
        const lastMonthDate = new Date();
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
        const year = lastMonthDate.getFullYear();
        const month = lastMonthDate.getMonth() + 1;

        const recordData = {
            year,
            month,
            data: { income: 0, expenses: 0 }, // Blank data for manual entry
            isNew: true,
            key: `new-${Date.now()}`
        };

        dom.archiveMonthFormContainer.innerHTML = generateMonthRecordForm(recordData);
        dom.archiveMonthFormContainer.classList.remove('hidden');
        showArchiveButtons(false);
        
        // Attach listener for the newly created form
        const form = dom.archiveMonthFormContainer.querySelector('.edit-month-form');
        form.addEventListener('click', (e) => {
            if(e.target.classList.contains('save-month-btn')) {
                handleSaveMonth(form, true);
            }
            if(e.target.classList.contains('cancel-edit-btn')) {
                dom.archiveMonthFormContainer.innerHTML = '';
                dom.archiveMonthFormContainer.classList.add('hidden');
                showArchiveButtons(true);
            }
        });
    });
}

function handleMonthlyListClick(e) {
    const li = e.target.closest('li.monthly-record');
    if (!li) return;
    
    const key = li.dataset.key;
    const view = li.querySelector('.record-view');
    const editFormEl = li.querySelector('.edit-month-form');

    if (e.target.classList.contains('edit-month-btn')) {
        view.classList.add('hidden');
        editFormEl.classList.remove('hidden');
    }

    if (e.target.classList.contains('delete-month-btn')) {
        const monthName = view.querySelector('.month-name').textContent;
        Swal.fire({
            title: `Excluir ${monthName}?`,
            text: "Esta ação não poderá ser desfeita.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'themed-popup',
                title: 'themed-title',
                htmlContainer: 'themed-content'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                delete financeData.monthlyTracking[key];
                saveFinanceData();
                updateMonthlyTrackingUI();
                Swal.fire({
                    title: 'Excluído!',
                    text: `O registro de ${monthName} foi removido.`,
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
    }

    if (e.target.classList.contains('cancel-edit-btn')) {
        view.classList.remove('hidden');
        editFormEl.classList.add('hidden');
    }

    if (e.target.classList.contains('save-month-btn')) {
        handleSaveMonth(editFormEl, false, key);
    }
}

function handleSaveMonth(formEl, isNewFromArchive, originalKey = null) {
    const monthSelect = formEl.querySelector('.edit-month-select');
    const yearInput = formEl.querySelector('.edit-year-input');
    const incomeInput = formEl.querySelector('.edit-income');
    const expensesInput = formEl.querySelector('.edit-expenses');
    
    const newYear = parseInt(yearInput.value) || new Date().getFullYear();
    const newMonth = parseInt(monthSelect.value);
    const newKey = `${newYear}-${String(newMonth).padStart(2, '0')}`;

    if (financeData.monthlyTracking[newKey] && (isNewFromArchive || newKey !== originalKey)) {
        Swal.fire({
            icon: 'error',
            title: 'Mês Duplicado',
            text: 'Este mês já existe. Por favor, escolha outro mês ou edite o registro existente.',
            confirmButtonColor: 'var(--primary-color)',
            customClass: {
                popup: 'themed-popup',
                title: 'themed-title',
                htmlContainer: 'themed-content'
            }
        });
        return;
    }

    const newIncome = parseFloat(incomeInput.value) || 0;
    const newExpenses = parseFloat(expensesInput.value) || 0;

    if (!isNewFromArchive && originalKey && newKey !== originalKey) {
        delete financeData.monthlyTracking[originalKey];
    }
    
    const newBalance = newIncome - newExpenses;
    if (newBalance > 0 && !financeData.monthlyTracking[newKey]) {
        if (!globalState.performance.achievements['saldo-positivo']) {
            globalState.performance.achievements['saldo-positivo'] = new Date().toISOString().split('T')[0];
            logAchievementCompletion('Saldo Positivo', 'saldo-positivo');
        }
    }

    financeData.monthlyTracking[newKey] = {
        income: newIncome,
        expenses: newExpenses,
    };
    
    if(isNewFromArchive) {
        Swal.fire({
            title: 'Mês Arquivado!',
            text: "Seus resultados foram adicionados ao histórico mensal. Deseja limpar a lista de gastos atual para começar um novo período?",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: 'var(--primary-color)',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Sim, limpar!',
            cancelButtonText: 'Não, manter',
            customClass: {
                popup: 'themed-popup',
                title: 'themed-title',
                htmlContainer: 'themed-content'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                financeData.expenses = [];
                saveFinanceData();
                updateFinanceUI(); // To update expense list if cleared
            }
        });

        dom.archiveMonthFormContainer.innerHTML = '';
        dom.archiveMonthFormContainer.classList.add('hidden');
        showArchiveButtons(true);
    }
    
    saveFinanceData();
    if (!isNewFromArchive) {
        updateFinanceUI();
    }
    updateMonthlyTrackingUI();
}

function saveFinanceData() {
    globalState.finance = financeData;
    saveGlobalState();
}

export function loadFinanceData() {
    if (globalState.finance) {
        financeData = JSON.parse(JSON.stringify(globalState.finance));
    } else {
        financeData = JSON.parse(JSON.stringify(defaultGlobalState.finance));
    }
    
    dom.netIncomeInput.value = financeData.netIncome || '';
    dom.savingsGoalTotalInput.value = financeData.savingsGoal.total || '';
    dom.savingsGoalSavedInput.value = financeData.savingsGoal.saved || '';
    
    dom.achievementNameInput.value = financeData.achievement.name || '';
    dom.achievementValueInput.value = financeData.achievement.needed || '';
    dom.achievementSavedInput.value = financeData.achievement.saved || '';

    updateFinanceUI();
    updateSavingsGoalUI();
    updateAchievementUI();
    updateMonthlyTrackingUI();
}
    
function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function updateFinanceUI() {
    dom.expenseList.innerHTML = '';
    if (financeData.expenses.length === 0) {
         dom.expenseList.innerHTML = `<p class="empty-state">Nenhum gasto adicionado ainda.</p>`;
    } else {
        financeData.expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="expense-item-name">${expense.name}</span>
                <span class="expense-item-amount">${formatCurrency(expense.amount)}</span>
                <button class="delete-expense-btn" data-index="${index}">🗑️</button>
            `;
            dom.expenseList.appendChild(li);
        });
    }
    
    const totalExpenses = financeData.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const finalBalance = financeData.netIncome - totalExpenses;
    
    dom.totalExpensesEl.textContent = formatCurrency(totalExpenses);

    if (financeData.balanceVisible) {
        dom.finalBalanceEl.textContent = formatCurrency(finalBalance);
        dom.toggleBalanceVisibilityBtn.textContent = '👁️';
    } else {
        dom.finalBalanceEl.textContent = '••••••';
        dom.toggleBalanceVisibilityBtn.textContent = '🙈';
    }
    dom.finalBalanceEl.className = finalBalance >= 0 ? 'balance-positive' : 'balance-negative';
    
    if(dom.monthlySavingsProgress) dom.monthlySavingsProgress.classList.add('hidden');
}

function updateSavingsGoalUI() {
    const { saved, total } = financeData.savingsGoal;

    if (total > 0) {
        dom.savingsGoalSetup.classList.add('hidden');
        dom.savingsGoalProgress.classList.remove('hidden');

        const progressPercent = Math.min((saved / total) * 100, 100);
        dom.savingsGoalProgressBarInner.style.width = `${progressPercent}%`;
        dom.savingsGoalProgressBarInner.textContent = `${progressPercent.toFixed(0)}%`;

        dom.savingsGoalPercentageText.textContent = `Você já alcançou ${progressPercent.toFixed(0)}% da sua meta de poupança.`;

        const remaining = Math.max(0, total - saved);
        dom.savingsGoalRemainingEl.textContent = `Faltam ${formatCurrency(remaining)} para atingir seu objetivo.`;
    } else {
        dom.savingsGoalSetup.classList.remove('hidden');
        dom.savingsGoalProgress.classList.add('hidden');
        dom.savingsGoalTotalInput.value = '';
        dom.savingsGoalSavedInput.value = '';
    }
}

function updateAchievementUI() {
    const ach = financeData.achievement;
    if (!ach || !ach.name || ach.needed <= 0) {
        dom.achievementView.classList.remove('hidden');
        dom.achievementProgress.classList.add('hidden');
        return;
    }

    dom.achievementView.classList.add('hidden');
    dom.achievementProgress.classList.remove('hidden');

    dom.achievementProgressTitle.textContent = ach.name;
    dom.achievementCurrentSavedEl.textContent = formatCurrency(ach.saved);
    dom.achievementTotalNeededEl.textContent = formatCurrency(ach.needed);

    const progressPercent = ach.needed > 0 ? Math.min((ach.saved / ach.needed) * 100, 100) : 0;
    dom.achievementProgressBarInner.style.width = `${progressPercent}%`;
    dom.achievementProgressBarInner.textContent = `${progressPercent.toFixed(0)}%`;

    const remaining = Math.max(0, ach.needed - ach.saved);
    dom.achievementRemainingEl.textContent = `Faltam ${formatCurrency(remaining)} para alcançar sua conquista.`;
    
    const alreadyAchieved = globalState.performance.achievements['blindagem-financeira'];

    if (remaining === 0 && ach.needed > 0 && !alreadyAchieved) {
        dom.achievementComplete.classList.remove('hidden');
        dom.editAchievementBtn.classList.add('hidden');
        logAchievementCompletion('Blindagem Financeira', 'blindagem-financeira');
    } else {
        dom.achievementComplete.classList.add('hidden');
        dom.editAchievementBtn.classList.remove('hidden');
    }
}

const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

function generateMonthRecordForm({ year, month, data, isNew = false, key = null }) {
    const monthOptions = monthNames.map((name, index) => 
        `<option value="${index + 1}" ${month === index + 1 ? 'selected' : ''}>${name}</option>`
    ).join('');

    const formId = `form-${key || Math.random()}`;

    return `
        <div class="edit-month-form">
             <form id="${formId}">
                <div class="month-selector-group">
                    <select class="edit-month-select">${monthOptions}</select>
                    <input type="number" class="edit-year-input" value="${year}" placeholder="Ano">
                </div>
                <div class="finance-input-group">
                    <label>Entrada Total (R$)</label>
                    <input type="number" class="finance-input edit-income" value="${data.income}" step="0.01">
                </div>
                <div class="finance-input-group">
                    <label>Saída Total (R$)</label>
                    <input type="number" class="finance-input edit-expenses" value="${data.expenses}" step="0.01">
                </div>
                <div class="edit-form-actions">
                    <button type="button" class="save-month-btn">Salvar</button>
                    <button type="button" class="cancel-edit-btn">Cancelar</button>
                </div>
            </form>
        </div>
    `;
}

function updateMonthlyTrackingUI() {
    // Hide archive form and show button by default
    dom.archiveMonthFormContainer.innerHTML = '';
    dom.archiveMonthFormContainer.classList.add('hidden');
    showArchiveButtons(true);

    // Display Historical Data
    dom.monthlyTrackingList.innerHTML = '';
    const sortedKeys = Object.keys(financeData.monthlyTracking || {}).sort().reverse();

    if (sortedKeys.length === 0) {
        dom.monthlyTrackingList.innerHTML = `<p class="empty-state">Nenhum histórico mensal para exibir ainda. Clique em "Arquivar" para salvar seu primeiro registro.</p>`;
        return;
    }
    
    for (const key of sortedKeys) {
        const [year, month] = key.split('-').map(Number);
        const monthData = financeData.monthlyTracking[key];
        const balance = monthData.income - monthData.expenses;
        const savings = monthData.income > 0 ? (balance / monthData.income) * 100 : 0;
        const balanceClass = balance >= 0 ? 'balance-positive' : 'balance-negative';
        const monthName = `${monthNames[month - 1]}/${year}`;

        const li = document.createElement('li');
        li.className = `monthly-record ${balanceClass}`;
        li.dataset.key = key;
        
        li.innerHTML = `
            <div class="record-view">
                <span class="month-name">${monthName}</span>
                <span class="month-balance">${formatCurrency(balance)}</span>
                ${balance > 0 && savings > 0 ? `<span class="month-savings">Economia de ${savings.toFixed(0)}%</span>` : ''}
                <div class="record-actions">
                    <button class="edit-month-btn">✏️</button>
                    <button class="delete-month-btn">🗑️</button>
                </div>
            </div>
            <div class="edit-month-form hidden">
                ${generateMonthRecordForm({ year, month, data: monthData, isNew: false, key })}
            </div>
        `;
        
        dom.monthlyTrackingList.appendChild(li);
    }
}