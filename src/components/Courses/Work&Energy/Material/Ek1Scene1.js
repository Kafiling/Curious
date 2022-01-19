import React from "react";
import Matter from "matter-js";


export class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {IsButtonClick: false};

  }
  
  handleClick() {
    this.setState({IsButtonClick: true});
    console.log('that is:', this);
   console.log(this.state.IsButtonClick)
    setTimeout(this.setState({IsButtonClick: true}), 100)
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
var boxA = Bodies.circle(40, 550, 40);
var ground = Bodies.rectangle(500, 610, 1000, 60, { isStatic: true,  });
var wallL = Bodies.rectangle(-10, 170, 60, 600, { isStatic: true });
var wallR = Bodies.rectangle(1010, 170, 60, 600, { isStatic: true });
var ceiling = Bodies.rectangle(500, -10, 1000, 60, { isStatic: true });

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
        
        
function setVelocity(){
  Body.setVelocity(boxA, { x: 5, y: 0 });
  
}

 Matter.Events.on(engine, 'afterUpdate', function(event){
  setVelocity()
 })

 
 Matter.Events.on(engine, 'afterUpdate', function(event){
  if(boxA.position.x >= 1040){
  Body.setAngle(boxA, 0)
  Body.setAngularVelocity(boxA, 0)
  Body.setPosition(boxA, { x: 0, y: 550 })
  ;
  }
})
if (this.state.IsButtonClick){
  setTimeout(Body.applyForce(boxA, boxA.position, {x: 1, y: 0}), 1)
}

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
       <button onClick={() => this.handleClick()}>
        Click me
        
      </button>
    <div ref="scene" />
    </div> 
    )
    
  }

}

export var PosXBoxA
export var PosYBoxA

