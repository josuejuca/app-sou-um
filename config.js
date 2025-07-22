export const defaultHabits = {
    matinal: {
        title: " Rotina Matinal",
        tasks: ["Meditar por 10 minutos", "Ler 15 páginas de um livro", "Planejar o dia"]
    },
    profissional: {
        title: " Desenvolvimento Profissional",
        tasks: ["Estudar programação por 1 hora", "Atualizar o LinkedIn", "Fazer networking"]
    },
    noturna: {
        title: " Rotina Noturna",
        tasks: ["Evitar telas 1h antes de dormir", "Escrever um diário de gratidão", "Preparar a roupa do dia seguinte"]
    }
};

export const workoutPlans = {
    masculino: {
        'ganhar-massa': {
            iniciante: {
                title: 'Masculino – Ganhar Massa (Iniciante)',
                workouts: {
                    'Treino A – Peito, Ombro e Tríceps': [
                        'Supino reto barra – 4x10',
                        'Supino inclinado halteres – 3x12',
                        'Crucifixo reto – 3x15',
                        'Desenvolvimento militar halteres – 3x10',
                        'Elevação lateral – 3x15',
                        'Tríceps testa – 3x12',
                        'Tríceps corda – 3x15'
                    ],
                    'Treino B – Costas, Bíceps e Antebraço': [
                        'Puxada aberta – 4x10',
                        'Remada baixa – 4x12',
                        'Rosca direta – 3x12',
                        'Rosca alternada – 3x12',
                        'Rosca martelo – 3x15',
                        'Rosca inversa – 2x20'
                    ],
                    'Treino C – Pernas Completas + Abdômen': [
                        'Agachamento livre – 4x10',
                        'Leg press – 4x12',
                        'Cadeira extensora – 3x15',
                        'Mesa flexora – 3x15',
                        'Panturrilha – 3x20',
                        'Abdominal infra – 3x20',
                        'Prancha – 3x30s'
                    ]
                }
            },
            intermediario: {
                title: 'Masculino – Ganhar Massa (Intermediário)',
                workouts: {
                    'A – Peito + Tríceps': ['Supino reto – 4x8', 'Supino inclinado – 3x10', 'Crucifixo – 3x12', 'Tríceps banco – 3x15', 'Tríceps corda – 3x12', 'Tríceps francês – 3x12'],
                    'B – Costas + Bíceps': ['Barra fixa – 3x até falha', 'Remada curvada – 4x10', 'Rosca direta – 4x10', 'Rosca concentrada – 3x12'],
                    'C – Pernas completas': ['Agachamento – 4x10', 'Cadeira extensora – 4x15', 'Leg press – 4x12', 'Stiff – 3x12', 'Panturrilha – 4x20'],
                    'D – Ombros, Trapézio e Abdômen': ['Desenvolvimento militar – 4x10', 'Elevação lateral – 3x15', 'Encolhimento – 4x15', 'Abdominais com peso – 3x20']
                }
            },
            avancado: {
                title: 'Masculino – Ganhar Massa (Avançado)',
                workouts: {
                    'A - Peito + Tríceps': ['Supino reto (4x8-10)', 'Supino inclinado (3x10)', 'Crucifixo (3x12)', 'Pullover (2x15)', 'Tríceps francês (3x12)', 'Tríceps corda (3x15)', 'Tríceps banco (3x até falha)'],
                    'B - Costas + Bíceps': ['Barra fixa (3x até falha)', 'Remada curvada (4x10)', 'Remada unilateral (3x12)', 'Rosca direta (4x10)', 'Rosca alternada (3x12)', 'Rosca concentrada (3x15)'],
                    'C - Quadríceps + Adutores + Panturrilha': ['Agachamento livre (4x10)', 'Leg press (4x12)', 'Cadeira extensora (3x15)', 'Cadeira adutora (3x15)', 'Panturrilha em pé (4x20)'],
                    'D - Ombros + Trapézio + Core': ['Desenvolvimento militar (4x10)', 'Elevação lateral (4x15)', 'Elevação frontal (3x12)', 'Encolhimento com halteres (4x15)', 'Prancha (3x1min)', 'Abdominal V-up (3x20)', 'Oblíquo com anilha (3x15 cada lado)'],
                    'E - Posterior + Glúteo + Abdômen': ['Stiff (4x12)', 'Mesa flexora (4x15)', 'Hip thrust (glúteo) (4x12)', 'Avanço (3x12 cada perna)', 'Abdominal suspenso (3x até falha)', 'Abdominal canivete (3x20)', 'Prancha lateral (3x45s cada lado)']
                }
            }
        },
        'perder-peso': {
            iniciante: {
                title: 'Masculino – Perder Peso (Iniciante)',
                workouts: {
                    'A – Peito, Ombros, Cárdio, Abdominal': [
                        'Supino reto (4x10)', 'Desenvolvimento com halteres (4x10)', 'Flexões (3x15)',
                        'Polichinelo (3x45s)', 'Abdominais retos (3x20)', 'Prancha (3x40s)'
                    ],
                    'B – Costas, Bíceps, Core': [
                        'Puxada aberta frente (4x10)', 'Remada curvada (4x10)', 'Rosca direta (3x12)',
                        'Mountain climber (3x40s)', 'Abdominal bicicleta (3x20)', 'Elevação de pernas (3x15)'
                    ],
                    'C – Pernas completas, Funcional': [
                        'Agachamento livre (4x12)', 'Cadeira extensora (4x15)', 'Mesa flexora (4x15)',
                        'Burpees (3x10)', 'Avanço (3x12 cada perna)', 'Panturrilha (3x20)'
                    ]
                }
            },
            intermediario: {
                title: 'Masculino – Perder Peso (Intermediário)',
                workouts: {
                    'A – HIIT + Peito': ['Tiro de corrida 8x(30s ON / 30s OFF)', 'Supino inclinado (4x12)', 'Crucifixo reto (3x15)', 'Flexão (3x até falha)'],
                    'B – HIIT + Costas': ['Pular corda 10x(1min ON / 30s OFF)', 'Barra fixa (3x até falha)', 'Remada cavalinho (4x12)', 'Puxada alta (3x15)'],
                    'C – Glúteo + Posterior': ['Stiff (4x12)', 'Mesa flexora (4x15)', 'Elevação pélvica (4x15)', 'Agachamento búlgaro (3x12 cada perna)'],
                    'D – Core + Funcional Total': ['Abdominal remador (4x20)', 'Prancha com rotação (3x15 cada lado)', 'Swing com kettlebell (4x20)', 'Empurrar sled (3x20m)']
                }
            },
            avancado: {
                title: 'Masculino – Perder Peso (Avançado)',
                workouts: {
                    'A – Metabólico (Segunda)': ['Agachamento com salto (4x15)', 'Flexão de braço (4x15)', 'Remada alta (4x15)', 'Burpee (4x10)', 'Circuito: 4 voltas, 1min descanso entre elas'],
                    'B – Metabólico (Terça)': ['Avanço alternado (4x12 cada perna)', 'Desenvolvimento militar (4x12)', 'Abdominal remador (4x20)', 'Pular corda (4x1min)', 'Circuito: 4 voltas, 1min descanso entre elas'],
                    'C – Metabólico (Quarta)': ['Stiff (4x15)', 'Tríceps banco (4x15)', 'Elevação de joelhos (4x20)', 'Polichinelo (4x1min)', 'Circuito: 4 voltas, 1min descanso entre elas'],
                    'D – Metabólico (Quinta)': ['Levantamento terra sumo (4x12)', 'Puxada frontal (4x15)', 'Prancha (4x1min)', 'Mountain climber (4x45s)', 'Circuito: 4 voltas, 1min descanso entre elas'],
                    'E – Metabólico (Sexta)': ['Cadeira extensora (4x20)', 'Rosca direta (4x15)', 'Abdominal bicicleta (4x30s)', 'Corrida estacionária (4x1min)', 'Circuito: 4 voltas, 1min descanso entre elas']
                }
            }
        },
    },
    feminino: {
        'ganhar-massa': {
            iniciante: {
                title: 'Feminino – Ganhar Massa (Iniciante)',
                workouts: {
                    'A – Quadríceps + Adutores + Panturrilha': ['Agachamento com halter (4x12)', 'Cadeira extensora (4x15)', 'Adutora (3x15 cada perna)', 'Panturrilha em pé (3x20)'],
                    'B – Superiores + Core': ['Supino reto com halteres (3x12)', 'Desenvolvimento com halteres (3x12)', 'Tríceps banco (3x15)', 'Remada baixa (3x12)', 'Prancha (3x45s)'],
                    'C – Posterior + Glúteo + Abdômen': ['Stiff com halteres (4x12)', 'Cadeira flexora (4x15)', 'Glúteo no cabo (3x15 cada perna)', 'Elevação de quadril (3x20)', 'Abdominais canivete (3x15)']
                }
            },
            intermediario: {
                title: 'Feminino – Ganhar Massa (Intermediário)',
                workouts: {
                    'A – Quadríceps + Glúteo Médio': ['Agachamento livre (4x10)', 'Leg Press 45 (4x12)', 'Cadeira extensora (3x15)', 'Cadeira abdutora (4x20)'],
                    'B – Posterior + Glúteo Máximo': ['Stiff (4x12)', 'Mesa flexora (4x15)', 'Elevação pélvica com barra (4x12)', 'Agachamento búlgaro (3x12 cada perna)'],
                    'C – Superiores Completo': ['Puxada frontal (4x12)', 'Remada unilateral (3x12)', 'Supino inclinado com halteres (4x12)', 'Elevação lateral (3x15)', 'Tríceps corda (3x15)'],
                    'D – Core + Abdômen': ['Prancha isométrica (4x1min)', 'Abdominal infra na paralela (3x15)', 'Rotação de tronco com cabo (3x15 cada lado)', 'Abdominal bicicleta (3x30s)']
                }
            },
            avancado: {
                title: 'Feminino – Ganhar Massa (Avançado)',
                workouts: {
                    'A – Glúteo Máximo + Posterior': ['Elevação pélvica (5x10-12)', 'Stiff (4x12)', 'Agachamento búlgaro (4x12 cada perna)', 'Mesa flexora (4x15)'],
                    'B – Quadríceps + Adutores + Panturrilha': ['Agachamento livre (5x10)', 'Leg press (4x12)', 'Cadeira extensora (4x15 + drop set na última)', 'Cadeira adutora (4x20)', 'Panturrilha sentada (4x20)'],
                    'C – Costas + Ombros': ['Barra fixa com auxílio (4x até falha)', 'Remada curvada (4x12)', 'Puxador alto (3x15)', 'Desenvolvimento militar (4x10)', 'Elevação lateral (4x15)'],
                    'D – Glúteo Médio + Core': ['Cadeira abdutora (5x20)', 'Abdução de quadril no cabo (4x15 cada lado)', 'Prancha lateral (4x45s cada lado)', 'Abdominal rolinho (3x12)'],
                    'E – Foco em Pontos Fracos + Cárdio Leve': ['Exercícios isolados para panturrilha/ombro/etc.', '20 minutos de escada ou caminhada inclinada']
                }
            }
        },
        'perder-peso': {
            iniciante: {
                title: 'Feminino – Perder Peso (Iniciante)',
                workouts: {
                    'A – Inferior + Abdominal': ['Agachamento com peso corporal (4x15)', 'Avanço (3x12 cada perna)', 'Elevação pélvica (3x20)', 'Abdominais retos (3x20)'],
                    'B – Superiores + Core': ['Flexão de joelhos (3x12)', 'Remada com halter (3x15)', 'Elevação lateral (3x15)', 'Prancha (3x40s)'],
                    'C – Funcional leve + Cárdio': ['Polichinelos (4x45s)', 'Agachamento com salto (3x12)', 'Burpees adaptados (3x10)', '20 min de bicicleta ou elíptico']
                }
            },
            intermediario: {
                title: 'Feminino – Perder Peso (Intermediário)',
                workouts: {
                    'A – HIIT + Pernas': ['Tiros de corrida 8x(30s ON/30s OFF)', 'Agachamento livre (4x15)', 'Leg press (4x15)', 'Cadeira extensora (3x20)'],
                    'B – Abdômen + Core': ['Abdominal supra com peso (4x20)', 'Elevação de pernas (4x15)', 'Prancha com rotação (3x12 cada lado)', 'Abdominal bicicleta (3x40s)'],
                    'C – Glúteo com circuito': ['Elevação pélvica (4x20)', 'Agachamento sumo (4x15)', 'Cadeira abdutora (4x20)', 'Coice no cabo (3x15 cada perna)', 'Fazer em circuito com 3 voltas'],
                    'D – Funcional com peso corporal': ['Burpees (4x12)', 'Flexões (4x10)', 'Mountain climbers (4x45s)', 'Agachamento com salto (4x15)', 'Prancha (4x1min)']
                }
            },
            avancado: {
                title: 'Feminino – Perder Peso (Avançado)',
                workouts: {
                    'A – Glúteo + Core': ['Elevação pélvica (5x15)', 'Agachamento búlgaro (4x12)', 'Abdominal V-Up (4x20)', 'Prancha lateral (4x45s)'],
                    'B – Pernas + Cárdio': ['Agachamento livre (5x15)', 'Avanço (4x15)', 'Stiff (4x15)', '30 min de corrida intervalada'],
                    'C – Superiores + Core': ['Puxada frontal (4x15)', 'Supino com halteres (4x15)', 'Desenvolvimento (4x15)', 'Abdominal remador (4x25)'],
                    'D – Abdômen dinâmico': ['Circuito de 5 exercícios de abdômen (ex: canivete, bicicleta, infra, supra, prancha)', '3 voltas, 30s cada exercício'],
                    'E – Funcional total': ['Circuito com: Burpees, Swing com Kettlebell, Salto na caixa, Corda naval', '5 voltas, 45s ON / 15s OFF por exercício']
                }
            }
        }
    }
};

