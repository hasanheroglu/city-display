import mongoose from 'mongoose';
import request from 'supertest';

afterAll(() => { 
    mongoose.connection.close();
});

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
                expect(res.body.data.length).toEqual(8);
                done();
            })
    })

    it("should get all cities", (done) => {
        request("localhost:3000/api/v1")
            .get("/cities?pageNo=1&pageSize=4")
            .accept('application/json')
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                expect(res.statusCode).toEqual(200);
                expect(res.body.data.length).toEqual(4);
                done();
            })
    })
})