import { CityService } from "../src/service/city.service.implementation";
let cityService = new CityService();
describe("city service", () => {
    it("should get all cities", () => {
        let result = cityService.getAll();
        expect(result.length).toBe(8);
    });
    it("should get by id", () => {
        let result = cityService.getById(0);
        expect(result).toEqual({
            "name": "Sydney",
            "name_native": "Sydney",
            "country": "Australia",
            "continent": "Australia",
            "latitude": "-33.865143",
            "longitude": "151.209900",
            "population": "5312000",
            "founded": "1788",
            "landmarks": [
                "Sydney Opera House",
                "Sydney Harbour Bridge",
                "Queen Victoria Building"
            ]
        });
    });
    it("should get by name", () => {
        let result = cityService.getByName("Munich");
        expect(result).toEqual({
            "name": "Munich",
            "name_native": "München",
            "country": "Germany",
            "continent": "Europe",
            "latitude": "48.137154",
            "longitude": "11.576124",
            "population": "1472000",
            "founded": "1158",
            "landmarks": [
                "Bavaria statue",
                "Marienplatz",
                "ottonova office"
            ]
        });
    });
});
