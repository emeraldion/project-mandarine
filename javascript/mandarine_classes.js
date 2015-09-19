
/**
 *        Mandarine game © 2002 Eidos Workshop
 *        @author Claudio Procida
 *        @version 2.01 (beta)
 *        @date 16.59 27/06/2002
 */


/**
 *        Constructors
 */

// public class ClassRoom

function ClassRoom()
{  this.grid = [ [ [  -5,   -5], [WALL, WALL], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5] ],
                 [ [  -5,   -5], [WALL, WALL], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5] ],
                 [ [  -5,   -5], [WALL, WALL], [DESK,   -5], [DESK,   -5], [  -5,   -5], [DESK,   -5], [DESK,   -5], [  -5,   -5], [DESK,   -5], [DESK,   -5] ],
                 [ [  -5,   -5], [WALL, WALL], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5] ],
                 [ [  -5,   -5], [WALL, WALL], [DESK,   -5], [DESK,   -5], [  -5,   -5], [DESK,   -5], [DESK,   -5], [  -5,   -5], [DESK,   -5], [DESK,   -5] ],
                 [ [  -5,   -5], [WALL, WALL], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5] ],
                 [ [  -5,   -5], [WALL, WALL], [DESK,   -5], [DESK,   -5], [  -5,   -5], [DESK,   -5], [DESK,   -5], [  -5,   -5], [DESK,   -5], [TARGET,   -5] ],
                 [ [  -5,   -5], [WALL, WALL], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5] ],
                 [ [  -5,   -5], [WALL, WALL], [DESK,   -5], [DESK,   -5], [  -5,   -5], [DESK,   -5], [DESK,   -5], [  -5,   -5], [DESK,   -5], [DESK,   -5] ],
                 [ [  -5,   -5], [WALL, WALL], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5] ],
                 [ [  -5,   -5], [WALL, WALL], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5] ],
                 [ [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [T_DESK,   -5], [T_DESK,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5] ],
                 [ [  -5,   -5], [WALL, WALL], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5], [  -5,   -5] ] ];
   this.ids = new Array();

   // metodi pubblici

   this.isFree = function(x, y)
   {  return (x >= 0  && y >= 0 && x < CLASSROOM_WIDTH && y < CLASSROOM_HEIGHT && this.grid[x][y][0] == FREE_SPACE);
   };

   this.takePlace = function(x, y, standing_status, ID)
   {  if (!this.ids[ID])
      this.ids[ID] = { x : x, y : y };
      else
      {  this.ids[ID].x = x;
         this.ids[ID].y = y;
      }
      this.grid[x][y][0] = ID;
      this.grid[x][y][1] = (standing_status == STANDING) ? ID : FREE_SPACE;
      document.getElementById('map'+ (CLASSROOM_WIDTH * x + y)).style.backgroundColor = colors[ID % colors.length];
   };

   this.leavePlace = function(x, y, standing_status, ID)
   {  if (this.grid[x][y][0] == ID)
      {  this.grid[x][y][0] = this.grid[x][y][1] = FREE_SPACE;
         document.getElementById('map'+ (CLASSROOM_WIDTH * x + y)).style.backgroundColor='transparent';
      }
   };

   this.isThereClaudio = function(x, y)
   {  var xPos, yPos, zPos;
      for (var i = 0; i < VISUAL_SPACE.length; i++)
      {  xPos = x + VISUAL_SPACE[i][0], yPos = y + VISUAL_SPACE[i][1], zPos = VISUAL_SPACE[i][2];
         if (xPos >= 0  && yPos >= 0 && xPos < CLASSROOM_WIDTH && yPos < CLASSROOM_HEIGHT && this.grid[xPos][yPos][zPos] == CLA_ID && claudio.isInsideClassRoom())
         {  // defaultStatus = 'Detected Claudio at x = ' + xPos + ', y = ' + yPos + ', z = ' + zPos + ', vector = ' + VISUAL_SPACE[i];
            return true;
         }
      }
      return false;
   };

   this.isGoal = function(x, y)
   {  return (x >= 0  && y >= 0 && x < CLASSROOM_WIDTH && y < CLASSROOM_HEIGHT && (this.grid[x][y][0] == TARGET || this.grid[x][y][0] == DO_ID));
   };

   // inizializza la classe

   {  // codice per visualizzare la classe

      // pavimento

      var floor = document.createElement('DIV');
      with (floor.style)
      {  position = 'absolute';
         width = px(800);
         height = px(Y_SCALE * CLASSROOM_INNER_HEIGHT);
         left = px(X_ORIGIN);
         top = px(270 + FIELD_Y);
         backgroundColor = 'lightGrey';
         //zIndex = -100;
      }
      document.getElementById('field').appendChild(floor);

      floor = document.createElement('DIV');
      with (floor.style)
      {  position = 'absolute';
         width = px(800);
         height = px(Y_SCALE * 2 * (CLASSROOM_HEIGHT - CLASSROOM_INNER_HEIGHT));
         left = px(X_ORIGIN);
         top = px(270 + FIELD_Y + Y_SCALE * CLASSROOM_INNER_HEIGHT);
         backgroundColor = '#C6C6C6';
         //zIndex = -100;
      }
      document.getElementById('field').appendChild(floor);


      // parete esterna (con le finestre)

      var img = document.createElement('IMG');
      img.src = OUTER_WALL;
      with (img.style)
      {  position = 'absolute';
         left = px(X_ORIGIN);
         top = px(FIELD_Y);
         width = px(800);
         height = px(270);
         //zIndex = -100;
      }
      document.getElementById('field').appendChild(img);

      // banchi
      
      for (var i = 0; i < CLASSROOM_WIDTH; i++)
         for (var j = 0; j < CLASSROOM_HEIGHT; j++)
         {  switch (this.grid[i][j][0])
            {  case DESK:
               case TARGET: 
               {  img = document.createElement('IMG');
                  img.src = eval('DESK_' + Math.floor(2 * Math.random()));
                  with (img.style)
                  {  position = 'absolute';
                     left = px(i * X_SCALE + X_ORIGIN);
                     top = px(- j * Y_SCALE + Y_ORIGIN);
                     zIndex = CLASSROOM_WIDTH - j;
                  }
                  document.getElementById('field').appendChild(img);
               }
            }
         }

      // cattedra

      img = document.createElement('IMG');
      img.src = T_DESK;
      with (img.style)
      {  position = 'absolute';
         left = px(11 * X_SCALE + X_ORIGIN);
         top = px(- 5 * Y_SCALE + Y_ORIGIN);
         zIndex = CLASSROOM_WIDTH - 5;
      }
      document.getElementById('field').appendChild(img);

      // parete interna (sul corridoio)

      img = document.createElement('IMG');
      img.src = DOOR_BASE;
      with (img.style)
      {  position = 'absolute';
         left = px(X_ORIGIN + 740);
         top = px(FIELD_Y + Y_SCALE * CLASSROOM_INNER_HEIGHT + 270 - 25 - 7);
         width = px(60);
         height = px(7);
         zIndex = CLASSROOM_WIDTH - 1;
      }
      document.getElementById('field').appendChild(img);

      img = document.createElement('IMG');
      img.src = INNER_WALL_BASE;
      with (img.style)
      {  position = 'absolute';
         left = px(X_ORIGIN);
         top = px(FIELD_Y + Y_SCALE * CLASSROOM_INNER_HEIGHT + 270 - 25);
         width = px(800);
         height = px(25);
         zIndex = CLASSROOM_WIDTH - 1;
      }
      document.getElementById('field').appendChild(img);

      wall = document.createElement('DIV');
      with (wall.style)
      {  position = 'absolute';
         left = px(X_ORIGIN);
         top = px(FIELD_Y + Y_SCALE * CLASSROOM_INNER_HEIGHT);
         width = px(800);
         height = px(270);
         zIndex = CLASSROOM_WIDTH - 1;
      }
      document.getElementById('field').appendChild(wall);

      // finestre (fichissimo!)

      glass = document.createElement('IMG');
      glass.src = GLASS;
      with (glass.style)
      {  position = 'absolute';
         left = px(125);
         top = px(74);
         width = px(62);
         height = px(118);
         filter = 'alpha(opacity=70)';
         opacity = 0.7;
         zIndex = CLASSROOM_WIDTH - 1;
      }
      wall.appendChild(glass);

      glass = document.createElement('IMG');
      glass.src = GLASS;
      with (glass.style)
      {  position = 'absolute';
         left = px(198);
         top = px(74);
         width = px(62);
         height = px(118);
         filter = 'alpha(opacity=70)';
         opacity = 0.7;
         zIndex = CLASSROOM_WIDTH - 1;
      }
      wall.appendChild(glass);

      glass = document.createElement('IMG');
      glass.src = GLASS;
      with (glass.style)
      {  position = 'absolute';
         left = px(601);
         top = px(74);
         width = px(62);
         height = px(118);
         filter = 'alpha(opacity=70)';
         opacity = 0.7;
         zIndex = CLASSROOM_WIDTH - 1;
      }
      wall.appendChild(glass);

      img = document.createElement('IMG');
      img.src = INNER_WALL;
      with (img.style)
      {  position = 'absolute';
         left = px(0);
         top = px(0);
         width = px(800);
         height = px(270);
         zIndex = CLASSROOM_WIDTH - 1;
      }
      wall.appendChild(img);

      // e infine la mappa visuale e i comandi del gioco

      var mapHTML = '<TABLE CELLSPACING=2 CELLPADDING=0 BORDER=0>\n';
      for (var j = CLASSROOM_HEIGHT; j >= -1; j--)
      {  mapHTML += '<TR>\n';
         for (var i = -1; i <= CLASSROOM_WIDTH; i++)
            mapHTML += '<TD ID="map' + (CLASSROOM_WIDTH*i + j) + '" WIDTH=5 HEIGHT=5' +
               ((i >= 0 && j >= 0 && i < CLASSROOM_WIDTH && j < CLASSROOM_HEIGHT && this.grid[i][j][0] == TARGET) ? ' STYLE="background:transparent url(images/target.gif) no-repeat center center"' : '') + '></TD>\n';
      }
      mapHTML += '</TABLE>\n';
      map = document.createElement('DIV');
      with (map.style)
      {  position = 'absolute';
         backgroundImage = 'url(' + MAP + ')';
         backgroundRepeat = 'no-repeat';
         backgroundPosition = '1px 1px';
         left = px(675);
         top = px(FIELD_Y + 20);
         width = px(7 * (CLASSROOM_WIDTH + 3));
         height = px(7 * (CLASSROOM_HEIGHT + 2));
         zIndex = 100;
      }
      map.innerHTML=mapHTML;
      document.getElementById('field').appendChild(map);

      label = document.createElement('DIV');
      with (label.style)
      {  position = 'absolute';
         left = px(675);
         top = px(FIELD_Y);
         zIndex = 100;
      }
      label.className = 'label';
      label.innerHTML = 'Mappa';
      document.getElementById('field').appendChild(label);

      cammei = new Array(CAMMEI);
      for (var i = 0; i < CAMMEI; i++)
      {   img = document.createElement('IMG');
          img.src = CAMMEO;
          with (img.style)
          {  position = 'absolute';
             left = px(20 + 35 * i);
             top = px(FIELD_Y + 25);
             zIndex = 100;
          }
          document.getElementById('field').appendChild(img);
          cammei[i] = img;
       }

      label = document.createElement('DIV');
      with (label.style)
      {  position = 'absolute';
         left = px(20);
         top = px(FIELD_Y);
         zIndex = 100;
      }
      label.className = 'label';
      label.innerHTML = 'Cammei';
      document.getElementById('field').appendChild(label);

      timer = document.createElement('DIV');
      with (timer.style)
      {  position = 'absolute';
         left = px(20);
         top = px(FIELD_Y + 80);
         zIndex = 100;
      }
      timer.className = 'timer';
      timer.innerHTML = '5:00';
      document.getElementById('field').appendChild(timer);

      label = document.createElement('DIV');
      with (label.style)
      {  position = 'absolute';
         left = px(20);
         top = px(FIELD_Y + 60);
         zIndex = 100;
      }
      label.className = 'label';
      label.innerHTML = 'Tempo';
      document.getElementById('field').appendChild(label);

      message = document.createElement('DIV');
      with (message.style)
      {  position = 'absolute';
         left = px(0);
         top = px(250);
         width = px(796);
         height = px(100);
         zIndex = 100;
      }
      message.className = 'message';
      document.getElementById('field').appendChild(message);

   }

   // defaultStatus = 'ClassRoom: constructor OK';

   return this;

}


