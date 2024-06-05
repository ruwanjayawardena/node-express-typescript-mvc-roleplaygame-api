## Function Description

I have done validations inside utils/validations and used MVC pattern. and did Jest Mocha test for all functions to run that "npm test". and did initial security lib intergration to secure api generally. I used node, express, typescript for this project. and did npm audit and synk audit test for this. data will store in memory
characters.models.ts will include all character functions.
and battles.models.ts will include all battle functions.
expantion purposes I devide charater and job into 2 models. and battle too.


#### F1 - Caracter Creation

A job is a character class, dictating some specialities in battle. New characters have initial
stats based on their selected job. These stats can grow during the game, however you
are not expected to handle this in this assignment. Possible jobs will be shown to the
player so they can make an informed choice.
Information needed to create a new character is name and job .
name must contain letters or _ (underscore) characters and have a length between 4
and 15 characters inclusive. job must be one of Warrior Thief or Mage .

#### F2 - Caracter List

Allow the player to see all characters by name and
job, and if they are alive or dead.

#### F3 - Caracter Details By ID

Allow the player to see details about a specific
character.

#### F4 - Battle Function

A battle is a series of rounds, with each round having 1 or 2 turns. Characters use their
turn to attack the other. At the end of the battle, a battle log is printed along with the
winner and loser. Here's how the battle works:
A round begins by determining which character goes first. To do this, generate a random
integer between zero and each character's calculated speed modifier. The character with
the highest speed value will take the first turn in the round. Repeat this process in the
case of a draw. The battle log should only show the result that was not a draw.
A turn is comprised of one character attacking the other. To deal damage, generate a
random integer between zero and the attacker's calculated attack modifier. Subtract the
damage from the defender's HP stat. If the defender's health points reach 0, they are
dead and the battle is over (health points cannot fall below 0). Otherwise, the defending
character takes their turn.
The defeated character will appear dead in F2 and F3. The victorious character keeps
their remaining HP after the battle.

### API end points

Now that we’ve learned about the anatomy of our endpoints and the different request methods that we should use, it’s time for some examples:

| Method   | Endpoint                                      | Description                              | 
| -------- | ---------------------------------------- | ---------------------------------------- | 
| `GET`    | `/provider`                             | Retrieve all characters.                      | |
| `GET`   | `/provider/:id`                             | Retrieve characters details by id.  | id should be a uuid v4 as a path parameter                     |
| `POST`    | `/provider`                          | Create new character.                       | need to pass name, job as json object
| `POST`  | `/battle`                          | Play battle                 | to play batter need to pass character1, character2 uuid v4 variables as a json object




## Environment Variables

To run this project, you will need to update the following environment variables to your .env file

`PORT`


## Deployment

To deploy this project run on server

```bash
  npm run dev
```




## Installation

Install rpg-api-ts with npm

```bash
  npm install rpg-api-ts
  cd rpg-api-ts
```
    
## Running Tests

To run tests, run the following command

```bash
  npm test
```

## Tech Stack

**Server:** Node, Express, Typescript


## 🚀 About Me
I'm Ruwan, full stack developer......😊👋






