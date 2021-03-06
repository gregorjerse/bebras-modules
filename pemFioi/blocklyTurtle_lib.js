

var makeTurtle = function() {
   this.reset = function(stepsize) {
      this.x = 150;
      this.y = 150;
      this.stepsize = 1;
      this.direction = 0;
      this.paint = true;
      this.stepsize = 5;
      if (this.drawingContext)
         this.drawingContext.clearRect(0, 0, 300, 300);
      if (this.turtle) {
         this.turtle.style.left= this.x - 11 + "px";
         this.turtle.style.top= this.y - 13 + "px";
         this.turtle.style.transform = "none";
      }
      if (stepsize) {
         this.stepsize = stepsize;
      }
   }
   this.reset(5);
   
   this.turn = function(angle) {
      this.direction += angle*Math.PI/180;
      if (this.turtle) {
         this.turtle.style.transform = "none";
         this.turtle.style.transform = "rotate(" + (-this.direction) + "rad)";
      }
   }
   this.move = function(amount) {
      if (this.paint) {
         this.drawingContext.beginPath();
         this.drawingContext.moveTo(this.x, this.y);
      }
      
      this.x -= amount * this.stepsize * 10 * Math.sin(this.direction);
      this.y -= amount * this.stepsize * 10 * Math.cos(this.direction);
     
      if (this.paint) {
         this.drawingContext.lineTo(this.x, this.y);
         this.drawingContext.stroke();
      }
      
      if (this.turtle) {
         this.turtle.style.left= this.x - 11 + "px";
         this.turtle.style.top= this.y - 13 + "px";
      }
   }
   this.start_painting = function() {
      this.paint = true;
   }
   this.stop_painting = function() {
      this.paint = false;
   }
   
   this.set_colour = function(colour) {
      this.drawingContext.strokeStyle = colour;
   }
   this.set_stepsize = function(stepsize) {
      this.stepsize = stepsize;
   }
   this.setDrawingContext = function(drawingContext) {
      this.drawingContext = drawingContext;
      this.drawingContext.lineWidth = 3;
      this.drawingContext.lineCap = 'round'
   }
   this.setTurtle = function(turtle) {
      this.turtle = turtle;

      this.turtle.style.left= this.x - 11 + "px";
      this.turtle.style.top= this.y - 13 + "px";
   }
};


