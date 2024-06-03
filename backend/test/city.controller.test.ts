import request from 'supertest';

describe("city controller", () => {
    it("should get all cities", (done) => {
        request("localhost:3000/api/v1")
            .get("/cities")
            .accept('application/json')
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                expect(res.statusCode).toEqual(200);
                expect(res.body.length).toEqual(8);
                done();
            })
    })

    it("should get by id", (done) => {
        request("localhost:3000/api/v1")
        .get("/cities/1")
        .accept('application/json')
        .end((err, res) => {
            if (err) {
                done(err);
                return;
            }

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({
                "name": "New York City",
                "name_native": "New York City",
                "country": "USA",
                "continent": "North America",
                "latitude": 40.730610,
                "longitude": -73.935242,
                "population": 8419000,
                "founded": 1624,
                "landmarks": [
                  "Chrysler Building",
                  "Brooklyn Bridge",
                  "Madison Square Garden"
                ]
            });
            done();
        })
    })

    it("should get by name", (done) => {
        request("localhost:3000/api/v1")
        .get("/cities?name=Munich")
        .accept('application/json')
        .end((err, res) => {
            if (err) {
                done(err);
                return;
            }

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({
                "name": "Munich",
                "name_native": "München",
                "country": "Germany",
                "continent": "Europe",
                "latitude": 48.137154,
                "longitude": 11.576124,
                "population": 1472000,
                "founded": 1158,
                "landmarks": [
                  "Bavaria statue",
                  "Marienplatz",
                  "ottonova office"
                ]
            });
            done();
        })
    })
})