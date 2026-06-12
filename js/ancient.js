(function() {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // ====== 飘落花瓣 ======
  var PETAL_COUNT = 18;
  var PETAL_COLORS = [
    'radial-gradient(circle, #ffb7b2 0%, #ff9a9e 100%)',
    'radial-gradient(circle, #ffd1dc 0%, #ffb7c5 100%)',
    'radial-gradient(circle, #ffc3a0 0%, #ffafbd 100%)'
  ];
  var petals = [];

  function Petal() {
    this.el = document.createElement('div');
    this.el.className = 'ancient-petal';
    this.init(true);
    document.body.appendChild(this.el);
  }
  Petal.prototype.init = function(firstLoad) {
    this.x = Math.random() * window.innerWidth;
    this.y = firstLoad ? -(Math.random() * window.innerHeight + 20) : -20;
    this.size = Math.random() * 10 + 8;
    this.speed = Math.random() * 1.4 + 0.4;
    this.wind = (Math.random() - 0.5) * 0.8;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 2;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
    this.t = Math.random() * Math.PI * 2;
    this.swing = Math.random() * 2;
    this.swingSpeed = Math.random() * 0.02 + 0.01;
    this.el.style.cssText = 'position:fixed;top:'+this.y+'px;left:'+this.x+'px;width:'+this.size+'px;height:'+this.size+'px;background:'+this.color+';border-radius:50% 0 50% 50%;opacity:'+this.opacity+';pointer-events:none;z-index:9999;transform:rotate('+this.rotation+'deg);will-change:transform,top,left;';
  };
  Petal.prototype.update = function() {
    this.y += this.speed; this.t += this.swingSpeed; this.x += this.wind + Math.sin(this.t) * this.swing; this.rotation += this.rotationSpeed;
    if (this.y > window.innerHeight + 30) { this.init(false); return; }
    this.el.style.top = this.y + 'px'; this.el.style.left = this.x + 'px'; this.el.style.transform = 'rotate(' + this.rotation + 'deg)';
  };

  for (var i = 0; i < PETAL_COUNT; i++) petals.push(new Petal());
  (function animatePetals() { for (var i = 0; i < petals.length; i++) petals[i].update(); requestAnimationFrame(animatePetals); })();

  // ====== 鼠标墨迹 ======
  var inkDrops = [], MAX_DROPS = 25, lastTime = 0;
  document.addEventListener('mousemove', function(e) {
    var now = Date.now(); if (now - lastTime < 50) return; lastTime = now;
    if (inkDrops.length >= MAX_DROPS) { var old = inkDrops.shift(); if (old.parentNode) old.parentNode.removeChild(old); }
    var drop = document.createElement('div'); drop.className = 'ancient-ink';
    var size = Math.random() * 6 + 3;
    drop.style.left = e.clientX + 'px'; drop.style.top = e.clientY + 'px'; drop.style.width = size + 'px'; drop.style.height = size + 'px'; drop.style.opacity = Math.random() * 0.3 + 0.15;
    document.body.appendChild(drop); inkDrops.push(drop);
    setTimeout(function() { drop.style.opacity = '0'; setTimeout(function() { if (drop.parentNode) drop.parentNode.removeChild(drop); var idx = inkDrops.indexOf(drop); if (idx > -1) inkDrops.splice(idx, 1); }, 400); }, 600);
  });
})();
