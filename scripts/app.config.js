trikon.component('app-root', function(component){
    component.templateUrl = APP_CONFIG.component.templates.root_component;
    component.$scope = {

    };
    component.controller = function (scope){
        
    };
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
}).component('app-login', function(component){
    component.templateUrl = APP_CONFIG.component.templates.login;
    component.$scope = {

    };
    component.controller = function (scope){
        
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