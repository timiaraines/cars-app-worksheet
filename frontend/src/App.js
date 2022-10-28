import React, { useState } from 'react';
import './App.css';

function Cars() {
/**
 * Fields required for the car
      "id",
      "brand",
      "name",
      "releaseYear",
      "color"
 */
  const carFormInitialData = {
    id: 0,
    name: ''
    brand: '',
    releaseYear: '',
    color: ''
  }
  const [carFormData, setCarFormData] = useState(carFormInitialData);
  const [carList, setCarList] = useState([])
  const [toDelete, setDeleted] = useState('')


  useEffect(()=>{
    fetch('http://localhost:3000/cars')
    .then(response=>response.json()).then(data=>setCarList(data))
  },
  [carFormData, carList])


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarFormData({
      ...carFormData,
      [name]: value,
    });
  }

  const handleSubmit = (event) => {
    /**
     * Gather all the form data to state variable carFormData
     * When the form is submitted POST the data to Backend using fetch post
     * https://googlechrome.github.io/samples/fetch-api/fetch-post.html
     */
     event.preventDefault();
     fetch('http://localhost:3000/cars',
     {
       method: 'POST',
       headers: {'Content-Type':'application/json'},
       body: JSON.stringify(carFormData)
     }
     )
     setCarFormData(carFormInitialData)
   }

  const handleDelete = (id) => {
    /**
     * When clicked on a delete button, get the id of the car's delete button clicked
     * Then use javascript fetch to send DELETE request to NodeJS
     * https://openjavascript.info/2022/01/03/using-fetch-to-make-get-post-put-and-delete-requests/
     */
     fetch(`http://localhost:8000/cars/${id}`,
     {
       method: 'DELETE',
       headers: {'Content-Type':'application/json'}
     }
     )
     setDeleted("")
  }

/** 🥳🥳🥳🥳🥳🥳 DOUBLE BONUS POINTS 🥳🥳🥳🥳🥳🥳 */
  const handleEdit = () => {
    /**
     * When clicked on a edit button figure out a way to edit the car data.
     * Once edited send the updated data to NodeJS.
     * Then use javascript fetch to send DELETE request to NodeJS
     * https://openjavascript.info/2022/01/03/using-fetch-to-make-get-post-put-and-delete-requests/
     */
  }
 
  return (
    <div className='cars-from-wrapper'>
      <form id="cars-form" onSubmit={handleSubmit} autoComplete="off">
        {/** 
           * TODO: Update the form fields with inputs for 
           *    ID, Brand, Name, ReleaseYear and Color
           * Make required changes to  const carFormInitialData
           * */} 
        
        <label>
          ID:
          <input name='id' type="text" value={carFormData.id} onChange={handleInputChange} />
        </label>
        <label>
          Name:
          <input name='name' type="text" value={carFormData.name} onChange={handleInputChange} />
        </label>
        <label>
          Brand:
          <input name='brand' type="text" value={carFormData.brand} onChange={handleInputChange} />
        </label>
        <label>
          Release Year:
          <input name='releaseYear' type="text" value={carFormData.releaseYear} onChange={handleInputChange} />
        </label>
        <label>
          Color:
          <input name='color' type="text" value={carFormData.color} onChange={handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
       {/** 
           * TODO: Update the code below to see any new proprties added to carFormData
           * */}  
      <p>ID:{carFormData.id}, name:{carFormData.name}</p>

      <h2>Cars Data</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Car Make</th>
            <th>Car Model</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/** 
           * TODO: Replace this code with Data from Node JS GET api data
           * React documentation: https://reactjs.org/docs/lists-and-keys.html
           * How to get data from API: https://www.w3schools.com/jsref/api_fetch.asp
           * */}
           {
            
           }
           {
          carList.map(element=>{
            return(
              <tr key={element.id}>

            <td>{element.id}</td>
            <td>{element.brand}</td>
            <td>{element.name}</td>
            <td>✎</td>
            <td><button
            onClick={()=>{
              console.log(element.id)
              handleDelete(element.id)
            }}
            >🗑</button></td>        
          </tr>
            )
          })
        }       
        </tbody>
      </table>
    </div>
  );
}

export default Cars;