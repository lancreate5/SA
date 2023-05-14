selectClass = (className) => document.getElementsByClassName(className);

const userInput = document.querySelector("input");

function validateInput() {
	if(userInput.value == "") { return false; }
	
	for(let i = 0; i < userInput.value.length; i++) {
		if(!(userInput.value[i] <= '9' && userInput.value[i] >= '0')) {
			return false;
		}
	}
	return true;
}

function bruteForce() {
	console.log("BF!");
}

function divideAndConquer() {
	console.log("DnC!");
}
function callFunction(code) {
	if(validateInput()) {
		if(code === "B") { bruteForce();
		} else { divideAndConquer();
		}
	}
}

const buttons = selectClass("choices")[0].children;
for(let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener(
		"click", () => {
			callFunction(buttons[i].textContent[0])
		}
	);
}
