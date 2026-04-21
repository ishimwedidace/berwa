
const express=require('express');
const mysql=require('mysql2');
const app=express();
app.use(express.json());
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'internship'
});
db.connect((err)=>{
    if(err){
        console.log('database not connected:', err);
        ruturn;
    }
    console.log("database connected");
});
app.get('/',(req,res)=>{
    res.send('welcome to api portal');
})
//ritrieve api
app.get('/api/student',(req,res)=>{
    const sql="SELECT * FROM student";
    db.query(sql,(err,results)=>{
        if(err){
            console.log('Error fetching students:', err);
            return res.status(500).json({error: 'internal server error'});
        }
         return res.status(200).json(results);
    })
})
//select by id
app.get('/api/student/:id',(req,res)=>{
    const {id}=req.params;
    const sql="SELECT* FROM student WHERE id=?";
    db.query(sql,[id],(err,results)=>{
        if(err){
            console.log('Error fetching students:', err);
            return res.status(500).json({error: 'internal server error'});
        }
        if(results.length===0){
            return res.status(404).json({error:'user not found'});
        }
         return res.status(200).json(results);
    })
})
//insert another student
app.post('/api/student',(req,res)=>{
    const {fname,lname,age,department}=req.body;
    const sql="INSERT INTO student(fname,lname,age,department)VALUES(?,?,?,?)";
    db.query(sql,[fname,lname,age,department],(err,results)=>{
        if(err){
            console.log('Error fetching students:', err);
            return res.status(500).json({error: 'internal server error'});
        }
      
         return res.status(201).json({message :'user registered successfull'});
    })
})
//update an student
app.put('/api/student/:id',(req,res)=>{
        const {id}=req.params;
          const {fname,lname,age,department}=req.body;
          const sql="UPDATE student SET fname = ?,lname = ? ,age = ?,department = ? WHERE id = ?"; 
              db.query(sql,[fname,lname,age,department,id],(err,results)=>{
        if(err){
            console.log('Error updating students:', err);
            return res.status(500).json({error: 'internal server error'});
        }
      
         return res.status(200).json({message :'user updated successfull'});
    })
})
//delete an student
app.delete('/api/student/:id',(req,res)=>{
        const {id}=req.params;
        
          const sql="DELETE FROM student WHERE id=?"; 
              db.query(sql,[id],(err,results)=>{
        if(err){
            console.log('Error deleting students:', err);
            return res.status(500).json({error: 'internal server error'});
        }
      
         return res.status(200).json({message :'user deleted successfull'});
    })
})
app.listen(4000,()=>{
    console.log("server is running on port 4000");
})