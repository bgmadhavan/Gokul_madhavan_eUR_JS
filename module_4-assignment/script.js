const url = `https://jsonplaceholder.typicode.com/todos/1`;
   

//callback example
const callBackExample = (success,failure) =>{
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange',() =>{
        if(request.readyState === 4 && request.status === 200){
            const data = JSON.parse(request.responseText);
            success(data);
        }else if(request.readyState === 4 && request.status !== 200){
            failure(`Error : ${request.status}`);
        }
    });
    request.open('GET',url);
    request.send();
}

const success = (data)=>{
    console.log(data);
};

const failure = (err)=>{
    console.log(err);
};

//---------------------------promise example---------------------------
const fetchExample = () =>{
    fetch(url)
    .then(response =>{ 
        if (!(response.ok)){
            throw new Error(`Error : ${response.status}`);
        } 
        return response.json();
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

//--------------------------------async/await example-------------------------------

const asynchronous = async ()=> {
    const response = await fetch(url);
    if(!response.ok) throw new Error (`Error : ${response.status}`);
    const data = await response.json();
    return data;
}

setTimeout(()=>{callBackExample(success,failure)},1000);

setTimeout(fetchExample,4000);

setTimeout(()=>{asynchronous()
.then(data => console.log(data))
.catch(err => console.log(err))},7000)