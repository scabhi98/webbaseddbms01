const GLOBAL_API = {
    app_host: 'http://localhost',
    port: '8081',
    data_host: 'localhost',
    data_port: '3000'
};
const APP_HOME = GLOBAL_API.app_host + ":" + GLOBAL_API.port + "/";
const APP_CONFIG = {
    component: {
        templates: {
            navbar: APP_HOME + "components/navbar.html",
            root_component: APP_HOME + "components/app.root.html",
            home_content: APP_HOME + "components/home_content.html",
            contact_us: APP_HOME + "components/contact_us.html",
            about_us: APP_HOME + "components/about_us.html",
            login: APP_HOME + "components/login.html",
            signup: APP_HOME + "components/signup.html",
            profile: APP_HOME + "components/profile.html"
        }
    }
};