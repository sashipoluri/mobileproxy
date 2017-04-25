var http = require('http'),
    httpProxy = require('http-proxy');
 
// 
// Create a proxy server with custom application logic 
// 
var proxy = httpProxy.createProxyServer({changeOrigin: true});
 
// To modify the proxy connection before data is sent, you can listen 
// for the 'proxyReq' event. When the event is fired, you will receive 
// the following arguments: 
// (http.ClientRequest proxyReq, http.IncomingMessage req, 
//  http.ServerResponse res, Object options). This mechanism is useful when 
// you need to modify the proxy request before the proxy connection 
// is made to the target. 
// 
proxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('Authorization', 'bearer c1b6c48756cd44bd8166b526cea6a922486c8b4');
});
 
var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request 
  // and then proxy the request. 
  proxy.web(req, res, {
    target: 'https://api.appannie.com'
  });
});
 
console.log("listening on port 5050")
server.listen(5050);