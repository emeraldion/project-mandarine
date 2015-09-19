
        /**
         *        Mandarine game © 2002 Eidos Workshop
         *        @author Claudio Procida
         *        @version 2.01 (beta)
         *        @date 16.59 27/06/2002
         */

        /**
         *        Game engine functions
         */

        function initGame()
           {  try
           {  classRoom = new ClassRoom();
              claudio = new Claudio();
              dorotea = new Dorotea();
              for (var i = 0; i < MATES_NUMBER; i++)
              {  classMates[i] = new Object();
                 classMates[i].mate = new ClassMate();
              }
              timer.time = 5 * 60;
              timer.count = function()
              {  this.time--;
                 if (this.time == 0)
                 {  timeExpired();
                    gameOver();
                 }
                 this.innerHTML = format(this.time);
              };
           }
           catch (e)
           { alert('Errore durante il caricamento del gioco');
           }
        }

        function startGame()
           {  showMessage('Consegna tutti i Cammei!');
           try
           {  do_handle = setInterval("dorotea.doSomething();", 1000);
              for (var i = 0; i < MATES_NUMBER; i++)
                 classMates[i].handle = setInterval("classMates[" + i + "].mate.doSomething();", 1000);
              timer_handle = setInterval("timer.count();", 1133);
           }
           catch (e)
           { alert('Errore durante l\'avvio del gioco');
           }
        }

        function cammeoDelivered(msg)
        {  try
           {  claudio.block();
              clearInterval(do_handle);
              for (var i = 0; i < MATES_NUMBER; i++)
                 clearInterval(classMates[i].handle);
              clearInterval(timer_handle);
           }
           catch (e)
           { alert('Errore durante l\'interruzione del gioco');
           }
           showMessage(msg);
           game = setTimeout("claudio.home();" +
           "try" +
           "{  do_handle = setInterval(\"dorotea.doSomething();\", 1000);" +
           "   for (var i = 0; i < MATES_NUMBER; i++)" +
           "   classMates[i].handle = setInterval(\"classMates[\" + i + \"].mate.doSomething();\", 1000);" +
           "   timer_handle = setInterval(\"timer.count();\", 1133);" +
           "   showMessage('Consegna tutti i Cammei!');" +
           "}" +
           "catch (e)" +
           "{ alert('Errore durante il riavvio del gioco');" +
           "}", 3000);
        }

        function seenClaudio()
        {  try
           {  claudio.block();
              clearInterval(do_handle);
              for (var i = 0; i < MATES_NUMBER; i++)
                 clearInterval(classMates[i].handle);
              clearInterval(timer_handle);
           }
           catch (e)
           { alert('Errore durante l\'interruzione del gioco');
           }
           showMessage('SEI STATO SCOPERTO!');
           game = setTimeout("claudio.home();" +
           "try" +
           "{  do_handle = setInterval(\"dorotea.doSomething();\", 1000);" +
           "   for (var i = 0; i < MATES_NUMBER; i++)" +
           "   classMates[i].handle = setInterval(\"classMates[\" + i + \"].mate.doSomething();\", 1000);" +
           "   timer_handle = setInterval(\"timer.count();\", 1133);" +
           "   showMessage('Fa\\\' più attenzione!');" +
           "}" +
           "catch (e)" +
           "{ alert('Errore durante il riavvio del gioco');" +
           "}", 3000);
        }

        function timeExpired()
        {  try
           {  claudio.block();
              clearInterval(do_handle);
              for (var i = 0; i < MATES_NUMBER; i++)
                 clearInterval(classMates[i].handle);
              clearInterval(timer_handle);
           }
           catch (e)
           { alert('Errore durante l\'interruzione del gioco');
           }
           showMessage('TEMPO SCADUTO!<BR>&Egrave; suonata la campana della ricreazione');
           game = setTimeout("claudio.home();" +
           "try" +
           "{  do_handle = setInterval(\"dorotea.doSomething();\", 1000);" +
           "   for (var i = 0; i < MATES_NUMBER; i++)" +
           "   classMates[i].handle = setInterval(\"classMates[\" + i + \"].mate.doSomething();\", 1000);" +
           "   timer_handle = setInterval(\"timer.count();\", 1133);" +
           "}" +
           "catch (e)" +
           "{ alert('Errore durante il riavvio del gioco');" +
           "}", 3000);
        }

        function gameOver(success)
        {  try
           {  claudio.block();
              clearTimeout(game);
              clearInterval(do_handle);
              for (var i = 0; i < MATES_NUMBER; i++)
                 clearInterval(classMates[i].handle);
              clearInterval(timer_handle);
           }
           catch (e)
           { alert('Errore durante l\'interruzione del gioco');
           }
           setTimeout("showMessage('GAME OVER', true);", 3000);
           if (success)
              msg = 'Premi INVIO per un\'altra partita';
           else
              msg = 'Premi INVIO per continuare';
           setTimeout("showMessage('GAME OVER<BR><BR>' + msg + ',<BR>ESC per abbandonare il gioco', true); document.onkeydown = function() { switch (event.keyCode) { case 13: location.reload(); break; case 27: self.close(); } };", 4000);
        }

        document.onkeydown = function(e)
        {
           var evt = e ? e : event;
           switch (evt.keyCode)
           {  case 13: claudio.deploy(); be(evt); break;
              case 27: if (confirm('Abbandonare il gioco?')) self.close(); be(evt); break;
              case 32: claudio.crouch(); be(evt); break;
              case 37: claudio.move(LEFT); be(evt); break;
              case 38: claudio.move(UP); be(evt); break;
              case 39: claudio.move(RIGHT); be(evt); break;
              case 40: claudio.move(DOWN); be(evt); break;
//              default: alert(evt.keyCode);
           }
        }

        /**
         *        Utility functions
         */

		function be(evt)
		{
			if (evt.stopPropagation)
			{
				evt.stopPropagation();
				evt.preventDefault();
			}
			else
			{
				evt.cancelBubble = true;
				evt.returnValue = false;
			}
		}

        function getObj(id)
        {  return (document.getElementById?document.getElementById(id):document.all[id]);
        }

        function randomDirection()
        {  var rand = Math.floor(4 * Math.random());
           switch (rand)
           {  case 0:         return UP;
              case 1:         return RIGHT;
              case 2:         return DOWN;
              default:        return LEFT;
           }
        }

        function getRandomMateX()
        {  return MATES_START_X + Math.floor(6 * Math.random());
        }

        function getRandomMateY()
        {  return MATES_START_Y - Math.floor(3 * Math.random() - 3 * Math.random());
        }

        function format(time)
        {  var s = time % 60, m = Math.floor(time / 60);
           return m + ':' + ((s < 10) ? ('0' + s) : s);
        }

        var msg_timer;

        function showMessage(msg, permanent)
        {  with (message)
           {  innerHTML = msg;
              style.color = (claudio.isInsideClassRoom()) ? 'white' : '#6699FF';
           }
           if (!permanent)
              setTimeout("showMessage('', true);", 3000);
        }