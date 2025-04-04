### Описание проекта
LMS Lenno - это система управления обучением, разработанная для оптимизации образовательных процессов. Система включает функции управления группами, дисциплинами, студентами и событиями календаря с интеграцией Google Calendar.

### Функциональность
- **Управление пользователями**: Система регистрации и аутентификации
- **Управление группами**: Создание и управление группами студентов
- **Управление дисциплинами**: Организация и отслеживание учебных дисциплин
- **Управление студентами**: Добавление и управление информацией о студентах
- **Интеграция с календарем**:
  - Создание и управление событиями
  - Синхронизация с Google Calendar
  - Уведомления и напоминания о событиях

### Технологический стек
- **Фронтенд**: React, React-Big-Calendar, Bootstrap
- **Бэкенд**: Node.js, Express
- **База данных**: Supabase
- **Аутентификация**: Пользовательская система на основе JWT
- **Интеграция с календарем**: Google Calendar API
- **Контейнеризация**: Docker

### Архитектура
Бэкенд построен на основе микросервисной архитектуры, где каждый сервис отвечает за определенную функциональную область:

- **loginService**: Обрабатывает аутентификацию пользователей и управление JWT токенами
- **registerService**: Управляет регистрацией пользователей и созданием профилей
- **groupService**: Обрабатывает создание групп, управление ими и назначение студентов
- **classService**: Управляет учебными занятиями и расписанием
- **calendarService**: Интегрируется с Google Calendar для управления событиями

Каждый микросервис:
- Запускается в собственном Docker-контейнере
- Имеет собственные API-эндпоинты
- Может масштабироваться независимо
- Общается с другими сервисами через HTTP
- Поддерживает собственное управление ошибками и логирование

### Структура проекта
```
lms-lenno/
├── frontend/              # React фронтенд приложение
│   ├── src/
│   │   ├── components/    # React компоненты
│   │   ├── api/          # Интеграция с API
│   │   └── assets/       # Стили и изображения
│   └── package.json
│
├── backend/               # Node.js бэкенд сервисы
│   ├── loginService/     # Сервис аутентификации
│   ├── registerService/  # Сервис регистрации
│   ├── groupService/     # Сервис управления группами
│   ├── classService/     # Сервис управления занятиями
│   ├── calendarService/  # Сервис интеграции с календарем
│   └── docker-compose.yml
│
└── README.md
```

### Переменные окружения
- `SUPABASE_URL`: URL вашего проекта Supabase
- `SUPBASE_KEY`: API ключ Supabase
- `GOOGLE_CLIENT_EMAIL`: Email сервисного аккаунта Google
- `GOOGLE_PRIVATE_KEY`: Приватный ключ сервисного аккаунта Google
- `GCALENDAR_KEY`: API ключ Google Calendar

### Документация API
- Аутентификация: `POST /api/auth/login`
- Регистрация: `POST /api/auth/register`
- Группы: `GET/POST /api/groups`
- Дисциплины: `GET/POST /api/disciplines`
- События календаря: `GET/POST/DELETE /api/calendar/events`
