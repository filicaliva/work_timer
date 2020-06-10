

function saveTextAsFile() {
  const timertext = document.getElementById("timer").innerHTML,
    textToWrite = document.getElementById('timerForm__text').value + '\n' + timertext,
    textFileAsBlob = new Blob([textToWrite], { type: 'application/msword' }),
    fileNameToSaveAs = document.querySelector('[name = timerForm__title]').value + ' - ' + document.getElementById('timer').textContent + '.doc';
  const downloadLink = document.createElement("a");
  downloadLink.download = fileNameToSaveAs;
  downloadLink.innerHTML = "Download File";
  location.reload();

  if (window.webkitURL != null) {
    // Chrome allows the link to be clicked without actually adding it to the DOM.
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
  } else {
    // Firefox requires the link to be added to the DOM before it can be clicked.
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
  }

  downloadLink.click();
}

function destroyClickedElement(event) {
  // remove the link from the DOM
  document.body.removeChild(event.target);
}

//  Timer
let t = 0, h = 0;
var keepGoing = true;

function myLoop() {
  let minutes = h,
    seconds = t;

  if (t >= 59) {
    h += Math.ceil(t / 59);
    t = -1;
  }
  document.getElementById("timer").innerHTML =
    (minutes >= 10 ? minutes : '0' + minutes)
    + ":" +
    (seconds >= 10 ? seconds : '0' + seconds);
  t++;

  if (keepGoing) {
    setTimeout(myLoop, 1000);
  }
}

function startLoop() {
  keepGoing = true;
  myLoop();
  e.stopImmediatePropagation();
}

function stopLoop() {
  keepGoing = false;
}


//animation circle
let circle = document.querySelector('.circle'),
  screen_two = document.querySelector('.two'),
  timer = document.getElementById('timer');
circle.addEventListener('click', function () {
  this.style = 'animation: move 2s ease 1;'
  setTimeout(function () {
    circle.remove;
    screen_two.style = 'animation: opacits 1s ease-in 1; display: block;';
    circle.style = 'display: none;';
    startLoop();
  }, 1000);
});

timer.addEventListener('dblclick', startLoop);
timer.addEventListener('click', stopLoop);

const button = document.querySelector('#timerForm__svg');
button.addEventListener('click', saveTextAsFile);





