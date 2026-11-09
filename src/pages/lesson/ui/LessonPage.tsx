import { Link, useParams } from "react-router"
import { useGetLessonByIdQuery } from "../../../entities/lesson";
import { skipToken } from "@reduxjs/toolkit/query";

export function LessonPage() {
    const {lessonId} = useParams();
    const {currentData: lesson, isError} = useGetLessonByIdQuery(lessonId ?? skipToken)

    return (
        <>
            <Link to={`/editor/${lessonId}`}>Редактировать урок</Link>

            {!lessonId ? (
                    <p>Некорректная ссылка</p>
                ) : isError ? (
                    <p>Урок не найден</p>
                ) : !lesson ? (
                    <p>Загружаем урок...</p>
                ) : (
                    <article>
                        <h1>{lesson.title}</h1>
                        <p>{lesson.description}</p>
                        {lesson.content.map((paragrah, index) => {
                            return <p key={index}>{paragrah}</p>
                        })}
                        {lessonId}
                </article>
                )
            }
        </>
    )
}