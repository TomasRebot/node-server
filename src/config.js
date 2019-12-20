const dbProduction = "mongodb+srv://maxi:maxirmcga2014@cluster0-oxdph.mongodb.net/test?retryWrites=true&w=majority";
const dbLocal = "mongodb://localhost/mcga";
const environment = "production";
const port = process.env.PORT || 4500;
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
    getSecret
};