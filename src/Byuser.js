import React from 'react'
import { useEffect, useState } from 'react';
import './Status.css'
import plusmore from './plusmore.png'
import CardUser from './Card1.js'
import availableimg from './availableimg.png'
import notavailableimg from './notavailableimg.png'

import usr1 from './usr-1.png'
import usr2 from './usr-2.png'
import usr3 from './usr-3.png'
import usr4 from './usr-4.png'
import usr5 from './usr-5.png'
import usr6 from './usr-6.png'
import usr7 from './usr-7.png'



const Byuser = (props) => {
    const [todono, settodono] = useState();
    let usersdata = [''];
    let available=true;
    const [tick, setTick] = useState([{ "id": "CAM" }]);
    const [users, setusers] = useState([{ "id": "CAM" }])
  
    const [usermass, setusermass] = useState([]);
    const [Order, setOrder] = useState(localStorage.getItem('order')); 

    useEffect(() => {

        getData();
    }, []);

    useEffect(() => {
        
        count();
    }, [tick,users,props.order])


    async function getData() {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");

            const result = await response.json();


            setTick(result.tickets);
            setusers(result.users);


            

        } catch (error) {
            console.error("Error:", error);
        }


    }

    function count() {
        let masspre = [];
        users.forEach((user) => {
            let temp = [];
            tick.forEach((ticket) => {
                
                if (ticket.userId === user.id) {

                    temp.push(ticket);
                }
            }

            )
            if(props.order==="Title"){
                temp.sort((a, b) => a.title.localeCompare(b.title));
            
            }else{
                
                temp.sort((b, a) => parseInt(a.priority) - parseInt(b.priority));
           
            }
            
            masspre.push(temp);
           
        })

        setusermass(masspre);
        
        console.log("hello this is by user");
        
    }
    const usrImageMap = {
        "usr-1": usr1,
        "usr-2": usr2,
        "usr-3": usr3,
        "usr-4": usr4,
        "usr-5": usr5,
        "usr-6": usr6,
        "usr-7": usr7,
      };
      let dotuser;
      

  return (
        <div className='Boards'>
            {usermass.map((user) => {
                return (
                    <div className='Board'>
                        <div className='boardHeading'>
                            <img src={user[0] && usrImageMap[user[0].userId]||usr1} className='headingImg2' alt=''></img>
                            
                            {
                                
                                
                                users.map((item) => {
                                    
                                        
                                        if(
                                            user[0] &&
                                             item.id === user[0].userId){
                                                available=item.available;
                                                
                                            return(
                                                <p className='cText' style={{ width: "500px" }}>{item.name}</p>
                                            )
                                        }
                                        return null;
                                        
                                    
                                })
                            }
                            
                               
                            <p className='cText'>{user.length}</p>
                            {
                            available && <img src={availableimg} className='dot'  />
                            }
                            {
                                (!available)&&<img src={notavailableimg} className='dot' />
                            }
                            <div className='boardHeading' id='pluske'>

                                <img src={plusmore} className='headingImg' alt=''></img>
                            </div>


                        </div>

                        <div className='Cards'>

                            {
                                user.length > 0 &&
                                user.map((ticket) => {
                                    return (
                                        (<CardUser ticket={ticket} available={available}></CardUser     >)
                                    )
                                })
                            }
                        </div>

                    </div>
                );
            })}
            </div>
    )
}

export default Byuser