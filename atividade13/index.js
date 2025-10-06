const express = require('express');
const cors = require('cors');
const {Sequelize, DataTypes} = require('sequelize');

// criando conexão com o banco de dados MySQL
const sequelize = new Sequelize('db_luis', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// definindo o modelo para tabela no banco de dados
const Usuario = sequelize.define('Usuario', {
    nome: {
        type: DataTypes.STRING, //Tipo varchar 
        allowNull: false // NOT NULL-> não pode ser nulo ou vazio
    },
    email: {
        type: DataTypes.STRING, // TIPO VARCHAR -> STRING -> TEXTO
        allowNull: false, // NOT NULL -> OBRIGATÓRIO -> NÃO PODE SER NULO OU VAZIO  
        unique: true // NÃO PODE REPETIR
    },
});    

const app = express(); // INICIALIZA O EXPRESS
app.use(cors()); // PERMITE QUE API ACEITE CONEXÃO DO FRONT-END
app.use(express.json()); // para ler JSON no corpo da requisição

const PORT = 3000; // PORTA ONDE A APLICAÇÃO VAI RODAR

// ROTA DE TESTE
app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

// ROTA PARA LISTAR TODOS OS USUÁRIOS
app.get('/usuarios', async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
});

// ROTA PARA CRIAR UM NOVO USUÁRIO
app.post('/usuarios', async (req, res) => {
    try {
        const { nome, email } = req.body; 
        const novoUsuario = await Usuario.create({ nome, email });
        res.status(201).json(novoUsuario); // 201 -> CRIADO COM SUCESSO
    } catch (error) {
        res.status(400).json({ mensagem: "E-mail já cadrastado" }); // 400 -> REQUISIÇÃO INVÁLIDA
    }
});

app.get('/produtos', async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
});


// SINCRONIZA O MODELO COM O BANCO DE DADOS E INICIA O SERVIDOR
sequelize.sync().then(() => {
    app.listen(PORT, () => {

        console.log(`🚀API rodando em http://localhst:${PORT}`);
        console.log('🚀Conectado ao banco de dados MySQL')
    }); 
}).catch(err => {
    console.error('Não foi possível conectar ao banco de dados:');
});