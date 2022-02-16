import React from "react";
import Matter from "matter-js";


export class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PosXBoxA : '',
      PosYBoxA : '',
      Ek : '',
      Ep : ''
    };
  }
  
  componentDidMount() {
    var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Composite = Matter.Composite;

  

// create an engine
var engine = Engine.create(),
world = engine.world;

// create a renderer
var render = Render.create({
    element: this.refs.scene,
    engine: engine,
    options: {
      width: 1000,
      height: 600,
      wireframes: false
    }
});

// create box and a ground
var boxA = Bodies.circle(450, 100, 40);

var wallL = Bodies.rectangle(-10, 170, 60, 600, { isStatic: true });
var wallR = Bodies.rectangle(1010, 170, 60, 600, { isStatic: true });
var ceiling = Bodies.rectangle(500, -10, 1000, 60, { isStatic: true });


boxA.friction = 0
boxA.frictionAir = 0
engine.world.gravity.y = 1;
engine.timing.timeScale = 0.25
render.options.showVelocity = true
// add all of the bodies to the world
Composite.add(engine.world, [boxA, wallL ,wallR ,ceiling]);

// add mouse control
    var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
        
 
        



 
 Matter.Events.on(engine, 'afterUpdate', function(event){
  if(boxA.position.y >= 600){
  Body.setVelocity(boxA, { x: 0, y: 0 });
  Body.setAngle(boxA, 0)
  Body.setAngularVelocity(boxA, 0)
  Body.setPosition(boxA, { x: 450, y: 100 })
  }
})

setInterval(() => {this.setState(
  { PosXBoxA : boxA.velocity.x.toFixed(2) ,
  PosYBoxA : boxA.velocity.y.toFixed(2),
  Ep : ((boxA.position.y - 600)*1*9.8*-1).toFixed(2)})
console.log(boxA.position.y - 600)
}, 100);







  
Composite.add(world, mouseConstraint);

 // keep the mouse in sync with rendering
render.mouse = mouse;

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);


}

  render() {
 
    return(<div>
      <div className="MatterUICon">
      <p className="MatterUIText">พลังงานศักย์โน้มถ่วง = {this.state.Ep}</p>
      <p className="MatterUIText">(Timescale = 0.25 เท่า)</p>
      </div>
    
    <div ref="scene" />
    </div> 
    )
    
  }

}

export var PosXBoxA
export var PosYBoxA