// public class Claudio

function Claudio()
{  this.x = START_X;
   this.y = START_Y;
   this.ID = CLA_ID;
   this.direction = DOWN; //mostra lo sguardo al giocatore!
   this.sprite = null;
   this.ready = false;
   this.move_handles = new Array(MOVING_STEPS);
   this.cammei = CAMMEI;
   this.insideClassRoom = false;

   // metodi pubblici
   
   this.move = function(new_direction)
   {  // cerca di muovere un passo nella direzione corrente

      if (!this.ready) return;

      this.direction = new_direction;
      var stepY = 0, stepX = 0;
      switch (new_direction)
      {  case UP: stepY = 1; break;
         case RIGHT: stepX = 1; break;
         case DOWN: stepY = -1; break;
         case LEFT: stepX = -1;
      }
      if (classRoom.isFree(this.x+stepX, this.y+stepY))
      {  // ok, può muovere un passo
         classRoom.leavePlace(this.x, this.y, STANDING, this.ID);
         this.x += stepX;
         this.y += stepY;
         classRoom.takePlace(this.x, this.y, STANDING, this.ID);

 // codice per il movimento

 /**
  *        Sposta lo sprite gradualmente, interrompendo la risposta ai comandi dell'utente.
  *
  */

         this.ready = false;
         for (var i = 0; i < MOVING_STEPS; i++)
            this.move_handles[i] = setTimeout("claudio.displayMovement(" + i + ");", RESPONSE_TIME * i);

         // la parete prodigiosamente scompare

         if (this.y == 2 && stepY == 1)
         {  this.insideClassRoom = true;
            wall.style.visibility = 'hidden';
         }
         else if (this.y == 1 && stepY == -1)
         {  this.insideClassRoom = false;
            wall.style.visibility = 'visible';
         }
      }
      else
         // ops, c'è un ostacolo ;)
         this.stumble();
   };

   this.displayMovement = function(phase)
   {  var stepY = 0, stepX = 0;
      switch (this.direction)
      {  case UP: stepY = 1; break;
         case RIGHT: stepX = 1; break;
         case DOWN: stepY = -1; break;
         case LEFT: stepX = -1;
      }
      var scale = (stepX) ? X_SCALE : Y_SCALE, step = (stepX) ? X_STEP : Y_STEP;
      with (this.sprite.style)
      {  left = px(parseInt(left) + stepX * step);
         top = px(parseInt(top) - stepY * step); // se vado verso l'alto y cresce, ma la posizione nello schermo decresce!
         zIndex = CLASSROOM_WIDTH - this.y;
      }
      this.sprite.src = eval('CLA_' + moveStr[this.direction] + '_' + phase);
      if (phase == MOVING_STEPS - 1)
      {  this.ready = true;
         for (var i = 0; i < MOVING_STEPS; i++)
            this.move_handles[i] = null;
      }
   };

   this.block = function()
   {  this.ready = false;
      for (var i = 0; i < MOVING_STEPS; i++)
         if (this.move_handles[i])
            clearTimeout(this.move_handles[i]);
   };

   this.home = function()
   {  // torna all'inizio
      classRoom.leavePlace(this.x, this.y, STANDING, this.ID);
      this.x = START_X;
      this.y = START_Y;
      this.direction = DOWN;
      this.ready = true;
      this.insideClassRoom = false;
      wall.style.visibility = 'visible';
      classRoom.takePlace(this.x, this.y, STANDING, this.ID);
      with (this.sprite.style)
      {  position = 'absolute';
         left = px(this.x * X_SCALE + X_ORIGIN);
         top = px(- this.y * Y_SCALE + Y_ORIGIN);
         zIndex = CLASSROOM_WIDTH - this.y;
      }
      this.sprite.src = eval('CLA_DOWN_0');

   };

   this.isInsideClassRoom = function()
   {  return this.insideClassRoom;
   };

   this.crouch = function()
   {  // si abbassa
      classRoom.takePlace(this.x, this.y, CROUCHED, this.ID);
      // codice 
      this.sprite.src = eval('CLA_' + moveStr[this.direction] + '_CROUCHED');
   };

   this.deploy = function()
   {  // consegna il Cammeo
      // codice
      if (!this.ready) return;

      var stepY = 0, stepX = 0;
      switch (this.direction)
      {  case UP: stepY = 1; break;
         case RIGHT: stepX = 1; break;
         case DOWN: stepY = -1; break;
         case LEFT: stepX = -1;
      }

      this.sprite.src = eval('CLA_' + moveStr[this.direction] + '_DEPLOYING');
      if (classRoom.isGoal(this.x + stepX, this.y + stepY))
      {  this.cammei--;
         cammei[this.cammei].style.visibility = 'hidden';
         if (this.cammei == 0)
         {  cammeoDelivered('Missione compiuta!<BR>Hai consegnato tutti i Cammei!');
            gameOver(true);
         }
         else
            cammeoDelivered('Cammeo consegnato!<BR>Hai ancora ' + this.cammei + ' Camme' + ((this.cammei == 1) ? 'o' : 'i') + ' da consegnare');
         this.ready = false;
      }
   };

   // metodi privati

   this.stumble = function()
   {  // incespica
      // codice

 /**
  *        Settare lo sprite a MOVING e dopo un certo tempo nuovamente a STILL
  */

      this.sprite.src = eval('CLA_' + moveStr[this.direction] + '_0');

   };

   {  //  inizializza l'elemento DOM
      this.sprite = document.createElement('IMG');
      document.getElementById('field').appendChild(this.sprite);
      this.sprite.src = CLA_DOWN_0;
      with (this.sprite.style)
      {  position = 'absolute';
         left = px(this.x * X_SCALE + X_ORIGIN);
         top = px(- this.y * Y_SCALE + Y_ORIGIN);
         zIndex = CLASSROOM_WIDTH - this.y;
      }
      classRoom.takePlace(this.x, this.y, STANDING, this.ID);
      this.ready = true;
   }

   // defaultStatus = 'Claudio: constructor OK';

   return this;
}


