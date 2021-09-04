import "@/testModule.js";
import "./style.scss";

console.log("This is console message from index.js");

const doc = document.getElementById("app");
doc.innerHTML = "<p class='generated-text'>This text was generated manually from JS</p>";

function showHelloWorldMessageWithDelay(delay){
  return new Promise(resolve => {
    setTimeout(()=> alert(`Hello World in ${delay} seconds`), parseInt(delay)*1000);
  });
}

async function testAsyncFunc(delayInSec) {
  await showHelloWorldMessageWithDelay(delayInSec);
}

const delayInSec = +prompt("Enter delay before alert show in sec");

testAsyncFunc(delayInSec);
