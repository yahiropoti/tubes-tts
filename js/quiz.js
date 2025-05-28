document.addEventListener("DOMContentLoaded", () => {
  let correctAnswers = [];

  fetch("data/quiz.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("quiz-container");
      correctAnswers = data.questions.map(q => q.answer);

      data.questions.forEach((q, i) => {
        const div = document.createElement("div");
        div.classList.add("quiz-question");
        div.innerHTML = `<p><strong>${i + 1}. ${q.question}</strong></p>`;

        q.options.forEach(opt => {
          const id = `q${i}-${opt}`;
          div.innerHTML += `
            <label for="${id}">
              <input type="radio" name="q${i}" id="${id}" value="${opt}">
              ${opt}
            </label><br>
          `;
        });

        container.appendChild(div);
      });
    });

  document.getElementById("submit-btn").addEventListener("click", () => {
    let score = 0;
    correctAnswers.forEach((correct, i) => {
      const selected = document.querySelector(`input[name="q${i}"]:checked`);
      const allOptions = document.querySelectorAll(`input[name="q${i}"]`);

      allOptions.forEach(opt => {
        opt.parentElement.style.fontWeight = "normal";
        opt.parentElement.style.color = "#333";
      });

      if (selected) {
        const isCorrect = selected.value === correct;
        if (isCorrect) {
          score++;
          selected.parentElement.style.color = "green";
          selected.parentElement.style.fontWeight = "bold";
        } else {
          selected.parentElement.style.color = "red";
          selected.parentElement.style.fontWeight = "bold";

          const correctOption = [...allOptions].find(opt => opt.value === correct);
          correctOption.parentElement.style.color = "green";
          correctOption.parentElement.style.fontWeight = "bold";
        }
      }
    });

    document.getElementById("score-result").innerHTML =
      `<h3>Skor Anda: ${score} dari ${correctAnswers.length}</h3>`;
  });
});
