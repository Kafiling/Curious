import React from "react";
import ReactDOM from "react-dom";
import Matter from "matter-js";

class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
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

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80,{fillStyle : '#ffffff'});
var ground = Bodies.rectangle(500, 610, 1000, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);

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
    return <div ref="scene" />;
  }
}
export default Scene;