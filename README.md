## Описание проекта

Самостоятельный проект мессенджера в рамках курса "Миддл-фронтенд разработчик".

На данный момент сверстаны страницы:

- [Главная](https://stately-florentine-4ab78d.netlify.app)
- [Вход](https://stately-florentine-4ab78d.netlify.app/login)
- [Регистрация](https://stately-florentine-4ab78d.netlify.app/registration)
- [Профиль](https://stately-florentine-4ab78d.netlify.app/profile)
- [Редактирование профиля](https://stately-florentine-4ab78d.netlify.app/profileEdit)
- [Изменение пароля](https://stately-florentine-4ab78d.netlify.app/passwordEdit)
- [Чат](https://stately-florentine-4ab78d.netlify.app)
- [404](https://stately-florentine-4ab78d.netlify.app/404)
- [500](https://stately-florentine-4ab78d.netlify.app/500)

## Макет

Ссылка на макет: https://www.figma.com/file/iA9a0hKptAJPh4afg120Ry/Middle.messenger.praktikum.yandex

В процессе разработки проект интерфейс притерпел небольшие зименения по сравнению с макетами.

## Установка проекта

Для запуска проекта необходимо выполнить следующие команды:

- `git clone https://github.com/eldarknz/middle.messenger.praktikum.yandex.git` — клонируем репозиторий,
- `cd middle.messenger.praktikum.yandex` — переходим в директорию проекта,
- `git checkout sprint_3` — переключаемся на ветку спринта,
- `npm install` — устанавливаем зависимости ,
- `npm run start` — запускаем сервер,
- [http://localhost:3000](http://localhost:3000) — сервер запущен на порту 3000.

## Деплой в Netlify

Ссылка на приложение: [ссылке](https://stately-florentine-4ab78d.netlify.app).

## Функционал

На данынй момент в проекте реализованы:

- Регистрация
- Авторизация
- Просмотр профиля пользователя
- Изменения данных профиля пользователя
- Смена пароля
- Смена аватара пользователя
- Получение списка чатов
- Создание нового чата
- Добавление/смена аватара чата
- Удаление чата
- Добавление пользователя
- Удаление пользователя
- Обмен сообщениями с помощью WebSocket

Что предстоит реализовать:

- Адаптивная версия мессенджера
- Поиск чата
- Добавление стикеров
- Добавление файлов/изображений/видео

## API

В рамках реализации проекта был предоставлен готовый API:

[Ссылка на API](https://ya-praktikum.tech/api/v2/swagger/#/)



