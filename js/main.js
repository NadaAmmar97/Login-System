// welcome selection
var logout = document.querySelector('.navbar .container a');
var welcome = document.getElementById('welcome');
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// login selectors
var logMail = document.getElementById('logMail');
var logPass = document.getElementById('logPass');
var logRequired = document.querySelector('.logRequired');
var logIncorrect = document.querySelector('.logIncorrect');
var loginBtn = document.querySelector('.loginBtn');
var reg = document.querySelector('form p .reg');

// reqestration selector
var regName = document.getElementById('regName');
var regMail = document.getElementById('regMail');
var regPass = document.getElementById('regPass');
var regRequired = document.querySelector('.regRequired');
var regSuccess = document.querySelector('.regSuccess');
var regExist = document.querySelector('.regExist');
var signupBtn = document.querySelector('.signupBtn');
var signin = document.querySelector('form .signin #sign');

var form = document.querySelector('form');
var userContainer = [];

if (welcome != null) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        welcome.innerHTML = `Welcome ${currentUser.name}`;
    }
}

if(logMail != null){
    logMail.addEventListener('focus',function(){
        logMail.classList.add('border-info')
    });
}

if(logPass != null){
    logPass.addEventListener('focus',function(){
        logPass.classList.add('border-info')
    });
}

if(regName != null){
    regName.addEventListener('focus',function(){
        regName.classList.add('border-info')
    });
}

if(regMail != null){
    regMail.addEventListener('focus',function(){
        regMail.classList.add('border-info')
    });
}

if(regPass != null){
    regPass.addEventListener('focus',function(){
        regPass.classList.add('border-info')
    });
}

if(form != null){
    form.addEventListener('submit',function(e){
        e.preventDefault();
    });
}

if(reg != null){

    reg.addEventListener('click', function(){
        window.location.href = 'Registration.html';
    });
}

if(signin != null){

    signin.addEventListener('click',function(){
        window.location.href = 'index.html'; 
    });
}

if(logout != null){

    logout.addEventListener('click',function(){
        window.location.href = 'index.html'; 
    });
}

if(loginBtn != null){
    loginBtn.addEventListener('click',function(){
        logIn();
    });
}

if(localStorage.getItem('users') !=null){
    userContainer = JSON.parse(localStorage.getItem('users'));
}else{
    userContainer = [];
}

function findUser(userContainer){
    console.log(regName.value);
    return userContainer.name === regName.value && userContainer.mail === regMail.value && userContainer.password === regPass.value;
}

function signUp(){
    var userDeails = {
        name: regName.value,
        mail: regMail.value,
        password: regPass.value
    }

    const existingUser = userContainer.find(findUser);

    
    if(userDeails.name === '' || userDeails.mail === '' || userDeails.password === ''){
        regRequired.classList.remove('d-none');
        regExist.classList.add('d-none');
        regSuccess.classList.add('d-none');
    }
    else if(existingUser){
        regExist.classList.remove('d-none');
        regRequired.classList.add('d-none');
        regSuccess.classList.add('d-none');
    }else{
        regRequired.classList.add('d-none');
        regExist.classList.add('d-none');
        regSuccess.classList.remove('d-none');
        userContainer.push(userDeails);
        localStorage.setItem('users',JSON.stringify(userContainer));
        localStorage.setItem('currentUser', JSON.stringify(userDeails));
    }
         
}  

if(signupBtn != null){
    signupBtn.addEventListener('click', signUp);
}

function logIn() {
    const email = logMail.value;
    const password = logPass.value;

    if (email === '' || password === '') {
        logRequired.classList.remove('d-none');
        logIncorrect.classList.add('d-none');
        return;
    }

    const foundUser = userContainer.find(user =>
        user.mail === email && user.password === password
    );

    if (foundUser) {
        localStorage.setItem('currentUser', JSON.stringify(foundUser));
        logRequired.classList.add('d-none');
        logIncorrect.classList.add('d-none');
        window.location.href = 'welcome.html';
    } else {
        logIncorrect.classList.remove('d-none');
        logRequired.classList.add('d-none');
    }
}