# Aveto

Полноценный проект доски объявлений (клон Avito): клиент на Next.js и backend API на NestJS + Prisma/PostgreSQL.  
Проект включает каталог объявлений, карточки товаров/услуг, профиль пользователя, избранное, отзывы, чат в реальном времени, авторизацию (включая OAuth), загрузку файлов и email-сценарии (подтверждение, коды, сброс пароля).

---

## О проекте

Aveto — это сервис объявлений, где пользователи могут:

- публиковать объявления с фото;
- искать по каталогу и фильтровать результаты;
- просматривать карточки объявлений и профили продавцов;
- добавлять объявления в избранное;
- оставлять отзывы;
- общаться в чатах (включая realtime-события через WebSocket);
- регистрироваться, входить, подтверждать email и восстанавливать пароль.

Проект разделен на два независимых приложения:

- `frontend` — веб-клиент (Next.js App Router);
- `backend` — REST API + WebSocket + Prisma.

---

## Технологический стек

### Frontend

- Next.js `16`
- React `19`
- TypeScript
- Tailwind CSS `4`
- TanStack React Query
- Axios
- Zustand
- React Hook Form + Zod
- Radix UI + shadcn/ui-style компоненты
- Socket.IO Client

### Backend

- NestJS `11`
- Prisma `7`
- PostgreSQL
- JWT + Passport
- OAuth (Google, Yandex)
- Socket.IO (gateway для чатов/сообщений)
- Resend (email-отправка)
- Class Validator / Class Transformer

---

## Функциональность

### Объявления

- создание объявления с медиа;
- получение списка объявлений;
- поиск и фильтрация (поисковая строка, диапазон цены, категории и др.);
- открытие объявления по `slug`;
- увеличение счетчика просмотров;
- добавление/удаление в избранное.

### Категории

- список категорий;
- получение категории по `slug` с дочерними элементами;
- создание категории через API.

### Пользователь и профиль

- получение текущего пользователя (`me`);
- обновление профиля и аватара;
- просмотр публичного профиля продавца (`brand` страница);
- разделы личного кабинета (избранное, рейтинг, мессенджер, расширенный профиль).

### Авторизация и безопасность

- регистрация и вход;
- logout и refresh-токены;
- подтверждение email (verify flow);
- отправка кодов на email;
- сброс пароля;
- OAuth через Google и Yandex.

### Отзывы

- получение отзывов по пользователю;
- создание отзыва авторизованным пользователем.

### Чаты и сообщения

- создание и получение чатов;
- отправка, редактирование, удаление сообщений;
- realtime-обновления через Socket.IO events.

### Файлы и изображения

- upload endpoint на backend;
- раздача загруженных файлов из `/uploads`;
- отображение изображений через `next/image` с разрешенными внешними источниками.

### Внешние интеграции

- DaData (подсказки адреса);
- Resend (email-письма для auth-сценариев).

---

## Страницы и роуты (Frontend)

Ниже перечислены найденные страницы App Router:

- `/` — главная страница;
- `/catalog` — каталог объявлений;
- `/c/[slug]` — страница категории;
- `/p/[slug]` — карточка объявления;
- `/brand/[brandId]` — публичная страница продавца;
- `/additem` — создание объявления;
- `/review` — форма отзыва (`uid`, опционально `adId` в query);
- `/auth/reset` — сброс пароля.

Маршруты личного кабинета (группа `(profile)`, URL без префикса группы):

- `/profile`;
- `/profile/extended`;
- `/profile/favorites`;
- `/profile/rating`;
- `/profile/messenger`;
- `/profile/messenger/chat/[chatId]`.

Дополнительно:

- используются `layout.tsx` (корневой и profile-layout);
- присутствуют `generateMetadata` на части страниц (SEO);

---

## API (Backend)

Backend поднимается с глобальным префиксом `/api`.  
Swagger доступен по `/api/docs`.

Основные группы endpoint:

- `ads` — объявления, получение по slug, избранное;
- `categories` — категории;
- `auth` — register/login/logout/refresh/verify/send-code/reset-password;
- `auth/google`, `auth/yandex` — OAuth сценарии;
- `users` — профиль пользователя и данные продавца;
- `reviews` — отзывы;
- `chats` — чаты;
- `messages` — сообщения;
- `upload` — загрузка файлов.

Realtime:

- WebSocket Gateway для сообщений (Socket.IO), события join/message/edit/delete.

---

## Переменные окружения

Ниже перечислены ключи, используемые кодом.  
Рекомендуется хранить значения только в локальных `.env` и не коммитить секреты.

### Frontend (`frontend/.env`)

- `NEXT_PUBLIC_SERVER_URL` — базовый URL backend API для axios;
- `NEXT_PUBLIC_SERVER_DOMAIN` — домен/URL для Socket.IO;
- `NEXT_PUBLIC_GOOGLE_AUTH` — URL входа через Google;
- `NEXT_PUBLIC_YANDEX_AUTH` — URL входа через Yandex;
- `NEXT_PUBLIC_DADATA_API_KEY` — API ключ DaData;
- `NEXT_PUBLIC_DADATA_SECRET_KEY` — секрет DaData.

### Backend (`backend/.env`)

- `CLIENT_URL` — frontend origin (CORS, OAuth redirect links, socket cors);
- `SERVER_PORT` — порт backend;
- `SERVER_URL` — базовый внешний URL backend;
- `DB_URL` — строка подключения PostgreSQL;
- `JWT_SECRET` — секрет JWT;
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CALLBACK_URL`
- `YANDEX_CLIENT_ID`
- `YANDEX_CLIENT_SECRET`
- `YANDEX_CLIENT_REDIRECT_URL`
- `RESEND_API_KEY`

---

## Быстрый старт

### 1) Установка зависимостей

```bash
# backend
cd backend
npm install

# frontend
cd ../frontend
npm install
```

### 2) Настройка окружения

- создайте/заполните `.env` для `backend`;
- создайте/заполните `.env` для `frontend`;
- убедитесь, что `CLIENT_URL` и frontend URL совпадают;
- убедитесь, что frontend ходит в правильный backend (`NEXT_PUBLIC_SERVER_URL`).

### 3) База данных (backend)

Используется Prisma + PostgreSQL. Перед запуском убедитесь, что БД доступна по `DB_URL`, затем примените миграции (по вашему рабочему процессу Prisma в проекте).

### 4) Запуск в dev

```bash
# terminal 1
cd backend
npm run start:dev

# terminal 2
cd frontend
npm run dev
```

После запуска:

- frontend: обычно `http://localhost:3000`;
- backend: обычно `http://localhost:5000` (или ваш `SERVER_PORT`);
- swagger: `http://localhost:<PORT>/api/docs`.

---

## Сборка и запуск в production

### Backend

```bash
cd backend
npm run build
npm run start:prod
```

### Frontend

```bash
cd frontend
npm run build
npm run start
```
