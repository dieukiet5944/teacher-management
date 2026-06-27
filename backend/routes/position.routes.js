import express from 'express';
import { 
  getAllPositions, 
  createPosition 
} from '../controllers/teacher.controller.js';

const router = express.Router();

router.get('/', getAllPositions);
router.post('/', createPosition);

export default router;