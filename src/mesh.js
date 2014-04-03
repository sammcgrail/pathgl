function Mesh (gl, options, attr) {
  var attributes = {}
    , count = options.count || 0
    , attrList = options.attrList || ['pos', 'color', 'fugue']
    , primitive = gl[options.primitive.toUpperCase()]
    , material = []

  init()
  return {
    init : init
  , free: free
  , alloc: alloc
  , draw: draw
  , bind: bind
  , addTexture: addTexture
  , bindMaterial: bindMaterial
  , attributes: attributes
  , set: set
  , addAttr: addAttr
  , removeAttr: removeAttr
  , boundingBox: boundingBox
  }

  function alloc() {
    return count += options.primitive == 'points' ? 1
                  : options.primitive == 'lines' ? 2
                  : 3
  }

  function init() {
    attrList.forEach(function (name, i) {
      var buffer = gl.createBuffer()
      var option = options[name]  || {}
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, 4 * 1e7, gl.STREAM_DRAW)
      attributes[name] = {
        array: new Float32Array(options[name] && options[name].array || 4e5)
      , buffer: buffer
      , size: option.size  || 4
      , changed: true
      , loc: i
      }
    })
  }

  function free (index) {
    var i, attr
    for(attr in attributes) {
      attr = attributes
      i = attr.size
      while(i--) attributes[index * attr.size + i] = 0
    }
  }

  function bind (obj) {
    obj.posBuffer = attributes.pos.array
    obj.fBuffer = attributes.fugue.array
    obj.colorBuffer = attributes.color.array
    obj.mesh = this
  }

  function draw (offset) {
    if (! count) return
    for (var attr in attributes) {
      attr = attributes[attr]
      gl.bindBuffer(gl.ARRAY_BUFFER, attr.buffer)
      gl.vertexAttribPointer(attr.loc, attr.size, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(attr.loc)

      if (attr.changed)
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, attr.array)
    }
    //bindMaterial()

    gl.drawArrays(primitive, offset || 0, count)
  }

  function set () {}
  function addAttr () {}
  function removeAttr () {}
  function boundingBox() {}

  function bindMaterial() {
    for (var i = -1; ++i < material.length;) {
      //gl.activeTexture(gl.TEXTURE0 + i)
      gl.bindTexture(gl.TEXTURE_2D, material[i].texture)
    }
  }

  function addTexture(attr, tex) {
    if (!~ material.indexOf(tex))
      material.push(tex)
    //mapping
  }
}

function RenderTarget(screen) {
  var gl = screen.gl
    , targets = []
    , prog = screen.program || program
    , types = screen.types = SVGProxy()
    , meshes = screen.mesh ? [screen.mesh] : buildBuffers(gl, screen.types)
  meshes.forEach(function (d) { d.mergeProgram = mergeProgram })

  return screen.__renderTarget__ = {
    update: update
  , append: append
  , drawTo: drawTo
  , mergeProgram: mergeProgram
  }

  function drawTo(texture) {
    if (! texture) return targets.push(null)
    targets.push(initFbo(texture))
  }

  function append(el) {
    return (types[el.toLowerCase()] || console.log.bind(console, 'oops'))(el)
  }

  function mergeProgram(vs, fs, subst) {
    prog = prog.merge(vs, fs, subst)
  }

  function update () {
    if (program != prog) gl.useProgram(program = prog)
    for(var i = -1; ++i < targets.length;) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, targets[i])
      setUniforms()
      beforeRender(gl, targets[i])
      for(var j = -1; ++j < meshes.length;) meshes[j].draw()
    }
  }

  function setUniforms () {
    for (var k in uniforms)
      program[k] && program[k](uniforms[k])
  }

  function beforeRender(gl, fbo) {
    if (! fbo) gl.clear( gl.COLOR_BUFFER_BIT)
    gl.viewport(0, 0, screen.width, screen.height)
  }
}

function buildBuffers(gl, types) {
  var pointMesh = new Mesh(gl, { primitive: 'points' })
  pointMesh.bind(types.circle)
  pointMesh.bind(types.rect)

  var lineMesh = new Mesh(gl, { primitive: 'lines', pos: { size: 2 }})
  lineMesh.bind(types.line)
  return [pointMesh, lineMesh]
}


function initFbo(texture) {
  var fbo = gl.createFramebuffer()
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  fbo.width = texture.width
  fbo.height = texture.height
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture.texture, null)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  return fbo
}
