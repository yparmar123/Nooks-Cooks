const loginBtn = document.querySelector(".login-btn");
const loginBg = document.querySelector(".login-bg");
const signupBtn = document.querySelector(".signup-btn");
const signupBg = document.querySelector(".signup-bg");
const closeBtnLog = document.querySelector(".close-log");
const closeBtnSign = document.querySelector(".close-sign")

window.onload = function(){
   
    loginBtn.addEventListener('click', () => {
        loginBg.classList.add('bg-active');
    });

    signupBtn.addEventListener('click', () =>{
        signupBg.classList.add('bg-active');
    });

    closeBtnLog.addEventListener('click', () => { 
        loginBg.classList.remove('bg-active');
    });

    closeBtnSign.addEventListener('click', () => {
        signupBg.classList.remove('bg-active');
        
    });
    
}