var getContext = function(display, infos) {
   var localLanguageStrings = {
      fr: {
         categories: {
            turtle: "Tortue"
         },
         startingBlockName: "Programme de la tortue"
      },
      de: {
         categories: {
            turtle: "Schildkröte"
         },
         label: {
            move: "gehe",
            moveamount: "gehe %1 Schritte",
            moveamountvalue: "gehe %1 Schritte",
            turnleft: "drehe nach links ↺",
            turnright: "drehe nach rechts ↻",
            turnleftamount: "drehe um %1° nach links ↺",
            turnrightamount: "drehe um %1° nach rechts ↻",
            turnleftamountvalue: "drehe um %1 nach links ↺",
            turnrightamountvalue: "drehe um %1 nach rechts ↻",
            turnleftamountvalue_noround: "drehe um %1 Grad nach links ↺",
            turnrightamountvalue_noround: "drehe um %1 Grad nach rechts ↻",
            turnleftamountvalue_options: "drehe um %1 nach links ↺",
            turnrightamountvalue_options: "drehe um %1 nach rechts ↻",
            turneitheramount: "drehe um %1° nach %2",
            turneitheramountvalue: "drehe um %1 nach %2",
            penup: "hebe Stift ab",
            pendown: "setze Stift auf",
            peneither: "%1",
            colour2: "setze Farbe",
            colourvalue: "setze Farbe %1",
            turn: "drehe (Grad) ",
            alert: "messagebox",
            log: "logge",
            inputvalue: "Eingabewert"
         },
         code: {
            move: "gehe",
            moveamount: "geheSchritte",
            moveamountvalue: "geheSchritte",
            turnleft: "dreheLinks",
            turnright: "dreheRechts",
            turnleftamount: "dreheLinksGrad",
            turnrightamount: "dreheRechtsGrad",
            turnleftamountvalue: "dreheLinksGrad",
            turnrightamountvalue: "dreheRechtsGrad",
            turnleftamountvalue_noround: "dreheLinksGrad",
            turnrightamountvalue_noround: "dreheRechtsGrad",
            turnleftamountvalue_options: "dreheLinksGrad",
            turnrightamountvalue_options: "dreheRechtsGrad",
            turneitheramountvalue: "dreheGrad",
            penup: "stiftHoch",
            pendown: "stiftRunter",
            peneither: "stift",
            colour2: "setzeFarbe",
            colourvalue: "setzeFarbe",
            turn: "drehe",
            alert: "alert",
            log: "log",
            inputvalue: "eingabewert"
         },
         description: {
         },
         startingBlockName: "Schildkröten-Programm",
         messages: {
            paintingWrong: "Die Schildkröte hat nicht alles richtig gezeichnet.",
            paintingCorrect: "Bravo! Die Schildkröte hat alles richtig gezeichnet."
         }
      },
      none: {
         comment: {
         }
      }
   };

   var context = quickAlgoContext(display, infos);
   var strings = context.setLocalLanguageStrings(localLanguageStrings);
   
   var cells = [];
   var texts = [];
   var scale = 1;
   var paper;

   context.turtle = {displayTurtle : new makeTurtle, displaySolutionTurtle : new makeTurtle, invisibleTurtle : new makeTurtle, invisibleSolutionTurtle : new makeTurtle};

   switch (infos.blocklyColourTheme) {
      case "bwinf":
         context.provideBlocklyColours = function() {
            return {
               categories: {
                  logic: 100,
                  loops: 180,
                  math: 220,
                  texts: 250,
                  lists: 60,
                  colour: 60,
                  turtle: 310,
                  turtleInput: 20,
                  _default: 280
               },
               blocks: {}
            };
         }
         break;
      default:
         // we could set turtle specific default colours here, if we wanted to …
   }

   context.debug_log = function(callback, message) {
      message = message ? message.toString() : '';
      if (context.display) {
         console.log("vvvvv");
      }
      console.log(message);
      if (context.display) {
         console.log("^^^^^");
      }
      context.callCallback(callback);
   };

   context.reset = function(gridInfos) {
      if (context.display && gridInfos) {
         context.resetDisplay();

         context.turtle.displayTurtle.setDrawingContext(document.getElementById('displayfield').getContext('2d'));
         context.turtle.displaySolutionTurtle.setDrawingContext(document.getElementById('solutionfield').getContext('2d'));

         context.turtle.displayTurtle.reset(context.infos.turtleStepSize);
         context.turtle.displaySolutionTurtle.reset(context.infos.turtleStepSize);
      }
    
      function createMeACanvas() {
         var canvas = document.createElement('canvas');
         canvas.width = 300;
         canvas.height = 300;
         canvas.style.width = "300px";
         canvas.style.heigth = "300px";
         canvas.style.border = "1px solid black";
         canvas.style.display = "none";

         //document.body.appendChild(canvas); // for debug
         return canvas;
      }
      
      if (gridInfos) {
         context.turtle.invisibleTurtle.setDrawingContext(createMeACanvas().getContext('2d'));
         context.turtle.invisibleSolutionTurtle.setDrawingContext(createMeACanvas().getContext('2d'));

         context.turtle.invisibleTurtle.reset(context.infos.turtleStepSize);
         context.turtle.invisibleSolutionTurtle.reset(context.infos.turtleStepSize);
         
         context.drawSolution = gridInfos.drawSolution;
         context.inputValue   = gridInfos.inputValue;

         context.drawSolution(context.turtle.invisibleSolutionTurtle);
         if (context.display) {
            context.drawSolution(context.turtle.displaySolutionTurtle);
         }
      }
   };

   context.resetDisplay = function() {
      $("#grid").html("<div id='output'  style='height: 300px;width: 300px;border: solid 2px;margin: 12px;position:relative;background-color:white;'> <img id='drawinggrid' width='300' height='300' style='width:300px;height:300px;position:absolute;top:0;left:0;opacity: 0.1;filter: alpha(opacity=10);' src='" + context.infos.overlayFileName + "'><canvas id='solutionfield' width='300' height='300' style='width:300px;height:300px;position:absolute;top:0;left:0;opacity: 0.2;filter: alpha(opacity=20);'></canvas><canvas id='displayfield' width='300' height='300' style='width:300px;height:300px;position:absolute;top:0;left:0;'></canvas><canvas id='invisibledisplayfield' width='300' height='300' style='width:300px;height:300px;position:absolute;top:0;left:0;visibility:hidden;'></canvas><img id='turtle' src='turtle.svg' style='width: 22px; height: 27px; position:absolute; left: 139px; top: 136px;'></img></div>")
      
      context.blocklyHelper.updateSize();
      context.turtle.displayTurtle.setTurtle(document.getElementById('turtle'));
      context.turtle.displayTurtle.reset();
      
      context.updateScale(); // does nothing for now 
   };

   context.unload = function() {
      if (context.display) {
         // ... clean up necessary?
      }
   };

   context.updateScale = function() {
   };

   function callOnAllTurtles(fn) {
      fn(context.turtle.invisibleTurtle);
      if (context.display) {
         fn(context.turtle.displayTurtle);
      }
   }

   context.turtle.moveamount = function(param, callback) {
      if (typeof callback == "undefined") {
         callback = param;
         param = 0;
      }
         
      callOnAllTurtles(function(turtle) {
         turtle.move(param);
      })
      
      context.waitDelay(callback);
   }
   
   // DEPRECATED
   context.turtle.turn = function(param, callback) {
      callOnAllTurtles(function(turtle) {
         turtle.turn(param);
      })

      context.waitDelay(callback);
   }

   context.turtle.turneitheramount = function(degree, direction, callback) {
      if (typeof callback == "undefined") {
         callback = direction;
         direction = "l";
         if (typeof callback == "undefined") {
            callback = degree;
            degree = 0;
         }
      }

      callOnAllTurtles(function(turtle) {
         if (direction == "l") {
            turtle.turn(degree);
         }
         else {
            turtle.turn(-degree);
         }
            
      });
      
      context.waitDelay(callback);
   }

   context.turtle.peneither = function(status, callback) {
      callOnAllTurtles(function(turtle) {
         if (status == "up") {
            turtle.stop_painting();
         }
         else {
            turtle.start_painting();
         }
      })

      context.waitDelay(callback);
   }

   context.turtle.move = function(callback) {
      context.turtle.moveamount(1, callback);
   }
   context.turtle.turnleftamount = function(param, callback) {
      context.turtle.turneitheramount(param, "l", callback);
   }
   context.turtle.turnrightamount = function(param, callback) {
      context.turtle.turneitheramount(param, "r", callback);
   }
   context.turtle.turnleft = function(callback) {
      context.turtle.turnleftamount(90, callback);
   }   
   context.turtle.turnright = function(callback) {
      context.turtle.turnrightamount(90, callback);
   }
   context.turtle.penup = function(callback) {
      context.turtle.peneither("up", callback);
   }
   context.turtle.pendown = function(callback) {
      context.turtle.peneither("down", callback);
   }
   context.turtle.inputvalue = function(callback) {
      context.callCallback(callback, context.inputValue);
   };

   context.turtle.moveamountvalue = context.turtle.moveamount;
   context.turtle.turnleftamountvalue = context.turtle.turnleftamount;
   context.turtle.turnrightamountvalue = context.turtle.turnrightamount;
   context.turtle.turneitheramountvalue = context.turtle.turneitheramount;
   context.turtle.turnleftamountvalue_noround = context.turtle.turnleftamount;
   context.turtle.turnrightamountvalue_noround = context.turtle.turnrightamount;
   context.turtle.turnleftamountvalue_options = context.turtle.turnleftamount;
   context.turtle.turnrightamountvalue_options = context.turtle.turnrightamount;
   

   context.turtle.colour2 = function(colour, callback) {
      if (typeof callback == "undefined") {
         callback = colour;
         colour = "#000000";
      }

      callOnAllTurtles(function(turtle) {
         turtle.set_colour(colour);
      })

      context.waitDelay(callback);
   }
   context.turtle.colourvalue = context.turtle.colour2;
   
   context.customBlocks = {
      turtle: {
         turtle: [
            { name: "move" },
            { name: "moveamount", params: [null]},
            { name: "moveamountvalue", blocklyJson: {"args0": [{"type": "field_number", "name": "PARAM_0", "value": 2}]}},
            { name: "turnleft" },
            { name: "turnright" },
            { name: "turn",      params: [null]},
            { name: "turnleftamount", params: [null]},
            { name: "turnrightamount", params: [null]},
            { name: "turnleftamountvalue", blocklyJson: {"args0": [{"type": "field_angle", "name": "PARAM_0", "angle": 90}]}},
            { name: "turnrightamountvalue", blocklyJson: {"args0": [{"type": "field_angle", "name": "PARAM_0", "angle": 90}]}},
            { name: "turnleftamountvalue_noround", blocklyJson: {"args0": [{"type": "field_number", "name": "PARAM_0", "value": 90}]}},
            { name: "turnrightamountvalue_noround", blocklyJson: {"args0": [{"type": "field_number", "name": "PARAM_0", "value": 90}]}},
            { name: "turnleftamountvalue_options", blocklyJson: {"args0": [{"type": "field_dropdown", "name": "PARAM_0", "options": [
                ["36 °","36"],["45 °","45"],["60 °","60"],["72 °","72"],["90 °","90"],["108 °","108"],["120 °","120"],["135 °","135"],["144 °","144"],["180 °","180"]]}]}},
            { name: "turnrightamountvalue_options", blocklyJson: {"args0": [{"type": "field_dropdown", "name": "PARAM_0", "options": [
                ["36 °","36"],["45 °","45"],["60 °","60"],["72 °","72"],["90 °","90"],["108 °","108"],["120 °","120"],["135 °","135"],["144 °","144"],["180 °","180"]]}]}},
            { name: "turneitheramount", blocklyJson: {"args0": [
               {"type": "input_value", "name": "PARAM_0"},
               {"type": "field_dropdown", "name": "PARAM_1", "options":
                [["links ↺","'l'"],["rechts ↻","'r'"]]}]}},
            { name: "turneitheramountvalue", blocklyJson: {"args0": [
               {"type": "field_angle", "name": "PARAM_0", "angle": 90},
               {"type": "field_dropdown", "name": "PARAM_1", "options":
                [["links ↺","'l'"],["rechts ↻","'r'"]]}]}},
            { name: "penup" },
            { name: "pendown" },
            { name: "peneither", blocklyJson: {"args0": [
               {"type": "field_dropdown", "name": "PARAM_0", "options":
                [["hebe Stift ab","'up'"],["setze Stift auf","'down'"]]}]}},
            { name: "colour2", params: [null]},
            { name: "colourvalue", blocklyJson: {"args0": [{"type": "field_colour", "name": "PARAM_0", "colour": "#ff0000"}]}}
         ],
         turtleInput: [
            { name: "inputvalue", yieldsValue: true }
          ]
      },
      debug: {
         debug: [
            { name: "alert", params: [null], handler: context.debug_alert,
              blocklyXml: "<block type='alert'><value name='PARAM_0'><block type='text'><field name='TEXT'></field></block></value></block>"},
            { name: "log",   params: [null], handler: context.debug_log,
              blocklyXml: "<block type='log'><value name='PARAM_0'><block type='text'><field name='TEXT'></field></block></value></block>"}
         ]
      }
   };
   

   return context;
}
