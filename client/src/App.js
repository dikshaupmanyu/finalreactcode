import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Product from './components/Product';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from "react-router-dom"
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Update from './components/Update';
import Category from './components/Category';
import ListCategory from './components/ListCategory';
import EditCategory from './components/EditC';
import Subcategory from './components/Subcategory';
import ListSubcategory from './components/ListSubcategory';
import EditSubCategory from './components/EditSC';

function App() {
  return (
    <>
    <Header />

    <Routes>
      <Route path='/' element={ <SignUp />} />
      <Route path='/signin' element={ <SignIn />} />
      <Route path='/home' element={ <Home />} />
      <Route path='/product' element={ <Product />} />
      <Route path='/product/:id' element={ <Update />} />
      <Route path='/addCategory' element={ <Category />} />
      <Route path='/categoryList' element={ <ListCategory />} />
      <Route path='/editCategory/:id' element={ <EditCategory />} />
      <Route path='/addSubcategory' element={ <Subcategory />} />
      <Route path='/subcategoryList' element={ <ListSubcategory />} />
      <Route path='/editSubCategory/:id' element={ <EditSubCategory />} />
      
    </Routes>
   
  </>
  );
}

export default App;
