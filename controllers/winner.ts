import {Response,Request} from "express";
import { updateWinner } from "../db/crud";

const winner = async(res:Response,req:Request)=>{
    const {player_id,game_id} = req.body;

    if(player_id){
        res.status(400).send({message:"player_id is missing!"});
        return;
    }

    if(game_id){
        res.status(400).send({message:"game_id is missng!"});
    }

    const winner = await updateWinner(player_id,game_id);

    if(!winner){
        res.status(500).send({message:"unable to update winner"});
        return;
    }

    res.status(200).send(winner);
}

export default winner;