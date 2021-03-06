import { classToggleClick } from "./modules/helpers/class-toggle-click.js"
import header from "./modules/header/header.js"
import Quiz from "./modules/quiz/quiz-setup.js"
import QuizSliderTexts from "./modules/quiz/quiz-slider-texts.js"
import CustomSlider from "./modules/custom-slider.js"
import InteractiveCards from "./modules/interactive-cards.js"
import quizSliderTexts from "./modules/quiz/quiz-slider-texts.js"

const customSliders = document.getElementsByClassName("custom-slider")
const cardsContainer = document.querySelector(".interactive-cards")

for (let i = 0; i < customSliders.length; i++) {
	new CustomSlider(customSliders[i], (origin, value) => {
		origin.slider.pin.textContent = value
		quizSliderTexts(value, origin.id)
	})
}

if (cardsContainer) {
	new InteractiveCards(cardsContainer, (target, amount) => {
		if (amount === 0) {
			setTimeout(() => {
				document.getElementById("pop-up-toggle").checked = false

				cardsContainer.classList.add("empty")
			}, 300)
		}
	})
}
