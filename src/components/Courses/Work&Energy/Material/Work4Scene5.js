import React,{useState} from "react";
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
    Constraint = Matter.Constraint,
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
var boxA = Bodies.rectangle(10, 560, 80, 80);
var ground = Bodies.rectangle(500, 610, 1000, 60, { isStatic: true,  });
var wallL = Bodies.rectangle(-10, 300, 60, 600, { isStatic: true });
var wallR = Bodies.rectangle(1010, 300, 60, 600, { isStatic: true });
var ceiling = Bodies.rectangle(500, -10, 1000, 60, { isStatic: true });
var pointer = Bodies.rectangle(965, 128, 10, 200,{ isStatic: true , render: { fillStyle: '#FFFFFF' } });
// add all of the bodies to the world
Composite.add(engine.world, [boxA, ground, wallL ,wallR ,ceiling,pointer]);
var constraint = Constraint.create({
  bodyA: boxA,
  bodyB: wallL,
  pointB: { x: 20, y: 240 },
  stiffness: 0.01,
  damping: 0.05
  
});
Composite.add(world, [constraint]);
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

function setPointer(){
  var Distance = (( 60 - boxA.position.x)**2+(540 - boxA.position.y)**2)**(1/2)
  Body.setPosition(pointer, { x: (Distance/2) + 505, y : 128});
}
 Matter.Events.on(engine, 'afterUpdate', function(event){
setPointer()
 })


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

export var PosXBoxA
export var PosYBoxA

