const trikon = {
    controllers: {},
    components: {},
    update_components: {},
    routes: {},
    rootComponent: null,
    domParser: new DOMParser()
};

trikon.controller = function (name, callback) {
    trikon.controllers[name] = callback;
    return trikon;
};

trikon.component = function (name, constructor) {
    trikon.components[name] = constructor;
    return trikon;
};

trikon.configRoutes = function(path, route){
    trikon.routes[path] = route;
    return trikon;
}

trikon.addComponent = function (element, parent, component) {
    component.childComponents = [];
    component.element = element;
    component.parent = parent;
    if(parent == null) {        
        trikon.root_component = component;
    }
    else{
        component.selfIndex = parent.childComponents.length;
        parent.childComponents.push(component);
    }
};

trikon.lookForChildComponents = function(element){
    return element.childNodes.filter ( (el) => {
        return (trikon.components[el.nodeName.toLowerCase()] != undefined);
    });
};

trikon.getComponentID = function() {
    var a = Math.floor(Math.random() * 10000);
    var b = Math.floor(Math.random() * 1000000);
    return ('c' + a + b );
};

trikon.prepareChildComponents = function (element, component) {
    var comps = trikon.lookForChildComponents(element);
    comps.forEach(comp => {
        var childComp = {
            id: trikon.getComponentID()
        };
        trikon.components[comp.nodeName.toLowerCase()](childComp);
        childComp.controller(childComp.$scope);
        attachWatches(childComp, trikon.update_components);

        if(childComp.template != null) {
            comp.innerHTML = childComp.template;
            if( childComp.afterViewParsed)
                childComp.afterViewParsed(comp);
            parseInterpolatedString(comp, childComp);
            modelBinding(childComp);
        }
        else{
            trikon.ajax({url: childComp.templateUrl}).then(data => {
                childComp.template = data;
                comp.innerHTML = data;
                if( childComp.afterViewParsed)
                    childComp.afterViewParsed(comp);
                parseInterpolatedString(comp, childComp);
                modelBinding(childComp);
            });
        }
        trikon.addComponent(comp, component, childComp);
        parseInterpolatedString(childComp);
        trikon.prepareChildComponents(comp, childComp);
    });
};

trikon.startApp = function () {
    var approot = document.getElementsByTagName('app-root').item(0);
    var rootComponent = {
        id: trikon.getComponentID()
    };
    trikon.components['app-root'](rootComponent);
    rootComponent.controller(rootComponent.$scope);
    attachWatches(rootComponent, trikon.update_components);
    if(rootComponent.template != null){
        approot.innerHTML = rootComponent.template;
        if(rootComponent.afterViewParsed)
            rootComponent.afterViewParsed(approot);
        initRootComponent(approot, rootComponent);
    }
    else{
        trikon.ajax({url: rootComponent.templateUrl}).then( data => {
            rootComponent.template = data;
            approot.innerHTML = data;
            if(rootComponent.afterViewParsed)
                rootComponent.afterViewParsed(approot);
            initRootComponent(approot, rootComponent);
        });
    }
    this.addComponent(approot, null, rootComponent);

};
function initRootComponent(approot, rootComponent){
    parseInterpolatedString(approot, rootComponent);
    modelBinding(rootComponent);
    rootComponent.outlet = approot.outlet = approot.getElementsByTagName('router-outlet').item(0);
    trikon.rootComponent = rootComponent;
}

trikon.ajax = req => {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open(req.method || "GET", req.url);
        if (req.headers) {
            reqect.keys(req.headers).forEach(key => {
                xhr.setRequestHeader(key, req.headers[key]);
            });
        }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(req.body);
    });
};

