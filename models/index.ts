import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function addPlayer(discordId : string,discordName : string,){
    prisma.player.create({
        data:{

        },
        select:{

        }
    })
}

function createGame(){

}

function addMoves(){

}

function updateGameHistory(){

}

