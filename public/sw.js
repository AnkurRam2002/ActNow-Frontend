self.addEventListener('push', (event) => {
    const data = event.data?.json() || {};
    const { title = "Notification", body = "You have a new message!" } = data;
  
    event.waitUntil(
      self.registration.showNotification(title, {
        body,
        icon: '/icon.png', // Optional
      })
    );
  });
  