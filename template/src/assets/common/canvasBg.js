/* eslint-disable */
var Stats = function () { var e = Date.now(), t = e, i = 0, n = 1 / 0, r = 0, s = 0, o = 1 / 0, a = 0, l = 0, h = 0, c = document.createElement("div"); c.id = "stats", c.addEventListener("mousedown", function (e) { e.preventDefault(), v(++h % 2) }, !1), c.style.cssText = "width:80px;opacity:0.9;cursor:pointer"; var u = document.createElement("div"); u.id = "fps", u.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#002", c.appendChild(u); var d = document.createElement("div"); d.id = "fpsText", d.style.cssText = "color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px", d.innerHTML = "FPS", u.appendChild(d); var p = document.createElement("div"); for (p.id = "fpsGraph", p.style.cssText = "position:relative;width:74px;height:30px;background-color:#0ff", u.appendChild(p) ; 74 > p.children.length;) { var f = document.createElement("span"); f.style.cssText = "width:1px;height:30px;float:left;background-color:#113", p.appendChild(f) } var m = document.createElement("div"); m.id = "ms", m.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#020;display:none", c.appendChild(m); var g = document.createElement("div"); g.id = "msText", g.style.cssText = "color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px", g.innerHTML = "MS", m.appendChild(g); var y = document.createElement("div"); for (y.id = "msGraph", y.style.cssText = "position:relative;width:74px;height:30px;background-color:#0f0", m.appendChild(y) ; 74 > y.children.length;) { var f = document.createElement("span"); f.style.cssText = "width:1px;height:30px;float:left;background-color:#131", y.appendChild(f) } var v = function (e) { switch (h = e) { case 0: u.style.display = "block", m.style.display = "none"; break; case 1: u.style.display = "none", m.style.display = "block" } }, b = function (e, t) { var i = e.appendChild(e.firstChild); i.style.height = t + "px" }; return { REVISION: 11, domElement: c, setMode: v, begin: function () { e = Date.now() }, end: function () { var h = Date.now(); return i = h - e, n = Math.min(n, i), r = Math.max(r, i), g.textContent = i + " MS (" + n + "-" + r + ")", b(y, Math.min(30, 30 - 30 * (i / 200))), l++, h > t + 1e3 && (s = Math.round(1e3 * l / (h - t)), o = Math.min(o, s), a = Math.max(a, s), d.textContent = s + " FPS (" + o + "-" + a + ")", b(p, Math.min(30, 30 - 30 * (s / 100))), t = h, l = 0), h }, update: function () { e = this.end() } } };

export function canvas1 () {
  var canvas = document.querySelector('canvas')
  var ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  ctx.lineWidth = 0.3
  ctx.strokeStyle = (new Color(150)).style

  var mousePosition = {
    x: 30 * canvas.width / 100,
    y: 30 * canvas.height / 100
  }

  var dots = {
    nb: 150,
    distance: 50,
    d_radius: 100,
    array: []
  }

  function colorValue (min) {
    return Math.floor(Math.random() * 255 + min)
  }

  function createColorStyle (r, g, b) {
    return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)'
  }

  function mixComponents (comp1, weight1, comp2, weight2) {
    return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2)
  }

  function averageColorStyles (dot1, dot2) {
    var color1 = dot1.color
    var color2 = dot2.color
    var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius)
    var g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius)
    var b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius)
    return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b))
  }

  function Color (min) {
    min = min || 0
    this.r = colorValue(min)
    this.g = colorValue(min)
    this.b = colorValue(min)
    this.style = createColorStyle(this.r, this.g, this.b)
  }

  function Dot () {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height

    this.vx = -0.5 + Math.random()
    this.vy = -0.5 + Math.random()

    this.radius = Math.random() * 2

    this.color = new Color()
  }

  Dot.prototype = {
    draw: function () {
      ctx.beginPath()
      ctx.fillStyle = this.color.style
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      ctx.fill()
    }
  }

  function createDots () {
    for (var i = 0; i < dots.nb; i++) {
      dots.array.push(new Dot())
    }
  }

  function moveDots () {
    for (var i = 0; i < dots.nb; i++) {
      var dot = dots.array[i]

      if (dot.y < 0 || dot.y > canvas.height) {
        dot.vx = dot.vx
        dot.vy = -dot.vy
      } else if (dot.x < 0 || dot.x > canvas.width) {
        dot.vx = -dot.vx
        dot.vy = dot.vy
      }
      dot.x += dot.vx
      dot.y += dot.vy
    }
  }

  function connectDots () {
    for (var i = 0; i < dots.nb; i++) {
      for (var j = 0; j < dots.nb; j++) {
        var iDot = dots.array[i]
        var jDot = dots.array[j]

        if ((iDot.x - jDot.x) < dots.distance && (iDot.y - jDot.y) < dots.distance && (iDot.x - jDot.x) > -dots.distance && (iDot.y - jDot.y) > -dots.distance) {
          if ((iDot.x - mousePosition.x) < dots.d_radius && (iDot.y - mousePosition.y) < dots.d_radius && (iDot.x - mousePosition.x) > -dots.d_radius && (iDot.y - mousePosition.y) > -dots.d_radius) {
            ctx.beginPath()
            ctx.strokeStyle = averageColorStyles(iDot, jDot)
            ctx.moveTo(iDot.x, iDot.y)
            ctx.lineTo(jDot.x, jDot.y)
            ctx.stroke()
            ctx.closePath()
          }
        }
      }
    }
  }

  function drawDots () {
    for (var i = 0; i < dots.nb; i++) {
      var dot = dots.array[i]
      dot.draw()
    }
  }

  function animateDots () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    moveDots()
    connectDots()
    drawDots()

    requestAnimationFrame(animateDots)
  }

  $('canvas').on('mousemove', function (e) {
    mousePosition.x = e.pageX
    mousePosition.y = e.pageY
  })

  $('canvas').on('mouseleave', function (e) {
    mousePosition.x = canvas.width / 2
    mousePosition.y = canvas.height / 2
  })

  createDots()
  requestAnimationFrame(animateDots)
}

