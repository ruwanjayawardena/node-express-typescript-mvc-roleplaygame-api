"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe("Provider API Route Tests", () => {
    describe("GET character /", () => {
        //initial stage character array is empty
        it("should return 200 with empty array", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).get(`/provider`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ characters: [] });
        }));
    });
    //will not receive any valid character details becasue of array is empty
    describe("GET character by id /:id", () => {
        it("should return 404 Becasue We didn't create character ", () => __awaiter(void 0, void 0, void 0, function* () {
            const validUuid = "123e4567-e89b-12d3-a456-426614174000";
            const response = yield (0, supertest_1.default)(app_1.default).get(`/provider/${validUuid}`);
            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Player not found!");
        }));
    });
    // fitst user creation
    describe("POST create new character /", () => {
        let CharacterId;
        it("1st user - should return 201 for valid job and name", () => __awaiter(void 0, void 0, void 0, function* () {
            let characterData = { name: "John", job: "Warrior" };
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(`/provider`)
                .set("Accept", "application/json")
                .send(characterData);
            expect(response.status).toBe(201);
            expect(response.body.message).toBe("User created");
            CharacterId = response.body.newCharacter.id;
        }));
        it("should retrieve the newly created character info by ID", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).get(`/provider/${CharacterId}`);
            expect(response.status).toBe(200);
            expect(response.body.characters.id).toBe(CharacterId);
            expect(response.body.characters.name).toBe("John");
            console.log(`fetched character info by id: ${CharacterId}: `, response.body);
        }));
        it("2nd user - should return 201 for valid job and name", () => __awaiter(void 0, void 0, void 0, function* () {
            let characterData = { name: "Ruwan", job: "Thief" };
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(`/provider`)
                .set("Accept", "application/json")
                .send(characterData);
            expect(response.status).toBe(201);
            expect(response.body.message).toBe("User created");
        }));
        it("3rd user - should return 422 for invalid name containing numbers and valid job", () => __awaiter(void 0, void 0, void 0, function* () {
            let characterData = { name: "Ruwan23", job: "Mage" };
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(`/provider`)
                .set("Accept", "application/json")
                .send(characterData);
            expect(response.status).toBe(422);
            expect(response.body.message).toBe("Invalid request data");
        }));
        it("4rd user - should return 422 for invalid name containing less character limit and valid job", () => __awaiter(void 0, void 0, void 0, function* () {
            let characterData = { name: "Ruw", job: "Mage" };
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(`/provider`)
                .set("Accept", "application/json")
                .send(characterData);
            expect(response.status).toBe(422);
            expect(response.body.message).toBe("Invalid request data");
        }));
        it("5rd user - should return 422 for invalid name containing over than character limit and valid job", () => __awaiter(void 0, void 0, void 0, function* () {
            let characterData = { name: "abcdefghijklmnop", job: "Mage" };
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(`/provider`)
                .set("Accept", "application/json")
                .send(characterData);
            expect(response.status).toBe(422);
            expect(response.body.message).toBe("Invalid request data");
        }));
        it("6rd user - should return 201 for valid name containing _ character and valid job", () => __awaiter(void 0, void 0, void 0, function* () {
            let characterData = { name: "Ale_xT", job: "Mage" };
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(`/provider`)
                .set("Accept", "application/json")
                .send(characterData);
            expect(response.status).toBe(201);
            expect(response.body.message).toBe("User created");
        }));
        it("7rd user - should return 422 for valid name and invalid job", () => __awaiter(void 0, void 0, void 0, function* () {
            let characterData = { name: "Reeta", job: "MageUp" };
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(`/provider`)
                .set("Accept", "application/json")
                .send(characterData);
            expect(response.status).toBe(422);
            expect(response.body.message).toBe("Invalid Job");
        }));
        it("7rd user - should return 422 for valid name and missing job", () => __awaiter(void 0, void 0, void 0, function* () {
            let characterData = { name: "Reeta", job: "" };
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(`/provider`)
                .set("Accept", "application/json")
                .send(characterData);
            expect(response.status).toBe(422);
            expect(response.body.message).toBe("Invalid request data");
        }));
        it("8rd user - should return 201 for missing name and job", () => __awaiter(void 0, void 0, void 0, function* () {
            let characterData = { name: "", job: "" };
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(`/provider`)
                .set("Accept", "application/json")
                .send(characterData);
            expect(response.status).toBe(422);
            expect(response.body.message).toBe("Invalid request data");
        }));
    });
    describe("GET list of all characters /", () => {
        it("should return 200 with full array", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).get(`/provider`);
            expect(response.status).toBe(200);
            console.log("Character List Rseponse body: ", response.body);
        }));
    });
    describe("Start Battle with 2 Characters", () => {
        let battleCharacter1Id;
        let battleCharacter2Id;
        it("Create Valid Battle Player X", () => __awaiter(void 0, void 0, void 0, function* () {
            let characterData = { name: "CharacterX", job: "Warrior" };
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(`/provider`)
                .set("Accept", "application/json")
                .send(characterData);
            console.log("Battle Player X Rseponse body: ", response.body);
            expect(response.status).toBe(201);
            expect(response.body.message).toBe("User created");
            battleCharacter1Id = response.body.newCharacter.id;
        }));
        it("Create Valid Battle Player Y", () => __awaiter(void 0, void 0, void 0, function* () {
            let characterData = { name: "CharacterY", job: "Thief" };
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(`/provider`)
                .set("Accept", "application/json")
                .send(characterData);
            console.log("Battle Player Y Rseponse body: ", response.body);
            expect(response.status).toBe(201);
            expect(response.body.message).toBe("User created");
            battleCharacter2Id = response.body.newCharacter.id;
        }));
        it("Start Battle with 2 CharacterX and CharacterY", () => __awaiter(void 0, void 0, void 0, function* () {
            let characterData = { character1: battleCharacter1Id, character2: battleCharacter2Id };
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(`/battle`)
                .set("Accept", "application/json")
                .send(characterData);
            console.log("Game Rseponse Response Body: ", response.body);
            expect(response.status).toBe(200);
        }));
        it("Start Battle with 2 Invalid CharacterX and CharacterY UUIDs", () => __awaiter(void 0, void 0, void 0, function* () {
            let characterData = { character1: '123e4567', character2: '123e4567' };
            const response = yield (0, supertest_1.default)(app_1.default)
                .post(`/battle`)
                .set("Accept", "application/json")
                .send(characterData);
            expect(response.status).toBe(422);
            expect(response.body.message).toBe("Invalid request data");
        }));
    });
});
