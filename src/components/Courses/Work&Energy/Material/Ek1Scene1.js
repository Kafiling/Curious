import React from "react";
import Matter from "matter-js";


export class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PosXBoxA : '',
      PosYBoxA : ''
    };
  }
  
  componentDidMount() {
    var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    Events = Matter.Events,
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
var boxA = Bodies.circle(40, 550, 40);
var ground = Bodies.rectangle(500, 610, 1000, 60, { isStatic: true,  });
var wallL = Bodies.rectangle(-10, 170, 60, 600, { isStatic: true });
var wallR = Bodies.rectangle(1010, 170, 60, 600, { isStatic: true });
var ceiling = Bodies.rectangle(500, -10, 1000, 60, { isStatic: true });

ground.friction = 0
boxA.friction = 0
// add all of the bodies to the world
Composite.add(engine.world, [boxA, ground, wallL ,wallR ,ceiling]);

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
        
  Events.on(mouseConstraint, "mousedown", function(event){
    setTimeout(Body.applyForce(boxA, boxA.position, {x: 0.2, y: 0}), 1)
         })
        
function setVelocity(){
  Body.setVelocity(boxA, { x: 10, y: 0 });
}
setVelocity()


 
 Matter.Events.on(engine, 'afterUpdate', function(event){
  if(boxA.position.x >= 1040){
  Body.setPosition(boxA, { x: 0, y: 550 })
  }
})
setInterval(() => {this.setState(
  { PosXBoxA : boxA.velocity.x.toFixed(2) ,
  PosYBoxA : boxA.velocity.y.toFixed(2)}
  )

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
      <p className="MatterUIText">ความเร็วแกน X = {this.state.PosXBoxA}</p>
      <p className="MatterUIText">ความเร็วแกน Y = {this.state.PosYBoxA}</p>
      </div>
    
    <div ref="scene" />
    </div> 
    )
    
  }

}

export var PosXBoxA
export var PosYBoxA

