const express = require('express');
const upload = require('express-fileupload');
const path = require('path')
const app = express();
const fs = require('fs')
const serveIndex = require('serve-index');



// default options
app.use(upload());
console.log('App running in port 8000');


//Serves the index files using serve index
app.use('/uploads', express.static('./uploads'), serveIndex('./uploads', {'icons': true}))

//shows the home folder
app.get('/home',function(req,res){
    res.sendFile(path.join(__dirname+'/html_templates/home.html'))
})


app.post('/home', function(req, res) {
  let sampleFile;
  let uploadPath;
    // if no files are inputted
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname+'/uploads/'+ sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);
    
    res.send('File uploaded!');
  });
});

app.listen(8000)