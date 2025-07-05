// Call particles
document.addEventListener("DOMContentLoaded", () => {
    createParticles();
    attachGameListeners();
    document.getElementById("current-year").innerText = new Date().getFullYear();
  });
  
  // Particle background
  function createParticles() {
    const particlesContainer = document.getElementById("particles");
    const particleCount = 50;
  
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.style.position = "absolute";
      particle.style.width = `${Math.random() * 3 + 1}px`;
      particle.style.height = particle.style.width;
      particle.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
      particle.style.borderRadius = "50%";
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
      particle.style.opacity = Math.random() * 0.5 + 0.1;
  
      const style = document.createElement("style");
      style.innerHTML = `
        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
          100% { transform: translate(0, 0); }
        }
      `;
      document.head.appendChild(style);
      particlesContainer.appendChild(particle);
    }
  }
  
  // Game UI logic
  function attachGameListeners() {
    const gameArea = document.getElementById("game-area");
    const gameContent = document.getElementById("game-content");
  
    document.getElementById("guess-btn").onclick = () => {
      gameArea.classList.remove("hidden");
      gameContent.innerHTML = renderGuessGame();
      initGuessGame();
    };
  
    document.getElementById("rps-btn").onclick = () => {
      gameArea.classList.remove("hidden");
      gameContent.innerHTML = renderRPSGame();
      initRPSGame();
    };
  
    document.getElementById("ttt-btn").onclick = () => {
      gameArea.classList.remove("hidden");
      gameContent.innerHTML = renderTTTGame();
      initTTTGame();
    };
  
    document.getElementById("back-btn").onclick = () => {
      gameArea.classList.add("hidden");
      gameContent.innerHTML = "";
    };
  }
  
  // ---- GUESS THE NUMBER ----
  function renderGuessGame() {
    return `
      <h2 class="text-xl font-bold mb-2">Guess the Number (1-100)</h2>
      <input id="guess-input" type="number" class="border rounded px-3 py-1 mb-2" placeholder="Enter guess" />
      <button onclick="submitGuess()" class="bg-blue-500 text-white px-3 py-1 rounded">Submit</button>
      <p id="guess-msg" class="mt-2"></p>
    `;
  }
  
  function initGuessGame() {
    gameState.guessGame.number = Math.floor(Math.random() * 100) + 1;
    gameState.guessGame.attempts = 0;
  }
  
  function submitGuess() {
    const input = document.getElementById("guess-input");
    const msg = document.getElementById("guess-msg");
    const num = parseInt(input.value);
    const target = gameState.guessGame.number;
  
    gameState.guessGame.attempts++;
  
    if (num === target) {
      msg.textContent = `🎉 Correct! You guessed in ${gameState.guessGame.attempts} tries.`;
    } else if (num < target) {
      msg.textContent = "⬆️ Too low!";
    } else {
      msg.textContent = "⬇️ Too high!";
    }
  }
  
  // ---- ROCK PAPER SCISSORS ----
  function renderRPSGame() {
    return `
      <h2 class="text-xl font-bold mb-2">Rock Paper Scissors</h2>
      <div class="space-x-2">
        ${gameState.rpsGame.choices.map(choice => 
          `<button onclick="playRPS('${choice}')" class="px-4 py-2 bg-green-500 text-white rounded">${gameState.rpsGame.icons[choice]}</button>`
        ).join("")}
      </div>
      <p id="rps-result" class="mt-4"></p>
    `;
  }
  
  function initRPSGame() {
    gameState.rpsGame.playerScore = 0;
    gameState.rpsGame.aiScore = 0;
  }
  
  function playRPS(playerChoice) {
    const aiChoice = gameState.rpsGame.choices[Math.floor(Math.random() * 3)];
    const resultBox = document.getElementById("rps-result");
  
    if (playerChoice === aiChoice) {
      resultBox.textContent = `🤝 It's a tie! Both chose ${playerChoice}`;
    } else if (
      (playerChoice === "rock" && aiChoice === "scissors") ||
      (playerChoice === "scissors" && aiChoice === "paper") ||
      (playerChoice === "paper" && aiChoice === "rock")
    ) {
      resultBox.textContent = `✅ You win! ${playerChoice} beats ${aiChoice}`;
    } else {
      resultBox.textContent = `❌ You lose! ${aiChoice} beats ${playerChoice}`;
    }
  }
  
  // ---- TIC TAC TOE ----
  function renderTTTGame() {
    return `
      <h2 class="text-xl font-bold mb-2">Tic Tac Toe</h2>
      <div class="grid grid-cols-3 gap-1 w-48 mx-auto">
        ${gameState.tttGame.board.map((cell, i) => 
          `<button onclick="markTTT(${i})" class="h-12 w-12 bg-white text-black text-xl font-bold" id="cell-${i}">${cell}</button>`
        ).join("")}
      </div>
      <p id="ttt-result" class="mt-3 text-lg font-medium"></p>
    `;
  }
  
  function initTTTGame() {
    gameState.tttGame.board = Array(9).fill("");
    gameState.tttGame.currentPlayer = "X";
    gameState.tttGame.gameOver = false;
  }
  
  function markTTT(index) {
    const { board, currentPlayer, winPatterns } = gameState.tttGame;
  
    if (board[index] || gameState.tttGame.gameOver) return;
  
    board[index] = currentPlayer;
    document.getElementById(`cell-${index}`).textContent = currentPlayer;
  
    if (checkWin(board, currentPlayer, winPatterns)) {
      document.getElementById("ttt-result").textContent = `🎉 ${currentPlayer} wins!`;
      gameState.tttGame.gameOver = true;
      return;
    }
  
    if (!board.includes("")) {
      document.getElementById("ttt-result").textContent = "🤝 It's a tie!";
      gameState.tttGame.gameOver = true;
      return;
    }
  
    gameState.tttGame.currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
  
  function checkWin(board, player, winPatterns) {
    return winPatterns.some(pattern => 
      pattern.every(index => board[index] === player)
    );
  }
  
  // ---- Game State ----
  const gameState = {
    guessGame: {},
    rpsGame: {
      choices: ["rock", "paper", "scissors"],
      icons: {
        rock: "👊",
        paper: "✋",
        scissors: "✌️"
      }
    },
    tttGame: {
      board: [],
      currentPlayer: "X",
      gameOver: false,
      winPatterns: [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
      ]
    }
  };
  