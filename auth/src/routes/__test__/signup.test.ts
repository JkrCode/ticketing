import request from 'supertest';

import { app } from '../../app'

it ('returns a 201 on succesful signup', async ()=>{
    await request(app)
        .post("/api/users/signup")
        .send({
            email:"test@test.com",
            password: "password"
        })
        .expect(201)
})

it('returns a 400 with an invalid email', async ()=>{ 
    await request(app)
        .post("/api/users/signup")
        .send({
            email:"testtest.com",
            password: "password"
        })
        .expect(400)
})

it('returns a 400 with an invalid password', async ()=>{ 
    await request(app)
        .post("/api/users/signup")
        .send({
            email:"testtest.com",
            password: "3"
        })
        .expect(400)
})

it('returns a 400 with an missing email andpassword', async ()=>{ 
    await request(app)
        .post("/api/users/signup")
        .send({
        })
        .expect(400)

    await request(app)
        .post("/api/users/signup")
        .send({
        })
        .expect(400)
})

it("disallows duplicate emails", async()=>{
    await request(app)
        .post("/api/users/signup")
        .send({
            email:"test@test.com",
            password: "validpassword"
        })
        .expect(201);
    await request(app)
        .post("/api/users/signup")
        .send({
            email:"test@test.com",
            password: "validpassword"
        })
        .expect(400);
})

it("sets a coockie after successful signup", async()=>{
    const response = await request(app)
        .post("/api/users/signup")
        .send({
            email:"test@test.com",
            password: "validpassword"
        })
        .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();
})

