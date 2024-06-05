import { Router } from 'express';
import homeRouter from './home.routes';
import providerRouter from './provider.routes';
import battleRouter from './battle.routes';

// Create a new Router instance
const router = Router();

// Mount the routers
router.use('/', homeRouter);
router.use('/provider', providerRouter);
router.use('/battle', battleRouter);

export default router;