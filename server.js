var http=require('http')
http.createServer(function(req,res){
    res.write("hi welcome to our server")
    res.end();
    if(req === '/hi' )
    {
        res.write("hi karthick");
        res.end();        
    }
    
}).listen(8000);