var xmlns = "http://www.w3.org/2000/svg",
  xlinkns = "http://www.w3.org/1999/xlink",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
  wheels = select('.wheels'),
  particleMask = selectAll('.particleMask'),
  mainSVG = select('.mainSVG'),
  dot = select('#dot'),
  vanGroup = select('#vanGroup'),
  pContainer = select('#pContainer'),
  particlePool = [],
  numParticles = 300,
  particleCount = 0

TweenMax.set('svg', {
  visibility: 'visible'
})

TweenMax.set('#cactusBack', {
  x: -50,
  y: 70,
  scale: 0.2,
  alpha: 0.4,
  transformOrigin: '50% 100%'
})
TweenMax.set('#cactusFront', {
  y: 130,
  scale: 0.8,
  transformOrigin: '50% 100%'
})
TweenMax.staggerTo(['#cactusMid1', '#cactusMid2'], 0, {
  scale: 0.5,
  alpha: 0.6,
  transformOrigin: '50% 100%',

  cycle: {
    x: [-40, -400],
    y: [100, 100]
  }
}, 0)

var vanBounceTl = new TimelineMax({
  onUpdate: playParticle,
  repeat: -1,
  yoyo: true
});
vanBounceTl.to(vanGroup, 0.091, {
  y: 1.3,
  //x:3,
  ease: Sine.easeIn

}).to(vanGroup, 0.1, {
  y: -0.3,
  ease: Sine.easeOut,

})

var vanMoveTl = new TimelineMax({
  repeat: -1,
  yoyo: true
});
vanMoveTl.to(vanGroup, 0.34, {
    transformOrigin: '10% 100%',
    rotation: -0.3,
    ease: Sine.easeInOut
  })
  .to([vanGroup], 0.54, {
    rotation: 0.3,
    repeat: 1,
    yoyo: true,
    ease: Sine.easeInOut
  })

var vwheelMoveTl = new TimelineMax({});
vwheelMoveTl.to([wheels], 0.08, {
  y: -2.05,
  transformOrigin: '50% 100%',
  ease: Linear.easeNone,
  repeat: -1,
  yoyo: true
})

var particleMaskTl = new TimelineMax();
particleMaskTl.from(particleMask, 1.5, {
  x: '-=800',
  ease: Linear.easeNone,
  repeat: -1,
  yoyo: false

})
var groundTl = new TimelineMax();
groundTl.to('.ground', 3, {
  x: 800,
  ease: Linear.easeNone,
  repeat: -1,
  yoyo: false

})

var cactusBackTl = new TimelineMax({
  repeat: -1,
  repeatDelay: 0
});
cactusBackTl.to('#cactusBack', 10, {
  x: 850,
  ease: Linear.easeNone
})
var cactusFrontTl = new TimelineMax({
  repeat: -1,
  repeatDelay: 3
});
cactusFrontTl.fromTo('#cactusFront', 2, {
  x: -150

}, {
  x: 850,
  ease: Linear.easeNone
})

var cactusMidTl = new TimelineMax({
  repeat: -1,
  repeatDelay: 2
});
cactusMidTl.staggerTo(['#cactusMid1', '#cactusMid2'], 6, {
  x: '+=1250',
  ease: Linear.easeNone
})

var wheelRimTl = new TimelineMax({
  repeat: -1
})
wheelRimTl.to('.wheelRim', 0.02, {
  transformOrigin: '50% 50%',
  rotation: -72,
  ease: Linear.easeNone
})

function createParticles() {

  var i = numParticles,
    p;
  while (--i > -1) {

    p = document.createElementNS(xmlns, 'use');
    p.setAttributeNS(xlinkns, "xlink:href", '#particle');
    pContainer.appendChild(p);

    p.setAttribute('class', "particle");
    //p.setAttribute('opacity', 0);
    particlePool.push(p);
    TweenMax.set(p, {
      autoAlpha: 0
    })

  }

}

function playParticle() {
  var p = particlePool[particleCount];

  TweenMax.set(p, {
    x: vanGroup._gsTransform.x - 87,
    y: vanGroup._gsTransform.y + 16,
    autoAlpha: 1, 
    scale: randomBetween(6, 10) / 10,
    transformOrigin: '50% 50%'
  });
  var tl = new TimelineMax();
  tl.to(p, randomBetween(2, 5), {
    physics2D: {
      velocity: randomBetween(555, 650),
      angle: randomBetween(-10, 0),
      gravity: randomBetween(0, 10)
    },
    scale: randomBetween(33, 97) / 10,
    onComplete: completeParticle,
    onCompleteParams: [p]

  });

  particleCount++;

  particleCount = (particleCount >= numParticles) ? 0 : particleCount
}

function completeParticle(p) {
  TweenMax.set(p, {
    autoAlpha: 0
  })
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

createParticles();