export const dietPlans = {
    'perder-peso': {
        'opcao1-1300kcal': {
            title: 'Opção 1 – 1300 kcal (Déficit forte)',
            description: 'Foco em proteína magra, pouca gordura e carboidratos controlados para um resultado mais rápido.',
            meals: {
                '🍳 Café da Manhã': 'Omelete de 2 claras com espinafre + Chá verde.',
                '🥪 Lanche da Manhã': '1 fatia de melão ou 10 amêndoas.',
                '🍛 Almoço': '100g de filé de frango grelhado + Salada de folhas verdes à vontade + 1 colher de sopa de azeite.',
                '🥪 Lanche da Tarde': '1 iogurte desnatado.',
                '🥗 Jantar': 'Sopa de legumes (sem batata) com 80g de frango desfiado.',
                '🌙 Ceia': 'Chá de camomila ou hortelã.'
            }
        },
        'opcao2-1500kcal': {
            title: 'Opção 2 – 1500 kcal (Déficit moderado)',
            description: 'Dieta balanceada e sustentável para perda de peso gradual e saudável.',
            meals: {
                '🍳 Café da Manhã': '2 ovos cozidos + 1 banana pequena com canela.',
                '🥪 Lanche da Manhã': '1 maçã.',
                '🍛 Almoço': '120g de peixe grelhado + 3 colheres de sopa de arroz integral + Brócolis e cenoura cozidos.',
                '🥪 Lanche da Tarde': '1 pote de iogurte natural com 1 colher de sopa de aveia.',
                '🥗 Jantar': 'Salada completa com 1 lata de atum (em água), alface, tomate, pepino e grão de bico.',
                '🌙 Ceia': '1 xícara de leite desnatado.'
            }
        }
    },
    'manter-peso': {
        'opcao1-1500kcal': {
            title: 'Opção 1 – 1500 kcal (Manutenção leve)',
            description: 'Ideal para quem tem um estilo de vida menos ativo e quer manter o peso sem excessos.',
            meals: {
                '🍳 Café da Manhã': 'Crepioca (1 ovo + 2 colheres de tapioca) com queijo minas.',
                '🥪 Lanche da Manhã': 'Mix de frutas (1 xícara).',
                '🍛 Almoço': '120g de frango grelhado + 4 colheres de sopa de arroz + 2 de feijão + Salada colorida.',
                '🥗 Jantar': 'Omelete de 2 ovos com queijo e tomate + Salada de folhas.',
                '🌙 Ceia': 'Chá de erva-doce.'
            }
        },
        'opcao2-1700kcal': {
            title: 'Opção 2 – 1700 kcal (Manutenção ativa)',
            description: 'Perfeita para quem pratica atividade física regularmente e precisa de mais energia.',
            meals: {
                '🍳 Café da Manhã': 'Vitamina com 200ml de leite + 1 banana + 1 scoop de whey protein.',
                '🥪 Lanche da Manhã': '1 iogurte grego + 10 castanhas.',
                '🍛 Almoço': '150g de carne magra (patinho) + 1 batata doce média assada + Legumes refogados.',
                '🥪 Lanche da Tarde': '2 fatias de pão integral com pasta de amendoim.',
                '🥗 Jantar': '150g de salmão assado com alecrim + Brócolis no vapor.',
                '🌙 Ceia': '1 copo de iogurte natural.'
            }
        }
    },
    'ganhar-peso': {
        'opcao1-2000kcal': {
            title: 'Opção 1 – 2000 kcal (Superávit leve)',
            description: 'Uma dieta equilibrada para ganho de massa muscular de forma limpa e consistente.',
            meals: {
                '🍳 Café da Manhã': 'Pão integral com 3 ovos mexidos + 1 copo de suco de laranja natural.',
                '🥪 Lanche da Manhã': 'Vitamina de banana com 200ml de leite e 2 colheres de aveia.',
                '🍛 Almoço': '150g de filé de frango grelhado + 6 colheres de sopa de arroz + 3 de feijão + Salada.',
                '🥪 Lanche da Tarde': '1 batata doce cozida + 2 colheres de sopa de pasta de amendoim.',
                '🥗 Jantar': 'Macarrão integral com 150g de carne moída (patinho) ao sugo.',
                '🌙 Ceia': '1 iogurte integral com mel.'
            }
        },
        'opcao2-2500kcal': {
            title: 'Opção 2 – 2500 kcal (Superávit intenso)',
            description: 'Para quem busca um ganho de peso mais acelerado, com refeições densas e nutritivas.',
            meals: {
                '🍳 Café da Manhã': 'Panqueca de aveia (2 ovos, 3 colheres de aveia, 1 banana) + 200ml de leite integral.',
                '🥪 Lanche da Manhã': 'Shake com 200ml de leite integral + 1 scoop de whey + 1 colher de pasta de amendoim.',
                '🍛 Almoço': '200g de carne vermelha (alcatra) + 150g de mandioca cozida + Legumes.',
                '🥪 Lanche da Tarde': '4 fatias de pão integral com 100g de frango desfiado e queijo.',
                '🥗 Jantar': '180g de filé de tilápia + Arroz branco (8 colheres) + Lentilha.',
                '🌙 Ceia': 'Vitamina de abacate com 200ml de leite e 1 colher de mel.'
            }
        }
    }
};

