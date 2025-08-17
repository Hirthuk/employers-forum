import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'

const AdminHomePage = () => {
    const {getUserDetails, userDetails} = useContext(UserContext);
    useEffect( () => {
        const fetchData = async() => {
            await getUserDetails();
        };
        fetchData();
    }, [])

    console.log(userDetails);
  return (
    <div>
      <h1 className='h-2 text-2xl flex flex-col items-center align-middle'>Welcome to Admin page</h1>
    </div>
  )
}

export default AdminHomePage
