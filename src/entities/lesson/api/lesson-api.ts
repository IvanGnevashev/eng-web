import { baseApi } from "../../../shared/api";
import { mockLessons } from "../model/mock-lessons";
import type { Lesson } from "../model/types";

const lessonApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getLessonById: builder.query<Lesson, string>({
            queryFn: (lessonId) => {
                const lesson = mockLessons.find((lesson) => lesson.id === lessonId)
                return lesson ? {data: lesson} : {error: {status: 404, data: 'Урок не найден'}}
            },
        }),
    }),
})

export const {useGetLessonByIdQuery} = lessonApi