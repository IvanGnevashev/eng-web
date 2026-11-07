import type { Lesson } from "./types";

export const mockLessons: Lesson[] = [{
    id: 'lesson-hello-and-goodbye',
    title: 'Hello and goodbye',
    description: 'Учимся здороваться и прощаться: hello, hi, goodbye, bye.',
    content: [
      'Чтобы поздороваться по-английски, скажи Hello! В разговоре с друзьями можно использовать Hi!',
      'Чтобы попрощаться, скажи Goodbye! Более короткий и неформальный вариант — Bye!',
      'Пример разговора: — Hello, Anna! — Hi, Tom! — Goodbye, Anna! — Bye, Tom!',
    ],
}, {
    id: 'lesson-my-name-is',
    title: 'My name is…',
    description: 'Представляемся и спрашиваем имя: My name is Anna. What is your name?',
    content: [
      'Чтобы представиться, используй выражение My name is… и добавь своё имя. Например: My name is Anna.',
      'Чтобы узнать имя собеседника, спроси: What is your name? Это означает «Как тебя зовут?».',
      'Пример знакомства: — Hello! My name is Anna. What is your name? — Hi, Anna! My name is Tom.',
    ],
}, ]