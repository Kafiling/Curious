import React from "react";
import Matter from "matter-js";


export class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ConstraintDistanceA : "",
      ConstraintDistanceB : ""
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
var boxB = Bodies.rectangle(10, 295, 80, 80);
var ground = Bodies.rectangle(500, 610, 1000, 60, { isStatic: true,  });
var ground2 = Bodies.rectangle(500, 310, 1000, 30, { isStatic: true,  });
var wallL = Bodies.rectangle(-10, 300, 60, 600, { isStatic: true });
var wallR = Bodies.rectangle(1010, 300, 60, 600, { isStatic: true });
var ceiling = Bodies.rectangle(500, -10, 1000, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA,boxB, ground, wallL ,wallR ,ceiling  ,ground2]);
var constraintA = Constraint.create({
  bodyA: boxA,
  bodyB: wallL,
  pointB: { x: 20, y: 240 },
  stiffness: 0.01,
  damping: 0.05
  
});
var constraintB = Constraint.create({
  bodyA: boxB,
  bodyB: wallL,
  pointB: { x: 20, y: -45 },
  stiffness: 0.5,
  damping: 0.1
  
});
Composite.add(world, [constraintA]);
Composite.add(world, [constraintB]);

Matter.Events.on(engine, 'afterUpdate', function(event){
  if(boxB.position.x <= 50){
  Body.setPosition(boxB, { x: 10, y: 295 })
  }
})

setInterval(() => {this.setState(
  { ConstraintDistanceA : (((((boxA.position.x - 60)/10)**2) + (((540 - boxA.position.y)/10)**2))**(1/2)).toFixed(0) ,
    ConstraintDistanceB : (((((boxB.position.x - 52)/10)**2) + (((254 - boxB.position.y)/10)**2))**(1/2)).toFixed(0) 
  }
  )

}, 100);

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
      <div className="MatterUICon">
      <p className="MatterUIText">ค่านิจสปริง = 500 N/m</p>
      <p className="MatterUIText">ระยะที่สปริงยืด = {this.state.ConstraintDistanceB} cm</p>
      <p className="MatterUIText">แรงที่ใช้ดึงสปริง = {this.state.ConstraintDistanceB *5} N</p>
      </div>
      <div className="MatterUICon" style={{top: '310px'}}>
      <p className="MatterUIText">ค่านิจสปริง = 10 N/m</p>
      <p className="MatterUIText">ระยะที่สปริงยืด = {this.state.ConstraintDistanceA} cm</p>
      <p className="MatterUIText">แรงที่ใช้ดึงสปริง = {this.state.ConstraintDistanceA / 10} N</p>
      </div>
    <div ref="scene" />
    </div> 
    )
    
  }

}

export var PosXBoxA
export var PosYBoxA

