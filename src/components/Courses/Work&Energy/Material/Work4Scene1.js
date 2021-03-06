import React from "react";
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
var boxA = Bodies.rectangle(70, 200, 80, 80);
var pusher = Bodies.rectangle(-1000, 610, 900, 160, { isStatic: true }),counter = -1;;
var ground = Bodies.rectangle(400, 610, 900, 60, { isStatic: true,  });
var wallR = Bodies.rectangle(-10, 300, 60, 600, { isStatic: true });
var wallL = Bodies.rectangle(-10, 300, 60, 600, { isStatic: true });
var ceiling = Bodies.rectangle(500, -10, 1000, 60, { isStatic: true });
var pointer = Bodies.rectangle(965, 128, 10, 200,{ isStatic: true , render: { fillStyle: '#FFFFFF' } });
// add all of the bodies to the world
Composite.add(engine.world, [boxA, pusher, ground, wallL ,wallR ,ceiling, pointer]);
 // body is static so must manually update velocity for friction to work

 Events.on(engine, 'beforeUpdate', function(event) {
        counter += 0.01;

        if (counter < 0) {
            return;
        }

        var px = -450 + 850 * Math.sin(counter);

        // body is static so must manually update velocity for friction to work
        Body.setVelocity(pusher, { x: 0, y: 0 });
        Body.setPosition(pusher, { x: px, y: pusher.position.y });
    });
    function setPointer(){

      Body.setPosition(pointer, { x: (boxA.position.x/2) + 475, y : 128});
    }
     Matter.Events.on(engine, 'afterUpdate', function(event){
    setPointer()
     })
     Matter.Events.on(engine, 'afterUpdate', function(event){
      if(boxA.position.y >= 650){
      Body.setVelocity(boxA, { x: 0, y: 0 });
      Body.setAngle(boxA, 0)
      Body.setAngularVelocity(boxA, 0)
      Body.setPosition(boxA, { x: 70, y: 200 })
      }
    })
    

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



