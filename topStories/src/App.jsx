import './App.css'
import HomePage from './components/homeScreen/HomePage'
import SportsCard from './components/topSports/SportsCard'
import MainCard from './components/topStoriesNews/MainCard'

function App() {

  return (
      // <div style={{width:"100%",height:"100vh"}}>
      <div style={{display:"flex"}}>
        {/* <MainCard />
        <SportsCard /> */}
        <HomePage />
      </div>
      // </div>



  )
}

export default App
