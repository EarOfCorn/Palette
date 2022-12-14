// alert('Press "Space" to change color')

const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', (event) => {
	event.preventDefault()
	if (event.code.toLowerCase() == 'space') {
		setRandomColor()
	}
})

document.addEventListener('click', (event) => {
	const type = event.target.dataset.type

	if (type == 'lock') {
		const node = event.target.tagName.toLowerCase() == 'i' ? event.target : event.target.children[0]
		
		node.classList.toggle('fa-lock-open')
		node.classList.toggle("fa-lock");
	} else if (type == 'copy') {
		copyColor(event.target.textContent)
	}
})

function copyColor(text){
	return navigator.clipboard.writeText(text)
}

function setRandomColor (isInitial) {
	const colors = isInitial ? getColorsHash() : []

	cols.forEach((col, index) => {
		const isLock = col.querySelector('i').classList.contains('fa-lock')
		const text = col.querySelector('h2')
		const button = col.querySelector("button");
		
		if (isLock) {
			colors.push(text.textContent)
			return
		} 
		
		const color = isInitial 
			? colors[index] 
				? colors[index] 
				: chroma.random() 
			: chroma.random()
		
		if (!isInitial) {
			colors.push(color)
		}

		text.textContent = color
		col.style.background = color

		setTextColor(text, color)
		setTextColor(button, color);
	})
	updateColorHash(colors)
}

function setTextColor(text, color) {
	const luminance = chroma(color).luminance()
	text.style.color = luminance > 0.6 ? 'black' : 'white'
}

function updateColorHash(colors = []) {
	document.location.hash = colors.map((col) => col.toString().substring(1)).join('-')
}

function getColorsHash() {
	if(document.location.hash.length > 1) {
		return document.location.hash.substring(1).split('-').map((color) => '#' + color)
	}
	return []
}

setRandomColor(true);



