import React,{useEffect,useState} from 'react'
import Navbar from './Components/Navbar'
import RemindMeCard from './Components/RemindMeCard'
import ReminderCard from './Components/ReminderCard'

const App = () => {
  const listInitial = [];
  const [list, setlist] = useState(listInitial)

  const getReminders = async () => {
    try {
      const response = await fetch('http://localhost:9000/reminder/getAllReminder', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const json = await response.json();
      setlist(json);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getReminders();
  }, [])

  const onclick12=()=>{
    console.log(list);
  }

  return (
    <div>
      <Navbar />
      <div className="main_body">
        <RemindMeCard list={list} setlist={setlist}/>
        <div className="reminder_cards">
          {
            (list.length !== 0) ? list.map((listItem, index) => {
              return <ReminderCard key={index} listItem={listItem} list={list} setlist={setlist}/>
            }) : <h1>Nothing to show</h1>
          }
        </div>
      </div>
    </div>
  )
}

export default App
