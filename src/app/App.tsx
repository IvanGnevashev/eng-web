import { HomePage } from '../pages/home'
import './styles/reset.css'
import './App.css'
import { Route, Routes } from 'react-router'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { LessonPage } from '../pages/lesson'
import { SiteHeader } from '../widgets/site-header'
import { ProfilePage } from '../pages/profile'
import { EditorPage } from '../pages/editor'

function App() {
  return (
    <Provider store={store}>
      <SiteHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/lessons/:lessonId' element={<LessonPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/editor/:lessonId' element={<EditorPage />} />
        </Routes>
      </main>
    </Provider>
  )
}

export default App