export const libraryContent = {
    'manual': {
        title: '📘 Manual Completo da Vida 1% – A Fórmula Para a Sua Melhor Versão',
        content: `
            <p>E se você tivesse um manual para dominar todas as áreas da sua vida?</p>
            <p>O Manual Completo 1% foi criado para pessoas que não querem viver no automático.</p>
            <p>Aqui você vai entender, aplicar e transformar sua rotina com:</p>
            <ul class="library-feature-list">
                <li>Sistemas de hábitos que funcionam</li>
                <li>Técnicas reais de foco e disciplina</li>
                <li>Gestão financeira descomplicada</li>
                <li>Plano de treino e dieta que qualquer um pode seguir</li>
            </ul>
            <p>É um treinamento direto, 100% aplicável, feito para transformar você em alguém raro, produtivo e focado.</p>
            <p class="final-cta"><strong>📍Para viver a sua melhor versão, você só precisa dar o 1° passo!</strong></p>
        `,
        actions: [
            {
                type: 'button',
                text: 'Acesso ao Maestria Pessoal',
                link: 'https://sou1porcento.com.br/maestria/'
            }
        ]
    },
    'habitos': {
        title: '🎯 Você Não Precisa de Mais Motivação. Você Precisa de Controle.',
        content: `
            <p>Quantas vezes você já prometeu que iria começar… e não começou?</p>
            <p>O problema não é você. O problema é o sistema mental que te puxa pra baixo.</p>
            <p>Nesse conteúdo, você vai aprender:</p>
            <ul class="library-feature-list">
                <li>Como os hábitos realmente funcionam</li>
                <li>Como criar sistemas personalizados</li>
                <li>Como quebrar o ciclo da procrastinação</li>
            </ul>
            <p>Isso não é sobre motivação. É sobre ação.</p>
        `,
        actions: [
            {
                type: 'button',
                text: 'Acesso ao Projeto Caverna - Grátis',
                link: 'https://sou1porcento.com.br/cap-caverna/'
            },
            {
                type: 'button',
                text: 'Acesso ao Manual Completo - Maestria Pessoal',
                link: 'https://sou1porcento.com.br/maestria/'
            }
        ]
    },
    'treinos': {
        title: '💪 Corpo Forte, Mente Blindada',
        content: `
            <p>Não tem como construir um corpo com uma mente desorganizada.</p>
            <p>Neste conteúdo, você vai receber:</p>
            <ul class="library-feature-list">
                <li>Fichas de treino na academia ou em casa</li>
                <li>Treinos para iniciantes, intermediários e avançados</li>
                <li>Dicas de como aplicar todo o conhecimento de forma prática</li>
            </ul>
            <p>Não é sobre ter o "Corpo Perfeito".</p>
            <p class="final-cta"><strong>É sobre se tornar alguém que você mesmo admira.</strong></p>
        `,
        actions: [
            {
                type: 'button',
                text: 'Acesso ao Protocolo Ponto Zero - Grátis',
                link: 'https://sou1porcento.com.br/cap-protocolo/'
            },
            {
                type: 'text',
                content: '<p class="guide-text" style="text-align: center; margin-top: 1.5rem;">E se quiser unir tudo isso com mentalidade, rotina e finanças: o Manual 1% é o seu guia definitivo.</p>'
            },
            {
                type: 'button',
                text: 'Acesso ao Manual Completo - Maestria Pessoal',
                link: 'https://sou1porcento.com.br/maestria/'
            }
        ]
    },
    'financas': {
        title: '💰 Organize seu dinheiro e a sua mente.',
        content: `
            <p>O mais importante não é quanto você ganha — o que importa é o quanto você entende sobre o seu dinheiro.</p>
            <p>Esse conteúdo vai te mostrar como:</p>
            <ul class="library-feature-list">
                <li>Sair do vermelho com inteligência</li>
                <li>Poupar mesmo ganhando pouco</li>
                <li>Investir com segurança (mesmo sendo iniciante)</li>
            </ul>
            <p>Você não precisa ser rico para começar.<br>Você precisa começar para ser rico.</p>
            <p class="final-cta"><strong>Mas para mudar de vida, você precisa dar o 1° passo!</strong></p>
        `,
        actions: [
            {
                type: 'button',
                text: 'Acesso ao Frutos no Deserto - Grátis',
                link: 'https://sou1porcento.com.br/cap-frutos/'
            },
            {
                type: 'button',
                text: 'Acesso ao Manual Completo - Maestria Pessoal',
                link: 'https://sou1porcento.com.br/maestria/'
            }
        ]
    }
};

export const achievementsList = {
    'executor-3-dias': { icon: '🥉', name: 'Executor 3 Dias', description: 'Primeiros 3 dias consecutivos de tarefas.' },
    'soldado-1-pct': { icon: '', name: 'Soldado 1%', description: '7 dias consecutivos de tarefas.' },
    'sargento-1-pct': { icon: '🎖️', name: 'Sargento 1%', description: '15 dias consecutivos de tarefas.' },
    'tenente-1-pct': { icon: '🏅', name: 'Tenente 1%', description: '30 dias consecutivos de tarefas.' },
    'coronel-1-pct': { icon: '🏆', name: 'Coronel 1%', description: '60 dias consecutivos de tarefas.' },
    'mente-de-aco': { icon: '🧠', name: 'Mente de Aço', description: '30 dias com mais de 80% da rotina concluída.' },
    'trimestre-blindado': { icon: '🛡️', name: 'Trimestre Blindado', description: '3 meses consecutivos com saldo positivo.' },
    'blindagem-financeira': { icon: '🏦', name: 'Blindagem Financeira', description: 'Primeira meta financeira cumprida.' },
    'saldo-positivo': { icon: '📈', name: 'Saldo Positivo', description: 'Finalizar um mês com saldo positivo.' },
};