import { Request, Response, Router } from 'express'
import { ICityService } from '../service/city.service.interface'
import { CityService } from '../service/city.service.implementation'

const cityService: ICityService = new CityService()
export const CityRoute: Router = Router()

CityRoute.get('/', async (req: Request, res: Response) => {
    if (req.query.pageNo && req.query.pageSize) {
        res.status(200).send(
            await cityService.getAll(
                { name: req.query.name as string },
                {
                    no: parseInt(req.query.pageNo as string),
                    size: parseInt(req.query.pageSize as string),
                }
            )
        )
    } else {
        res.status(200).send(
            await cityService.getAll({ name: req.query.name as string })
        )
    }
})
