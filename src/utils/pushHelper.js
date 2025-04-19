import urlBase64ToUint8Array from "./urlBase64ToUint8Array";

export async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    let registration = await navigator.serviceWorker.getRegistration();
    if (!registration) {
      registration = await navigator.serviceWorker.register("/service-worker.js");
    }
    return registration;
  }
  throw new Error("Service workers are not supported in this browser.");
}


export async function subscribeUserToPush(registration) {
  // ✅ Ask for notification permission
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.warn("Notification permission not granted.");
    return null;
  }

  const publicKey = "BEUUvV9_gLWaF863_YsomzFYx9tLzqd7CxLs7Utrox-AxROnNJiXLUNXjNH03ISC7psaH-Mm4IybwtL-zKLrDFM"; // Replace with your real VAPID public key
  const convertedKey = urlBase64ToUint8Array(publicKey);

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedKey,
  });

  return subscription;
}
