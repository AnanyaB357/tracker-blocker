// Map domain names to categories — matches domains from rules.json
const domainCategoryMap = {
    "google-analytics.com": "Analytics",
    "doubleclick.net": "Ad Targeting",
    "facebook.net": "Social Tracking",
    "facebook.com": "Social Tracking",
    "googletagmanager.com": "Tag Management",
    "googlesyndication.com": "Ad Delivery",
    "adnxs.com": "Ad Exchange",
    "adsrvr.org": "Behavioral Advertising",
    "criteo.com": "Retargeting",
    "rubiconproject.com": "Ad Exchange",
    "yieldmo.com": "Ad Optimization",
    "openx.net": "Ad Exchange",
    "bluekai.com": "Data Management",
    "scorecardresearch.com": "Audience Measurement",
    "quantserve.com": "Audience Measurement",
    "mathtag.com": "Cross-Device Tracking",
    "moatads.com": "Ad Verification",
    "casalemedia.com": "Ad Exchange",
    "bidswitch.net": "Programmatic Bidding",
    "tapad.com": "Cross-Device Tracking"
  };
  console.log("Service worker started");

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
  try {
    const url = new URL(info.request.url);
    const domain = url.hostname.replace("www.", ""); // normalize domain
    
    // Lookup category, or use "Unknown"
    const category = domainCategoryMap[domain] || "Unknown";

    // Get current counts from storage
    chrome.storage.local.get(['trackerCounts', 'categoryCounts'], (result) => {
      const trackerCounts = result.trackerCounts || {};
      const categoryCounts = result.categoryCounts || {};

      // Increment counts
      trackerCounts[domain] = (trackerCounts[domain] || 0) + 1;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;

      // Save updated counts
      chrome.storage.local.set({ trackerCounts, categoryCounts }, () => {
        console.log(`Blocked tracker: ${domain} (${category})`);
      });
    });
  } catch (e) {
    console.error("Error processing blocked request:", e);
  }
});
