/**
 * Created by james on 1/29/16.
 */
cogss.controller("MeetCtrl", ["$scope", "$http", function ($scope, $http) {
    "use strict";

    var meet = this;

    meet.creator = "James";
    meet.users = [
        {name:"Admin", email:"admin@cogss.com"},
        {name:"James", email:"greenjam94@gmail.com"},
        {name:"John Doe", email:"john.doe@fake.email"},
        {name:"Deadpool", email:"ryan.reynolds@dead.pool"}
    ];
    meet.info = {name:"Michigan Madness", host:"EMU", loco:"Ypsi, MI", date:"March"};

    meet.womenTeams = [
        {rank:"1", name:"Eagles Women A", score:"9.8"},
        {rank:"2", name:"Spartans Women A", score:"9.3"},
        {rank:"3", name:"Eagles Women B", score:"8.7"}
    ];

    meet.menTeams = [
        {rank:"1", name:"Spartans Men A", score:"49.8"},
        {rank:"2", name:"Spartans Men B", score:"41.11"},
        {rank:"3", name:"Eagles Men A", score:"36.77"}
    ];

    meet.eaglesA = [
        {rank:"1", name:"Rachel White", aa:9.9, v:9.7, b:9.9, ub:10, f:10 },
        {rank:"2", name:"Jane Doe", aa:8.7, v:9, b:9.9, ub:8, f:8.6 },
        {rank:"3", name:"Sally CeShore", aa:8.6, v:7.7, b:7.9, ub:8.5, f:9 },
        {rank:"4", name:"Randy Reynolds", aa:7.9, v:7.7, b:8.9, ub:9, f:7 },
        {rank:"5", name:"Deadpool", aa:10, v:10, b:10, ub:10, f:10 }
    ];

    meet.mensExample = [
        {rank:"1", name:"John Green", aa:9.9, v:9.7, f:9.9, p:10, r:10, pb:10, hb:8.9},
        {rank:"2", name:"James Smith", aa:9.9, v:9.7, f:9.9, p:10, r:10, pb:10, hb:8.9},
        {rank:"3", name:"John Deer", aa:9.9, v:9.7, f:9.9, p:10, r:10, pb:10, hb:8.9},
        {rank:"4", name:"Eric cire", aa:9.9, v:9.7, f:9.9, p:10, r:10, pb:10, hb:8.9},
        {rank:"5", name:"Deadpool", aa:10, v:10, f:10, p:10, r:10, pb:10, hb:10}
    ];

    meet.logout = function(){
        $http.post("/logout").then(function(res){
            if (res.status === 200) {
                window.location.href  = "#/";
            } else {
                console.log("Error on logout", res);
            }
        });
    };
}]);