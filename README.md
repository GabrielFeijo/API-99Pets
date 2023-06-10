# API-99Pets

Bem-vindo à API 99Pets! Esta API foi desenvolvida para integrar o aplicativo mobile do 99 Pets, como agendamento de serviços de cuidados, localização de PetShops, compra de produtos para pets, entre outros recursos.

## Requisitos

Antes de começar a utilizar a API 99Pets, certifique-se de ter os seguintes requisitos instalados em seu ambiente de desenvolvimento:

- Node.js: Você pode baixar e instalar o Node.js a partir do [site oficial](https://nodejs.org).
- MongoDB: A API 99Pets utiliza o MongoDB como banco de dados. Você pode baixar e instalar o MongoDB a partir do [site oficial](https://www.mongodb.com)

## Instalação

Siga as etapas abaixo para configurar a API 99Pets em seu ambiente local:

1. Clone o repositório do GitHub:

   ```bash
   git clone https://github.com/GabrielFeijo/API-99Pets.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd api-99pets
   ```

3. Instale as dependências do projeto:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm start ou npm run start-dev
   ```

Após executar o comando acima, o servidor de desenvolvimento será iniciado na porta padrão 3000. Agora você pode começar a interagir com a API 99Pets.

## Utilização

A API 99 Pets oferece uma ampla variedade de endpoints para atender às necessidades do seu aplicativo mobile. Aqui estão alguns dos principais endpoints disponíveis:

### Usuário

- `GET /user`: Retorna os detalhes de um usuário com base no nome de usuário.
- `GET /users`: Retorna todos os usuários cadastrados.
- `POST /createUser`: Cria um novo usuário.
- `PUT /updateUser/:id`: Atualiza um usuário existente com base no ID.
- `DELETE /users/:id`: Exclui um usuário existente com base no ID.

### Pets

- `GET /pets`: Retorna todos os pets cadastrados.
- `GET /onePet`: Retorna os detalhes de um pet específico.
- `GET /myPets`: Retorna os pets de um usuário específico.
- `POST /newPet`: Cria um novo pet.
- `PUT /updatePet`: Atualiza os dados de um pet existente.
- `DELETE /deletePet`: Exclui um pet existente.

Esses são apenas alguns exemplos dos endpoints disponíveis na API 99 Pets. Existem muitos outros endpoints que podem ser explorados para atender às necessidades específicas do aplicativo.

Certifique-se de incluir os dados corretos no corpo das requisições POST e PUT, seguindo o formato adequado para cada rota.

## Licença

Este projeto está licenciado sob a Licença MIT. Para mais informações, consulte o arquivo LICENSE.
