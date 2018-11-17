export function isFirefox() {
  const mediaSourceSupport = !!navigator.mediaDevices.getSupportedConstraints().mediaSource;
  const matchData = navigator.userAgent.match(/Firefox\/(\d+)/);
  let firefoxVersion = 0;
  if (matchData && matchData[1]) {
    firefoxVersion = parseInt(matchData[1], 10);
  }
  return mediaSourceSupport && firefoxVersion >= 52;
}

export function isChrome() {
  return 'chrome' in window;
}
