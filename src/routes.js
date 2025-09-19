import { Router } from 'express';
import { getAllLivros, insertLivro, updateLivro, getOneLivro, deleteLivro } from './Controllers/Livros.js';

const router = Router();

router.get('/', (req,res) => {
    res.send("AAAAABBAAAAA");
})

router.get('/livros', getAllLivros)
router.get('/livros/:id', getOneLivro)
router.post('/livros', insertLivro)
router.put('/livros/:id', updateLivro)
router.delete('/livros/:id', deleteLivro)

export default router;