import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage, { Trending } from './components/homeScreen/HomePage'
import SportsCard from './components/topSports/SportsCard'
import MainCard from './components/topStoriesNews/MainCard'

function App() {

  return (
      // <div style={{width:"100%",height:"100vh"}}>
      <div style={{display:"flex",backgroundColor:"rgb(14 102 96 / 78%)"}}>
        {/* <MainCard />
        <SportsCard /> */}
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path='/' element={<Navigate to="/trending" replace/>} />
            <Route path='/trending' element={<Trending />}/>
            <Route path="*" element={<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100px"}}>Under construction....!</div>} />
          </Route>
        </Routes>
      </div>
      // </div>



  )
}

export default App
