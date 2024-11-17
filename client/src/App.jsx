import { useState } from 'react'
import './App.css'
import { AppBar, Typography } from '@material-ui/core'
import VideoPlayer from './components/VideoPlayer'
import Options from './components/Options'
import Notifications from './components/Notifications'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <AppBar position='static' color='inherit' style={{backgroundColor:'black'}}>
        <Typography variant='h3' align='center' className='text-white'>Video Chat App</Typography>
      </AppBar>
      <VideoPlayer/>
      <Options>
        <Notifications/>
        </Options>
    </div>
  )
}

export default App
