self.addEventListener('push', function (event) {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      console.error("Push event data parsing failed:", e);
    }
  }

  const title = data.title || "ActNow";
  const options = {
    body: data.body || "You have a new update!",
    icon: data.icon || "/icon.png", // fallback icon
    // Optional: You can add actions or a click_url here
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
  