import Login from './components/Login';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom';
import HList from './hospital/HList';
import HRegister from './hospital/HRegister';
import Hedit from './hospital/Hedit';
import UList from './user/UList';
import URegister from './user/URegister';
import PList from './patient/PList';
import PRegister from './patient/PRegister';
import PEdit from './patient/PEdit';
import PDetail from './patient/PDetail';
import BRegister from './bill/BRegister';
import Insurance from './insurance/Insurance';
import useAuth from './hooks/useAuth';



function App() {
 
  return (
    <Routes>
     
        {/* public routes */}
        <Route path="/" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} /> */}

         {/* Protected routes */}
        <Route element={<PersistLogin />}>
         
         
          <Route element={<RequireAuth allowedRoles={'1'} />}>
          <Route exact path='/hlist'  element={<HList/>} />
          <Route path="/HRegister" element={<HRegister/>} />
          <Route path="/Hedit" element={<Hedit />} />

          <Route path="/UList" element={<UList/>} />
          <Route path="/URegister" element={<URegister />} />
          </Route>
          
           <Route element={<RequireAuth allowedRoles={'2'} />}>
            <Route exact path='/plist'  element={<PList />} />
            <Route exact path='/PRegister'  element={<PRegister />} />
            <Route exact path='/PEdit'  element={<PEdit />} />
            <Route exact path='/PDetail'  element={<PDetail />} />
            <Route exact path='/BRg'  element={<BRegister />} />
            
          </Route>
         
            <Route element={<RequireAuth allowedRoles={'3'} />}>
            <Route exact path='/plst'  element={<PList />} />
            <Route exact path='/PDtl'  element={<PDetail />} />
            <Route exact path='/BRegister'  element={<BRegister />} />
           
          </Route>
         
            <Route element={<RequireAuth allowedRoles={'4'} />}>
            <Route exact path='/Insurance'  element={<Insurance />} />
          
           
          </Route>
          
         
          
    

        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} /> 
      
    </Routes>
  );
}

export default App;