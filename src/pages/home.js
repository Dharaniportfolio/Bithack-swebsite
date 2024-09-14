import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Tracks from '../components/tracks';
import Timeline from '../components/Timeline';
import Faq from '../components/Faq';
import Contact from '../components/Contact';
import About from '../components/About';
import Login from '../pages/login';
import Domain from '../pages/domain';
import ProblemStatements from './problemstatement';
import ProblemDetail from './problemdetail';
import RegistrationPage from './registration page';
import { RegistrationProvider } from './registrationcontext';
import ProfilePage from './profile';
import StaffPage from './staffpage';

function Home({ isLoggedIn, setIsLoggedIn, isStaff, setIsStaff }) {
  return (
    <RegistrationProvider>
      <div className='App'>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path='/' element={<Content />} />
          <Route path='/about' element={<About />} />
          <Route path='/tracks' element={<Tracks />} />
          <Route path='/timeline' element={<Timeline />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/domain' element={<Domain />} />
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} setIsStaff={setIsStaff} />} />
          <Route path='/problems/:domain' element={<ProblemStatements />} />
          <Route path='/problem-statements/:domain/:problemCode' element={<ProblemDetail />} />
          <Route path='/register/:domain/:problemCode' element={<RegistrationPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/staff' element={<StaffPage />} /> 
        </Routes>
      </div>
    </RegistrationProvider>
  );
}

function Content() {
  return (
    <div className='home'>
      <div id='about'>
        <About />
      </div>
      <div id='track'>
        <Tracks />
      </div>
      <div id='time'>
        <Timeline />
      </div>
      <div id='faq'>
        <Faq />
      </div>
      <div id='contact'>
        <Contact />
      </div>
    </div>
  );
}

export default Home;
