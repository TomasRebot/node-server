const dbProduction = "mongodb+srv://tomi:homar666@cluster0-9fmpn.mongodb.net/test?retryWrites=true&w=majority";
const dbLocal = "mongodb://localhost/mcga";
const environment = "local";
const port = process.env.PORT || 4000;
const secretKey = process.env.SECRET_TOKEN || 'mcga-todo-application';

const getDB =  () => {
    if(environment === 'local'){
        return dbLocal;
    }else{
        return dbProduction;
    }
};

const getSecret = () => {
    return secretKey;
};

module.exports = {
    dbProduction: "mongodb+srv://tomi:homar666@cluster0-9fmpn.mongodb.net/test?retryWrites=true&w=majority",
    dbLocal: "mongodb://localhost/mcga",
    environment: "local",
    port,
    secretKey: process.env.SECRET_TOKEN || 'mcga-todo-application',
    getDB,
    getSecret
};