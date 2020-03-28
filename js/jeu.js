const datas = {
  petit : [
    "rooh...Allé c'est encore plus petit ",
    "Non c'est encore plus petit, mais dis moit'es pas très doué non 🤔? ",
    "Mais Non ! le chiffre est plus petit !!",
    "NON c'est encore plus petit ! il vaudrai mieux arrêter dès maitenant non ?😂😭... ",
  ],
  grand : [
  "Le chiffre est encore plus Grand ! Allé du nerf tu peux le faire 😉 ",
  "NON NON ET NON C'est plus GRAND 🤬 ",
  "....Le chiffre est plus grand, j'ai envie de te frapper",
  "C'est encore plus grand mais apres tant d'echec je voudrai que tu quitte mon site 🙄",
  ]
}


const app = {
  init : function(){
    app.boxGame = document.getElementById('boxgame');
    app.messageDiv = document.getElementById('message-div');
    app.game = document.getElementById('game');
    app.replay = document.getElementById('replay');
    app.submitBox = document.getElementById('submit-number-box');
    app.nbrVie = document.getElementById('nbr-vie');
    app.tries = 1;
    app.remainingTry = 0;
    app.creatInterface();
   },

  testNumbr: function(number, nbrTry) {
    app.remainingTry = nbrTry;

    var randomSmallerText = datas.petit[Math.floor(Math.random()*datas.petit.length)];
    var randomHigherText = datas.grand[Math.floor(Math.random()*datas.grand.length)]

    if(isNaN(app.playerTries.value) || !app.playerTries.value || app.playerTries.value == 0)  {
      app.message.className = 'error-message';
      app.message.textContent = `Nombre d'essais invalide.`;

    }else if(isNaN(number)) {
      app.message.className = 'error-message';
      app.message.textContent = 'Entre un nombre connard !!'; 
    }else if (number == ''){
      app.message.className = 'error-message';
      app.message.textContent = 'La case est vide connard !! 🤔'; 
    }else {
      if(number > app.nbrAlea && app.tries < nbrTry ) {
        app.tries += 1;
        app.remainingTry -=1;
        app.nbrVie.textContent = `Vous avez ${app.remainingTry} ❤️`
        app.message.className = 'lower-text';
        app.message.textContent = '';
        app.message.textContent = randomSmallerText;
        app.playerNumber.value = '';
        console.log(app.tries);
      } else if(number < app.nbrAlea && app.tries < nbrTry ) {
        app.tries += 1;
        app.remainingTry -=1;
        app.nbrVie.textContent = `Vous avez ${app.remainingTry} ❤️`
        app.message.className = 'higher-text';
        app.message.textContent = '';
        app.message.textContent = randomHigherText;
        app.playerNumber.value = '';
        console.log(app.tries);
      } else if(number != app.nbrAlea && app.tries == nbrTry) {
        app.game.className ='end-game';
        app.messageDiv.className = 'lose';
        app.replay.className = 'replay-ok';
        app.message.classList.remove('lower-text', 'higher-text', 'error-message')
        app.message.textContent ='Miskine tu es trop nul(le) 😂😭 tu as épuisé(e) toute tes chances le chiffre etait ' + app.nbrAlea + ' barre toi mtn 😒';
      } else {
        app.game.className ='end-game';
        app.messageDiv.className = 'win';
        app.replay.className = 'replay-ok';
        app.message.classList.remove('lower-text', 'higher-text', 'error-message')
        app.message.textContent ='Bravo le nombre etait bien ' + app.nbrAlea +' ! 😎';     
      }
    }
    
  },


  creatInterface: function (){

    app.playerMin = document.getElementById('player-min');
    app.playerMin.value = 0 ;
    app.playerMin.maxLength = 3;

    app.playerMax = document.getElementById('player-max');
    app.playerMax.value = 0 ;
    app.playerMax.maxLength = 3;

    app.playerNumber = document.getElementById('player-number');
    app.playerNumber.value = '';
    app.playerNumber.maxLength = 3;

    app.nbrAlea = app.creatRandomNbr(app.playerMax.value, app.playerMin.value);
    console.log(app.nbrAlea);
    app.submitBox.className = 'submit-none';
    
    const submitMinMax = document.getElementById('button-minmax');
    submitMinMax.addEventListener('click', function() {
      if(app.playerMin.value > app.playerMax.value){
        app.message.className = 'error-message';
        app.submitBox.className = 'submit-none';
        app.message.textContent = `Ta valeur minimum est superieur à ta valeur Max à part ca tout va bien😐.`;
      }else if( app.playerMin.value < app.playerMax.value && app.playerMin.value == 0){
        app.message.className = 'error-message';
        app.submitBox.className = 'submit-none';
        app.message.textContent = `Valeur Min invalide`;
      }else if( 
              app.playerMin.value == 0 && app.playerMax.value ==0 || 
              app.playerMin.value < 0 && app.playerMax.value < 0 ||
              app.playerMin.value < 0 && app.playerMax.value > 0 ||
              app.playerMin.value == app.playerMax.value 
              ){

        app.message.className = 'error-message';
        app.submitBox.className = 'submit-none';
        app.message.textContent = `Veuillez entrer une valeur Min et Max valide`;
      }else{
        app.message.textContent = ``;
        app.submitBox.classList.remove('submit-none')
        app.message.classList.remove('error-message')
        app.nbrAlea = app.creatRandomNbr(app.playerMax.value, app.playerMin.value);
        console.log(app.nbrAlea);
        submitMinMax.className = 'submit-none';
        app.playerMax.readOnly = true;
        app.playerMin.readOnly =true;
      }
    })

    
    app.playerTries = document.getElementById('player-tries');
    app.playerTries.value = 5;
    app.playerTries.maxLength = 1;


    app.playerTries.addEventListener('change', function() {
      if(isNaN(app.playerTries.value) || !app.playerTries.value || app.playerTries.value == 0)  {
        app.message.className = 'error-message';
        app.message.textContent = `Nombre d'essais invalide.`;
      } else {
        app.playerTries.value = app.playerTries.value;
        app.message.textContent = ``;
        app.message.classList.remove('error-message')
        app.playerTries.readOnly = true;
      }
      console.log(app.playerTries.value);
    });

    var consigne = document.getElementById('consigne');
    consigne.textContent = 'Pour deviner le chiffre exacte veuillez entrer une valeur comprise entre 1 et 10 ';

    app.submit = document.getElementById('submit-number');
    app.submit.addEventListener('click', function() {
      app.testNumbr(app.playerNumber.value, app.playerTries.value)
    })
    replay.addEventListener('click', function() {
      document.location.reload(true)
    })
    app.message = document.getElementsByClassName('message-text')[0];
    app.message.textContent = '';
  },

  creatRandomNbr : function(max, min){
    var parsedMin = parseInt(min);
    var parsedMax = parseInt(max);
    return Math.floor(Math.random()* (parsedMax - parsedMin +1))+ parsedMin;
  },
  
}

document.addEventListener('DOMContentLoaded', app.init);