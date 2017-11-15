let arr = ["sam", "eitan", "Michael"]
	coordsOriginal = "",
	person = ''
arr.forEach( (item) => person += `<li> ${ item } </li>`)
let	names = `<div class = 'name'> <ul> ${ person } </ul></div>`,
	gen = ( tag, className ) => `<${ tag } class = '${ className }'></${ tag }>`,
	coords = () => ({
			top: event.clientY + 2,
			left: event.clientX + 2
	}),
	roundText = () => ({
		"width": "30px",
		"height": "30px",
		"color": "white",
		"position": "fixed",
		"border-radius": "100%",
		"text-align": "center",
		"background": "black",
		"padding": ".4%",
		"opacity": ".6"
	}),
	photoAction = {
		"mouseenter": () => {
			$("#cursor").addClass("clicker")
		},
		"mousemove": () => {
			$("#cursor").css(coords())
		},
		"click": () => {
			coordsOriginal = coords()
			$(".capture").eq(0).remove()
			$("body").append(gen('div', 'capture'))
			$(".capture")
				.last()
				.append(names)
				.css(coords())
				.css(roundText())
				.css("border-radius","10px")
				.css("width", "50px")
				.css("height", "75px")
			$("li")
		}
	},
	capAction =  {
		"mouseover": (e) => {
			$(".capture").remove()
		}
	},
	namesAction = {
		"click": (e) => {
			$("body").append($(gen('div', 'final'))) 
			$(".final")
				.last()
				.append(e.target.innerHTML)
				.css(coordsOriginal)
				.css(roundText())
			$(".capture").remove()
		}
	}
$(document).ready( () => {
	$("#photo").on(photoAction)
	$("body").on("click", ".capture .name ul li", namesAction.click )
})
