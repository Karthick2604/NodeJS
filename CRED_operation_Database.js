var express = require('express');
var sql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

var Connection =sql.createConnection({
    
    user     : "root",
    password : "root",
    host     : "localhost",
    database : "employee"    
})

app.get('/',function(request,response)
{
    Connection.connect(function(err) 
    {
        if (err) throw err;
        //Select all customers and return the result object:
        Connection.query("SELECT * FROM emp", function (err, result) {
        if (err) throw err;
        response.send(result);
    });
  });
})
app.get('/:id', function (req, res) {
    // if object found return an object else return 404 not-found
    console.log('req.params.id ',req.params.id)
        Connection.query(`select * from emp where e_id=${req.params.id}`, function(err,result){
        res.send(result);
        });    
});

app.post('/', function (req, res) {
    // create an object of new Item
    console.log('req ',req.body);
    let sqlQuery = "insert into emp (e_name,e_age,e_salary) values('"+req.body.name+"','"+req.body.age+"','"+req.body.salary+"')";
    console.log('sqlQuery => ',sqlQuery)
    Connection.query(sqlQuery,function(err,result){
      res.send(result);
  });
});
app.put('/:id',function(req,res){//id found then start the update function
    let id = parseInt(req.params.id);
    console.log('req ',req.body);
    //let sqlQuery = "insert into emp (e_name,e_age,e_salary) values('"+req.body.name+"','"+req.body.age+"','"+req.body.salary+"')";
    let sqlQuery = "update emp set e_name ='"+req.body.name+"' where e_id = '"+id+"'";
    console.log('sqlQuery => ',sqlQuery)
    Connection.query(sqlQuery,function(err,result){
      res.send(result);
});
});
app.delete('/:id',function(req,res){
    let id = parseInt(req.params.id);
    console.log('req ',req.body);
    //let sqlQuery = "insert into emp (e_name,e_age,e_salary) values('"+req.body.name+"','"+req.body.age+"','"+req.body.salary+"')";
    let sqlQuery = "delete from emp where e_id = '"+id+"'";
    console.log('sqlQuery => ',sqlQuery)
    Connection.query(sqlQuery,function(err,result){
      res.send(result);
    });
});
var port = process.env.PORT || 9000;
app.listen(port,function(){
    console.log(`Running ${port}`);
});

