import React, { useEffect, useState } from 'react';
import { loadMoney, loadWeather } from './api';
import { changeItemStatus, createItem, deleteItem } from './tasks';
import AddTask from './AddTask';
import Task from './Task';
import './App.css';

const STORAGE_KEY = 'bb-lab-items';

function App() {
  const [items, setItems] = useState(getSavedItems);
  const [text, setText] = useState('');
  const [money, setMoney] = useState(null);
  const [weather, setWeather] = useState(null);
  const [message, setMessage] = useState('Загрузка данных...');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    async function loadInfo() {
      try {
        const moneyData = await loadMoney();
        const weatherData = await loadWeather();

        setMoney(moneyData);
        setWeather(weatherData);
        setMessage('');
      } catch (error) {
        console.error(error);
        setMessage('Не получилось загрузить информеры');
      }
    }

    loadInfo();
  }, []);

  function addItem(event) {
    event.preventDefault();
    setItems((currentItems) => createItem(currentItems, text));
    setText('');
  }

  function toggleItem(id) {
    setItems((currentItems) => changeItemStatus(currentItems, id));
  }

  function removeItem(id) {
    setItems((currentItems) => deleteItem(currentItems, id));
  }

  return (
    <main className="layout">
      <section className="panel">
        <h1>Учебный планер</h1>

        <div className="info-line">
          {message && <p>{message}</p>}
          {money && (
            <p>
              USD: {money.usd} руб. | EUR: {money.eur} руб.
            </p>
          )}
          {weather && (
            <p>
              {weather.city}: {weather.temp}, ветер {weather.wind}
            </p>
          )}
        </div>

        <AddTask value={text} onChange={setText} onSubmit={addItem} />

        <p className="count">Всего задач: {items.length}</p>

        {items.length === 0 ? (
          <p className="empty">Список пока пустой.</p>
        ) : (
          <ul className="todo-list">
            {items.map((item) => (
              <Task
                key={item.id}
                item={item}
                onToggle={toggleItem}
                onDelete={removeItem}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

function getSavedItems() {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default App;
