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
  proxyReq.setHeader('Authorization', 'bearer 08c1ebd9145e9d03bb8f1a2256bb13e1adb4c0a8');
});

proxy.on('proxyRes', function(proxyRes, req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
});
 
var server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request 
  // and then proxy the request. 
  proxy.web(req, res, {
    target: 'https://api.appannie.com'
  });
});
 
console.log("listening on port 8080")
var port = process.env.PORT || 8080;
server.listen(port);