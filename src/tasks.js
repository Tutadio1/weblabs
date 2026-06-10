export function createItem(items, text) {
  const value = text.trim();

  if (value === '') {
    return items;
  }

  return [
    {
      id: Date.now(),
      text: value,
      done: false
    },
    ...items
  ];
}

export function changeItemStatus(items, id) {
  return items.map((item) =>
    item.id === id ? { ...item, done: !item.done } : item
  );
}

export function deleteItem(items, id) {
  return items.filter((item) => item.id !== id);
}
