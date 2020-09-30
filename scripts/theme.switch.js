var lightTheme = document.createElement('link');

var head  = document.getElementsByTagName('head')[0];
lightTheme.href = "/styles/cutestrap/cutestrap.light.theme.css";
lightTheme.rel = 'stylesheet';
lightTheme.type = 'text/css';
lightTheme.media = 'all';
function themeSwitch(){
    var themeSwitchBtn = document.getElementById('themeSwitchBtn');
    if(lightTheme.isConnected){
        themeSwitchBtn.innerHTML = "Light Theme";
        head.removeChild(lightTheme);
        
    }
    else{
        themeSwitchBtn.innerHTML = "Dark Theme";
        head.appendChild(lightTheme);
    }
};