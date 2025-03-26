function checkAnswer(button, correct) {
    if (button.innerText === correct) {
      button.style.backgroundColor = "green";
    } else {
      button.style.backgroundColor = "red";
    }
  }
  