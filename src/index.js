const input = document.getElementById("message-input");
const output = document.getElementById("message-output");
const button = document.getElementById("button");
const iframe = document.getElementById("iframe");

var elems = document.getElementsByTagName("*");

const channel = new MessageChannel();
const port1 = channel.port1;

// Wait for the iframe to load
iframe.addEventListener("load", onLoad);

function onLoad() {
  // Listen for button clicks
  button.addEventListener("click", onClick);

  // Listen for messages on port1
  port1.onmessage = onMessage;

  // Transfer port2 to the iframe
  iframe.onload = () =>{
    // iframe.contentWindow.postMessage("snaptrudeapi", "*", [channel.port2]);
    iframe.contentWindow.postMessage("snaptrudeapi", "*");
  }
  
}

// Post a message on port1 when the button is clicked
function onClick(e) {
  e.preventDefault();
  iframe.contentWindow.postMessage("snaptrudeapi", "*");
  port1.postMessage(input.value);
}

// Handle messages received on port1
function onMessage(e) {
  output.innerHTML = e.data;
  input.value = "";
}

onLoad();
