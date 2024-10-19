import { Game, Moves, Player, PrismaClient } from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();

function addPlayer(discordId : string,discordName : string,userName:string,playerName:string,game:Game,move : Moves){
    prisma.player.create({
        data:{
            discordId:discordId,
            discordName:discordName,
            playerName:playerName,
            userName:userName,
        },
        include:{
            discordId : true,
            discordName : true,
            playerName : true,
            userName :true,
        }
    });
}

function joinGame(id:number,discordId : string){

    //check if player exists already in database
   

    prisma.game.update({
        where:{
            gameId:id,
        },
        data:{
            players:{
                connect:{id:player.id}
            }
        }
    });
}

function createGame(discordId : string,gameHistory : Game){
    
    //check if player exists already in database

    prisma.game.create({
        data:{
            players:{
                connect:{id:player.id}
            },
            gameHistory:{
                create:gameHistory,
            }
        }
    })
}

function addMoves(){

}

function updateGameHistory(){

}