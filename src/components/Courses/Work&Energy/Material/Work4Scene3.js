import React from "react";
import Matter from "matter-js";
import {Line} from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

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

// create two boxes and a ground
var boxA = Bodies.rectangle(70, 200, 80, 80);
var ground = Bodies.rectangle(400, 610, 850, 60, { isStatic: true });
var wallR = Bodies.rectangle(-10, 300, 60, 600, { isStatic: true });
var wallL = Bodies.rectangle(1010, 300, 60, 600, { isStatic: true });
var ceiling = Bodies.rectangle(500, -10, 1000, 350, { isStatic: true });
// add all of the bodies to the world
Composite.add(engine.world, [boxA, ground, wallL ,wallR ,ceiling]);

// Reset its position after it
     Matter.Events.on(engine, 'afterUpdate', function(event){
      if(boxA.position.y >= 650){
      Body.setVelocity(boxA, { x: 0, y: 0 });
      Body.setAngle(boxA, 0)
      Body.setAngularVelocity(boxA, 0)
      Body.setPosition(boxA, { x: 70, y: 200 })
      }
    })

function ApplyForceX(){
  Matter.Events.on(engine, 'afterUpdate', function(event){
    Body.setAngularVelocity(boxA, 0)
    }
  )
}
    

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
    return<div ref="scene" /> ;
  }
}


const state = {
  labels: [],
  datasets: [
    {
      label: 'Rainfall',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(255,255,255,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}


export class Chart extends React.Component {
  render() {
    return (
      <div>
        <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
      );
    }
  }
 