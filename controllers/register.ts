import {Request,Response} from "express";
import { addPlayer } from "../db/crud";

const registration = async(res : Response,req : Request) =>{
    const discord_id = req.body.discord_id;
    const discord_name = req.body.discord_name;
    const user_name = req.body.user_name;
    const player_name = req.body.player_name;

    if(!discord_id){
        return res.status(500).send({message:"discord_id is missing!"});
    }


    if(!discord_name){
        return res.status(500).send({message:"discord_name is missing!"});
    }


    if(!user_name){
        return res.status(500).send({message:"user_name is missing!"});
    }

    if(!player_name){
        return res.status(500).send({message:"player_name is missing!"});
    }

    addPlayer(discord_id,discord_name,user_name,player_name);

}

