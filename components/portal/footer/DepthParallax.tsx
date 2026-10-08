'use client'

import { useEffect, useRef, useState } from 'react'

// A still that moves like a camera. The picture comes with a depth map (white
// near, black far, made with Depth Anything V2); a fragment shader moves every
// pixel by its depth against the camera, so near things slide past far ones the
// way they would if the camera itself moved. Left alone the camera circles
// slowly and dollies in and out; the pointer leans it further.
//
// Page elements can ride along at a depth of their own (`riders`), so a title
// set over the picture moves as if it stood in the scene. A part of the picture
// can be held still (`still`): a depth map is least sure of itself at hair and
// faces, and a person standing in front of a far floor is where the moving
// layers part company, so people are better left where the painter put them.
// The page can also steer the camera (`drive`), so it can travel with the
// scroll as well as on its own.
//
// The plain <img> underneath is what paints first and what stays under
// reduced motion or without WebGL; the canvas fades in over it once drawn.
// Nothing is fetched until the picture is a screen away.

type Props = {
  src: string
  depth: string
  /** How far the camera travels, in fractions of the picture. */
  strength?: number
  /** The depth (0 far … 1 near) that stays put while the rest moves. */
  focus?: number
  /** How far the camera dollies in and out, as a scale on depth. */
  dolly?: number
  /** Where the crop centres, in fractions of the picture. */
  anchor?: [number, number]
  /** Elements that move with the scene, each at a depth (0 far … 1 near). */
  riders?: { ref: React.RefObject<HTMLElement | null>; depth: number }[]
  /** An ellipse of the picture held still: its centre and radii, in fractions of the picture. */
  still?: { at: [number, number]; size: [number, number] }
  /** A camera move added by the page, read every frame: across, down, and in. */
  drive?: React.RefObject<{ x: number; y: number; dolly: number }>
  className?: string
}

const VERTEX = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  vUv.y = 1.0 - vUv.y;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

const FRAGMENT = `
precision mediump float;
uniform sampler2D uImg;
uniform sampler2D uDep;
uniform vec2 uOffset;
uniform vec2 uScale;
uniform vec2 uAnchor;
uniform float uFocus;
uniform float uDolly;
uniform vec4 uStill;
varying vec2 vUv;

// Where a pixel at depth d samples from: pushed sideways by the camera, and
// drawn towards the centre as the camera dollies in, both more the nearer it is,
// and not at all inside the part of the picture held still. The hold fades out
// over a wide margin, so the ground around it bends rather than breaks.
vec2 shift(vec2 uv, float d) {
  float hold = smoothstep(0.85, 1.6, length((uv - uStill.xy) / uStill.zw));
  float k = (d - uFocus) * hold;
  return uAnchor + (uv - uAnchor) * (1.0 - uDolly * k) + uOffset * k;
}

// The surface seen at uv is the nearest one that lands there. Walk the depths
// from near to far; the first where the picture is at least that near is it.
// A crossing that overshoots by a long way is not a surface but the edge of a
// near thing the camera now sees behind, which the picture never showed: that
// is filled with what lies beside it rather than with a copy of the near thing.
const int STEPS = 16;
const float STEP = 1.0 / 16.0;

void main() {
  vec2 uv = (vUv - 0.5) * uScale + uAnchor;
  vec2 last = shift(uv, 1.0);
  float lastGap = texture2D(uDep, last).r - 1.0;
  for (int i = 1; i <= STEPS; i++) {
    float z = 1.0 - float(i) * STEP;
    vec2 p = shift(uv, z);
    float gap = texture2D(uDep, p).r - z;
    if (gap >= 0.0) {
      if (gap > STEP * 2.0) {
        gl_FragColor = texture2D(uImg, last);
      } else {
        float t = lastGap / (lastGap - gap);
        gl_FragColor = texture2D(uImg, shift(uv, z + STEP * (1.0 - t)));
      }
      return;
    }
    last = p;
    lastGap = gap;
  }
  gl_FragColor = texture2D(uImg, last);
}`

// How far in the crop sits, so the moved edges stay inside the picture, and how
// much of the picture the crop's centre keeps clear of the edge.
const ZOOM = 1.15
const EDGE = 0.06
// The picture is 1672 × 941; drawing the canvas finer than the crop of it on
// screen adds no detail, only work for the search above.
const MAX_WIDTH = 1700
const MAX_HEIGHT = 1100

function load(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.decoding = 'async'
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })
}

