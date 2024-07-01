class User {
    constructor(username, mobile, password) {
        this.username = username;
        this.mobile = mobile;
        this.password = password;
        this.books = [];
    }
}

const userArray = JSON.parse(localStorage.getItem('userArray')) || [];
console.log('Initial userArray:', userArray);

function login(event) {
    event.preventDefault();

    let username = document.getElementById('uname').value;
    let mobile = document.getElementById('mobile').value;
    let password = document.getElementById('password').value;

    if (username === '' || mobile === '' || password === '') {
        alert('Enter all the fields');
        clearInputFields();
        return;
    }

    let existing = userArray.find(user => user.username === username);

    if (!existing) {
        const user = new User(username, mobile, password);
        userArray.push(user);
        localStorage.setItem('userArray', JSON.stringify(userArray));
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log('New user created, redirecting to dashboard');
        window.location.href = './dashboard.html';
    } else {
        try {
            if (existing.password !== password) throw "Password incorrect";
            if (existing.mobile !== mobile) throw "Incorrect mobile number";
            localStorage.setItem('currentUser', JSON.stringify(existing));
            console.log('User validated, redirecting to dashboard');
            window.location.href = './dashboard.html';
        } catch (err) {
            alert(err);
            clearInputFields();
            return;
        }
    }
}

function clearInputFields() {
    document.getElementById('uname').value = '';
    document.getElementById('mobile').value = '';
    document.getElementById('password').value = '';
}