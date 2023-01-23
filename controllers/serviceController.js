const { Service: ServiceModel } = require('../models/Service');
const serviceController = {
    create: async (req, res) => {
        try {
            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            }
            const response = await ServiceModel.create(service);
            res.status(201).json({ response, msg: "Serviço criado com sucesso" });
        } catch (error) {
            console.log(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const service = await ServiceModel.find();
            res.status(200).json(service);
        } catch (error) {
            console.log(error);
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id;
            const service = await ServiceModel.findById(id);
            if (!service) {
                res.status(404).json({ msg: "Serviço não encontrado" });
            }
            res.status(200).json(service);
        } catch (error) {
            console.log(error);
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const deletedService = await ServiceModel.findByIdAndDelete(id);
            if (!deletedService) {
                res.status(404).json({ msg: "Serviço não encontrado" });
            }
            res.status(200).json({ deletedService, msg: "Serviço excluido com sucesso" });
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            }
            const response = await ServiceModel.findByIdAndUpdate(id, service);
            res.status(200).json({ service, msg: "Serviço atualizado com sucesso" });
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = serviceController;