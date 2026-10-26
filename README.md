# 🐍 Python Условия: `if`, `elif`, `else`
### Интерактивный учебник и экзаменационный тренажёр по информатике (10 класс)

Веб-приложение для подготовки школьников 10 класса к контрольным работам, зачётам и экзаменам по теме **«Ветвления и условные конструкции в языке Python»**.

---

## 🇬🇧 English Overview: What is it & How to use

### 💡 What is this project?
**Python Conditionals Trainer (`if`, `elif`, `else`)** is an interactive, zero-install educational web application created for high school computer science students (Grade 10) preparing for exams and tests.

It provides a visual, hands-on learning environment with real-time condition evaluation, step-by-step code execution, interactive flowcharts, and automated test validation.

### 🌟 Key Highlights:
- **Zero Installation Required**: Runs 100% in any modern web browser (Chrome, Safari, Edge, Firefox). Neither students nor teachers need to install Python, IDLE, or code editors.
- **Visual Step-by-Step Code Tracer**: Interactive debugger highlighting executed lines, inspecting variable memory (`Scope`), and breaking down logical expressions (`True` / `False`).
- **Interactive Flowcharts**: Dynamic branching diagrams (condition diamond, True/False branches) connected with live code.
- **3 Hands-on Practice Blocks**:
  1. *Mental Tracing*: "What will the code output?" with instant feedback.
  2. *Bug Hunter*: Identify and correct syntax and logic pitfalls (missing colons, indentations, `=` vs `==`).
  3. *Code Challenges*: Built-in Python editor with automated test-case runner.
- **Timed Exam Simulator**: 10-question test with a 15-minute countdown and instant official school grade (scale 2–5).
- **Classroom Ready**: Built-in **projector QR code** for instant mobile scanning and a 1-page printable cheat sheet (`Ctrl+P`).

### 🚀 How to Use:
- **For Students & Teachers (No setup)**: Simply open the deployed web URL in any browser or scan the in-app QR code with a phone camera. No login or account required.
- **For Developers (Local development with GitHub)**:
  ```bash
  git clone https://github.com/diplomats11/python-if-elif-else-trainer.git
  cd python-if-elif-else-trainer
  npm install
  npm run dev      # Opens local dev server on http://localhost:3000
  npm test         # Runs automated unit tests
  npm run build    # Builds production bundle in /dist
  ```

---

## 🌐 1. Как пользоваться ученикам и учителям (БЕЗ УСТАНОВКИ)

> ### 🟢 **Ученикам и учителям НИЧЕГО УСТАНАВЛИВАТЬ НЕ НУЖНО!**
> Не нужны: Python, Git, Node.js, терминал, редакторы кода или учётные записи.  
> Всё приложение работает **прямо в браузере** онлайн на любом смартфоне, планшете или школьном компьютере.

### Как запустить на уроке за 5 секунд:
1. **По ссылке в браузере**: откройте ссылку в любом браузере (Chrome, Яндекс Браузер, Safari, Edge):  
   👉 **Ваша опубликованная ссылка из Google AI Studio**
2. **По QR-коду**: нажмите в приложении кнопку **«Раздать ученикам»** и выведите QR-код на проектор — ученики наведут камеру телефона и сразу попадут в тренажёр.

---

## 🚀 Основные возможности

### 1. 📖 Интерактивный теоретический справочник
- **Блок-схемы алгоритмов (ГОСТ)**: интерактивная схема с ползунком температуры, демонстрирующая выбор пути ветвления (*«ДА» / «НЕТ»*) компьютером.
- **3 золотых правила синтаксиса**:
  1. Обязательное двоеточие (`:`) в конце условий.
  2. Отступы (4 пробела / Tab) вместо фигурных скобок.
  3. Разница между знаком присваивания `=` и сравнения `==`.
- **Интерактивная лаборатория логики**: наглядный расчёт связок `and` (И), `or` (ИЛИ), `not` (НЕ) и песочница произвольных логических выражений.
- **Сравнение независимых `if` vs каскада `if-elif`**: динамический тренажёр с изменением значения переменной `x`.
- **Топ-4 типичных экзаменационных ловушек**: разбор ошибок, на которых срезаются до 80% школьников.

### 2. 🔍 Пошаговый визуализатор-отладчик кода (Code Tracer)
- Построчное выполнение Python-кода со стрелкой-указателем `▶`.
- **Инспектор памяти**: отслеживание значений и типов всех переменных в реальном времени.
- **Инспектор условий**: подробная подстановка значений и расчёт `True` / `False`.
- Консольный терминал (stdout) и возможность редактировать или вставлять собственный код на Python.

### 3. 📝 Практические экзаменационные блоки
- **Блок 1: «Что выведет программа?» (Трассировка в уме)**: 5 задач с вариантами ответов, кнопкой мгновенного переноса в отладчик и пошаговым разбором.
- **Блок 2: «Найди и исправь ошибки»**: интерактивный детектив синтаксических (`SyntaxError`, `IndentationError`) и логических багов.
- **Блок 3: «Напиши программу»**: задачи на скидки, категории возраста и координатные четверти со **встроенной системой автоматического тестирования** граничных данных.

