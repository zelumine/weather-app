const selectList = document.getElementById('select-cities');
const url = './cities-fr.json';

fetch(url)  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.warn('Looks like there was a problem. Status Code: ' + 
          response.status);  
        return;  
      }

      // Examine the text in the response  
      response.json().then(function(data) { 
        let option;
    
    	  for (let i = 0; i < data.length; i++) {
          option = document.createElement('option');
      	  option.text = data[i].nm;
      	  option.value = data[i].nm;
      	  selectList.appendChild(option);
    	  }    
      });  
    }  
  )  
  .catch(function(err) {  
    console.error('Fetch Error - ', err);  
  });

