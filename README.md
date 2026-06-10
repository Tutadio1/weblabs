# Планер задач

 В проекте есть список задач, курс валют и погодный информер.

## Запуск

```bash
npm install
npm run dev
```

Адрес приложения появится в терминале, обычно `http://localhost:5173`.

## Проверка

```bash
npm run lint
```

## Docker

```bash
docker build -t bb-lab-app .
docker run -p 8081:80 bb-lab-app
```

После запуска контейнера приложение будет доступно по адресу `http://localhost:8081`.
