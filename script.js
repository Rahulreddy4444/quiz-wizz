const wrapper = document.querySelector('.wrapper');
const loginlink = document.querySelector('.login-link');
const signinlink = document.querySelector('.signin-link');


signinlink.addEventListener('click',()=>{
    wrapper.classList.add('active');
});

loginlink.addEventListener('click',()=>{
    wrapper.classList.remove('active');
});


