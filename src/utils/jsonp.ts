// 发起jsonp请求
export default function jsonp(url:string,fn:Function){
    let script = document.createElement("script");
    script.setAttribute("type","text/script");
    const _url = url.split("?"),
    callbackname = "jQuery_"+String(new Date().getTime()).slice(-10) + Math.random().toString().slice(-5);
    url = _url[0] + "?jsonp=" + callbackname + "&" + _url[1];
    script.setAttribute("src",url);
    window[callbackname] = function(data){
        try{
            fn(data);
            window[callbackname] = undefined;
            document.body.removeChild(script);
        }catch(e){
            console.error(e);
        }
    }
    document.body.appendChild(script);
}