### 4. 🎓 Контрольный режим экзамена
- 10 сбалансированных экзаменационных вопросов на время (таймер 15 минут).
- Автоматический подсчёт баллов и выставление школьной отметки по 5-балльной шкале: **«5» (Отлично)**, **«4» (Хорошо)**, **«3» (Удовлетворительно)**, **«2»**.
- Подробный разбор ошибок по каждому вопросу.

### 5. 📋 Печатная шпаргалка & Раздача ученикам
- Кнопка **«Шпаргалка»** с готовой версткой для печати на принтере (`Ctrl+P`).
- Кнопка **«Раздать ученикам»** с готовым **QR-кодом для проектора** и готовым сценарием урока на 45 минут.

---

## 🛠 Технологический стек

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Сборщик**: [Vite 8](https://vitejs.dev/)
- **Стилизация**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Иконки & Анимации**: [Lucide React](https://lucide.dev/), [Motion](https://motion.dev/)
- **QR-коды**: [node-qrcode](https://github.com/soldair/node-qrcode)
- **Тестирование**: Встроенный Node.js Test Runner (`node:test`, `node:assert/strict`)

---

## 💻 2. Только для разработчиков (Запуск исходного кода с GitHub)

> ℹ️ **Внимание**: этот раздел нужен **ТОЛЬКО программистам**, которые хотят скачать исходный код с GitHub на свой компьютер, модифицировать проект или развернуть на собственном сервере. Ученикам и учителям эти команды выполнять **НЕ НУЖНО**.

### Требования к разработчику
- **Node.js** версии 20 или выше
- **npm** (или bun / pnpm)

### Установка и запуск для разработки

1. **Клонируйте репозиторий**:
   ```bash
   git clone https://github.com/diplomats11/python-if-elif-else-trainer.git
   cd python-if-elif-else-trainer
   ```

2. **Установите зависимости**:
   ```bash
   npm install
   ```

3. **Запустите сервер разработки**:
   ```bash
   npm run dev
   ```
   Откройте в браузере: [http://localhost:3000](http://localhost:3000)

4. **Запуск автоматических тестов логики**:
   ```bash
   npm test
   ```

5. **Сборка для продакшена**:
   ```bash
   npm run build
   npm start
   ```

---

## 📁 Структура проекта

```text
├── index.html                    # Точка входа HTML (мета-теги и заголовок)
├── package.json                  # Зависимости и скрипты проекта
├── server.ts                     # Продакшен Express-сервер для развёртывания
├── tsconfig.json                 # Конфигурация TypeScript
├── vite.config.ts                # Конфигурация Vite
└── src/
    ├── main.tsx                  # Монтирование React-приложения
    ├── App.tsx                   # Корневой компонент с навигацией
    ├── index.css                 # Стили Tailwind CSS v4
    ├── types/
    │   └── index.ts              # Типы данных (TraceStep, TaskItem, ExamQuestion)
    ├── utils/
    │   ├── pythonEvaluator.ts    # Песочница и построчный трассировщик Python
    │   ├── pythonEvaluator.test.ts # Модульные тесты для логики и задач
    │   ├── tasksData.ts          # База задач Блоков 1, 2, 3 и вопросов экзамена
    │   └── examScorer.ts         # Логика школьной шкалы оценивания (2–5)
    └── components/
        ├── Navbar.tsx            # Навигационная панель и прогресс
        ├── TheorySection.tsx     # Раздел теории (все 5 частей)
        ├── InteractiveFlowchart.tsx # Интерактивная блок-схема ветвления
        ├── LogicPlayground.tsx   # Интерактивная песочница and / or / not
        ├── IndependentIfComparison.tsx # Сравнение if подряд vs if-elif
        ├── CodeTracer.tsx        # Пошаговый отладчик с инспектором памяти
        ├── PracticeBlock1.tsx    # Блок 1: Трассировка кода
        ├── PracticeBlock2.tsx    # Блок 2: Поиск ошибок
        ├── PracticeBlock3.tsx    # Блок 3: Написание кода с авто-тестами
        ├── ExamModeModal.tsx     # Модальное окно экзамена на время
        ├── CheatSheetModal.tsx   # Шпаргалка для печати (Ctrl+P)
        └── ShareModal.tsx        # Окно раздачи с QR-кодом для проектора
```

---

## 👨‍🏫 Использование на школьном уроке (45 минут)

| Время | Этап | Что делать |
| :--- | :--- | :--- |
| **10 мин** | **Теория** | Демонстрация интерактивной блок-схемы на проекторе. Разбор 3 правил синтаксиса. |
| **15 мин** | **Трассировка** | Ученики решают Блок 1 в уме, сверяясь с пошаговым визуализатором. |
| **10 мин** | **Практика** | Разбор ошибок в Блоке 2 и написание кода скидок и четвертей в Блоке 3. |
| **10 мин** | **Контроль** | Ученики проходят «Режим экзамена». Оценки (2–5) выставляются автоматически. |

---

## 📄 Лицензия

Распространяется под лицензией [Apache-2.0](LICENSE). Свободно для использования в школах, лицеях, кружках программирования и для самостоятельной подготовки.
