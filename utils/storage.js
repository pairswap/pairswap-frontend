export function getItem(key) {
  if (typeof window === 'undefined') return;

  try {
    const item = window.localStorage.getItem(key);
    return JSON.parse(item);
  } catch (error) {
    return undefined;
  }
}

export function setItem(key, value) {
  if (typeof window === 'undefined') return;

  try {
    const item = JSON.stringify(value);
    window.localStorage.setItem(key, item);
  } catch (error) {
    console.error(error);
  }
}

export function removeItem(key) {
  window.localStorage.removeItem(key);
}
