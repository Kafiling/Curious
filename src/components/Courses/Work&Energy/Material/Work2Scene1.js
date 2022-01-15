import React,{useRef} from "react";
import Matter from "matter-js";


export class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    
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

// create boxe and a ground
var boxA = Bodies.rectangle(250, 100, 60, 60, { frictionAir: 0.001 });
var boxB = Bodies.rectangle(500, 100, 60, 60, { frictionAir: 0.05 });
var boxC = Bodies.rectangle(750, 100, 60, 60, { frictionAir: 0.1 });
var ground = Bodies.rectangle(500, 610, 1000, 60, { isStatic: true,  });
var wallR = Bodies.rectangle(1010, 300, 60, 600, { isStatic: true });
var wallL = Bodies.rectangle(-10, 300, 60, 600, { isStatic: true });
var ceiling = Bodies.rectangle(500, -10, 1000, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, boxC, ground, wallL ,wallR ,ceiling]);

function resetPos(){
  //A
  Body.setVelocity(boxA, { x: 0, y: 0 });
  Body.setAngle(boxA, 0)
  Body.setAngularVelocity(boxA, 0)
  Body.setPosition(boxA, { x: 250, y: 100 })
  //B
  Body.setVelocity(boxB, { x: 0, y: 0 });
  Body.setAngle(boxB, 0)
  Body.setAngularVelocity(boxB, 0)
  Body.setPosition(boxB, { x: 500, y: 100 })
  //C
  Body.setVelocity(boxC, { x: 0, y: 0 });
  Body.setAngle(boxC, 0)
  Body.setAngularVelocity(boxC, 0)
  Body.setPosition(boxC, { x: 750, y: 100 })

  setTimeout(resetPos, 6000);
}
resetPos()
    

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
    <div ref="scene" />
    </div> 
    )
    
  }

}



