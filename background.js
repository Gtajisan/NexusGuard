// Nexus Guard - Hybrid Service Worker
console.log("Nexus Guard Background Service Running...");

// Smart Device Detector: PC te Side Panel, Mobile e Popup
if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .then(() => console.log("Desktop Detected: Side Panel Activated."))
    .catch((error) => console.error("Panel Error:", error));
} else {
  console.log("Mobile Browser Detected: Falling back to Default Popup.");
}
