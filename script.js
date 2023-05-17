selectClass = (className) => document.getElementsByClassName(className);
const userInput = document.querySelector("input");
const timeDisplay = selectClass("time")[0];

function validateInput() {
	if(userInput.value == "") { return false; }
	
	for(let i = 0; i < userInput.value.length; i++) {
		if(!(userInput.value[i] <= '9' && userInput.value[i] >= '0')) {
			return false;
		}
	}
	return true;
}

function bruteForce(target) {
	let res = 0,
		adder;

	let timeStart = Date.now();
	for(adder = 0; res < target;) {
		adder++;
		res += adder;
	}

	timeDisplay.textContent = String(Date.now() - timeStart)/1000 + " detik";
	return adder;
}

function divideAndConquer(target) {
	let low = 1,
		high = target;

	let timeStart = Date.now();
	while(low <= high) {
		let mid = Math.trunc((low + high)/2);
		let sumToN = Math.trunc(mid*(mid + 1)/2);
		if(sumToN < target) {
			low = mid + 1;
		} else if(sumToN > target) {
			high = mid - 1;
		} else {
			return mid;
		}
	}

	timeDisplay.textContent = String(Date.now() - timeStart)/1000 + " detik";
	return low;
}

function callFunction(code) {
	if(validateInput()) {
		let target = Number(userInput.value);
		let result;
		if(code === "B") { result = bruteForce(target);
		} else { result = divideAndConquer(target);
		}
		console.log(result);
	}
}

function main() {
	const buttons = selectClass("choices")[0].children;
	for(let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener( "click", () => {
				callFunction(buttons[i].textContent[0]);
			}
		);
	}
}

main();
