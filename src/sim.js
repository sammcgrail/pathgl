var simulation_vs = [
  'attribute vec2 pos;'
, '  void main() {'
, '  gl_Position = vec4(pos.xy, 1.0 , 1.0);'
, '  }'
].join('\n')

var particleShader = [
  'uniform sampler2D texture;'
, 'uniform vec2 resolution;'
, 'uniform vec2 mouse;'
, 'uniform vec2 dimensions;'
, 'uniform float gravity;'
, 'uniform float inertia;'
, 'uniform float drag;'
, 'uniform float clock;'
, 'void main() {'
        , 'vec4 data = texture2D(texture, (gl_FragCoord.xy) / dimensions);'
        , 'vec2 pos = data.xy;'
        , 'vec2 vel = data.zw;'
        , 'if (pos.x > 1.0 || pos.x < 0. || pos.y > 1. || pos.y < -0.) vel *= -1.4; '
        , 'if (distance(pos, mouse) < .01) vel *= 1.2;'
        , 'pos += inertia * vel;'
        , 'vel += gravity * normalize(mouse - pos);'
        , 'vel *= drag;'
        , 'gl_FragColor = vec4(pos, vel);'
     , '}'
].join('\n')

pathgl.sim.particles = function (s) {
  var size  = nextSquare(s)
    , width = Math.sqrt(size)
    , height = width
    , particleIndex = 0

  var texture = pathgl.texture(size)
  var shader = pathgl.shader().map(particleShader)

  texture.pipe(shader)
  shader.pipe(texture)
  //shader.pipe(null)
  shader.invalidate()
  setTimeout(start, 1000)

  return extend(texture, { emit: emit, reverse: reversePolarity })

  function reversePolarity () {
    pathgl.uniform('gravity', pathgl.uniform('gravity') * -1)
  }

  function start () {
    pathgl.uniform('dimensions', [width, height])
    pathgl.uniform('gravity', 1)
    pathgl.uniform('inertia', 0.0005)
    pathgl.uniform('drag', 0.981)
    for(var i = -1; ++i < 100;)
      addParticles(size / 100, [1,2].map(Math.random))
  }

  function emit(origin, ammount) {
    addParticles(ammount || size * Math.random(), origin || [0,0])
  }

  function addParticles(count, origin) {
    var x = ~~(particleIndex % width)
      , y = ~~(particleIndex / height)
      , chunks = [{ x: x, y: y, size: count }]

    ;(function recur(chunk) {
      var boundary = chunk.x + chunk.size
        , delta = boundary - width
      if (boundary < width) return
      chunk.size -= delta
      chunks.push(chunk = { x: 0, y:(chunk.y + 1) % height, size: delta })
      recur(chunk)
    })(chunks[0])

    chunks.forEach(function (chunk) {
      var data = [], j = -1
      while(++j < chunk.size)
        data.push(origin[0], origin[1], random(-2.0, 2.0), random(-2.0, 2.0))

      texture.subImage(chunk.x, chunk.y, data)
    })

    particleIndex += count
    particleIndex %= size
  }
}

function random(min, max) {
  return Math.random() * (max - min)
}
