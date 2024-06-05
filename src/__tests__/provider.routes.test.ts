import request from "supertest";
import app from "../app";

describe("Provider API Route Tests", () => {
  describe("GET character /", () => {
    //initial stage character array is empty
    it("should return 200 with empty array", async () => {
      const response = await request(app).get(`/provider`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ characters: [] });
    });
  });

  //will not receive any valid character details becasue of array is empty
  describe("GET character by id /:id", () => {
    it("should return 404 Becasue We didn't create character ", async () => {
      const validUuid = "123e4567-e89b-12d3-a456-426614174000";
      const response = await request(app).get(`/provider/${validUuid}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Player not found!");
    });
  });

  // fitst user creation
  describe("POST create new character /", () => {
    let CharacterId: string;

    it("1st user - should return 201 for valid job and name", async () => {
      let characterData = { name: "John", job: "Warrior" };
      const response = await request(app)
        .post(`/provider`)
        .set("Accept", "application/json")
        .send(characterData);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User created");
      CharacterId = response.body.newCharacter.id;
    });

    it("should retrieve the newly created character info by ID", async () => {
      const response = await request(app).get(
        `/provider/${CharacterId}`
      );
      expect(response.status).toBe(200);
      expect(response.body.characters.id).toBe(CharacterId);
      expect(response.body.characters.name).toBe("John");
      console.log(
        `fetched character info by id: ${CharacterId}: `,
        response.body
      );
    });

    it("2nd user - should return 201 for valid job and name", async () => {
      let characterData = { name: "Ruwan", job: "Thief" };
      const response = await request(app)
        .post(`/provider`)
        .set("Accept", "application/json")
        .send(characterData);
      expect(response.status).toBe(201);      
      expect(response.body.message).toBe("User created");
    });

    it("3rd user - should return 422 for invalid name containing numbers and valid job", async () => {
      let characterData = { name: "Ruwan23", job: "Mage" };
      const response = await request(app)
        .post(`/provider`)
        .set("Accept", "application/json")
        .send(characterData);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("Invalid request data");
    });

    it("4rd user - should return 422 for invalid name containing less character limit and valid job", async () => {
      let characterData = { name: "Ruw", job: "Mage" };
      const response = await request(app)
        .post(`/provider`)
        .set("Accept", "application/json")
        .send(characterData);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("Invalid request data");
    });

    it("5rd user - should return 422 for invalid name containing over than character limit and valid job", async () => {
      let characterData = { name: "abcdefghijklmnop", job: "Mage" };
      const response = await request(app)
        .post(`/provider`)
        .set("Accept", "application/json")
        .send(characterData);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("Invalid request data");
    });

    it("6rd user - should return 201 for valid name containing _ character and valid job", async () => {
      let characterData = { name: "Ale_xT", job: "Mage" };
      const response = await request(app)
        .post(`/provider`)
        .set("Accept", "application/json")
        .send(characterData);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User created");
    });

    it("7rd user - should return 422 for valid name and invalid job", async () => {
      let characterData = { name: "Reeta", job: "MageUp" };
      const response = await request(app)
        .post(`/provider`)
        .set("Accept", "application/json")
        .send(characterData);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("Invalid Job");
    });

    it("7rd user - should return 422 for valid name and missing job", async () => {
      let characterData = { name: "Reeta", job: "" };
      const response = await request(app)
        .post(`/provider`)
        .set("Accept", "application/json")
        .send(characterData);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("Invalid request data");
    });

    it("8rd user - should return 201 for missing name and job", async () => {
      let characterData = { name: "", job: "" };
      const response = await request(app)
        .post(`/provider`)
        .set("Accept", "application/json")
        .send(characterData);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("Invalid request data");
    });
  });

  describe("GET list of all characters /", () => {
    it("should return 200 with full array", async () => {
      const response = await request(app).get(`/provider`);
      expect(response.status).toBe(200);
      console.log("Character List Rseponse body: ", response.body);
    });
  });

  describe("Start Battle with 2 Characters", () => {

    let battleCharacter1Id: string;
    let battleCharacter2Id: string;

    it("Create Valid Battle Player X", async () => {
      let characterData = { name: "CharacterX", job: "Warrior" };
      const response = await request(app)
        .post(`/provider`)
        .set("Accept", "application/json")
        .send(characterData);
      console.log("Battle Player X Rseponse body: ", response.body);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User created");
      battleCharacter1Id = response.body.newCharacter.id;
    });


    it("Create Valid Battle Player Y", async () => {
      let characterData = { name: "CharacterY", job: "Thief" };
      const response = await request(app)
        .post(`/provider`)
        .set("Accept", "application/json")
        .send(characterData);
      console.log("Battle Player Y Rseponse body: ", response.body);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User created");
      battleCharacter2Id = response.body.newCharacter.id;
    });

    it("Start Battle with 2 CharacterX and CharacterY", async () => {
      let characterData = { character1: battleCharacter1Id, character2: battleCharacter2Id };
      const response = await request(app)
        .post(`/battle`)
        .set("Accept", "application/json")
        .send(characterData);
      console.log("Game Rseponse Response Body: ", response.body);
      expect(response.status).toBe(200);
    });

    it("Start Battle with 2 Invalid CharacterX and CharacterY UUIDs", async () => {
      let characterData = { character1: '123e4567', character2: '123e4567' };
      const response = await request(app)
        .post(`/battle`)
        .set("Accept", "application/json")
        .send(characterData);
      expect(response.status).toBe(422);
      expect(response.body.message).toBe("Invalid request data");
    });

  })
});