function attachWatches(component, updated, parent = ''){
    for(var key in component.$scope){
        if(key[0] == '$'){
            var k = key.substr(1);
            Object.defineProperty(component.$scope, k, {
                get: function(){
                    if(arguments.callee.key == undefined)
                        arguments.callee.key = key;
                    // console.log(arguments.callee.key + " is accessed");
                    return this[arguments.callee.key];
                },
                set: function(d){
                    if(arguments.callee.key == undefined)
                        arguments.callee.key = key;
                    // console.log(arguments.callee.key + " is getting changed");
                    var s = arguments.callee.key;
                    if(typeof(d) == 'object' ){
                        if(d.push !== undefined){
                            console.log('Array type is received');
                            d.push = (data) => {
                                // console.log("A new data is pushed");
                                [].push.call(d,data);
                            };
                        }
                        else{
                            // console.log('Object type is received');
                            attachWatches(d);
                        }
                    }
                    else
                        console.log(typeof(d));
                    console.log(s+" is changed with new value "+d);
                    updated[component.id] = component;
                    updated[component.id].updated = false;
                    this[s] = d;
                }
            });
            var t = component.$scope[k];
            component.$scope[k] = t;
        }
    }
    console.log(component.$scope);
}

function parseInterpolatedString(element, component){
    // var element = component.element;
    // console.log(element);
    var str = component.template || element.innerHTML;
    var isExpr = false;
    var expr = "";
    var dstr = "";
    // console.log(str);
    for(var i = 0; i < str.length - 2; i++){
        if(!isExpr){
            if(str.charAt(i) == '{' && str.charAt(i+1) == '{'){
                isExpr = true;
                i++;
            }
            else
                dstr += str.charAt(i);
            continue;
        }
        if(str.charAt(i) != '}'){
            expr += str.charAt(i);
        }
        else{
            isExpr = false;
            console.log('evaluating '+expr);
            var val = (new Function('return ' + expr)).bind(component.$scope);
            dstr += val() + ' ';
            expr = '';
            i++;
        }
    }
    
    element.innerHTML = dstr ;
}

function modelBinding(component){
    var elms = component.element.querySelectorAll('[tr-model]');
    elms.forEach( element => {
        trikon.attachEventsListener(element, 'keyup keydown change', function(){
            var key = element.attributes['tr-model'].nodeValue;
            // console.log('event fired');
            if("TEXTAREA SELECT INPUT".indexOf(element.nodeName) >= 0){
                if(component.$scope['$'+key] != element.value)
                    component.$scope[key] = element.value;
            }
        });
    });
}

trikon.attachEventListeners = function(){

};
trikon.attachEventsListener = function(element, events, listener){
    var evs = events.split(' ');
    for(var i = 0; i < evs.length; i++)
        element.addEventListener(evs[i], listener);
};
trikon.selectAll = function(query){
    return document.querySelectorAll(query);
};
trikon.select = function(query){
    return document.querySelector(query);
};

setInterval(function(){
    trikon.updateUIComponents();
    // console.log('Time lapse');
}, 20);

trikon.updateUIComponents = function (){
    for(var component in trikon.update_components){
        // if(!trikon.update_components[component].updated){
            // console.log('updating '+component);
            parseInterpolatedString(trikon.update_components[component].element, trikon.update_components[component]);
            modelBinding(trikon.update_components[component]);
            delete trikon.update_components[component];
        // }
    }
};

// var windowOpen = window.open;
var route = window.route = function(url,target){
    console.log("Attempting to open "+url);
    // windowOpen(url)
    var compkey = trikon.routes[url].component;
    var comp = {};
    trikon.components[compkey](comp);
    if(comp.template != null && comp.template != undefined){
        trikon.rootComponent.outlet.innerHTML = comp.template;
        if(comp.afterViewParsed)
            comp.afterViewParsed(trikon.rootComponent.outlet);
    }
    else{
        trikon.ajax({url: comp.templateUrl}).then(data => {
<<<<<<< HEAD
            trikon.rootComponent.outlet.innerHTML = comp.template = data;
            if(comp.afterViewParsed)
                comp.afterViewParsed(trikon.rootComponent.outlet);
=======
            comp.template = data;
            var view = trikon.domParser.parseFromString(data, 'text/html').body;
            if(comp.onViewCreated)
                comp.onViewCreated(view);
            trikon.rootComponent.outlet.innerHTML = '';
            trikon.rootComponent.outlet.appendChild(view);
            
>>>>>>> 21b3e85f4be851925e7efb35ef80bd297b79c07d
        });
    }
    
    window.history.pushState(null, {title: url}, url);
};