import type { CatalogGrade } from './types'

export const mockCatalog: CatalogGrade[] = [
  {
    id: 'grade-2',
    title: '2 класс',
    topics: [
      {
        id: 'grade-2-greetings',
        title: 'Знакомство',
        lessons: [
          {
            id: 'lesson-hello-and-goodbye',
            title: 'Hello and goodbye',
            description: 'Учимся здороваться и прощаться: hello, hi, goodbye, bye.',
          },
          {
            id: 'lesson-my-name-is',
            title: 'My name is…',
            description: 'Представляемся и спрашиваем имя: My name is Anna. What is your name?',
          },
        ],
      },
      {
        id: 'grade-2-colours',
        title: 'Цвета',
        lessons: [
          {
            id: 'lesson-basic-colours',
            title: 'Red, blue, yellow',
            description: 'Знакомимся с названиями цветов: red, blue, yellow, green.',
          },
          {
            id: 'lesson-what-colour-is-it',
            title: 'What colour is it?',
            description: 'Спрашиваем о цвете предмета и отвечаем: What colour is it? It is blue.',
          },
        ],
      },
    ],
  },
  {
    id: 'grade-3',
    title: '3 класс',
    topics: [
      {
        id: 'grade-3-family',
        title: 'Семья',
        lessons: [
          {
            id: 'lesson-family-members',
            title: 'My family',
            description: 'Называем членов семьи: mother, father, sister, brother.',
          },
          {
            id: 'lesson-this-is-my-sister',
            title: 'This is my sister',
            description: 'Представляем членов семьи: This is my sister. Her name is Kate.',
          },
        ],
      },
      {
        id: 'grade-3-animals',
        title: 'Животные',
        lessons: [
          {
            id: 'lesson-pets',
            title: 'Pets',
            description: 'Знакомимся с домашними питомцами: cat, dog, rabbit, hamster.',
          },
          {
            id: 'lesson-animals-can',
            title: 'Animals can…',
            description: 'Говорим о том, что умеют животные: A bird can fly. A fish can swim.',
          },
        ],
      },
    ],
  },
]