// public class ClassMate

function ClassMate()
{  do
   {  this.x = getRandomMateX();
      this.y = getRandomMateY();
   } while (!classRoom.isFree(this.x, this.y));
   this.index = classMatesLength++; // indice in classMates[]
   this.ID = 2 * this.index;
   this.direction = randomDirection();
   this.sprite = null;

   // metodi pubblici

   this.doSomething = function()
   {  var rand = Math.floor(1000 * Math.random());
      if (rand > LATENCY_THRESHOLD)
         this.move();
      this.lookup();
   }

   // metodi privati

   this.lookup = function()
   {  // ops... ho visto Claudio!

      if (classRoom.isThereClaudio(this.x, this.y))
         seenClaudio();
   };

   this.move = function()
   {  var stepY = 0, stepX = 0, attempts = 0; // questo impedisce iterazioni infinite
      do
      {  // si suppone che non sia scemo e scelga sempre una direzione libera
         this.direction = randomDirection();
         stepY = 0, stepX = 0;
         switch (this.direction)
         {  case UP: stepY = 1; break;
            case RIGHT: stepX = 1; break;
            case DOWN: stepY = -1; break;
            case LEFT: stepX = -1;
         }
         attempts++;
      } while (!classRoom.isFree(this.x+stepX, this.y+stepY) && attempts < MAX_ATTEMPTS);
      if (attempts == MAX_ATTEMPTS)
      {  this.sprite.src = eval('MATE' + (this.ID % MATES_NUMBER) + '_' + moveStr[this.direction] + '_0');
         // defaultStatus = 'MATE' + (this.ID % MATES_NUMBER) + ' blocked';
         return;
      }
      // defaultStatus = 'MATE' + (this.ID % MATES_NUMBER) + ' moving ' + moveStr[this.direction];
      classRoom.leavePlace(this.x, this.y, STANDING, this.ID);
      this.x += stepX;
      this.y += stepY;
      classRoom.takePlace(this.x, this.y, STANDING, this.ID);

      // codice per il movimento

      /**
       *        Sposta lo sprite gradualmente
       *
       */

      for (var i = 0; i < MOVING_STEPS; i++)
         setTimeout("classMates[" + this.index + "].mate.displayMovement(" + i + ");", RESPONSE_TIME * i);
   };

   this.displayMovement = function(phase)
   {  var stepY = 0, stepX = 0;
      switch (this.direction)
      {  case UP: stepY = 1; break;
         case RIGHT: stepX = 1; break;
         case DOWN: stepY = -1; break;
         case LEFT: stepX = -1;
      }
      var scale = (stepX) ? X_SCALE : Y_SCALE, step = (stepX) ? X_STEP : Y_STEP;
      with (this.sprite.style)
      {  left = px(parseInt(left) + stepX * step);
         top = px(parseInt(top) - stepY * step); // se vado verso l'alto y cresce, ma la posizione nello schermo decresce!
         zIndex = CLASSROOM_WIDTH - this.y;
      }
      this.sprite.src = eval('MATE' + (this.ID % MATES_NUMBER) + '_' + moveStr[this.direction] + '_' + phase);
   };

   {  //  inizializza l'elemento DOM
      this.sprite = document.createElement('IMG');
      document.getElementById('field').appendChild(this.sprite);
      this.sprite.src = eval('MATE' + (this.ID % MATES_NUMBER) + '_' + moveStr[this.direction] + '_0');
      with (this.sprite.style)
      {  position = 'absolute';
         left = px(this.x * X_SCALE + X_ORIGIN);
         top = px(- this.y * Y_SCALE + Y_ORIGIN);
         zIndex = CLASSROOM_WIDTH - this.y;
      }
      classRoom.takePlace(this.x, this.y, STANDING, this.ID);
   }

   // defaultStatus = 'ClassMate: constructor OK';

   return this;
}


