const  partyModel  = require('../models/Party');
const checkPartyBudget = (budget, services)=>{
    const priceSum = services.reduce((sum, service) => sum + service.price, 0)
    if (priceSum > budget){
        return false;
    }
    return true;
};
const partyController = {
    create: async (req, res) => {
        try {
            const party = {
                title: req.body.name,
                author: req.body.description,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services
            }
            if(party.services && !checkPartyBudget(party.budget, party.services)){
                 res.status(406).json({msg:"Orçamento insuficiente"});
                 return;
            }
            const response = await partyModel.create(party);
            res.status(201).json({ response, msg: "Festa criada com sucesso" });
        } catch (error) {
            console.log(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const party = await partyModel.find();
            res.status(200).json(party);
        } catch (error) {
            console.log(error);
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id;
            const party = await partyModel.findById(id);
            if (!party) {
                res.status(404).json({ msg: "Festa não encontrada" });
            }
            res.status(200).json(party);
        } catch (error) {
            console.log(error);
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const deletedparty = await partyModel.findByIdAndDelete(id);
            if (!deletedparty) {
                res.status(404).json({ msg: "Festa não encontrada" });
            }
            res.status(200).json({ deletedparty, msg: "Festa excluída com sucesso" });
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const party = {
                title: req.body.name,
                author: req.body.description,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services

            }
            const response = await partyModel.findByIdAndUpdate(id, party);
            res.status(200).json({ party, msg: "Festa atualizada com sucesso" });
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = partyController;