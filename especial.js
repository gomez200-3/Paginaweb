// Frases y emojis para cada botón
const especialData = [
  {
    emoji: "✨",
    texto: `Mi amor faro en la tempestad,✨<br>
Tu fuerza inspira mi voluntad.💫<br>
En cada paso, tu mano siento,🥺<br>
Unidos siempre, en este momento.🛸`
  },
  {
    emoji: "🥺",
    texto: `No temas, mi alma gemela, 🌷<br>
El éxito espera tras la vela. 🚀<br>
Con cada esfuerzo, un nuevo amanecer,🤯<br>
Juntos podemos vencer y crecer.🌱`
  },
  {
    emoji: "🚀",
    texto: `Eres luz, 🌠eres mi guía,🧭<br>
En tus ojos encuentro alegría.🪄<br>
Confía en ti, en tu gran poder,👑<br>
Juntos haremos el mundo florecer.🌷`
  },
  {
    emoji: "🪄",
    texto: `Que este poema te recuerde,🧏🏻‍♂️<br>
Lo mucho que mi amor se enciende.🔥<br>
Eres fuerte,🌟 capaz y valiente,🪐<br>
Mi eterna compañera, ¡simplemente excelente!❤️`
  },
  {
    emoji: "🔥",
    texto: `Eres fuerte,🌟 capaz y valiente,🪐<br>
Mi eterna compañera, ¡simplemente excelente!❤️`
  }
];

// --- Explosión de emojis ---
function makeExplosion(btn, emoji) {
  const explosion = document.createElement("div");
  explosion.className = "emoji-explosion";
  // Crea 18 emojis dispersos
  for (let i = 0; i < 18; ++i) {
    const span = document.createElement("span");
    span.textContent = emoji;
    span.style.position = "absolute";
    span.style.fontSize = `${1.5 + Math.random()*1.5}em`;
    span.style.left = "50%";
    span.style.top = "50%";
    const angle = Math.random() * 2 * Math.PI;
    const dist = 40 + Math.random()*36;
    const x = Math.cos(angle)*dist;
    const y = Math.sin(angle)*dist;
    // Animación con transición
    span.animate([
      { transform: `translate(-50%,-50%) scale(1)`, opacity: 1 },
      { transform: `translate(${x-50}%,${y-50}%) scale(1.6)`, opacity: 0 }
    ], {
      duration: 500,
      easing: "ease-out"
    });
    explosion.appendChild(span);
  }
  btn.appendChild(explosion);
  setTimeout(() => explosion.remove(), 500);
}

// --- Modal ---
function showEspecialModal(html) {
  const modal = document.getElementById("especial-modal");
  document.getElementById("especial-modal-text").innerHTML = html;
  modal.classList.add("active");
}
function closeEspecialModal() {
  document.getElementById("especial-modal").classList.remove("active");
}
document.getElementById("cerrar-especial-modal").onclick = closeEspecialModal;
document.getElementById("especial-modal").addEventListener("click", function(e){
  if(e.target === this) closeEspecialModal();
});

// --- Botones emoji ---
document.querySelectorAll(".emoji-btn").forEach(btn => {
  btn.addEventListener("click", function() {
    const idx = btn.dataset.idx;
    makeExplosion(btn, especialData[idx].emoji);
    setTimeout(() => showEspecialModal(especialData[idx].texto), 500);
  });
});

// --- Mensaje especial editable y persistente ---
const especialInput = document.getElementById("especial-input");
const especialMsg = document.getElementById("especial-mensaje");
const especialKey = "especial-mensaje";
function guardarEspecial() {
  const val = especialInput.value.trim();
  localStorage.setItem(especialKey, val);
  especialMsg.textContent = val;
}
document.getElementById("guardar-especial").onclick = guardarEspecial;
// cargar mensaje al entrar
window.addEventListener("DOMContentLoaded", () => {
  especialMsg.textContent = localStorage.getItem(especialKey) || "";
});

// Botón volver
document.getElementById("volver-aventuras").onclick = function() {
  window.location = "aventuras.html";
};
