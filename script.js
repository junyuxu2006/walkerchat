let socket;
let usernameInput;
let chatIDInput;
let messageInput;
let chatRoom;
let messages = [];
let delay = true;
let currentUser;

function onload(){
  socket = io();
  usernameInput = document.getElementById("NameInput");
  chatIDInput = document.getElementById("IDInput");
  messageInput = document.getElementById("ComposedMessage");
  chatRoom = document.getElementById("RoomID");

  socket.on("join", function(room){
    chatRoom.innerHTML = "Chatroom: " + room;
  });

  socket.on("recieve", function(message){
    console.log(message);
    if (messages.length <= 9){
      messages.push(message);
    }
    else{
      messages.shift();
      messages.push(message);
    }
    for (i = 0; i < messages.length; i++){
        document.getElementById("Message"+i).innerHTML = messages[i];
        document.getElementById("Message"+i).style.color = "#b0b0b0";
    }
  });
}

function Connect(){
  let re = /^\#[\d]{1,5}$/g;
  if(re.test(usernameInput.value)) {
    if(usernameInput.value === "#44032") {
      return alert("Nice try, buckaroo");
    } else if(usernameInput.value === "#0") {
      return alert("If you are #0, please contact Jarate#8888 on Discord to give proof.");
    } else if(usernameInput.value.startsWith("#0")) {
      return alert("Please do not put any 0's at the beginning of your ID!");
    }
    socket.emit("join", chatIDInput.value, usernameInput.value);
  } else {
    return alert("You must supply a valid Walker ID!");
  }
}

function Send(){
  if (delay && messageInput.value.replace(/\s/g, "") !== ""){
    delay = false;
    setTimeout(delayReset, 1000);
    socket.emit("send", messageInput.value);
    messageInput.value = "";
  }
}

function delayReset(){
  delay = true;
}

window.addEventListener("keypress", function (e) {
  let usernameBox = document.getElementById("NameInput");
  let messageBox = document.getElementById("ComposedMessage");
  if(event.key == "Enter" && usernameBox == document.activeElement) {
    Connect();
  }
  if(event.key == "Enter" && messageBox == document.activeElement) {
    Send();
  }
});
