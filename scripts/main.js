import axios from "axios"
import { baseUrl } from "./url"

const btn = document.querySelector(".btn")
const answerButtons = document.querySelectorAll(".answer-btn")
// Dom Elements

//
let questions = []
let currentIndex = 0

const onLoad = () => {
	setTimeout(() => {
		const js = document.querySelector(".js").classList.add("active")
	}, 1500)
}

window.addEventListener("load", onLoad)

btn.addEventListener("click", e => {
	let x = e.clientX - e.target.offsetLeft
	let y = e.clientY - e.target.offsetTop

	let ripples = document.createElement("span")
	ripples.style.left = x + "px"
	ripples.style.top = y + "px"
	btn.appendChild(ripples)

	setTimeout(() => {
		ripples.remove()
	}, 1000)
})

const focusBtn = () => {
	answerButtons[0].focus()
}

const getData = async (page = 1, limit = 10) => {
	const url = new URL(baseUrl)
	url.searchParams.append("page", page)
	url.searchParams.append("limit", limit)

	const data = await axios.get(url).then(res => {
		return res.data
	})
	questions = data
	initQuestion()
}

const initQuestion = () => {
	const questionIndexDom = document.querySelector(".question-index")
	const questionLengthDom = document.querySelector(".question-length")
	const questionTitleDom = document.querySelector(".quiz-title")
	const questionTransDom = document.querySelector(".trans")

	questionIndexDom.innerText = currentIndex + 1
	questionLengthDom.innerText = questions?.length
	questionTitleDom.innerText = questions[currentIndex]?.title
	questionTransDom.innerText = questions[currentIndex]?.trans

	answerButtons.forEach((btn, index) => {
		btn.innerText = questions[currentIndex]?.answers[index]
	})

	if (currentIndex == 9) {
		btn.style.pointerEvents = "none"
		btn.disabled = true
	}
}

const checkAnswer = () => {
	answerButtons.forEach((answerBtn, index) => {
		answerBtn.addEventListener("click", () => {
			if (answerBtn.innerText == questions[currentIndex].answer) {
				answerBtn.classList.add("correct")
				disableClickButtons()
			} else {
				answerBtn.classList.add("wrong")
				getIndexCorrectAnswer()
				disableClickButtons()
			}
		})
		answerBtn.addEventListener("keyup", e => {
			if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
				if (answerBtn.innerText == questions[currentIndex].answer) {
					answerBtn.classList.add("correct")
					disableClickButtons()
				} else {
					answerBtn.classList.add("wrong")
					getIndexCorrectAnswer()
					disableClickButtons()
				}
			}
		})
	})
}

const getIndexCorrectAnswer = () => {
	answerButtons.forEach(l => {
		if (l.innerText === questions[currentIndex].answer) {
			l.classList.add("correct")
		}
	})
}

const removeStateButtons = () => {
	answerButtons.forEach(a => {
		a.classList.remove("correct")
		a.classList.remove("wrong")
	})
}

const disableClickButtons = () => {
	answerButtons.forEach(b => {
		b.style.pointerEvents = "none"
		b.disabled = true
	})
}

const enableClickButtons = () => {
	answerButtons.forEach(b => {
		b.style.pointerEvents = "auto"
		b.disabled = false
	})
}

checkAnswer()

btn.addEventListener("click", () => {
	currentIndex++
	initQuestion()
	removeStateButtons()
	enableClickButtons()
	focusBtn()
})

getData()
