trikon.component('app-root', function(component){
    component.templateUrl = APP_CONFIG.component.templates.root_component;
    component.$scope = {

    };
    component.controller = function (scope){
        console.log('app-root controller executerd');
    };
    component.onViewCreated = function(view){
        let dropdownBtn = view.querySelector('.cs-circular-btn');
        let menuContent = view.querySelector('.cs-dropdown-content');
        dropdownBtn.addEventListener('click',()=>{
            menuContent.classList.toggle('cs-hide');
            console.log('button is clicked');
        });
    }

}).component('app-contact-us', function(component){
    component.templateUrl = APP_CONFIG.component.templates.contact_us;
    component.$scope = {

    };
    component.controller = function (scope){
        
    };
}).component('app-home', function(component){
    component.templateUrl = APP_CONFIG.component.templates.home_content;
    component.$scope = {

    };
    component.controller = function (scope){
        
    };
    component.onViewCreated = function(document){

    }
}).component('app-about-us', function(component){
    component.templateUrl = APP_CONFIG.component.templates.about_us;
    component.$scope = {

    };
    component.controller = function (scope){
        
    };
}).component('app-profile', function(component){
    component.templateUrl = APP_CONFIG.component.templates.profile;
    component.$scope = {
        $appID: ''
    };
    component.controller = function (scope){
        scope.appID = 'APP/KU/06/18/MCA123';
    };
}).component('app-signup', function(component){
    component.templateUrl = APP_CONFIG.component.templates.signup;
    component.$scope = {

    };
    component.controller = function (scope){
        
    };
    component.onViewCreated = function (view){
        var myInput = view.querySelector("#password");
        var letter = view.querySelector("#letter");
        var capital = view.querySelector("#capital");
        var number = view.querySelector("#number");
        var length = view.querySelector("#length");
        myInput.onfocus = function() {
        view.querySelector("#message1").style.display = "block";
        }
        myInput.onblur = function() {
        view.querySelector("#message1").style.display = "none";
        }
        myInput.addEventListener('keyup', function() {
            // Validate lowercase letters
            var lowerCaseLetters = /[a-z]/g;
            if(myInput.value.match(lowerCaseLetters)) {  
                letter.classList.remove("invalid");
                letter.classList.add("valid");
            } else {
                letter.classList.remove("valid");
                letter.classList.add("invalid");
            }
            
            // Validate capital letters
            var upperCaseLetters = /[A-Z]/g;
            if(myInput.value.match(upperCaseLetters)) {  
                capital.classList.remove("invalid");
                capital.classList.add("valid");
            } else {
                capital.classList.remove("valid");
                capital.classList.add("invalid");
            }

            // Validate numbers
            var numbers = /[0-9]/g;
            if(myInput.value.match(numbers)) {  
                number.classList.remove("invalid");
                number.classList.add("valid");
            } else {
                number.classList.remove("valid");
                number.classList.add("invalid");
            }
            
            // Validate length
            if(myInput.value.length >= 8) {
                length.classList.remove("invalid");
                length.classList.add("valid");
            } else {
                length.classList.remove("valid");
                length.classList.add("invalid");
            }
            conf_handler();
        });
        const conf_handler =  function () {
            console.log('Password changed');
            if ($('#password').val() == $('#cnf_password').val()) { 
              if($('#password').val().length > 0)       
              $('#message').html('Password Confirmed').css('color', 'yellow');
              else
              $('#message').html('');
            } else {
                $('#message').html('Passwords are different').css('color', 'red');
            }
              
        };
        view.querySelector('#cnf_password').addEventListener('keyup', conf_handler);
        
    };
}).component('app-login', function(component){
    component.templateUrl = APP_CONFIG.component.templates.login;
    component.$scope = {

    };
    component.controller = function (scope){
        
    };
    component.onViewCreated = function (view){

    };
}).configRoutes('/', {
    component: 'app-home'
}).configRoutes('/contact_us', {
    component: 'app-contact-us'
}).configRoutes('/about_us', {
    component: 'app-about-us'
}).configRoutes('/auth/profile', {
    component: 'app-profile'
}).configRoutes('/auth/login', {
    component: 'app-login'
}).configRoutes('/auth/signup', {
    component: 'app-signup'
});

trikon.startApp();
route('/');