export function canvas2 () {
  //宇宙特效
  "use strict";
  var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight,

    hue = 217,
    stars = [],
    count = 0,
    maxStars = 1300;//星星数量

  var canvas2 = document.createElement('canvas'),
    ctx2 = canvas2.getContext('2d');
  canvas2.width = 100;
  canvas2.height = 100;
  var half = canvas2.width / 2,
    gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
  gradient2.addColorStop(0.025, '#CCC');
  gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
  gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
  gradient2.addColorStop(1, 'transparent');

  ctx2.fillStyle = gradient2;
  ctx2.beginPath();
  ctx2.arc(half, half, half, 0, Math.PI * 2);
  ctx2.fill();

// End cache

  function random(min, max) {
    if (arguments.length < 2) {
      max = min;
      min = 0;
    }

    if (min > max) {
      var hold = max;
      max = min;
      min = hold;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function maxOrbit(x, y) {
    var max = Math.max(x, y),
      diameter = Math.round(Math.sqrt(max * max + max * max));
    return diameter / 2;
    //星星移动范围，值越大范围越小，
  }

  var Star = function() {

    this.orbitRadius = random(maxOrbit(w, h));
    this.radius = random(60, this.orbitRadius) / 8;
    //星星大小
    this.orbitX = w / 2;
    this.orbitY = h / 2;
    this.timePassed = random(0, maxStars);
    this.speed = random(this.orbitRadius) / 50000;
    //星星移动速度
    this.alpha = random(2, 10) / 10;

    count++;
    stars[count] = this;
  }

  Star.prototype.draw = function() {
    var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
      y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
      twinkle = random(10);

    if (twinkle === 1 && this.alpha > 0) {
      this.alpha -= 0.05;
    } else if (twinkle === 2 && this.alpha < 1) {
      this.alpha += 0.05;
    }

    ctx.globalAlpha = this.alpha;
    ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
    this.timePassed += this.speed;
  }

  for (var i = 0; i < maxStars; i++) {
    new Star();
  }

  function animation() {
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.5; //尾巴
    ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
    ctx.fillRect(0, 0, w, h)

    ctx.globalCompositeOperation = 'lighter';
    for (var i = 1, l = stars.length; i < l; i++) {
      stars[i].draw();
    };

    window.requestAnimationFrame(animation);
  }

  animation();
}
export function canvas3 () {
  ; (function (window) {

    var ctx,
      hue,
      logo,
      form,
      buffer,
      target = {},
      tendrils = [],
      settings = {};

    settings.debug = true;
    settings.friction = 0.5;
    settings.trails = 20;
    settings.size = 50;
    settings.dampening = 0.25;
    settings.tension = 0.98;

    Math.TWO_PI = Math.PI * 2;

    // ========================================================================================
    // Oscillator 厌亦
    // ----------------------------------------------------------------------------------------

    function Oscillator(options) {
      this.init(options || {});
    }

    Oscillator.prototype = (function () {

      var value = 0;

      return {

        init: function (options) {
          this.phase = options.phase || 0;
          this.offset = options.offset || 0;
          this.frequency = options.frequency || 0.001;
          this.amplitude = options.amplitude || 1;
        },

        update: function () {
          this.phase += this.frequency;
          value = this.offset + Math.sin(this.phase) * this.amplitude;
          return value;
        },

        value: function () {
          return value;
        }
      };

    })();

    // ========================================================================================
    // Tendril luoyuhu.com
    // ----------------------------------------------------------------------------------------

    function Tendril(options) {
      this.init(options || {});
    }

    Tendril.prototype = (function () {

      function Node() {
        this.x = 0;
        this.y = 0;
        this.vy = 0;
        this.vx = 0;
      }

      return {

        init: function (options) {

          this.spring = options.spring + (Math.random() * 0.1) - 0.05;
          this.friction = settings.friction + (Math.random() * 0.01) - 0.005;
          this.nodes = [];

          for (var i = 0, node; i < settings.size; i++) {

            node = new Node();
            node.x = target.x;
            node.y = target.y;

            this.nodes.push(node);
          }
        },

        update: function () {

          var spring = this.spring,
            node = this.nodes[0];

          node.vx += (target.x - node.x) * spring;
          node.vy += (target.y - node.y) * spring;

          for (var prev, i = 0, n = this.nodes.length; i < n; i++) {

            node = this.nodes[i];

            if (i > 0) {

              prev = this.nodes[i - 1];

              node.vx += (prev.x - node.x) * spring;
              node.vy += (prev.y - node.y) * spring;
              node.vx += prev.vx * settings.dampening;
              node.vy += prev.vy * settings.dampening;
            }

            node.vx *= this.friction;
            node.vy *= this.friction;
            node.x += node.vx;
            node.y += node.vy;

            spring *= settings.tension;
          }
        },

        draw: function () {

          var x = this.nodes[0].x,
            y = this.nodes[0].y,
            a, b;

          ctx.beginPath();
          ctx.moveTo(x, y);

          for (var i = 1, n = this.nodes.length - 2; i < n; i++) {

            a = this.nodes[i];
            b = this.nodes[i + 1];
            x = (a.x + b.x) * 0.5;
            y = (a.y + b.y) * 0.5;

            ctx.quadraticCurveTo(a.x, a.y, x, y);
          }

          a = this.nodes[i];
          b = this.nodes[i + 1];

          ctx.quadraticCurveTo(a.x, a.y, b.x, b.y);
          ctx.stroke();
          ctx.closePath();
        }
      };

    })();

    // ----------------------------------------------------------------------------------------

    function init(event) {

      document.removeEventListener('mousemove', init);
      document.removeEventListener('touchstart', init);

      document.addEventListener('mousemove', mousemove);
      document.addEventListener('touchmove', mousemove);
      document.addEventListener('touchstart', touchstart);

      mousemove(event);
      reset();
      loop();
    }

    function reset() {

      tendrils = [];

      for (var i = 0; i < settings.trails; i++) {

        tendrils.push(new Tendril({
          spring: 0.45 + 0.025 * (i / settings.trails)
        }));
      }
    }

    function loop() {

      if (!ctx.running) return;

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(8,5,16,0.9)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = 'hsla(' + Math.round(hue.update()) + ',90%,50%,0.25)';
      ctx.lineWidth = 1;

      if (ctx.frame % 60 == 0) {
        console.log(hue.update(), Math.round(hue.update()), hue.phase, hue.offset, hue.frequency, hue.amplitude);
      }

      for (var i = 0, tendril; i < settings.trails; i++) {
        tendril = tendrils[i];
        tendril.update();
        tendril.draw();
      }

      ctx.frame++;
      ctx.stats.update();
      requestAnimFrame(loop);
    }

    function resize() {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }

    function start() {
      if (!ctx.running) {
        ctx.running = true;
        loop();
      }
    }

    function stop() {
      ctx.running = false;
    }

    function mousemove(event) {
      if (event.touches) {
        target.x = event.touches[0].pageX;
        target.y = event.touches[0].pageY;
      } else {
        target.x = event.clientX
        target.y = event.clientY;
      }
      event.preventDefault();
    }

    function touchstart(event) {
      if (event.touches.length == 1) {
        target.x = event.touches[0].pageX;
        target.y = event.touches[0].pageY;
      }
    }

    function keyup(event) {

      switch (event.keyCode) {
        case 32:
          save();
          break;
        default:
        // console.log(event.keyCode); hovertree.com
      }
    }

    function letters(id) {

      var el = document.getElementById(id),
        letters = el.innerHTML.replace('&amp;', '&').split(''),
        heading = '';

      for (var i = 0, n = letters.length, letter; i < n; i++) {
        letter = letters[i].replace('&', '&amp');
        heading += letter.trim() ? '<span class="letter-' + i + '">' + letter + '</span>' : '&nbsp;';
      }

      el.innerHTML = heading;
      setTimeout(function () {
        el.className = 'transition-in';
      }, (Math.random() * 500) + 500);
    }

    function save() {

      if (!buffer) {

        buffer = document.createElement('canvas');
        buffer.width = screen.availWidth;
        buffer.height = screen.availHeight;
        buffer.ctx = buffer.getContext('2d');

        form = document.createElement('form');
        form.method = 'post';
        form.input = document.createElement('input');
        form.input.type = 'hidden';
        form.input.name = 'data';
        form.appendChild(form.input);

        document.body.appendChild(form);
      }

      buffer.ctx.fillStyle = 'rgba(8,5,16)';
      buffer.ctx.fillRect(0, 0, buffer.width, buffer.height);

      buffer.ctx.drawImage(canvas,
        Math.round(buffer.width / 2 - canvas.width / 2),
        Math.round(buffer.height / 2 - canvas.height / 2)
      );

      buffer.ctx.drawImage(logo,
        Math.round(buffer.width / 2 - logo.width / 4),
        Math.round(buffer.height / 2 - logo.height / 4),
        logo.width / 2,
        logo.height / 2
      );

      window.open(buffer.toDataURL(), 'wallpaper', 'top=0,left=0,width=' + buffer.width + ',height=' + buffer.height);

      // form.input.value = buffer.toDataURL().substr(22);
      // form.submit(); luoyuhu.com
    }

    window.requestAnimFrame = (function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (fn) { window.setTimeout(fn, 1000 / 60) };
    })();

    window.onload = function () {

      ctx = document.getElementById('canvas').getContext('2d');
      ctx.stats = new Stats();
      ctx.running = true;
      ctx.frame = 1;



      hue = new Oscillator({
        phase: Math.random() * Math.TWO_PI,
        amplitude: 85,
        frequency: 0.0015,
        offset: 285
      });



      document.addEventListener('mousemove', init);
      document.addEventListener('touchstart', init);
      document.body.addEventListener('orientationchange', resize);
      window.addEventListener('resize', resize);
      window.addEventListener('keyup', keyup);
      window.addEventListener('focus', start);
      window.addEventListener('blur', stop);

      resize();

      if (window.DEBUG) {

        var gui = new dat.GUI();

        // gui.add(settings, 'debug');
        settings.gui.add(settings, 'trails', 1, 30).onChange(reset);
        settings.gui.add(settings, 'size', 25, 75).onFinishChange(reset);
        settings.gui.add(settings, 'friction', 0.45, 0.55).onFinishChange(reset);
        settings.gui.add(settings, 'dampening', 0.01, 0.4).onFinishChange(reset);
        settings.gui.add(settings, 'tension', 0.95, 0.999).onFinishChange(reset);

        document.body.appendChild(ctx.stats.domElement);
      }
    };

  })(window);
}
