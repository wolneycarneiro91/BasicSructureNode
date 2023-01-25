const mongoose = require('mongoose');
const dbUser = process.env.DB_USERNAME;
const dbPassword= process.env.DB_PASSWORD;

async function main(){
    try{
        mongoose.set('strictQuery',true);
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.q4wc6zx.mongodb.net/?retryWrites=true&w=majority`)        
        console.log('conectado');
    }catch(error){
        console.log(error);
    }

}
module.exports = main