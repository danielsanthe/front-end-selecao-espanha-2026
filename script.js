// ======================================================================
// PORTAL LA ROJA 2026 - CONTROLE DE ANIMAÇÕES
// ======================================================================
// O carrossel de imagens principal está rodando em 100% CSS Puro!
// Esta técnica (Pure CSS Infinite Loop) melhora o desempenho da página,
// utilizando hardware acceleration via transform: translateX() e keyframes.
//
// O script.js foi mantido para expansões futuras do portal ou lógicas extras.
console.log("Portal La Roja 2026 ativo com Carrossel CSS Infinito!");

// ======================================================================
// PORTAL LA ROJA 2026 - RECURSOS INTERATIVOS EM JAVASCRIPT
// ======================================================================

document.addEventListener("DOMContentLoaded", () => {
    // Inicializa os recursos dependendo de qual página o usuário está
    initPlayerFilter();
    initCountdown();
    initQuiz();
});

/* ======================================================================
   1. FILTRO DE BUSCA DE JOGADORES (Para elenco.html)
   ====================================================================== */
function initPlayerFilter() {
    const searchInput = document.getElementById("player-search");
    if (!searchInput) return; // Só executa se estiver na página elenco.html

    searchInput.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const players = document.querySelectorAll(".player-card");

        players.forEach(player => {
            const name = player.querySelector(".player-name").textContent.toLowerCase();
            const role = player.querySelector(".player-role").textContent.toLowerCase();

            // Se o termo pesquisado bater com o nome ou a posição, mostra o card, senão esconde
            if (name.includes(searchTerm) || role.includes(searchTerm)) {
                player.style.display = "block";
                player.style.animation = "fadeIn 0.4s ease";
            } else {
                player.style.display = "none";
            }
        });
    });
}

/* ======================================================================
   2. CONTADOR REGRESSIVO DO PRÓXIMO JOGO (Para grupo.html)
   ====================================================================== */
function initCountdown() {
    const countdownElement = document.getElementById("countdown-timer");
    if (!countdownElement) return; // Só executa se estiver na página grupo.html

    // Data do jogo: 21 de Junho de 2026 às 18:00:00 (Horário da Espanha / CEST)
    // Usaremos a data em formato UTC/ISO para garantir precisão
    const matchDate = new Date("2026-06-21T18:00:00").getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const difference = matchDate - now;

        if (difference < 0) {
            clearInterval(interval);
            countdownElement.innerHTML = "⚽ O JOGO ESTÁ ACONTECENDO OU JÁ SE ENCERROU!";
            return;
        }

        // Cálculos de tempo
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Exibe no formato digital elegante
        countdownElement.innerHTML = `
            <div class="timer-box"><span>${days}</span>d</div>
            <div class="timer-box"><span>${hours}</span>h</div>
            <div class="timer-box"><span>${minutes}</span>m</div>
            <div class="timer-box"><span>${seconds}</span>s</div>
        `;
    }, 1000);
}

/* ======================================================================
   3. MINI-QUIZ INTERATIVO (Para curiosidades.html)
   ====================================================================== */
function initQuiz() {
    const quizContainer = document.getElementById("quiz-section");
    if (!quizContainer) return; // Só executa se estiver na curiosidades.html

    const submitBtn = document.getElementById("submit-quiz");
    const resultElement = document.getElementById("quiz-result");

    submitBtn.addEventListener("click", () => {
        let score = 0;
        
        // Pergunta 1
        const q1 = document.querySelector('input[name="q1"]:checked');
        if (q1 && q1.value === "2010") score++;

        // Pergunta 2
        const q2 = document.querySelector('input[name="q2"]:checked');
        if (q2 && q2.value === "barcelona") score++;

        // Pergunta 3
        const q3 = document.querySelector('input[name="q3"]:checked');
        if (q3 && q3.value === "iniesta") score++;

        // Feedback visual do resultado
        resultElement.style.display = "block";
        if (score === 3) {
            resultElement.innerHTML = `🏆 <strong>3/3 - Incrível!</strong> Você é um verdadeiro especialista em La Roja!`;
            resultElement.style.color = "#FABD00";
        } else if (score === 2) {
            resultElement.innerHTML = `🥈 <strong>2/3 - Muito bom!</strong> Quase gabaritou. Quer tentar de novo?`;
            resultElement.style.color = "#F3F4F6";
        } else {
            resultElement.innerHTML = `🔴 <strong>${score}/3 - Continue estudando!</strong> Reveja as curiosidades da página e tente novamente.`;
            resultElement.style.color = "#9CA3AF";
        }
    });
}