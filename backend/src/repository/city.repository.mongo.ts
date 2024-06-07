
import { City, CityModel } from "../entity/city.entity";
import { ICityRepository } from "./city.repository.interface";
import { connect } from "../data/db";
import { PageRequest } from "../request/page.request";
import { PaginatedResponse } from "../response/paginated.response";
import { CitySearchRequest } from "../request/city.search.request";


export class CityRepositoryMongo implements ICityRepository {

    async getAll(citySearch?: CitySearchRequest, page?: PageRequest): Promise<PaginatedResponse<City>> {
        await connect();
        const query = citySearch && citySearch.name ? { 
                $or: [ 
                    { name: { $regex: citySearch.name, $options: 'i' } },
                    { name_native: { $regex: citySearch.name, $options: 'i' } }  
                ]
            } 
            : {}
        const queryOpts = page ? { skip: (page.no - 1) * page.size, limit: page.size } : undefined;
        const data: City[] = await CityModel.find(query, null, queryOpts).sort({ name: 1 });
        
        const totalDocuments = await CityModel.countDocuments(query);
        const pages = page ? Math.ceil(totalDocuments / page.size) : 1;
        
        const current = page ?? { no: 1, size: totalDocuments } ;
        const prev = page ? (page.no - 1 >= 1 ? { no: page.no - 1, size: page.size } : undefined) : undefined;
        const next = page ? (page.no + 1 <= pages ? { no: page.no + 1, size: page.size } : undefined) : undefined;

        return {
            data,
            pages,
            current,
            prev,
            next  
        }; 
    }
}