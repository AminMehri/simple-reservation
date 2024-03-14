import axios from 'axios';
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'



function HomeView() {
  let [loading, setLoading] = useState(false);
  let [reserveList, setReserveList] = useState([]);

  let dateTime = new Date()
  let formattedDate = dateTime.toISOString().split('T')[0];

  let timeList = ['8-10', '10-12', '12-14', '14-16', '16-18', '18-20']
  
  const getReservation = () => {
    setLoading(true)
    axios
      .get('reservation/',{
        params: {
          day: formattedDate
        }
      })
      .then(res => {
        setLoading(false)
        setReserveList(res.data)
      })
      .catch(error => {
        setLoading(false)
      })
    
      timeList.map(r => {
        document.getElementById(r).innerHTML = "Free"
        document.getElementById(r).className = 'btn w-100'
      })
    reserveList.map(r => {
      document.getElementById(r.reserved_time).innerHTML = `Reserved by ${r.client}`
      document.getElementById(r.reserved_time).classList.add("bg-danger")
    })
  }

  function workReservation(data){
    if(data.target.innerHTML === 'Free'){
      bookReserve(data)
    }else{
      cancelReserve(data)
    }
  }

  function bookReserve(data){
    setLoading(true)
    axios
      .post('reservation/book/', {
        day: formattedDate,
        time: data.target.id
      })
      .then(res => {
        setLoading(false)
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          text: "Successfully booked!",
        });
        document.getElementById(data.target.id).innerHTML = "Reserved"
        document.getElementById(data.target.id).classList.add("bg-danger")
      })
      .catch(error => {
        setLoading(false)
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
  }

  function cancelReserve(data){
    setLoading(true)
    axios
      .post('reservation/cancel/', {
        day: formattedDate,
        time: data.target.id
      })
      .then(res => {
        setLoading(false)
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          text: "Successfully canceled!",
        });
        document.getElementById(data.target.id).innerHTML = "Free"
        document.getElementById(data.target.id).className = "btn w-100"
      })
      .catch(error => {
        setLoading(false)
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
  }
  return (
    <>
      <nav aria-label="Page navigation exampl">
        <ul class="pagination justify-content-center my-5">

          <li class="page-item">
            <a class="page-link" href="#" onClick={getReservation}>
              Today
            </a>
          </li>

        </ul>
      </nav>

      {loading && <Loading />}

      <div className="m-4">
        <table className="table table-bordered">
          <thead>
            <tr className="text-center">
              <td>8-10</td>
              <td>10-12</td>
              <td>12-14</td>
              <td>14-16</td>
              <td>16-18</td>
              <td>18-20</td>
            </tr>
          </thead>
          <tbody>
            <tr class="table-warning">
              <td><button id='8-10' onClick={workReservation}  className="btn w-100">Free</button></td>
              <td><button id='10-12' onClick={workReservation} className="btn w-100">Free</button></td>
              <td><button id='12-14' onClick={workReservation} className="btn w-100">Free</button></td>
              <td><button id='14-16' onClick={workReservation} className="btn w-100">Free</button></td>
              <td><button id='16-18' onClick={workReservation} className="btn w-100">Free</button></td>
              <td><button id='18-20' onClick={workReservation} className="btn w-100">Free</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
export default HomeView;