// public class Dorotea extends ClassMate

function Dorotea()
{  this.x = DO_START_X;
   this.y = DO_START_Y;
   this.ID = DO_ID;
   this.direction = randomDirection(); // direzione casuale
   this.sprite = null;

   // metodi pubblici

   this.doSomething = function()
   {  var rand = Math.floor(1000 * Math.random());
      if (rand > LATENCY_THRESHOLD)
         this.move();
      // this.lookup();
   }

   // metodi privati

   this.lookup = function()
   {  // ops... ho visto Claudio!

      if (classRoom.isThereClaudio(this.x, this.y));

   };

   this.move = function()
   {  var stepY = 0, stepX = 0, attempts = 0; // questo impedisce iterazioni infinite
      do
      {  this.direction = randomDirection();
         stepY = 0, stepX = 0;
         switch (this.direction)
         {  case UP: stepY = 1; break;
            case RIGHT: stepX = 1; break;
            case DOWN: stepY = -1; break;
            case LEFT: stepX = -1;
         }
         attempts++;
      } while (!classRoom.isFree(this.x+stepX, this.y+stepY) && attempts < MAX_ATTEMPTS);
      if (attempts == MAX_ATTEMPTS)
      {  this.sprite.src = eval('DO_' + moveStr[this.direction] + '_0');
         // defaultStatus = 'DO blocked';
         return;
      }
      defaultStatus = 'DO moving ' + moveStr[this.direction];
      classRoom.leavePlace(this.x, this.y, STANDING, this.ID);
      this.x += stepX;
      this.y += stepY;
      classRoom.takePlace(this.x, this.y, STANDING, this.ID);

      // codice per il movimento

      /**
       *        Sposta lo sprite gradualmente
       *
       */

      for (var i = 0; i < MOVING_STEPS; i++)
         setTimeout("dorotea.displayMovement(" + i + ");", RESPONSE_TIME * i);
   };

   this.displayMovement = function(phase)
   {  var stepY = 0, stepX = 0;
      switch (this.direction)
      {  case UP: stepY = 1; break;
         case RIGHT: stepX = 1; break;
         case DOWN: stepY = -1; break;
         case LEFT: stepX = -1;
      }
      var scale = (stepX) ? X_SCALE : Y_SCALE, step = (stepX) ? X_STEP : Y_STEP;
      with (this.sprite.style)
      {  left = px(parseInt(left) + stepX * step);
         top = px(parseInt(top) - stepY * step); // se vado verso l'alto y cresce, ma la posizione nello schermo decresce!
         zIndex = CLASSROOM_WIDTH - this.y;
      }
      this.sprite.src = eval('DO_' + moveStr[this.direction] + '_' + phase);
   };

   {  //  inizializza l'elemento DOM
      this.sprite = document.createElement('IMG');
      document.getElementById('field').appendChild(this.sprite);
      this.sprite.src = eval('DO_' + moveStr[this.direction] + '_0');
      with (this.sprite.style)
      {  position = 'absolute';
         left = px(this.x * X_SCALE + X_ORIGIN);
         top = px(- this.y * Y_SCALE + Y_ORIGIN);
         zIndex = CLASSROOM_WIDTH - this.y;
      }
      classRoom.takePlace(this.x, this.y, STANDING, this.ID);
   }

   // defaultStatus = 'Dorotea: constructor OK';

   return this;
}

function px(n)
{
        return n + 'px';
}