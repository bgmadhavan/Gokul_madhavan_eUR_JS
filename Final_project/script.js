const buttonBackgroundColors = [
    "#4CAF50",
    "#E91E63",
    "#FFEB3B",
    "#2196F3",
    "#FF5722",
    "#9C27B0",
    "#00BCD4",
    "#F44336",
    "#FFC107",
    "#3F51B5"
];

const fontColors = [
    "#FFFFFF",
    "#FFFFFF",
    "#000000",
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF",
    "#000000",
    "#FFFFFF"
];

const init = ()=>{
    document.getElementById('countButton').addEventListener('click',increaseCount);
    document.getElementById('validate').addEventListener('click',validate);
}

const increaseCount = ()=>{
    const counter = document.getElementById('countButton');
    const count = document.getElementById('count');
    count.textContent = parseInt(count.textContent) + 1;
    counter.style.background = buttonBackgroundColors[parseInt(count.textContent)%10];
    counter.style.color = fontColors[parseInt(count.textContent)%10];
}

const validate = ()=>{
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!passwordRegex.test(password)){
        alert('The password must have minimum of:\n8 characters\nOne uppercase letter\nOne lowercase letter\nOne number\nOne special character [@,$,!,%,*,?,&]');
    }else{
        alert('Validation passed');
    }
}

document.addEventListener("DOMContentLoaded",init);