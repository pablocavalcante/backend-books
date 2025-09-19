import { Router } from 'express';
import { getAllLivros, insertLivro, updateLivro, getOneLivro, deleteLivro } from './Controllers/Livros.js';

const router = Router();

router.get('/', (_,res) => {
    res.send("API Rodando com sucesso ! ");
})

router.get('/livros', getAllLivros)
router.get('/livros/:id', getOneLivro)
router.post('/livros', insertLivro)
router.put('/livros/:id', updateLivro)
router.delete('/livros/:id', deleteLivro)

export default router;