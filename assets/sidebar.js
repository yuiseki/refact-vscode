(function () {
	const vscode = acquireVsCodeApi();
	let presets = document.querySelectorAll(".presets li");
    let token = 'r2kv3sxwj9e-3glml41tuzp';

	document.querySelector("#sidebar").addEventListener("click", (event) => {
		if (event.target && event.target.nodeName === "LI") {
			let text = event.target.innerText;
			quickInput.value = text;
			vscode.postMessage({ type: "presetSelected", value: text });
		}
	});

	const quickInput = document.querySelector("#quickinput");
	quickInput.addEventListener("keyup", ({ key }) => {
		if (key === "Enter") {
			vscode.postMessage({ type: "quickInput", value: quickInput.value });
		}
	});

	const settingsButton = document.querySelector("#settings");
	settingsButton.addEventListener("click", () => {
		vscode.postMessage({ type: "openSettings" });
	});
    
	const loginButton = document.querySelector("#login");
	loginButton.addEventListener("click", () => {
        vscode.postMessage({ type: "runLogin" });
	});

	window.addEventListener("message", (event) => {
		const message = event.data;
		switch (message.command) {
			case "updateQuery":
				if (message.value) {
					quickInput.value = message.value;
				}
				break;
            case "getToken":
                if (message.value) {
                    token = message.value;
                }
                break;
            case "loggedIn":
                if (message.value) {
                    let login = document.querySelector('#login');
                    login.style.opacity = 0;
                    login.style.visiblity = 'hidden';
                    let settings = document.querySelector('#settings');
                    settings.innerHTML = message.value.userName;
                }
                break;
            case "alreadyLogged":
                if (message.value) {
                    let login = document.querySelector('#login');
                    login.style.opacity = 0;
                    login.style.visiblity = 'hidden';
                    let settings = document.querySelector('#settings');
                    settings.innerHTML = message.value.userName;
                }
                break;
			case "updateHistory":
				if (message.value && message.value.length > 0) {
					let historyTitle = document.querySelector(".history-title");
					let historyList = document.querySelector(".history");
					historyTitle.style.display = "block";
					historyList.style.display = "block";
					let data = message.value.reverse();
					historyList.innerHTML = "";
					for (let i = 0; i < 5; i++) {
						if (data[i]) {
							let historyItem = `<li>${data[i]}</li>`;
							historyList.innerHTML += historyItem;
						}
					}
				}
				break;
		}
	});
})();
