const dbProduction = "mongodb+srv://tomi:homar666@cluster0-9fmpn.mongodb.net/test?retryWrites=true&w=majority";
const dbLocal = "mongodb://localhost/mcga";
const environment = "local";
const port = process.env.PORT || 3000;

const getDb =  () => {
    if(environment === 'local'){
        return dbLocal;
    }else{
        return dbProduction;
    }
};

module.exports = {
    dbProduction,
    dbLocal,
    environment,
    port,
    getDb,
};