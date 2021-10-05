import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from "axios" ;
// import { name_table } from '../../server/tableCampiDatabase';



function App() {


   //   nella const {useState} il primo parametro  si prende dal "name" input  es. -->    name="movieName"    
    //   nella input metto -->    onChange={(e)=> {   setMovieName(e.target.value) }}
const  [ movieName, setMovieName ] = useState("") ;
const  [ review, setReview ] = useState("") ;  



  // per mettere a video la lista dal database 
const  [ movieReviewList, setMovieList ] = useState([]) ;



  //   aggiornamento   newReview   front-end  
const [ newReview, setNewReview ] = useState("");  



useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
         //  console.log(response.data);
        setMovieList(response.data);
  }); 
}, []); 


const submitReview = () => {

    Axios.post("http://localhost:3001/api/insert", {
          movieName: movieName,
          movieReview: review,
          });// .then(() => {   

          setMovieList([
            ...movieReviewList, 
            { movie_Name:movieName, movie_Reviews: review },
          ]);


            //  alert(" inserito con successo nel database ");   
      // });
};




const deleteReview = (movie) => {
  Axios.delete(`http://localhost:3001/api/delete/${movie} `);
};


const updateReview = (movie) => {
  Axios.put("http://localhost:3001/api/update", { 

    movieName: movie,
    movieReview: newReview,
  });

  setNewReview("")  
};


    

  return (
    <div className="containerplus">
    <div className="App">
      
      
        <h1> Crud  </h1>

<div className="form">  

  <label>Nome   </label>
      <input  type="text"  name="movieName"  onChange={(e)=> setMovieName(e.target.value)}  />  

  <label> Video </label>
      <input  type="text"  name="review"  onChange={(e)=> setReview(e.target.value)} />


<button onClick={submitReview}>   Invia  </button>   



{  movieReviewList.map((val)=> { 



      return (  

        <div className="card">  

      <h2> Ciao,  {val.movie_Name}     </h2> 
      <h3> <p> hai  </p>  {val.movie_Reviews}  </h3> 


      <button onClick={() => {deleteReview(val.movie_Name)}}> 
          Cancella 
      </button>

          <input type="text"   onChange={(e) => {
                setNewReview(e.target.value)
              }}/> 

       <button  onClick={() => {updateReview(val.movie_Name)}}>
          Aggiorna Patologia 
      </button>


      </div>  


);
})};
</div>

      </div>
    </div>
  ); 
}

export default App;
