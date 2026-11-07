export type CatalogLesson = {
  id: string
  title: string
  description: string
}

export type CatalogTopic = {
  id: string
  title: string
  lessons: CatalogLesson[]
}

export type CatalogGrade = {
  id: string
  title: string
  topics: CatalogTopic[]
}
