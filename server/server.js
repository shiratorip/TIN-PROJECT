const express = require('express')
const app = express()
const bodyParser = require('body-parser')
let sqlite3 = require('sqlite3');


let db = new sqlite3.Database('../database/database.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
  });
app.use(bodyParser.json())



app.get("/api/gamer/:id",(req,res)=>{
  let id = req.params.id;
  sql = "select * from gamer"
  console.log(req.params.id)
  if(id!=null){
      sql+=` where id = ${id}`;
  }
  try{
      db.each(sql, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    res.send(row)
  });

  }catch(error){
      res.json({
          status:400,
          success:false
      })
  }
})

app.get("/api/participation/:id",(req,res)=>{
  let id = req.params.id;
  sql = "select * from participation"
  console.log(req.params.id)
  if(id!=null){
      sql+=` where id = ${id}`;
  }
  try{
      db.each(sql, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    res.send(row)
  });

  }catch(error){
      res.json({
          status:400,
          success:false
      })
  }
})


app.get("/api/tournament/:id",(req,res)=>{
  let id = req.params.id;
  sql = "select * from tournament"
  console.log(req.params.id)
  if(id!=null){
      sql+=` where id = ${id}`;
  }
  try{
      db.each(sql, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    res.send(row)
  });

  }catch(error){
      res.json({
          status:400,
          success:false
      })
  }
})

app.delete("/api/gamer/:id", (req, res) => {
  sql = `DELETE FROM Gamer WHERE id = ${req.params.id}`;
  try{
    db.exec(sql, (err, res) => {
  if (err) {
    console.error(err.message);
  }
});

}catch(error){
    res.json({
        status:400,
        success:false
    })
}
})

app.delete("/api/tournament/:id", (req, res) => {
  sql = `DELETE FROM Tournament WHERE id = ${req.params.id}`;
  try{
    db.exec(sql, (err, res) => {
  if (err) {
    console.error(err.message);
  }
});

}catch(error){
    res.json({
        status:400,
        success:false
    })
}
})

app.delete("/api/participation/:id", (req, res) => {
    sql = `DELETE FROM Participation WHERE id = ${req.params.id}`;
    try{
        db.exec(sql, (err, res) => {
            if (err) {
                console.error(err.message);
            }
        });

    }catch(error){
        res.json({
            status:400,
            success:false
        })
    }
})
app.delete("/api/participationtournament/:id", (req, res) => {
    sql = `DELETE FROM Participation WHERE tournament_id = ${req.params.id}`;
    try{
        db.exec(sql, (err, res) => {
            if (err) {
                console.error(err.message);
            }
        });

    }catch(error){
        res.json({
            status:400,
            success:false
        })
    }
})
app.delete("/api/participationgamer/:id", (req, res) => {
    sql = `DELETE FROM Participation WHERE gamer_id = ${req.params.id}`;
    try{
        db.exec(sql, (err, res) => {
            if (err) {
                console.error(err.message);
            }
        });

    }catch(error){
        res.json({
            status:400,
            success:false
        })
    }
})

app.get("/api/gamerlist/:page",(req,res)=>{
  let page = req.params.page;
  page--
  sql = `select * from gamer limit 5 offset ${(page)*5}`
  
  try{
      db.all(sql, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    res.send(row)
  });

  }catch(error){
      res.json({
          status:400,
          success:false
      })
  }
})

app.get("/api/tournamentlist/:page",(req,res)=>{
  let page = req.params.page;
  page--
  sql = `select * from tournament limit 5 offset ${(page)*5}`
  
  try{
      db.all(sql, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    res.send(row)
  });

  }catch(error){
      res.json({
          status:400,
          success:false
      })
  }
})