export function DepthParallax({ src, depth, strength = 0.035, focus = 0.45, dolly = 0, anchor = [0.5, 0.5], riders = [], still, drive, className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false })
    if (!gl) return

    let disposed = false
    let frame = 0
    let visible = false
    const pointer = { x: 0, y: 0 }
    const camera = { x: 0, y: 0, dolly: 0 }
    const crop = { sx: 1, sy: 1 }
    let aspect = 16 / 9

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      return shader
    }
    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const u = (name: string) => gl.getUniformLocation(program, name)
    const texture = (unit: number, image: HTMLImageElement) => {
      gl.activeTexture(gl.TEXTURE0 + unit)
      gl.bindTexture(gl.TEXTURE_2D, gl.createTexture())
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
    }

    const resize = () => {
      const width = Math.max(canvas.clientWidth, 1)
      const height = Math.max(canvas.clientHeight, 1)
      const k = Math.min(window.devicePixelRatio || 1, MAX_WIDTH / width, MAX_HEIGHT / height)
      canvas.width = Math.round(width * k)
      canvas.height = Math.round(height * k)
      gl.viewport(0, 0, canvas.width, canvas.height)
      // Cover the frame, then pull in so the moved edges stay inside the picture.
      const frameAspect = width / height
      const scale = frameAspect > aspect ? [1, aspect / frameAspect] : [frameAspect / aspect, 1]
      crop.sx = scale[0] / ZOOM
      crop.sy = scale[1] / ZOOM
      gl.uniform2f(u('uScale'), crop.sx, crop.sy)
      // Keep the crop, and the room it moves in, inside the picture wherever
      // its centre is asked to be.
      const clamp = (v: number, half: number) => {
        const room = Math.min(half + EDGE, 0.5)
        return Math.min(Math.max(v, room), 1 - room)
      }
      gl.uniform2f(u('uAnchor'), clamp(anchor[0], crop.sx / 2), clamp(anchor[1], crop.sy / 2))
    }

    const onPointer = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect()
      pointer.x = ((event.clientX - box.left) / box.width - 0.5) * 2
      pointer.y = ((event.clientY - box.top) / box.height - 0.5) * 2
    }

    const start = performance.now()
    const draw = (now: number) => {
      frame = 0
      if (!visible || disposed) return
      const t = (now - start) / 1000
      // A slow circle, about fourteen seconds round, wandering a little so it
      // never quite repeats; a dolly in and out on its own, longer beat; and
      // the reader's lean on top.
      const steer = drive?.current ?? { x: 0, y: 0, dolly: 0 }
      const targetX = (Math.sin(t * 0.45) * 0.8 + Math.sin(t * 0.11) * 0.2 + pointer.x * 0.5) * strength + steer.x
      const targetY = (Math.cos(t * 0.45) * 0.45 + pointer.y * 0.3) * strength + steer.y
      const targetDolly = (0.5 - Math.cos(t * 0.26) * 0.5) * dolly + steer.dolly
      camera.x += (targetX - camera.x) * 0.06
      camera.y += (targetY - camera.y) * 0.06
      camera.dolly += (targetDolly - camera.dolly) * 0.06
      const push = camera.dolly
      gl.uniform2f(u('uOffset'), camera.x, camera.y)
      gl.uniform1f(u('uDolly'), push)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      // Riders move as the picture does at their depth: across by the camera,
      // and larger as the camera comes in.
      for (const rider of riders) {
        const el = rider.ref.current
        if (!el) continue
        const k = rider.depth - focus
        const dx = (-camera.x * k / crop.sx) * canvas.clientWidth
        const dy = (-camera.y * k / crop.sy) * canvas.clientHeight
        el.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0) scale(${(1 / (1 - push * k)).toFixed(4)})`
      }
      frame = requestAnimationFrame(draw)
    }

    const sizes = new ResizeObserver(resize)
    const seen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !frame) frame = requestAnimationFrame(draw)
    })

    const begin = async () => {
      const images = await Promise.all([load(src), load(depth)]).catch(() => null)
      if (!images || disposed) return
      aspect = images[0].naturalWidth / images[0].naturalHeight
      texture(0, images[0])
      texture(1, images[1])
      gl.uniform1i(u('uImg'), 0)
      gl.uniform1i(u('uDep'), 1)
      gl.uniform1f(u('uFocus'), focus)
      // Holding nothing still is holding an ellipse far outside the picture.
      const [sx, sy] = still?.at ?? [-9, -9]
      const [rx, ry] = still?.size ?? [1, 1]
      gl.uniform4f(u('uStill'), sx, sy, rx, ry)
      resize()
      sizes.observe(canvas)
      seen.observe(canvas)
      window.addEventListener('pointermove', onPointer, { passive: true })
      setReady(true)
    }
    const near = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      near.disconnect()
      void begin()
    }, { rootMargin: '100% 0px' })
    near.observe(root)

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      near.disconnect()
      sizes.disconnect()
      seen.disconnect()
      window.removeEventListener('pointermove', onPointer)
    }
    // The picture and its tuning are fixed for the life of the component.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={rootRef} className={className} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- a fixed still, painted before WebGL */}
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: `${anchor[0] * 100}% ${anchor[1] * 100}%`, transform: `scale(${ZOOM})` }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: ready ? 1 : 0, transition: 'opacity 0.8s ease' }}
      />
    </div>
  )
}
