const response = await fetch(URL, {
  method: 'post',
  headers: {
    'Content-Type':'application/json'
     
  },
  body: JSON.stringify(data) 
});
return response.json();  