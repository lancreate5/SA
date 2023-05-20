selectClass = (className) => document.getElementsByClassName(className);

const userInput = document.querySelector("input");
const timeDisplay = selectClass("time")[0];
let TRACES = document.createElement("section"); 

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

	timeDisplay.textContent = ((Date.now() - timeStart)/1000) + " detik";
	return adder;
}

function recordDnC(low, high) {
	let parent = document.createElement("section");
	parent.className = "trace-item";
	parent.style.display = "flex";

	let item = document.createElement("p");
	item.style.color = "#FFFFFF";
	item.style.textAlign = "center";
	item.style.border = "1px solid white";
	item.style.flex = "1";
	for(let i = 0; i < 3; i++) {
		parent.append(item.cloneNode(true));
	}
	parent.childNodes[0].textContent = `${low}`;
	parent.childNodes[1].textContent = `${Math.trunc((low + high)/2)}`;
	parent.childNodes[2].textContent = `${high}`;
	return parent;
}

function divideAndConquer(target) {
	let low = 1,
		high = target;

	TRACES.appendChild(recordDnC(low, high));

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
		TRACES.appendChild(recordDnC(low, high));
	}

	timeDisplay.textContent = String(Date.now() - timeStart)/1000 + " detik";
	return low;
}

function handleButtonPress(code) {
	if(validateInput()) {
		let secChildren = TRACES.children;
		console.log("LOG: Cleaning trace...");
		while(secChildren.length > 0) {
			secChildren[0].remove();
		}
		
		let result;
		let target = Number(userInput.value);
		if(code === "B") { result = bruteForce(target);
		} else { result = divideAndConquer(target);
		}
	}
}

function main() {
	const TRACE_SECT = document.createElement("section");
	TRACE_SECT.className = "trace";
	TRACE_SECT.style.display = "none";
	let head = document.createElement("h2");
	head.textContent = "Tracing";
	TRACE_SECT.append(head);

	TRACES.className = "traces";
	TRACE_SECT.append(TRACES);
	document.querySelector("body").append(TRACE_SECT);

	const buttons = selectClass("choices")[0].children;
	for(let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener( "click", () => {
				if(TRACE_SECT.style.display === "none") {
					TRACE_SECT.style.display = "block";
				}

				handleButtonPress(buttons[i].textContent[0]);
			}
		);
	}
}

main();
