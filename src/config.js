const dbProduction = "mongodb+srv://tomi:homar666@cluster0-9fmpn.mongodb.net/test?retryWrites=true&w=majority";
const dbLocal = "mongodb://localhost/mcga";
const environment = "production";
const port = process.env.PORT || 3000;
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
    dbProduction,
    dbLocal,
    environment,
    port,
    getDB,
    secretKey,
    getDB,
    getSecret
};