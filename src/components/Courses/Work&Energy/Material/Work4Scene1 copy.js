import { useEffect, useRef } from 'react'
import { Engine, Render, Body, Bodies, World, Events, MouseConstraint, Mouse } from 'matter-js'
import {Line} from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'


function Scene (props) {
  const scene = useRef()
  const isPressed = useRef(false)
  const engine = useRef(Engine.create())

  useEffect(() => {
    // mount
    const cw = document.body.clientWidth
    const ch = document.body.clientHeight

    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: 1000,
        height: 600,
        wireframes: false,
      }
    })
    var boxA = Bodies.rectangle(70, 200, 80, 80);
    var pusher = Bodies.rectangle(-1000, 610, 850, 160, { isStatic: true }),counter = -1;;
    World.add(engine.current.world, [
      boxA,pusher,
      Bodies.rectangle(400, 610, 850, 60, { isStatic: true }),
      Bodies.rectangle(-10, 300, 60, 600, { isStatic: true }),
      Bodies.rectangle(-10, 300, 60, 600, { isStatic: true }),
      Bodies.rectangle(500, -10, 1000, 350, { isStatic: true })
    ])

    Engine.run(engine.current)
    Render.run(render)
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

World.add(mouseConstraint);


// unmount
    return () => {
      // destroy Matter
      Render.stop(render)
      World.clear(engine.current.world)
      Engine.clear(engine.current)
      render.canvas.remove()
      render.canvas = null
      render.context = null
      render.textures = {}
    }
  }, [])

  

  return (
    <div>
      <div ref={scene} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default Scene
