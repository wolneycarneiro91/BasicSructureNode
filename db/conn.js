const mongoose = require('mongoose');
async function main(){
    try{
        mongoose.set('strictQuery',true);
        await mongoose.connect('mongodb+srv://cesarcarneiro:q1w2e3r4@cluster0.q4wc6zx.mongodb.net/?retryWrites=true&w=majority')
        console.log('conectado');
    }catch(error){
        console.log(error);
    }

}
module.exports = main