export const defaultHabits = {
    matinal: {
        title: "🧼 Rotina Matinal",
        tasks: ["Meditar por 10 minutos", "Ler 15 páginas de um livro", "Planejar o dia"]
    },
    profissional: {
        title: "💼 Desenvolvimento Profissional",
        tasks: ["Estudar programação por 1 hora", "Atualizar o LinkedIn", "Fazer networking"]
    },
    noturna: {
        title: "🌙 Rotina Noturna",
        tasks: ["Evitar telas 1h antes de dormir", "Escrever um diário de gratidão", "Preparar a roupa do dia seguinte"]
    }
};

export const workoutPlans = {
    masculino: {
        'ganhar-massa': {
            title: 'Masculino – Ganhar Massa',
            workouts: {
                'Treino A: Peito, Ombro, Tríceps': ['Supino reto com barra (4x10)', 'Desenvolvimento com halteres (4x10)', 'Tríceps testa (3x12)', 'Crucifixo reto (3x12)', 'Elevação lateral (3x12)', 'Tríceps corda (3x15)'],
                'Treino B: Costas, Bíceps, Antebraço': ['Remada curvada (4x10)', 'Puxada aberta frente (4x10)', 'Rosca direta barra (3x12)', 'Rosca martelo (3x12)', 'Rosca inversa (3x15)'],
                'Treino C: Pernas Completas + Abdômen': ['Agachamento livre (4x12)', 'Cadeira extensora (4x15)', 'Mesa flexora (4x15)', 'Abdômen infra solo (3x20)', 'Prancha isométrica (3x40s)']
            }
        },
        'perder-peso': {
             title: 'Masculino – Perder Peso',
             workouts: {
                'Treino A: Cardio + Peito e Core': ['Burpees (3x12)', 'Supino reto (4x10)', 'Mountain climber (3x30s)', 'Flexões (3x15)', 'Abdominais retos (3x20)'],
                'Treino B: Cardio + Costas e Braços': ['Pular corda (4x1min)', 'Puxada frente (3x12)', 'Rosca alternada (3x12)', 'Tríceps banco (3x12)', 'Prancha com toque de ombro (3x40s)'],
                'Treino C: Pernas com Intensidade': ['Agachamento com salto (4x12)', 'Avanço alternado (4x12)', 'Cadeira extensora (3x15)', 'Abdominal bicicleta (3x30s)', 'Polichinelos (3x1min)'],
             }
        },
    },
    feminino: {
        'ganhar-massa': {
             title: 'Feminino – Ganhar Massa',
             workouts: {
                'Treino A: Quadríceps, Adutores, Panturrilha': ['Agachamento com halter (4x12)', 'Cadeira extensora (4x15)', 'Adutora (3x15 cada perna)', 'Panturrilha em pé (3x20)'],
                'Treino B: Membros Superiores': ['Supino reto (3x12)', 'Desenvolvimento halter (3x12)', 'Tríceps banco (3x15)', 'Remada baixa (3x12)', 'Rosca direta (3x12)'],
                'Treino C: Posterior, Glúteos e Abdômen': ['Stiff com halteres (4x12)', 'Cadeira flexora (4x15)', 'Glúteo no cabo (3x15 cada perna)', 'Elevação de quadril (3x20)', 'Abdominais canivete (3x15)'],
             }
        },
        'perder-peso': {
             title: 'Feminino – Perder Peso',
             workouts: {
                'Treino A: Cardio, Core e Peito': ['Burpees (3x10)', 'Flexão de joelhos (3x12)', 'Mountain climber (3x30s)', 'Abdominais retos (3x20)', 'Prancha isométrica (3x40s)'],
                'Treino B: Cardio, Costas e Braços': ['Pular corda (4x1min)', 'Remada com halter (3x15)', 'Rosca alternada (3x12)', 'Tríceps banco (3x12)', 'Elevação pélvica (3x20)'],
                'Treino C: Pernas com Intensidade': ['Agachamento com salto (4x12)', 'Avanço alternado (4x12)', 'Abdominal bicicleta (3x30s)', 'Polichinelos (3x1min)'],
             }
        },
    }
};

export const dietPlans = {
    'ganhar-peso': {
        title: 'Dieta para Ganho de Peso',
        meals: {
            'Café da manhã': 'Pão integral com ovos mexidos + Vitamina de banana com aveia',
            'Almoço': 'Arroz, feijão, carne grelhada, batata doce, legumes refogados',
            'Lanche da tarde': 'Iogurte natural + frutas + mix de castanhas',
            'Jantar': 'Macarrão integral + frango desfiado + salada + azeite',
        }
    },
    'perder-peso': {
        title: 'Dieta para Perda de Peso',
        meals: {
            'Café da manhã': 'Ovos cozidos + chá verde + 1 fruta',
            'Almoço': 'Arroz integral, feijão, frango grelhado, salada',
            'Lanche da tarde': '1 iogurte desnatado ou fruta com aveia',
            'Jantar': 'Omelete + legumes no vapor + chá de camomila',
        }
    }
};

export const achievementsList = {
    'executor-3-dias': { icon: '🥉', name: 'Executor 3 Dias', description: 'Primeiros 3 dias consecutivos de tarefas.' },
    'soldado-1-pct': { icon: '🎖️', name: 'Soldado 1%', description: '7 dias consecutivos de tarefas.' },
    'sargento-1-pct': { icon: '🏅', name: 'Sargento 1%', description: '15 dias consecutivos de tarefas.' },
    'tenente-1-pct': { icon: '🏆', name: 'Tenente 1%', description: '30 dias consecutivos de tarefas.' },
    'coronel-1-pct': { icon: '👑', name: 'Coronel 1%', description: '60 dias consecutivos de tarefas.' },
    'mente-de-aco': { icon: '🧠', name: 'Mente de Aço', description: '30 dias com mais de 80% da rotina concluída.' },
    'trimestre-blindado': { icon: '🛡️', name: 'Trimestre Blindado', description: '3 meses consecutivos com saldo positivo.' },
    'blindagem-financeira': { icon: '💰', name: 'Blindagem Financeira', description: 'Primeira meta financeira cumprida.' },
    'saldo-positivo': { icon: '📈', name: 'Saldo Positivo', description: 'Finalizar um mês com saldo positivo.' },
};