import axios from "axios"

const btn = document.querySelector(".btn")

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

const getData = async (page = "") => {
	const url = new URL("https://6325daa94cd1a2834c45d03c.mockapi.io/questions")
	url.searchParams.append("page", 1)
	url.searchParams.append("limit", 10)
	console.log(url)
	const data = await axios
		.get("https://6325daa94cd1a2834c45d03c.mockapi.io/questions")
		.then(res => {
			return res.data
		})
}

getData()