app.get("/api/participationlist/:page",(req,res)=>{
  let page = req.params.page;
  page--
  sql = `select gamer_id,g.nickname,g.avatar_url,tournament_id,t.name,p.id,p.position,p.prize from participation p JOIN gamer g on p.gamer_id=g.id join tournament t on p.tournament_id=t.id limit 5 offset ${(page)*5}`
  
  try{
      db.all(sql, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    res.send(row)
  });

  }catch(error){
      res.json({
          status:400,
          success:false
      })
  }
})
app.get("/api/gamerbn/:nickname",(req,res)=>{
  sql = `select * from gamer where nickname Like '%${req.params.nickname}%' Collate nocase`
  console.log(sql)
    try{
      db.all(sql, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    res.send(row)
  });

  }catch(error){
      res.json({
          status:400,
          success:false
      })
  }
})
app.get("/api/tournamentbn/:name",(req,res)=>{
  sql = `select * from tournament where name Like '%${req.params.name}%' Collate nocase`
  console.log(sql)
    try{
      db.all(sql, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    res.send(row)
  });

  }catch(error){
      res.json({
          status:400,
          success:false
      })
  }
})
app.get("/api/lastgamer/",(req,res)=>{
    sql = "select MAX(id) from gamer"
    try{
        db.get(sql, (err, max) => {
      if (err) {
        console.error(err.message);
      }
      res.send(max)
    });

    }catch(error){
        res.json({
            status:400,
            success:false
        })
    }
})
app.put("/api/gamer/:id", (req, res) => {
  const { nickname, avatar_url, password, description, platform } = req.body;
  sql = `UPDATE Gamer
               SET nickname='${nickname}', avatar_url='${avatar_url}', password='${password}', description='${description}', platform='${platform}'
               WHERE id=${req.params.id}`;
    try{
        db.exec(sql, (err, max) => {
      if (err) {
        console.error(err.message);
      }
      res.send(max)
    });

    }catch(error){
        res.json({
            status:400,
            success:false
        })
    }
})
app.put("/api/tournament/:id", (req, res) => {
  const { name, start_date, end_date, game_name, banner_url,description } = req.body;
  sql = `UPDATE Tournament
               SET name='${name}', start_date='${start_date}', end_date='${end_date}', game_name='${game_name}', banner_url='${banner_url}', description='${description}'
               WHERE id=${req.params.id}`;
    try{
        db.exec(sql, (err, max) => {
      if (err) {
        console.error(err.message);
      }
      res.send(max)
    });

    }catch(error){
        res.json({
            status:400,
            success:false
        })
    }
})

app.put("/api/participation/:id", (req, res) => {
  const { position, prize, tournament_id, gamer_id} = req.body;
  sql = `UPDATE Participation
               SET position='${position}', prize='${prize}', tournament_id='${tournament_id}', gamer_id='${gamer_id}'
               WHERE id=${req.params.id}`;
    try{
        db.exec(sql, (err, max) => {
      if (err) {
        console.error(err.message);
      }
      res.send(max)
    });

    }catch(error){
        res.json({
            status:400,
            success:false
        })
    }
})
app.post("/api/gamer/",(req,res)=>{
  console.log(req.body)
  sql = `Insert into Gamer(nickname, avatar_url, password, description, platform) values ('${req.body.nickname}','${req.body.avatar_url}','${req.body.password}','${req.body.description}','${req.body.platform}')`
  console.log(sql)
  try{
      db.exec(sql, (err, max) => {
    if (err) {
      console.error(err.message);
    }
    res.send(max)
  });

  }catch(error){
      res.json({
          status:400,
          success:false
      })
  }
})
app.post("/api/tournament/",(req,res)=>{
  console.log(req.body)
  sql = `Insert into Tournament(name, start_date, end_date, game_name, banner_url, description) values ('${req.body.name}',DATE('${req.body.start_date}'),DATE('${req.body.end_date}'),'${req.body.game_name}','${req.body.banner_url}','${req.body.description}')`
  console.log(sql)
  try{
      db.exec(sql, (err, max) => {
    if (err) {
      console.error(err.message);
    }
    res.send(max)
  });

  }catch(error){
      res.json({
          status:400,
          success:false
      })
  }
})
app.post("/api/participation/",(req,res)=>{
  console.log(req.body)
  sql = `Insert into Participation(position, prize, tournament_id, gamer_id) values ('${req.body.position}','${req.body.prize}','${req.body.tournament_id}','${req.body.gamer_id}')`
  console.log(sql)
  try{
      db.exec(sql, (err, max) => {
    if (err) {
      console.error(err.message);
    }
    res.send(max)
  });

  }catch(error){
      res.json({
          status:400,
          success:false
      })
  }
})




app.listen(5000,()=>{console.log("server started on port 5000")})