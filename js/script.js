var containerCell = document.getElementsByClassName("container-cell")[0];
var containerPiece = document.getElementsByClassName("container-piece")[0];

document.onkeypress = documentOnKeyPress;

document.getElementById("closeDialog").onclick = function (e) {
	document.getElementById("dialog").style.display = "none";
};

// divide by 4 because number of collumns and rows
var width = containerCell.offsetWidth / 4;
var height = containerCell.offsetHeight / 4;

var selectedPiece = null;

createBoard();
createPieces();

function createCell(position) {
	var cellElement = document.createElement("div");
	cellElement.style.width = width;
	cellElement.style.height = height;
	cellElement.style.border = "1px solid black";
	cellElement.style.backgroundColor = "#124242";
	cellElement.dataset.position = position;
	cellElement.dataset.full = false;
	cellElement.onclick = cellOnClick;
	return cellElement;
};

function createPiece(piece, width, height) {
	var cellElement = document.createElement("div");
	cellElement.style.width = width;
	cellElement.style.height = height;
	cellElement.dataset.origVal = piece.origVal;
	cellElement.style.border = "1px solid black";
	var pieceElement = document.createElement("img");
	pieceElement.width = width;
	pieceElement.height = height;
	//pieceElement.style.border = "1px solid black";
	pieceElement.onclick = pieceOnClick;
	pieceElement.src = piece.image;
	pieceElement.dataset.position = piece.position;
	pieceElement.dataset.origVal = piece.origVal;
	cellElement.appendChild(pieceElement);
	return cellElement;
};

function createBoard() {
	for (var i = 0; i < 16; i++) {
		let cellElement = createCell(i+1);
		addCell(cellElement);
	}
};

function createPieces() {
	var w = containerPiece.offsetWidth / 4;
	var h = containerPiece.offsetHeight / 4;
	var pieces = generatePieceData();
	pieces.sort(function(a, b) {
		return (a.origVal < b.origVal) ? 1 : -1;
	});
	for (var i = 0; i < pieces.length; i++) {
		let pieceElement = createPiece(pieces[i], w, h);
		addPiece(pieceElement);
	}
};

function addCell(element) {
	containerCell.appendChild(element);
};

function addPiece(element) {
	containerPiece.appendChild(element);
	// let children = containerPiece.children;
	// if (containerPiece.childElementCount == 0) {
	// 	containerPiece.appendChild(element);
	// 	return;
	// }
	// let i = 0
	// let aux = children[0];
	// for (child in children) {
	// 	if (element.dataset.origVal > children[child].dataset.origVal) {
	// 		aux = children[child];
	// 		break;
	// 	}
	// }
	// containerPiece.insertBefore(element, aux);
};

function generatePieceData() {
	var pieces = [];
	for (var i = 1; i < 5; i++) {
		for (var j = 1; j < 5; j++) {
			let piece = {
				image: "img/" + i.toString() + j.toString() + ".jpg",
				position: (j) + (i-1)*4,
				origVal: Math.floor(Math.random() * 500),
			};
			pieces.push(piece);
		}
	}
	return pieces;
};

function pieceOnClick(e) {
	// console.log(e.target.tagName);
	// if (e.target.tagName.toUpperCase() != "IMG" || selectedPiece) {
	// 	console.log("nada");
	// 	return;
	// };
	console.log("new piece piece")
	var piece = e.target;
	selectedPiece = piece;
};

function cellOnClick(e) {
	let selectedCell = e.target;
	//console.log(selectedCell);
	if (selectedPiece) {
		if (selectedCell.tagName.toUpperCase() == "DIV") {
			selectedPiece.onclick = null;
			selectedCell.appendChild(selectedPiece);
			selectedCell.dataset.full = "true";
		}
		else {
			if (selectedPiece === selectedCell) {
				selectedPiece.onclick = pieceOnClick;
				containerPiece.getElementsByTagName("div")[selectedCell.dataset.position-1].appendChild(selectedCell);
			}
			else {
				let parentDiv = selectedCell.parentNode;
				selectedCell.onclick = pieceOnClick;
				containerPiece.getElementsByTagName("div")[selectedCell.dataset.position-1].appendChild(selectedCell);
				parentDiv.appendChild(selectedPiece);
			}
		}
		selectedPiece = null;
	}
	else {
		if (selectedCell.tagName.toUpperCase() == "DIV") {
			console.log("No hay pieza seleccionada");
		}
		else {
			console.log("new piece div");
			selectedPiece = selectedCell;
		}
	}
};

function documentOnKeyPress(e) {
	//console.log(e.key + "->" + e.keyCode);
	if (e.keyCode == 69 || e.keyCode == 101) {
		let dialog = document.getElementById("dialog");
		let result = evalBoard();
		dialog.children[0].src = result ? "img/link_chiquito.jpg" : "img/33.jpg";
		dialog.children[1].innerText = "weeeeey " + (result ? "siiiiiii" : "noooooooo") + "!!! 😩😭👌👅🔥💦🍆💯"
		dialog.style.display = "block";
		if (!result) sendBackPieces();
	}
};

function evalBoard() {
	var cells = containerCell.children;
	for (cell of cells) {
		try {
			if (cell.dataset.position != cell.children[0].dataset.position) return false;
		}
		catch (err) {
			return false;
		}
	}
	return true;
};

function sendBackPieces() {
	for (cell of containerCell.children) {
		try {
			let imgToSend = cell.children[0];
			imgToSend.onclick = pieceOnClick;
			for (child of containerPiece.children) {
				if (child.dataset.origVal == imgToSend.dataset.origVal && child.childElementCount == 0){
					child.appendChild(imgToSend);
					break;
				}
			}
		} catch(err) {}
	}
}












