/* Sihat — mashqlar uchun animatsiyali odamcha (o'zimizning chizma, SVG).
 * Har bir mashq bir nechta "holat"dan iborat; holatlar orasida silliq o'tiladi.
 * Bo'g'inlar: h bosh, n yelka, p tos, le/lh uzoq qo'l (tirsak/kaft), re/rh yaqin qo'l,
 * lk/lf uzoq oyoq (tizza/tovon), rk/rf yaqin oyoq. Koordinatalar 200x200 maydonda, pol y=185.
 */
(function () {
  var J = ['h', 'n', 'p', 'le', 'lh', 're', 'rh', 'lk', 'lf', 'rk', 'rf'];

  function P(o) { return o; }
  function mirror(o) { // old ko'rinishda chap-o'ngni almashtirish
    var r = {}; J.forEach(function (k) { r[k] = [200 - o[k][0], o[k][1]]; });
    var t;
    t = r.le; r.le = r.re; r.re = t; t = r.lh; r.lh = r.rh; r.rh = t;
    t = r.lk; r.lk = r.rk; r.rk = t; t = r.lf; r.lf = r.rf; r.rf = t;
    return r;
  }
  function both(o) { // yon ko'rinishda ikkala qo'l/oyoq bir xil
    var r = {}; for (var k in o) r[k] = o[k];
    if (o.e) { r.le = r.re = o.e; r.lh = r.rh = o.a; }
    if (o.k) { r.lk = r.rk = o.k; r.lf = r.rf = o.f; }
    return r;
  }

  // Old ko'rinish, tik turish
  var FRONT = P({ h: [100, 36], n: [100, 58], p: [100, 110], le: [88, 84], lh: [84, 108], re: [112, 84], rh: [116, 108],
    lk: [93, 148], lf: [91, 185], rk: [107, 148], rf: [109, 185] });
  // Yon ko'rinish (o'ngga qarab), tik turish
  var SIDE = both({ h: [102, 36], n: [100, 58], p: [100, 110], e: [101, 84], a: [103, 108], k: [101, 148], f: [99, 185] });
  SIDE.lf = [96, 185];

  // Planka (kaftlarda), yon ko'rinish
  function handPlank(nY, pY, kY, headDy) {
    return { h: [161, nY - 7 + (headDy || 0)], n: [145, nY], p: [95, pY],
      le: [143, (nY + 185) / 2], lh: [143, 185], re: [146, (nY + 185) / 2], rh: [146, 185],
      lk: [67, kY], lf: [40, 183], rk: [68, kY], rf: [41, 183] };
  }

  var EX = {
    jumping: { dur: 420, poses: [FRONT,
      { h: [100, 32], n: [100, 54], p: [100, 106], le: [80, 40], lh: [68, 18], re: [120, 40], rh: [132, 18],
        lk: [82, 145], lf: [70, 183], rk: [118, 145], rf: [130, 183] }] },

    march: { dur: 450, poses: (function () {
      var a = { h: [100, 36], n: [100, 58], p: [100, 110], le: [88, 84], lh: [86, 106], re: [114, 78], rh: [110, 60],
        lk: [93, 148], lf: [91, 185], rk: [108, 124], rf: [110, 158] };
      return [a, mirror(a)];
    })() },

    squat: { dur: 900, poses: [SIDE,
      both({ h: [106, 74], n: [98, 94], p: [78, 140], e: [120, 96], a: [142, 94], k: [114, 146], f: [102, 185] })] },

    lunge: { dur: 900, poses: [SIDE,
      { h: [101, 66], n: [100, 88], p: [100, 136], le: [99, 112], lh: [101, 134], re: [101, 112], rh: [103, 134],
        lk: [86, 174], lf: [62, 183], rk: [126, 142], rf: [128, 185] }] },

    pushup: { dur: 850, poses: [
      { h: [162, 114], n: [145, 122], p: [95, 150], le: [143, 154], lh: [143, 185], re: [146, 154], rh: [146, 185],
        lk: [67, 166], lf: [40, 183], rk: [68, 166], rf: [41, 183] },
      { h: [163, 158], n: [145, 165], p: [95, 173], le: [122, 168], lh: [143, 185], re: [125, 168], rh: [146, 185],
        lk: [67, 178], lf: [40, 183], rk: [68, 178], rf: [41, 183] }] },

    kneepush: { dur: 850, poses: [
      { h: [161, 118], n: [145, 126], p: [104, 158], le: [143, 156], lh: [143, 185], re: [146, 156], rh: [146, 185],
        lk: [72, 182], lf: [48, 164], rk: [73, 182], rf: [49, 164] },
      { h: [162, 157], n: [145, 164], p: [104, 174], le: [123, 167], lh: [143, 185], re: [126, 167], rh: [146, 185],
        lk: [72, 182], lf: [48, 164], rk: [73, 182], rf: [49, 164] }] },

    plank: { dur: 1400, poses: [
      { h: [156, 154], n: [140, 160], p: [92, 171], le: [138, 183], lh: [162, 183], re: [141, 183], rh: [165, 183],
        lk: [66, 176], lf: [40, 183], rk: [67, 176], rf: [41, 183] },
      { h: [156, 152], n: [140, 158], p: [92, 168], le: [138, 183], lh: [162, 183], re: [141, 183], rh: [165, 183],
        lk: [66, 175], lf: [40, 183], rk: [67, 175], rf: [41, 183] }] },

    crunch: { dur: 800, poses: [
      both({ h: [164, 174], n: [148, 178], p: [100, 178], e: [152, 160], a: [162, 166], k: [78, 148], f: [56, 183] }),
      both({ h: [150, 146], n: [138, 160], p: [100, 178], e: [142, 140], a: [151, 148], k: [78, 148], f: [56, 183] })] },

    legraise: { dur: 1100, poses: [
      both({ h: [166, 175], n: [150, 178], p: [100, 178], e: [125, 182], a: [100, 183], k: [70, 180], f: [40, 182] }),
      both({ h: [166, 175], n: [150, 178], p: [100, 178], e: [125, 182], a: [100, 183], k: [98, 144], f: [96, 110] })] },

    bridge: { dur: 1000, poses: [
      both({ h: [166, 177], n: [150, 180], p: [110, 179], e: [130, 183], a: [110, 183], k: [82, 150], f: [70, 183] }),
      both({ h: [166, 177], n: [150, 178], p: [112, 150], e: [130, 183], a: [110, 183], k: [82, 147], f: [70, 183] })] },

    climber: { dur: 380, poses: (function () {
      var a = handPlank(125, 148, 164); a.rk = [124, 160]; a.rf = [104, 181];
      var b = handPlank(125, 148, 164); b.lk = [123, 160]; b.lf = [103, 181];
      return [a, b];
    })() },

    burpee: { dur: 600, poses: [
      SIDE,
      both({ h: [126, 98], n: [114, 112], p: [92, 150], e: [120, 146], a: [124, 183], k: [118, 152], f: [100, 185] }),
      handPlank(125, 150, 166),
      both({ h: [126, 98], n: [114, 112], p: [92, 150], e: [120, 146], a: [124, 183], k: [118, 152], f: [100, 185] }),
      both({ h: [102, 28], n: [100, 50], p: [100, 102], e: [104, 28], a: [106, 8], k: [101, 140], f: [99, 176] })] },

    wallsit: { dur: 1400, wall: 58, poses: [
      both({ h: [68, 80], n: [66, 100], p: [66, 145], e: [80, 122], a: [96, 140], k: [104, 145], f: [104, 185] }),
      both({ h: [68, 79], n: [66, 99], p: [66, 145], e: [80, 121], a: [96, 139], k: [104, 145], f: [104, 185] })] },

    stretch: { dur: 1300, poses: (function () {
      var up = { h: [100, 36], n: [100, 58], p: [100, 110], le: [92, 34], lh: [97, 10], re: [108, 34], rh: [103, 10],
        lk: [93, 148], lf: [91, 185], rk: [107, 148], rf: [109, 185] };
      var right = { h: [119, 44], n: [110, 63], p: [100, 110], le: [113, 39], lh: [133, 22], re: [126, 46], rh: [143, 32],
        lk: [93, 148], lf: [91, 185], rk: [107, 148], rf: [109, 185] };
      return [up, right, up, mirror(right)];
    })() },

    sideplank: { dur: 1400, poses: [
      { h: [158, 126], n: [142, 136], p: [92, 160], le: [140, 112], lh: [140, 88], re: [142, 183], rh: [164, 183],
        lk: [66, 172], lf: [40, 183], rk: [67, 174], rf: [41, 184] },
      { h: [158, 129], n: [142, 139], p: [92, 166], le: [140, 115], lh: [140, 91], re: [142, 183], rh: [164, 183],
        lk: [66, 175], lf: [40, 183], rk: [67, 177], rf: [41, 184] }] }
  };

  function ease(t) { return 0.5 - 0.5 * Math.cos(Math.PI * t); }
  function lerp(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]; }

  function poseAt(def, ms) {
    var n = def.poses.length, seg = def.dur, hold = seg * 0.25, cyc = n * (seg + hold);
    var t = ms % cyc, i = Math.floor(t / (seg + hold)), local = t - i * (seg + hold);
    var a = def.poses[i], b = def.poses[(i + 1) % n];
    var k = local < hold ? 0 : ease((local - hold) / seg);
    var r = {}; J.forEach(function (j) { r[j] = lerp(a[j], b[j], k); });
    return r;
  }

  function pts() { return Array.prototype.map.call(arguments, function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '); }

  var live = [];
  function svg(key, cls) {
    var def = EX[key]; if (!def) return '';
    return '<svg class="exanim ' + (cls || '') + '" data-anim="' + key + '" viewBox="0 0 200 200" aria-hidden="true">' +
      '<rect x="0" y="0" width="200" height="200" rx="22" class="bg"/>' +
      (def.wall ? '<line x1="' + def.wall + '" y1="40" x2="' + def.wall + '" y2="187" class="wall"/>' : '') +
      '<line x1="18" y1="188" x2="182" y2="188" class="floor"/>' +
      '<polyline class="far"/><polyline class="far"/>' +
      '<polyline class="body"/><polyline class="near"/><polyline class="near"/>' +
      '<circle r="12" class="head"/></svg>';
  }

  function paint(el, pose) {
    var l = el.__parts;
    if (!l) {
      var pl = el.querySelectorAll('polyline');
      l = el.__parts = { farArm: pl[0], farLeg: pl[1], body: pl[2], nearArm: pl[3], nearLeg: pl[4], head: el.querySelector('circle') };
    }
    l.farArm.setAttribute('points', pts(pose.n, pose.le, pose.lh));
    l.farLeg.setAttribute('points', pts(pose.p, pose.lk, pose.lf));
    l.body.setAttribute('points', pts(pose.n, pose.p));
    l.nearArm.setAttribute('points', pts(pose.n, pose.re, pose.rh));
    l.nearLeg.setAttribute('points', pts(pose.p, pose.rk, pose.rf));
    l.head.setAttribute('cx', pose.h[0].toFixed(1));
    l.head.setAttribute('cy', pose.h[1].toFixed(1));
  }

  var running = false, start = 0;
  function frame(now) {
    if (!start) start = now;
    var els = document.querySelectorAll('svg.exanim');
    if (!els.length) { running = false; return; }
    for (var i = 0; i < els.length; i++) {
      var el = els[i], def = EX[el.getAttribute('data-anim')];
      if (!def) continue;
      if (el.classList.contains('paused') && el.__parts) continue;
      paint(el, poseAt(def, now - start));
    }
    requestAnimationFrame(frame);
  }
  function wake() { if (!running) { running = true; requestAnimationFrame(frame); } }

  // DOM ga yangi animatsiya qo'shilganda avtomatik ishga tushadi
  if (window.MutationObserver) {
    new MutationObserver(function () { if (document.querySelector('svg.exanim')) wake(); })
      .observe(document.documentElement, { childList: true, subtree: true });
  }

  window.ExAnim = { svg: svg, has: function (k) { return !!EX[k]; }, wake: wake, _poseAt: poseAt, _ex: EX };
})();
