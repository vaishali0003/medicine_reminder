import React from 'react'
import { useState } from 'react';
import DateTimePicker from "react-datetime-picker"

const RemindMeCard = (props) => {

  const { list, setlist } = props;

  const [reminder, setreminder] = useState("");
  const [remindAt, setremindAt] = useState(new Date());
  const [isReminded, setisReminded] = useState(false);
  const [liquid, setliquid] = useState("");

  const onChange1 = (e) => {
    setreminder(e.target.value);
  }

  const onChange2 = (e) => {
    setliquid(e.target.value);
  }

  const addReminderFunc = async () => {
    const remind_msg = reminder
    const remind_at = remindAt
    setisReminded(false);
    const is_remided = isReminded;
    const liquidType=liquid;
    const response = await fetch('http://localhost:9000/reminder/addReminder', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ remind_msg, remind_at, is_remided ,liquidType})
    })
    const data = await response.json();
    setlist(list.concat(data));
    window.alert('added successfully ');
    setreminder("");
  }
 

  return (
    <div>
      <div className="main_card">
<img src="add.png" alt="" srcSet="" className="add_btn_icon" onClick={addReminderFunc}/>
        <div className="m_cp2">
          <textarea name="" id="" cols="30" rows="5" placeholder='Add your medicine' className='txtarea' onChange={onChange1} value={reminder}></textarea>
          <DateTimePicker minDate={new Date()} minutePlaceholder="mm" hourPlaceholder="hh" dayPlaceholder="DD" monthPlaceholder="MM" yearPlaceholder="YYYY" onChange={setremindAt} value={remindAt}></DateTimePicker>

          <div className="liquid_type">
            <label htmlFor="liquid">Liquid Type</label>
            <select name="liquid" onChange={onChange2}>
              <option value="select">Select</option>
              <option value="normal water">Normal Water</option>
              <option value="warm water">Warm Water</option>
              <option value="milk">Milk</option>
              <option value="others">Others</option>
            </select>
          </div>

        </div>
        <div className="m_cp3">
          {/* <button className="add_rem" onClick={addReminderFunc}>Add reminder</button> */}
        </div>
      </div>
    </div>
  )
}

export default RemindMeCard
