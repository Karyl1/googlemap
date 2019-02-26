const express = require('express');
const http = require('http')
var url = require('url');
var querystring = require('querystring');
/**var formidable = require('formidable'); **/
var fs = require('fs');
const app = express();
//const server = http.createServer(app);


class Client {
  constructor(nom,id) {
    this.nom=nom;
    this.id=id;
  }

}

let clients = [];

app.use(function(req, res, next) {

    next();
    });

var server = http.createServer(function(req, res) {
  var page = url.parse(req.url).pathname;
  //console.log(page);
  res.writeHead(200, {"Content-Type": "text/plain"});
  if (page == '/') {
      res.writeHead(200, {"Content-Type": "text/plain"});
      res.write('Hello you!');
      res.end();
  }
  else if (page == '/choosefile') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      var params = querystring.parse(url.parse(req.url).query);
      res.write('<form action="upload" method="post" enctype="multipart/form-data">');
      if ('file' in params) {
          res.write('<input type="file" name="filetoupload"><br>');
      }
      else {
          res.write('<input type="file" name="filetoupload"><br>');
      }
      res.write('<input type="submit">');
      res.write('</form>');
      res.end();
  }
  else if (page == '/upload') {
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
          console.log('File uploaded')  
          var oldpath = files.filetoupload.path;
          var newpath = '/Users/Arnaud//onedrive/' + files.filetoupload.name;
          fs.rename(oldpath, newpath, function (err) {
              if (err) throw err;
              res.write('File uploaded and moved in <onedrive root>!');
              res.end();
          });
      });
  }
  else if (page == '/save') {
      var params = querystring.parse(url.parse(req.url).query);
      if (req.method=='POST') {
        if ('name' in params) {
            var body = '';
            req.on('data', function (data) { body += data; });
            req.on('end', function () { 
                console.log("Body: " + body); 
                fs.unlink(params.name, function (err) {
                    fs.open(params.name,'a',0o666, function (err,fd) {
                        if (err) throw err;
                        fs.write(fd,body,0,'utf8', function(err,written,string) {
                            if (err) throw err;
                            res.write('File saved!');
                            res.end();   
                            fs.close(fd,function(err) {
                                if (err) throw err;
                            })
                        })
                    });
                });
            });
        }
        else {
            res.write('File NOT saved!');
            res.end();   
        }
      }
      else if (('name' in params) && ('string' in params)) {
        fs.unlink(params.name, function (err) {
              fs.open(params.name,'a',0o666, function (err,fd) {
                  if (err) throw err;
                  fs.write(fd,params.string,0,'utf8', function(err,written,string) {
                      if (err) throw err;
                      res.write('File saved!');
                      res.end();   
                      fs.close(fd,function(err) {
                          if (err) throw err;
                      })
                  })
              });
          });
      }
      else {
          res.write('Usage : save?name=<nom de fichier>&string=<chaine contenu>');
          res.end();   
      }
  }
  else if (page == '/load') {
      var params = querystring.parse(url.parse(req.url).query);
      if ('name' in params) {
          fs.readFile(params.name,'utf8',(err, data) => {
              if (!err) {
                  res.write(data);
                  res.end();
              }
            });
      }
      else {
          res.write('Usage : load?name=<nom de fichier>');
          res.end();   
      }
  }
  else {
      // on voit si le fichier demandé existe
      fs.readFile(page.substring(1), function (err, html) {
          if (err) {
              res.writeHead(404, {"Content-Type": "text/plain"});
              res.write('Fichier inexistant =>>> Dommage :))) !');
              res.end();
          }       
          else {
              if (page.toLocaleLowerCase().endsWith(".css"))
                  res.writeHead(200, {"Content-Type": "text/css"});  
              else
                  res.writeHead(200, {"Content-Type": "text/html"});  
              res.write(html);  
              res.end();  
          }
      });
  };
});

server.listen(8080, () => console.log('listening on *:8080'));

// const websocket = socketio(server);

// // The event will be called when a client is connected.
// websocket.on('connection', (socket) => {
//   console.log('Client connecté ', socket.id);
//   //console.log('Client connecté socket', socket);
  
//   //socket.on('register', handleRegister)

//   //socket.on('join', function());

//   //socket.on('leave', handleLeave)

//   socket.on('message', function(msg) {
//       console.log('message reçu '+msg+' de '+socket.id);
//       if ((typeof(msg)==="string") && msg.startsWith("##")) {
//         clients.push(new Client(msg.substring(2),socket.id));
//         console.log(clients);
//       }
//       else {
//         let json=JSON.parse(msg);
//         if (json.dest==="") {
//           console.log("envoi all "+msg);
//           websocket.emit('smessage',msg);
//         }
//         else {
//           for (let i=0;i<clients.length;i++)
//             if (clients [i].nom===json.dest) {
//               console.log("envoi à "+json.dest+" de "+msg);
//               websocket.to(clients[i].id).emit('smessage',msg);
//               return;
//             }
//           console.log("envoi all socket.id non trouvé "+msg);
//           websocket.emit('smessage',msg);
//         }
//       }
//   });

//   socket.on('disconnect', function () {
//     console.log('Client déconnecté... ', socket.id)
//     for (let i=0;i<clients.length;i++)
//       if (clients[i].id===socket.id) {
//         clients.splice(i,1);
//         console.log(clients);
//         break;
//       }
//   })

//   socket.on('error', function (err) {
//     console.log('Erreur client ', socket.id)
//     console.log(err)
//   })
// });

/*
const path = require('path');
const express = require('express');

const app = express();
const buildDir = path.resolve(__dirname, '../build');

app.use(express.static(buildDir));

app.get('*', (req, res) => res.sendFile(`${buildDir}/index.html`));

app.listen(process.env.PORT || 5010);
*/