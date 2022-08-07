export function render(notificationMessage, theme = 'success') {
  const defaultOptions = {
    closeOnClick: true,
    displayCloseButton: false,
    positionClass: 'nfc-top-right',
    onclick: false,
    showDuration: 3500,
    theme: 'success',
  };

  const notification = window.createNotification({
    theme: theme,
    showDuration: 5000,
  });

  notification({
    message: notificationMessage,
  });
}
