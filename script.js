const game = () => {
    let pScore = 0;

    let cScore = 0;

    matchresults = []

    //Inicializo fetch que funciona como "historial" de scoreboard.
    const scoreboard = document.getElementById("scoreboard") 

    fetch('./json/scoreboard.json')
    .then(response => response.json())
    .then(score => {
        score.forEach((score, indice) =>{
            scoreboard.innerHTML += `
                 <tr id="score${indice +1}">
                    <th scope="row">${indice +1}</th>
                    <td>${score.usuario}</td>
                    <td>${score.score}</td>
                </tr>
            `     
        })
    })

    const startGame = () => {
        const startbutton = document.querySelector(".intro button");
        const introScreen = document.querySelector(".intro");
        const match = document.querySelector(".match");
        const inputbtn = document.querySelectorAll(".inputbutton img")

        //Borro el valor para que la animación pueda correr múltiples veces
        inputbtn.forEach(inputbtn => {
            inputbtn.addEventListener("animationend", function() {
              this.style.animation = "";
            });
          });

        startbutton.addEventListener("click", () => {
            introScreen.classList.add("fadeOut");
            match.classList.add("fadeIn");
        });
    };

    //Empiezo el juego
    const playMatch = () => {
        const inputs = document.querySelectorAll(".inputs button");
        const playerinput = document.querySelector(".player-input");
        const cpuinput = document.querySelector(".cpu-input");

        // Opciones de la computadora
        const cpuopt = ["lp", "mp", "hp", "block"];
        inputs.forEach(input => {
            input.addEventListener("click", function(){
                const cpuvalue = Math.floor(Math.random() * 4);
                const cpuchoice = cpuopt[cpuvalue];

                //
                setTimeout(()=>{
                    //Comparo resultados
                    compareinputs(this.textContent, cpuchoice);
                    //Actualiza la imagen
                    playerinput.src = `./assets/${this.textContent}.png`;
                    cpuinput.src = `./assets/${cpuchoice}.png`;
            },1500);
            //Duracion de animación
            playerinput.style.animation = "shakePlayer 1.5s ease";
            cpuinput.style.animation = "shakeCpu 1.5s ease";
            });
         });
    };

    const updatescore = () => {
        const playerScore = document.querySelector(".playerscore p");
        const cpuScore = document.querySelector(".cpuscore p");
        playerScore.textContent = pScore;
        cpuScore.textContent = cScore;

        //Inicializo el local storage
        localStorage.setItem("resultados", JSON.stringify(matchresults));
        console.log(JSON.parse(localStorage.getItem("resultados")));

        //inicio el boton que me permite reinciar la partida
        const restart = document.querySelector('.restartbutton');
        restart.addEventListener("click", () => {
            localStorage.clear();
            location.reload();
        })
        //Sweetalert2 utilizado para reiniciar el juego o no
        if(pScore === 5){
            Swal.fire({
                title:"You Won!",
                text:"¿Jugar de nuevo?",
                showCancelButton: true,
                confirmButtonText:'Si',
                cancelButtonText:'No',
            }).then(function(jugardn){ 
                if(jugardn.isConfirmed){
                    localStorage.clear();
                    location.reload();
                }else{
                    //agrego un fade in en caso de que se diga que no
                    restart.classList.add("fadeIn"); 
                }
            });
        }else if (cScore === 5){
            Swal.fire({
                title:"Computer Won!",
                text:"¿Jugar de nuevo?",
                showCancelButton: true,
                confirmButtonText:'Si',
                cancelButtonText:'No',
            }).then(function(jugardn){ 
                if(jugardn.isConfirmed){
                    localStorage.clear();
                    location.reload();
                }else{
                    //agrego un fade in en caso de que se diga que no
                    restart.classList.add("fadeIn");
                }
            });
        }
    }   
    const compareinputs = (playerchoice, cpuchoice) =>{
        const winner = document.querySelector('.winner');

    // checkeando los resultados
        if(playerchoice === cpuchoice){
            winner.textContent = "Draw";
            matchresults.push("Draw")
            return;
        }
        if(playerchoice === "hp"){
            if(cpuchoice === "lp" || cpuchoice === "mp"){
                winner.textContent = "Cpu Win";
                cScore ++;
                updatescore();
                matchresults.push("Cpu Win")
                return;
            }else {
                winner.textContent = "Player Win";
                pScore ++;
                updatescore();
                matchresults.push("Player Win");
                return;
            }
        }
        if(playerchoice === "mp"){
            if(cpuchoice === "lp" || cpuchoice === "block"){
                winner.textContent = "Cpu Win";
                cScore ++;
                updatescore();
                matchresults.push("Cpu Win")
                return;
            }else {
                winner.textContent = "Player Win";
                pScore ++;
                updatescore();
                matchresults.push("Player Win");
                return;
            }
        }
        if(playerchoice === "lp"){
            if(cpuchoice === "mp" || cpuchoice === "hp"){
                winner.textContent = "Player Win";
                pScore ++;
                updatescore();
                matchresults.push("Player Win");
                return;
            }else {
                winner.textContent = "Cpu Win";
                cScore ++;
                updatescore();
                matchresults.push("Cpu Win")
                return;
            }
        };
        if(playerchoice === "block"){
            if(cpuchoice === "hp"){
                winner.textContent = "Cpu Win";
                cScore ++;
                updatescore();
                matchresults.push("Cpu Win")
                return;
            }else{
                winner.textContent = "Player Win";
                pScore ++;
                updatescore();
                matchresults.push("Player Win");
                return;
            }
        }
    };

    startGame();
    playMatch();
};

game();
