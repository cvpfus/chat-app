export const useLocalStorage = (key) => {
  const valueJson = window.localStorage.getItem(key);

  let value = null;

  if (valueJson) {
    value = JSON.parse(valueJson);
  }

  return value;
};
