selectClass = (className) => document.getElementsByClassName(className);

const userInput = document.querySelector("input");
const timeDisplay = selectClass("time")[0];
const TRACE_SECT = document.createElement("section");
const TRACES = document.createElement("section"); 

function validateInput() {
	if(userInput.value == "") { return false; }
	
	for(let i = 0; i < userInput.value.length; i++) {
		if(!(userInput.value[i] <= '9' && userInput.value[i] >= '0')) {
			return false;
		}
	}
	return true;
}

function recordBF(current, adder, target) {
	let parent = document.createElement("p");
	parent.className = "trace-item";

	let item = document.createElement("p");
	item.className = "trace-item-content";
	for(let i = 0; i < 2; i++) {
		parent.append(item.cloneNode(true));
	}

	parent.childNodes[0].textContent = `${adder}`;
	parent.childNodes[1].textContent = `${current}`;

	if(current >= target) {
		parent.className += " solution";
	}
	return parent;
}

function bruteForce(target) {
	let res = 0,
		adder = 0;
	
	let labels = document.createElement("section");
	labels.className="trace-item";
	let item = document.createElement("p");
	item.className = "trace-label";
	for(let i = 0; i < 2; i++) {
		labels.append(item.cloneNode(true));
	}
	labels.childNodes[0].textContent = `N-th iteration`;
	labels.childNodes[1].textContent = `Sum`;

	TRACES.appendChild(labels);
	TRACES.appendChild(recordBF(res, adder, target));
	let timeStart = Date.now();
	while(res < target) {
		adder++;
		res += adder;
		TRACES.appendChild(recordBF(res, adder, target));
	}

	timeDisplay.textContent = ((Date.now() - timeStart)/1000) + " detik";
	return adder;
}

function recordDnC(low, high) {
	let parent = document.createElement("section");
	parent.className = "trace-item";

	let item = document.createElement("p");
	item.className = "trace-item-content";
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

	let labels = document.createElement("section");
	labels.className="trace-item";
	let item = document.createElement("p");
	item.className = "trace-label";
	for(let i = 0; i < 3; i++) {
		labels.append(item.cloneNode(true));
	}
	labels.childNodes[0].textContent = `Low`;
	labels.childNodes[1].textContent = `Mid`;
	labels.childNodes[2].textContent = `High`;

	TRACES.appendChild(labels);
	let solution = recordDnC(low, high);
	let timeStart = Date.now();
	while(low <= high) {
		TRACES.appendChild(solution);
		let mid = Math.trunc((low + high)/2);
		let sumToN = Math.trunc(mid*(mid + 1)/2);

		if(sumToN < target) {
			low = mid + 1;
		} else if(sumToN > target) {
			high = mid - 1;
		} else {
			solution = recordDnC(low, high);
			solution.childNodes[1].className += " solution";
			TRACES.appendChild(solution);

			timeDisplay.textContent = String(Date.now() - timeStart)/1000 + " detik";
			return mid;
		}

		solution = recordDnC(low, high)
	}

	timeDisplay.textContent = String(Date.now() - timeStart)/1000 + " detik";
	solution.childNodes[0].className += " solution";
	TRACES.appendChild(solution);
	return low;
}

function handleButtonPress(code) {
	if(validateInput()) {
		let secChildren = TRACES.children;
		while(secChildren.length > 0) {
			secChildren[0].remove();
		}
		console.log("LOG: Trace cleaned");
		
		let result;
		let target = Number(userInput.value);
		if(code === "B") { 
			result = bruteForce(target);
		} else { 
			result = divideAndConquer(target);
		}
	}
}

function main() {
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
