var loadTarget = 0;
var loadedSoFar = 0;

function setLoadingBar(percentage) {
  document.getElementById("loadbar").style.width = percentage + "%";
}
function showLoadingBar() {
  document.getElementById("loading_bar").style.display = "block";
}
function hideLoadingBar() {
  document.getElementById("loading_bar").style.display = "none";
}

function updateLoadingBar() {
  setLoadingBar((loadedSoFar / loadTarget) * 100);
  if(loadedSoFar == loadTarget)
    hideLoadingBar();
  console.log(loadedSoFar, loadTarget);
}
