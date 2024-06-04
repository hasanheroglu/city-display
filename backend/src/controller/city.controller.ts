import { Request, Response, Router } from 'express';
import { ICityService } from '../service/city.service.interface';
import { CityService } from '../service/city.service.implementation';

const cityService: ICityService = new CityService();
export const CityRoute: Router = Router();

CityRoute.get('/', (req: Request, res: Response) => {
    if (req.query.name === undefined) {
        res.send(cityService.getAll());
    } else {
        res.send(cityService.getByName(req.query.name as string));
    }
});

CityRoute.get('/:id', (req: Request, res: Response) => {
    if (!req.params.id) {
        res.status(400).end();
    }

    res.send(cityService.getById(Number(req.params.id)));
});
