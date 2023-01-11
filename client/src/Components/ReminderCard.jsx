import React, { useState } from 'react'
import { useEffect } from 'react';

const ReminderCard = (props) => {
    
    const { listItem } = props;
    const { list, setlist } = props;
    const [status, setstatus] = useState(listItem.isReminded);

useEffect(() => {
    if(listItem!=null){
        setInterval(async() => {
            const res=await fetch(`http://localhost:9000/reminder/getstatus/${listItem._id}`,{
                method:"GET",
                headers:{
                    'Content-Type': 'application/json'
                },
            })
            const stat=await res.json();
            setstatus(stat);
        }, 1000);
    }
}, [])


    const deleteItem = async (id) => {
        try {
            const response = await fetch(`http://localhost:9000/reminder/deleteReminder/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const data = await response.json();
        }
        catch (err) {
            console.log('Some internal error occured ');
        }

        const newlist = list.filter((listit) => {
            return listit._id !== id;
        })
        setlist(newlist);
    }

    {
        return <>
            <div className={status===false?"sec_card sec_card_alt1":"sec_card sec_card_alt2"}>
                {status===false?<img src="pending1.png" alt="" className="pending_icon"/>:<img src="reminded2.png" alt="" className="reminded_icon"/>}
                {/* <img src="pending1.png" alt="" className="pending_icon"/> */}
                <div className="sec_card1">
                    <div className="s_cp2">
                        <p className="r_h2">{listItem.reminderMsg} with {listItem.liquidType}</p>
                    </div>
                    <div className="s_cp3">
                        <span className="s_timezone">{String(new Date(listItem.remindAt.toLocaleString(undefined, { timezone: "Asia/Kolkata" })))}</span>
                    </div>
                </div>
                <div className="s_cp4">
                    <button className="delete_btn" onClick={() => { deleteItem(listItem._id) }}>Delete</button>
                </div>
            </div>
        </>
    }
}

export default ReminderCard
