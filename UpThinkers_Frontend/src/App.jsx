import { useContext } from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import LoginPage from './Assets/User/UserLogin/LoginPage' 
import RegisterPage from './Assets/User/UserRegister/RegisterPage' 
import UserHome from './Assets/User/UserHome/UserHome'
import { AuthContext } from './Context/AuthContext'
import TutorRegister from './Assets/Tutor/TutorRegister/TutorRegister'
import TutorLogin from './Assets/Tutor/TutorLogin/TutorLogin'
import TutorHome from './Assets/Tutor/TutorHome/TutorHome'
import AdminLogin from './Assets/Admin/AdminLogin/AdminLogin'
import AdminHome from './Assets/Admin/AdminDashboard/AdminHome'
import StudentsList from './Assets/Admin/ListStudents/StudentsList'
import TutorsList from './Assets/Admin/ListTutor/TutorsList'


function App() {

  const {token,loading}= useContext(AuthContext)

  if(loading){
    return(
      <h1>Loading...</h1>
    )
  }
  

  return (
   <Router>

    <Routes>
      <Route path="/login" element={token ?  <UserHome/>   :<LoginPage />} />
      <Route path="/" element={<UserHome/>} />
      <Route path="/register" element={token ? <UserHome/>   :<RegisterPage/>} />
      <Route path="/home" element={token ? <UserHome/> :<LoginPage/>} />


      <Route path="/tutor/register" element={token ? <TutorHome/> :<TutorRegister/>}/>
      <Route path="/tutor" element={<TutorHome/>}/>
      <Route path="/tutor/login" element={token ?<TutorHome/> : <TutorLogin/>}/>
      <Route path="/tutor/home" element={token ?<TutorHome/>: <TutorLogin/>}/> 


      <Route path="/admin/login" element={token ?<AdminHome/>: <AdminLogin/>}/> 
      <Route path="/admin/home" element={token ?<AdminHome/>: <AdminLogin/>}/>
      <Route path="/admin/studentslist" element={<StudentsList/>}/>
      <Route path="/admin/tutorslist" element={<TutorsList/>}/>



    </Routes>

   </Router>
  )
}      

export default App
