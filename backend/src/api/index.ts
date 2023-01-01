import express from 'express';

import tm from './tm';

const router = express.Router();

router.use('/events', tm);

export default router;
