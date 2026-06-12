// ============================================
// 炫酷古风主题 - 完整特效集合（加强版）
// ============================================

// ====== 一、飘落花瓣 + 加浓鼠标墨迹 ======
(function() {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // --- 飘落花瓣 ---
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

  // --- 加浓加大鼠标墨迹 ---
  var inkDrops = [], MAX_DROPS = 30, lastTime = 0;
  document.addEventListener('mousemove', function(e) {
    var now = Date.now();
    if (now - lastTime < 30) return; // 缩短节流时间，让墨迹更密集
    lastTime = now;

    if (inkDrops.length >= MAX_DROPS) {
      var old = inkDrops.shift();
      if (old.parentNode) old.parentNode.removeChild(old);
    }

    var drop = document.createElement('div');
    drop.className = 'ancient-ink';

    // 尺寸加大：10-22px
    var size = Math.random() * 12 + 10;
    // 透明度加深：0.25-0.55
    var opacity = Math.random() * 0.3 + 0.25;

    drop.style.left = e.clientX + 'px';
    drop.style.top = e.clientY + 'px';
    drop.style.width = size + 'px';
    drop.style.height = size + 'px';
    drop.style.opacity = opacity;

    document.body.appendChild(drop);
    inkDrops.push(drop);

    // 1秒后淡出
    setTimeout(function() {
      drop.style.opacity = '0';
      setTimeout(function() {
        if (drop.parentNode) drop.parentNode.removeChild(drop);
        var idx = inkDrops.indexOf(drop);
        if (idx > -1) inkDrops.splice(idx, 1);
      }, 500);
    }, 800);
  });
})();

// ====== 二、墨水晕开爆炸特效 ======
(function() {
  'use strict';

  // 墨水颜色：浓墨、淡墨、朱砂、深朱、焦墨
  var inkColors = [
    'rgba(25, 15, 10, 0.9)',    // 浓墨
    'rgba(50, 35, 25, 0.7)',    // 深墨
    'rgba(80, 55, 40, 0.6)',    // 淡墨
    'rgba(184, 59, 59, 0.8)',   // 朱砂
    'rgba(139, 0, 0, 0.7)',     // 深朱
    'rgba(30, 20, 15, 0.85)'    // 焦墨
  ];

  document.addEventListener('click', function(e) {

    // === 1. 中心大墨晕（最关键：模拟墨滴落纸后的晕开） ===
    var mainDrop = document.createElement('div');
    mainDrop.className = 'ancient-ink-burst-main';
    mainDrop.style.left = e.clientX + 'px';
    mainDrop.style.top = e.clientY + 'px';
    mainDrop.style.background = 'radial-gradient(circle, rgba(25,15,10,0.8) 0%, rgba(50,35,25,0.4) 40%, transparent 70%)';
    document.body.appendChild(mainDrop);
    mainDrop.addEventListener('animationend', function() {
      if (mainDrop.parentNode) mainDrop.parentNode.removeChild(mainDrop);
    });

    // === 2. 外圈涟漪（墨水在纸纤维中扩散的波纹） ===
    var ripple = document.createElement('div');
    ripple.className = 'ancient-ink-burst-ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    ripple.style.borderColor = 'rgba(25,15,10,0.3)';
    document.body.appendChild(ripple);
    ripple.addEventListener('animationend', function() {
      if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
    });

    // === 3. 飞溅墨点（大小不一，向四周甩出） ===
    var splashCount = 10;
    for (var i = 0; i < splashCount; i++) {
      var splash = document.createElement('div');
      splash.className = 'ancient-ink-burst-splash';

      // 随机大小：3-12px
      var size = Math.random() * 9 + 3;
      splash.style.width = size + 'px';
      splash.style.height = size + 'px';

      // 随机墨色
      splash.style.background = inkColors[Math.floor(Math.random() * inkColors.length)];

      splash.style.left = e.clientX + 'px';
      splash.style.top = e.clientY + 'px';

      // 随机方向和距离
      var angle = Math.random() * Math.PI * 2;
      var distance = Math.random() * 70 + 30; // 飞出 30-100px
      var tx = Math.cos(angle) * distance;
      var ty = Math.sin(angle) * distance - 15; // 稍微向上偏，模拟重力前的抛射

      splash.style.setProperty('--tx', tx + 'px');
      splash.style.setProperty('--ty', ty + 'px');

      // 随机延迟，让飞溅有先后
      splash.style.animationDelay = (Math.random() * 0.1) + 's';

      document.body.appendChild(splash);
      splash.addEventListener('animationend', function() {
        if (splash.parentNode) splash.parentNode.removeChild(splash);
      });
    }

    // === 4. 极小的墨雾颗粒（营造墨汁飞溅的氛围） ===
    var mistCount = 8;
    for (var j = 0; j < mistCount; j++) {
      var mist = document.createElement('div');
      mist.className = 'ancient-ink-burst-mist';

      var mistSize = Math.random() * 3 + 1.5;
      mist.style.width = mistSize + 'px';
      mist.style.height = mistSize + 'px';
      mist.style.background = inkColors[Math.floor(Math.random() * inkColors.length)];

      mist.style.left = e.clientX + 'px';
      mist.style.top = e.clientY + 'px';

      var mAngle = Math.random() * Math.PI * 2;
      var mDist = Math.random() * 50 + 50; // 飞更远：50-100px
      var mtx = Math.cos(mAngle) * mDist;
      var mty = Math.sin(mAngle) * mDist;

      mist.style.setProperty('--mtx', mtx + 'px');
      mist.style.setProperty('--mty', mty + 'px');
      mist.style.animationDelay = (Math.random() * 0.15) + 's';

      document.body.appendChild(mist);
      mist.addEventListener('animationend', function() {
        if (mist.parentNode) mist.parentNode.removeChild(mist);
      });
    }
  });
})();
