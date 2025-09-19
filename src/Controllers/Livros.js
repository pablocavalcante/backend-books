import Livro from "../models/Livro.js";
import { literal } from 'sequelize';


// Listar Livros
export const getAllLivros = async (_, res) => {
    try {
        const livros = await Livro.findAll({
            order: [
                literal("CASE WHEN status = 'Em Leitura' THEN 1 WHEN status = 'Pretendo Ler' THEN 2 WHEN status = 'Lido' THEN 3 ELSE 4 END")
            ]
        });
        res.status(200).json(livros);
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Erro ao buscar livros"});
    }
}

// Adicionar Livros
export const insertLivro = async (req, res) => {
    try {
        const { titulo, autor } = req.body;

        if (!titulo || !autor) {
            return res.status(400).json({ message: "Informe título e autor" });
        }

        const novoLivro = await Livro.create(req.body);      
        res.status(201).json(novoLivro);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro interno no servidor" });
    }
};


// Atualizar Livros
export const updateLivro = async (req, res) => {
    try {
        const { id } = req.params; 
        const novosDados = req.body; 

        // ... (sua validação de ID continua a mesma)
        if (!id) {
            return res.status(400).json({ message: "Informe um ID" });
        }
        const livroID = Number(id);
        if(isNaN(livroID)){
            return res.status(400).json({ message: "O ID informado não é um número!"});
        }
        
        const [numeroDeLinhasAtualizadas] = await Livro.update(novosDados, {
            where: { id: livroID }
        });
        
        if (numeroDeLinhasAtualizadas === 0) {
            return res.status(404).json({ message: "Livro não encontrado para atualização." });
        }

        // Pega o livro já atualizado
        const livroAtualizado = await Livro.findByPk(livroID);
        res.status(200).json(livroAtualizado);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro interno no servidor" });
    }
};

// Pegar 1 livro
export const getOneLivro = async (req, res) => {
    try {
        const { id } = req.params;

        if(!id){
            return res.status(400).json({ message: "Informe um ID"});
        }

        const livroID = Number(id);

        if(isNaN(livroID)){
            return res.status(400).json({ message: "O ID informado não é um número!"});
        }

        const livro = await Livro.findByPk(livroID);
        if(!livro){
            return res.status(404).json({ message: "Livro não encontrado!"});
        }
        res.status(200).json(livro);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro interno no servidor"});
    }
};

// Deletar
export const deleteLivro = async (req, res) => {
    try {
       const { id } = req.params;
       
       if(!id){
        return res.status(400).json({ message: "Informe um ID"});
       }
       
       const livroId = Number(id);

       if(isNaN(livroId)){
            return res.status(400).json({ message: "O ID informado não é um número!"});
        }

        const linhasDeletadas = await Livro.destroy({
            where: {
                id: livroId
            }
        });

        if(linhasDeletadas === 0){
            return res.status(404).json({ message: "Livro não encontrado"});
        }

        res.status(200).json({ message: "Livro deletado com sucesso!"});


    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro interno no servidor"});
    }
};