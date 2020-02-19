var containerCell = document.getElementsByClassName("container-cell")[0];
var containerPiece = document.getElementsByClassName("container-piece")[0];
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
	cellElement.style.border = "1px solid black";
	var pieceElement = document.createElement("img");
	pieceElement.width = width;
	pieceElement.height = height;
	//pieceElement.style.border = "1px solid black";
	pieceElement.onclick = pieceOnClick;
	pieceElement.src = piece.image;
	pieceElement.dataset.position = piece.position;
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
};

function generatePieceData() {
	var pieces = [];
	for (var i = 1; i < 5; i++) {
		for (var j = 1; j < 5; j++) {
			let piece = {
				image: "img/" + i.toString() + j.toString() + ".jpg",
				position: (j) + (i-1)*4,
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
			if (selectedPiece == selectedCell) {
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

















