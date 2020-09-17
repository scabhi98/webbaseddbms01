
var lightTheme = document.createElement('link');
var themeSwitchBtn = document.getElementById('themeSwitchBtn');
var head  = document.getElementsByTagName('head')[0];
lightTheme.href = "styles/cutestrap/cutestrap.light.theme.css";
lightTheme.rel = 'stylesheet';
lightTheme.type = 'text/css';
lightTheme.media = 'all';
themeSwitchBtn.onclick = function(){
    if(lightTheme.isConnected){
        themeSwitchBtn.innerHTML = "Light Theme";
        head.removeChild(lightTheme);
        
    }
    else{
        themeSwitchBtn.innerHTML = "Dark Theme";
        head.appendChild(lightTheme);
    }
}