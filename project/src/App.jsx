import './App.css'
import Header from './Componants/Header'
import Sidebar from './Componants/sidebar/Sidebar'
import BotRouter from './Componants/BotRoutes'
import { BrowserRouter } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import SidebarLayout from './Componants/SidebarLayout'
import Timetable from './Componants/Timetable/Timetable'
import QuizMaker from './Componants/quizMaker/quizmaker'
import Main from './Componants/MainPage/Main'
import AboutUs from './Componants/SupPages/AboutUs'
import ContactUs from './Componants/SupPages/ContactUs'
import HowItWorks from './Componants/SupPages/HowItWorks'
import Home from './Componants/SupPages/Home'
import Review from './Componants/ReviewPage/Review'

function App() {

  return (
    <>
     <BrowserRouter>
        <Header />
         <Routes>
           <Route path='/' element={<Main/>} />
           <Route path='bot' element={<SidebarLayout/>}>
             <Route path=':botId' element={<BotRouter/>}/>
             <Route path="aboutus" element={<AboutUs/>} />
           </Route>
           <Route path='tools/timetable' element={<Timetable/>} />
           <Route path='tools/quizmaker' element={<QuizMaker/>} />
           <Route path="aboutus" element={<AboutUs/>} />
           <Route path="contact" element={<ContactUs/>} />
           <Route path="how-it-works" element={<HowItWorks/>} />
           <Route path="home" element={<Home/>} />
           <Route path='tools/review' element={<Review/>}/>
         </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
