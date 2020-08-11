const express = require('express');
const app = express();
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

app.get("/api/stackoverflow/:user_id",function(req,res,){

    var userId = req.params.user_id;

    $.getJSON("https://api.stackexchange.com/2.2/users/" + userId + "?order=desc&sort=reputation&site=stackoverflow", function( userData ){
        
    if( userData.items[0] === undefined) res.send("You wrote the wrong user ID. Please try again")

    else {

        userReputation = userData.items[0].reputation;

        if (userReputation > 9999) res.json({"mark": "A"})

        else if (userReputation >= 8000 && userReputation<= 9999) res.json({"mark": "B"})

        else if (userReputation >= 5000 && userReputation <= 7999) res.json({"mark": "C"})


        else if (userReputation >= 2000 && userReputation <= 4999) res.json({"mark": "D"})

        else res.json({"mark": "E"})
    }

    })


})

app.listen(3000, function(){
    console.log("Server is running on port 3000!")
})