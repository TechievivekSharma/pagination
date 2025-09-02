import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const Pagination = () => {
    const[tableData,setTableData]=useState()
    const[currentPage,setCurrentPage]=useState(1);
    const[rowsPerPage,setRowsPerPage]=useState(10);
    const indexOfLastItem=currentPage*rowsPerPage;
    const indexOfFirstItem=indexOfLastItem-rowsPerPage;

    const totalPages=Math.ceil(tableData?.total/rowsPerPage)
    

    const currentItems=tableData?.users?.slice(indexOfFirstItem,indexOfLastItem)

    useEffect(()=>{
        axios.get('https://dummyjson.com/users?limit=0')
        .then((response)=>{
            console.log(response);
            setTableData(response?.data)
            

        })

    },[])

    const handlePrev=()=>{
        setCurrentPage((prev)=>Math.max(prev-1,1))
    }
    const handleNext=()=>{
        setCurrentPage((prev)=>Math.min(prev+1,totalPages))
    }
    const handlePageClick=(pageNumber)=>{
        setCurrentPage(pageNumber)

    }
  return (
    <div>
      <table className='table'>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
            </tr>
        </thead>
        <tbody>
            {currentItems?.map((value,index)=>(
                <tr key={index}>
                    <td>{value.firstName}</td>
                    <td>{value.email}</td>
                    <td>{value.gender}</td>

            </tr>)

            )}
        </tbody>

      </table>
      <div className='pagination'>
        <button onClick={handlePrev} disabled={currentPage===1}>prev</button>
        {Array.from({length:totalPages},(_,index)=>(
            <button onClick={()=>handlePageClick(index+1)} className={currentPage===index+1?'active':''}>{index+1}</button>
        ))}
         
        <button onClick={handleNext} disabled={currentPage===totalPages}>next</button>

      </div>
    </div>
  )
}

export default Pagination
