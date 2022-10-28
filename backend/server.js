
/** Reference code: https://github.com/bpeddapudi/nodejs-basics-routes/blob/master/server.js 
 * import express */
 const express = require('express');
 const app = express();
 const cors = require('cors');
 const bodyParser = require('body-parser')
 app.use(cors())
 app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

let carsMockData = [
    {
        "id": 1,
        "brand": "Hyundai",
        "name": "Ioniq",
        "releaseYear": 2017,
        "color": "blue"
    },
    {
        "id": 2,
        "brand": "Toyota",
        "name": "Prius",
        "releaseYear": 2007,
        "color": "blue"
    },
    {
        "id": 3,
        "brand": "Chevrolet",
        "name": "Aveo",
        "releaseYear": 2007,
        "color": "white"
    },
    {
        "id": 4,
        "brand": "BMW",
        "name": "M5",
        "releaseYear": 2017,
        "color": "White"
    },
    {
        "id": 5,
        "brand": "Tesla",
        "name": "S",
        "releaseYear": 2019,
        "color": "Black"
    }
]

/** Create GET API. API shoudl return  const carsMockData*/

app.get('/cars', (req, res) => {
    res.json(carsMockData);
});



/** Create POST API. Get the new car data from react. 
 *      Check if car with id exists. If Yes return 500. With message 'Car already exists'
 *      If there is no car with the id, add the new car to  carsMockData and return carsMockData as response */

 app.post("/cars",(req,res)=>{
    let car = req.body
    let id = parseInt(car.id)

    let exist = false
    carsMockData.forEach((element)=>{
        if( element.id === id){
            res.sendStatus(500)
            console.log("Car already exists")
            exist = true
        }
    })
    if (!exist){
        carsMockData.push(car)
        res.sendStatus(200,()=>{
            console.log("Adding new car")
        })
    }
   
})



/** Create PUT API. 
 *  Check if car with id exists. If No return 500 with error 'No car with given id exist'. 
 *  If there is car with the requested id, update that car's data in 'carsMockData' and return 'carsMockData' */

 app.put("/put",(req,res)=>{
    let car = req.body

    carsMockData.map((element)=>{
        if (element.id === car.id){
            element.id = car.id
            element.name = car.name
            element.releaseYear = car.releaseYear
            element.color = car.color

            res.sendStatus(200)
        }
    })
    res.sendStatus(500)
    console.log("No car with give id exists")
})


/** Create Delete API. 
 *  Check if car with id exists. If No return 500. With message 'No car with give id exists'
 *  If there is car with the requested id. Delete that car from 'carsMockData' and return 'carsMockData'
*/
app.delete('/cars/:id',(req,res)=>{
    
    const {id} = req.params
    let carid = parseInt(id)

    let updated = []

    carsMockData.forEach((element)=>{

        if (element.id !== carid){
            updated.push(element)
        }
    })

    carsMockData = updated
    res.sendStatus(200)
})

app.listen(8000,()=>{
    console.log("connected")
})