const http=require('http');
const server=http.createServer((Request,Response)=>{
    if(Request.url==='/'){
      Response.write("hello guys");
      Response.end();
    }
    if(Request.url==='/api/node'){
        Response.write(JSON.stringify([4,8,7]));
        Response.end();
    }
});


server.listen(3000);
console.log('Listenind on port 3000.....');