const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = express();
const mongoose = require('mongoose');
require('./Pets');
require('./User');
const bcrypt = require("bcrypt");
app.use(express.json({ limit: '10kb' }));

const Pets = mongoose.model('pets');
const User = mongoose.model('user');
const cors = require('cors');


const url_banco = "" // Adicione a configuração do seu banco nesta constante

mongoose.connect(`${url_banco}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



mongoose.connection.on('connected', () => {
  console.log('connected to mongo yeahhh');
});
mongoose.connection.on('error', (err) => {
  console.log('error', err);
});

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

app.get('/', (req, res) => {
  res.send("Bem vindo a API da 99 Pets");   
});

app.get('/pets', (req, res) => {
  Pets.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

   

app.post('/newPet', (req, res) => {
  const pet = new Pets({
    userid: req.body.userid,
    nome: req.body.nome,
    idade: req.body.idade,
    raca: req.body.raca,
    picture: req.body.picture
  
  });
  pet
    .save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete('/deletePet', (req, res) => {
  Pets.findByIdAndRemove(req.query.id)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});


app.get('/myPets', (req, res) => {
  Pets.find({userid: req.query.userid}).    
    then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/onePet', (req, res) => {
  
  Pets.findOne({_id: req.query.id}).    
    then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});



app.put('/updatePet', (req, res) => {
  Pets.findByIdAndUpdate({ _id: req.query.id }, {
    userid: req.body.userid,
    nome: req.body.nome,
    idade: req.body.idade,
    raca: req.body.raca,
    picture: req.body.picture
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});


// ====================
// ===== USUARIOS =====
// ====================



app.get('/users', (req, res) => {
  User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/createUser', async (req, res) => {


  const existente = await  User.findOne({email: req.body.email});

  if (!existente){
    
   const salt = bcrypt.genSaltSync();
    senhaHash = bcrypt.hashSync(req.body.senha, salt);
    const user = new User({
      nome: req.body.nome,
      email: req.body.email,
      senha: senhaHash,
    
    });
    user
      .save()
      .then((data) => {
        console.log(data);
         res.status(201).send(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }else{
    res.status(409).send("Usuário já cadastrado");
  }

});

app.delete('/deleteUser', (req, res) => {
  User.findByIdAndRemove(req.body.id)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put('/updateUser', (req, res) => {
  const salt = bcrypt.genSaltSync();
  senhaHash = bcrypt.hashSync(req.body.senha, salt);
  User.findByIdAndUpdate(req.body.id, {
    nome: req.body.nome,
    email: req.body.email,
    senha: senhaHash,
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    res.status(422).send("Você deve definir email e senha");
  }

 
  const usuario = await  User.findOne({email: req.body.email});
  if (!usuario ||  !bcrypt.compareSync(senha, usuario.senha)) {
    res.status(401).send("Email ou senha inválidos");
  }else{
     res.status(200).send({
    id: usuario.id,
    email: usuario.email,
    nome: usuario.nome
  
  });
  }

 
});



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('server running');
});
