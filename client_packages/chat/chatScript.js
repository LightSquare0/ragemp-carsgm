let chat = {
  allowInput: false,
  active: false,
  size: 0,
  historyLimit: 50, 
  inputText: "",
  inputHistory: [],
  inputHistoryIdx: 0,
};

const chatInput = document.getElementById("chat-input");
const chatMessagesContainer = document.getElementById("chat-messages-container");
const chatMessages = document.getElementById("messages");

const toggleChatInput = (state) => {
  if (state == true) {
    mp.invoke("focus", state);
    chatInput.style.display = "flex";
    document.getElementById("input-box-chat").focus();
    chat.active = true;
    chatMessagesContainer.style.opacity = 1;
  } else if (state == false) {
    chatInput.style.display = "none";
    mp.invoke("focus", state);
    chat.active = false;
  }
};

const addChatMessage = (message) => {
  let messageElement = document.createElement("div");
  messageElement.classList.add("message");
  document.getElementById("messages").append(messageElement);
  messageElement.append(message.toString());
  let messages = document.getElementById("messages");
  messages.scrollTo(0, messages.scrollHeight);
  chatMessagesContainer.style.opacity = 1;
};

setInterval(() => {
  if (chatMessagesContainer.style.opacity == 0.5) return;
  if (chat.active) return;

  chatMessagesContainer.style.opacity = 0.5;
}, 18000);

var chatAPI = {
  push: (text) => {
    // let colorPositions = [];
    // let colors = [];
    // let chatElement = "<li>";

    // for (let i = 0; i<text.length; i++) {
    // 	let colorCheck = `${text[i]}${text[i+ 1]}${text[i + 2]}`;

    // 	if (colorCheck === "!{#") {
    // 		colorPositions.push(i);
    // 	}
    // }

    // colorPositions.forEach(el => {
    // 	let sub = text.slice(el, -1);
    // 	colors.push(sub.slice(3, 9));
    // });

    // colorPositions.forEach((el, i) => {
    // 	let sub = text.slice(colorPositions[i] + 10, colorPositions[i + 1]);
    // 	chatElement += `<span style='color: ${colors[i]}'>${sub}</span>`;
    // });

    // chatElement += "</li>";

    // if (chatElement === "<li></li>") {
    // 	chat.container.prepend("<li>" + text + "</li>");
    // } else {
    // 	chat.container.prepend(chatElement);
    // }

    addChatMessage(text);
    chat.size++;

    if (chat.size >= chat.historyLimit)
    {
    	chatMessagesContainer.removeChild[0];
    }
  },

  clear: () => {
    chat.container.html("");
  },

  activate: (toggle) => {
    if (toggle == false && chat.input != null) enableChatInput(false);
  },

  show: (toggle) => {
    if (toggle) document.getElementById("chat-box").style.display = "inline";
    else document.getElementById("chat-box").style.display = "none";

    chat.allowInput = toggle;
  },
};

const inputElement = document.getElementById("input-box-chat");

chat.inputHistoryIdx = chat.inputHistory.length;
const registerInput = (e) => {
  if (chat.allowInput == false) return;
  chat.inputText = e.target.value;
  if (e.key == "Enter") {
    //     if (chat.inputText.length === 0) return;
    if (chat.inputText[0] == "/") {
      chat.inputText = chat.inputText.substr(1);
      if (chat.inputText.length > 0) {
        mp.invoke("command", chat.inputText);

        chat.inputHistory.push("/" + chat.inputText);
      }
    } else {
      mp.invoke("chatMessage", chat.inputText);
      chat.inputHistory.push(chat.inputText);
    }
    toggleChatInput(false);
    inputElement.value = "";
    chat.inputHistoryIdx = chat.inputHistory.length;
  }

  if (e.key == "t" && chat.active == false) {
    toggleChatInput(true);
    e.preventDefault();
  }

  if (e.key == "ArrowUp") {
    if (chat.inputHistory.length === 0) return;

    const previousMessages = chat.inputHistory;

    if (chat.inputHistoryIdx <= 0) return;

    inputElement.value = previousMessages[chat.inputHistoryIdx - 1];
    chat.inputHistoryIdx--;
  }
  if (e.key == "ArrowDown") {
    if (chat.inputHistory.length === 0) return;

    const previousMessages = chat.inputHistory;

    if (chat.inputHistoryIdx >= previousMessages.length - 1) return;

    inputElement.value = previousMessages[chat.inputHistoryIdx + 1];
    chat.inputHistoryIdx++;
  }
};

window.onkeyup = registerInput;
window.onload = chatAPI.push("Welcome to Invictum Racing");

window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

let api = {
  "chat:push": chatAPI.push,
  "chat:clear": chatAPI.clear,
  "chat:activate": chatAPI.activate,
  "chat:show": chatAPI.show,
};

for (let fn in api) {
  mp.events.add(fn, api[fn]);
}
