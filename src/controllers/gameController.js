

import gamesServices from "../services/gamesServices.js";
import userServices from "../services/userServices.js";
//import gamesServices from "../services/gamesServices";

var tabla = [
  ['GOL', 'GOL', 'GOL'],
  ['GOL', 'GOL', 'GOL'],
  ['GOL', 'GOL', 'GOL']
];
  
const getGames=async(req,res,next) => {
    try {
        res.json(await gamesServices.getAll());
    }catch (err){
        console.error('Error while getting games');
        next(err);
    }
};



const getGame = async (req, res, next) => {
    try {
      if (!req?.params?.id) {
        throw { message: "No parameter provided" };
      }
  
      const response = await gamesServices.getGame(parseInt(req.params.id));
  
      if (!response) {
        throw { message: "No Game found" };
      }
  
      res.json(response);
    } catch (err) {
      console.error(`Error while getting user`);
      next(err);
    }
  };

  const addGame = async (req, res, next) => {
    try {
     
    
     

      const response = await gamesServices.addGame({
        TheStatus: "pending",
        NumberOfPlayers:0
      });

  
  
      res.json(response);
    } catch (err) {
      console.error(`Error while adding game`);
      next(err);
    }
  };


  const updateGame = async (req, res, next) => {
    try {
      if (!req?.params?.id) {
        throw { message: "No parameter provided" };
      }
  
      const id = parseInt(req.params.id);
      const game = await gamesServices.getGame(id);
      const user=await userServices.getUser(parseInt(req.body.firstPlayerId));
     
      const user2=await userServices.getUser(parseInt(req.body.secondPlayerId));
  
      if (!game) {
        throw { message: "Game not found" };
      }

      if((game.NumberOfPlayers==0 && user) || (game.NumberOfPlayers==0 && user2)){
      

      
      const response = await gamesServices.updateGame(id, {
        TheStatus:"Pending",
        NumberOfPlayers:1,
        firstPlayerId:req.body.firstPlayerId || game.firstPlayerId,
        secondPlayerId:req.body.secondPlayerId || game.secondPlayerId,
    
      });
      res.json(response);
    }

    else if( (game.NumberOfPlayers==1 && user)  || (game.NumberOfPlayers==1 && user2)){
  
        const response = await gamesServices.updateGame(id, {
          TheStatus:"Active",
          NumberOfPlayers:2,
          firstPlayerId:req.body.firstPlayerId || game.firstPlayerId,
        secondPlayerId:req.body.secondPlayerId || game.secondPlayerId,
        

       
        });
        res.json(response);
      }

      else if(game.NumberOfPlayers>=2){
        throw { message: "Room is full" };
        res.json(response);
      }

      else {
        throw { message: "This game don't exist" };
        res.json(response);

      }






  
     
    } catch (err) {
      console.error(`Error while updating game`);
      next(err);
    }
  };

  var k=1,ture=0;
  const MoveGame = async (req, res, next) => {
    try {
      if (!req?.params?.id) {
        throw { message: "No parameter provided" };
      }

      ture++;
      if(ture==9){
        //verificaCastigator(); de implementat
      }
      k++;
      const id = parseInt(req.params.id);
      const game = await gamesServices.getGame(id);
      var firstPlayerTurn=false;
      var secondPlayerTurn=false;
      if(k%2==0){
        firstPlayerTurn=true; secondPlayerTurn=false;
      }
      else {
        firstPlayerTurn=false; secondPlayerMove=true;
      }

    
      const response = await gamesServices.updateGame(id, {
        TheStatus:"Active",
        NumberOfPlayers:2,
        firstPlayerId:req.body.firstPlayerId || game.firstPlayerId,
      secondPlayerId:req.body.secondPlayerId || game.secondPlayerId,
      

     
      });
      



 
     
      if(firstPlayerTurn==true && secondPlayerTurn==false){

      tabla[Math.round(parseInt(req.body.firstPlayerMove)/10)][Math.round(parseInt(req.body.firstPlayerMove)%10)]='x';
      }
      
      
      if(firstPlayerTurn==false && secondPlayerTurn==true){
      tabla[Math.round(parseInt(req.body.secondPlayerMove)/10)][Math.round(parseInt(req.body.secondPlayerMove)%10)]='0';
      }
      res.json(tabla);


      

      
    

      //res.json(response);

  
      if (!game) {
        throw { message: "Game not found" };
      }

    

     
      //res.json(tabla);
  

    




    
     
    } catch (err) {
      console.error(`Error while updating game`);
      next(err);
    }
  };





  

export default { getGames, getGame, addGame, updateGame, MoveGame};