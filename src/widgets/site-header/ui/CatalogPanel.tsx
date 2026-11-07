import { useState } from "react"
import { Popover } from "../../../shared/ui/popover"
import { useGetCatalogQuery } from "../api/catalog-api"
import { Link } from "react-router"

type CatalogPanelProps = {
    onClose: () => void
}

export function CatalogPanel({ onClose }: CatalogPanelProps) {
    const [selectedGradeId, setSelectedGradeId] = useState<string | null>(null)
    const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)

    const { data: catalog = []} = useGetCatalogQuery()

    return (
        <Popover label="Каталог уроков" placement='top-left' onClose={onClose}>
            <ul>
                {catalog.map((grade) => (
                    <li key={grade.id}>
                        <button 
                            type="button"
                            onClick={() => {
                                setSelectedGradeId(prev => prev === grade.id ? null : grade.id)
                                setSelectedTopicId(null)
                            }}
                        >
                            {grade.title}
                        </button>

                        {selectedGradeId === grade.id
                            ? (
                            <ul>
                                {grade.topics.map((topic) => (
                                    <li key={topic.id}>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedTopicId(topic.id === selectedTopicId ? null : topic.id)}
                                        >
                                            {topic.title}
                                        </button>

                                        {selectedTopicId === topic.id
                                            ? (<ul>
                                                {topic.lessons.map((lesson) => (
                                                    <li key={lesson.id}>
                                                        <Link to={`/lessons/${lesson.id}`} onClick={onClose}>{lesson.title}</Link>
                                                    </li>
                                                ))}
                                            </ul>)
                                            : (<></>)
                                        }
                                    </li>
                                ))}
                            </ul>
                            )
                            : (
                                <></>
                            )}
                    </li>
                ))}
            </ul>
        </Popover>
    )
}