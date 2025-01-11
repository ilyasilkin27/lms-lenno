# Документация API

## Ссылки на сервисы
- **Frontend**: [фронтенд](https://lms-lenno-frontend.vercel.app)
- **User Service**: [юзерс-савис](https://lms-lenno-user-service.onrender.com/api/users)
- **Auth Service**: [ауф-савис](https://lms-lenno-auth-service.onrender.com)

---

## User Service

### Базовый URL
```
https://lms-lenno-user-service.onrender.com/api/users
```

### Эндпоинты

#### 1. Регистрация пользователя
- **Метод**: `POST`
- **URL**: `/register`
- **Тело запроса (JSON)**:
  ```json
  {
    "name": "string",
    "surname": "string",
    "login": "string",
    "password": "string"
  }
  ```
- **Ответ (успешный, 201)**:
  ```json
  {
    "id": "string",
    "name": "string",
    "surname": "string",
    "login": "string"
  }
  ```
- **Ответ (ошибка, 400)**

#### 2. Получение списка пользователей
- **Метод**: `GET`
- **URL**: `/`
- **Ответ (успешный, 200)**:
  ```json
  [
    {
      "id": "string",
      "name": "string",
      "surname": "string",
      "login": "string"
    }
  ]
  ```

#### 3. Получение пользователя по логину
- **Метод**: `GET`
- **URL**: `/:login`
- **Пример**: `/john_doe`
- **Ответ (успешный, 200)**:
  ```json
  {
    "id": "string",
    "name": "string",
    "surname": "string",
    "login": "string",
    "password": "hashed_string"
  }
  ```
- **Ответ (ошибка, 404)**: Пользователь не найден

---

## Auth Service
### Базовый URL
```
https://lms-lenno-auth-service.onrender.com/api/auth
```

### Эндпоинты

#### 1. Регистрация пользователя
- **Метод**: `POST`
- **URL**: `/register`
- **Тело запроса (JSON)**:
  ```json
  {
    "name": "string",
    "surname": "string",
    "login": "string",
    "password": "string"
  }
  ```
- **Ответ (успешный, 201)**:
  ```json
  {
    "id": "string",
    "name": "string",
    "surname": "string",
    "login": "string"
  }
  ```
- **Ответ (ошибка, 400)**

#### 2. Авторизация пользователя
- **Метод**: `POST`
- **URL**: `/login`
- **Тело запроса (JSON)**:
  ```json
  {
    "login": "string",
    "password": "string"
  }
  ```
- **Ответ (успешный, 200)**:
  ```json
  {
    "_id": "string",
    "name": "string",
    "surname": "string",
    "login": "string",
    "role": "string",
    "token": "jwt_token"
  }
  ```
- **Ответ (ошибка, 401)**: Неверный логин или пароль

