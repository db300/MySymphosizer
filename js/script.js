// Audio Variables
var mic
var fft
var vol
var isMic = false
var spectrum, energy;
var micSlider = document.getElementById('micSlider')
var micSliderContainer = document.getElementById('micSliderContainer')
var micThreshold = 1.1
var micOpacity = 0;
var isReady = false;
var isReplaced = false;
var spacesCount;

// Dynamic Type Variables
const container = document.querySelector('#container')
const elInput = document.querySelector('#input')
const elDisplay = document.querySelector('#display')

const colorPicker = document.getElementById('colorpicker')
const bgColorPickerDiv = document.getElementById('color-picker-bg-div')
const fontColorPickerDiv = document.getElementById('color-picker-font-div')
var words = document.getElementsByClassName('words')

var fontSize;
var splitChars
var charnum = 7;
var wornum = 0
var smoothSpectrum = []
var smoothH = []

var isQuiet = true;
var smoothHQuiet = []
var smoothHLoud = []
var finalH = []

var smoothI = 1
var smoothAmount = 0.5
var smoothAmountPre = 0
var smoothVol = 0
var loudSize = 1
var he = 0
var it = 0
var amp = 0
var skew = 0
var smoothSkew = 0
var infoMode = true
var isInitial = true
var noiseVal = 0.0
var noiseOffset = 0.0
var prevState = true
var isBlank = false;

// Menu Variables
var micSliderTimeout;
var slider = document.getElementById('micSlider')
slider.style.setProperty('--SliderColor', 'white')
var isSliderActive = true;
var index = 0
var isTool = true
var isTop = 0
var colors_index = 0
var colors = [
  ['#FCE74D', '#68C1DC'],
  ['#183F25', '#63D13E'],
  ['#E93DE0', '#502827'],
  ['#D2BEAA', '#FCE74D'],
  ['#F09135', '#E93DE0'],
  ['#68C1DC', '#183F25'],
  ['#FCE74D', '#EB4B26'],
  ['#63D13E', '#4F96DC'],
  ['#183F25', '#D89BD8'],
  ['#000000', '#FFFFFF'],
  ['#4F96DC', '#502827'],
  ['#183F25', '#EB4B26'],
  ['#68C1DC', '#FCE74D'],
  ['#63D13E', '#183F25'],
  ['#EB4B26', '#B4B3E5'],
  ['#FCE74D', '#D2BEAA'],
  ['#EB4B26', '#5F6F3C'],
  ['#F0E6E0', '#183F25'],
  ['#8B6945', '#68C1DC'],
  ['#FFFFFF', '#000000'],
  ['#EB4B26', '#502827'],
  ['#4F96DC', '#63D13E'],
  ['#F09135', '#FCE74D'],
  ['#D89BD8', '#183F25'],
  ['#D4E3DE', '#EB4B26'],
  ['#68C1DC', '#8B6945'],
  ['#502827', '#E93DE0'],
  ['#5F6F3C', '#F09135'],
  ['#EB4B26', '#FCE74D'],
  ['#000000', '#FFFFFF'],
  ['#183F25', '#68C1DC'],
  ['#B4B3E5', '#EB4B26'],
  ['#F09135', '#5F6F3C'],
  ['#FCE74D', '#F09135'],
  ['#EB4B26', '#D4E3DE'],
  ['#B4B3E5', '#FCE74D'],
  ['#502827', '#4F96DC'],
  ['#183F25', '#F0E6E0'],
  ['#E93DE0', '#F09135'],
  ['#FCE74D', '#B4B3E5'],
  ['#502827', '#EB4B26'],
  ['#FFFFFF', '#000000'],
]
var activeBtn = null
var isScroll;
var disablemenu = document.getElementById("disablemenu");

// Buttons
var btn_1 = document.getElementById('btn_1')
var btn_2 = document.getElementById('btn_2')
var btn_3 = document.getElementById('btn_3')
var btn_4 = document.getElementById('btn_4')
var btn_5 = document.getElementById('btn_5')
var btn_6 = document.getElementById('btn_6')
var btn_7 = document.getElementById('btn_7')
var btn_8 = document.getElementById('btn_8')
var btn_9 = document.getElementById('btn_9')

function disableButtons() {
  btn_1.disabled = true
  btn_2.disabled = true
  btn_3.disabled = true
  btn_4.disabled = true
  btn_5.disabled = true
  btn_6.disabled = true
  btn_7.disabled = true
  btn_8.disabled = true
  btn_9.disabled = true
}

function enableButtons() {
  menuBar[0].style.animation = '0s normal 1s forwards 1 fadein'
  btn_1.disabled = false
  btn_2.disabled = false
  btn_3.disabled = false
  btn_4.disabled = false
  btn_5.disabled = false
  btn_6.disabled = false
  btn_7.disabled = false
  btn_8.disabled = false
  btn_9.disabled = false
}

function changeClass(object, oldClass, newClass) {
  var regExp = new RegExp('(?:^|\\s)' + oldClass + '(?!\\S)', 'g')
  object.className = object.className.replace(regExp, newClass)
}
changeClass(btn_1, 'cur', 'hover_enabled')

window.addEventListener('resize', checkSize)
elDisplay.addEventListener('touchstart', function (e) { e.preventDefault(); });

function stopAudio() {
  btn_color_3();
  mic.stop();
  isMic = false;
}

// Browser Support Variables
var isSafari

// Setup Functions
function getRandomColorCombination(colors) {
  colors_index = colors_index >= colors.length ? 0 : colors_index
  var random_color = colors[colors_index]
  colors_index++
  return random_color
}

function preload() {
  getAudioContext().suspend()
  checkSize()
}

function setup() {
  micSliderContainer.style.display = 'none'
  slider.style.display = 'none'

  noCanvas()
  frameRate(60)
  mic = new p5.AudioIn()
  isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === '[object SafariRemoteNotification]'
    })(
      !window['safari'] ||
      (typeof safari !== 'undefined' && safari.pushNotification)
    )
  for (var i = 0; i < 1024; i++) {
    smoothSpectrum[i] = 0
  }
  for (var i = 0; i < 15; i++) {
    smoothH[i] = 0
  }
  disableButtons()
  toggle[0].style.transform = 'rotate(45deg)'
}

elInput.onclick = function () {
  isReplaced = true;
  isReady = true;
  spacesCount = 0;
  for (var f = 0; f < smoothH.length; f++) {
    smoothH[f] = 0;
  }
  
  elInput.value = "";
  if (elInput.value == '') {
    carrot = '_';
    var element = document.getElementById("display");
    element.classList.add("blinking");
  } else {
    var element = document.getElementById("display");
    element.classList.remove("blinking");
    isBlank = false;
    carrot = "";
  }
  element.classList.add("blinking");
  elDisplay.innerHTML =
    '<div data-splitting>' +
    Splitting.html({ content: carrot, whitespace: true }) +
    '</div>'

  splitChars = Splitting('.data-splitting .datasplitting')

  $('.splitting .char').css('color', colorFont)
  $('.whitespace').css('margin-left', '2vw')
  wornum = 1

  $('.words').css('transform', 'scale(1)')
  words = document.getElementsByClassName('words')
}

// Get Input Type and Split it
Splitting({ whitespace: true, target: '#loadingscreen' })
Splitting({ whitespace: true, target: '#display' })

splitChars = Splitting({ target: '#display' })

elInput.addEventListener('input', function() {
  resetType();
})

function resetType(){
  isReady = false;
  var carrot = "_";
  elInput.value = document
    .querySelector('#input')
    .value.replace(/[$@^*%#~/<>"'\[\]\\]/gi, '')

  for (var i = 0; i < smoothH.length; i++) {
    smoothH[i] = 0;
  }
  if (elInput.value == '') {
    carrot = '_';
    var element = document.getElementById("display");
    element.classList.add("blinking");
  } else {
    var element = document.getElementById("display");
    element.classList.remove("blinking");
    isBlank = false;
    carrot = "";
  }
  var v = elInput.value;
  spacesCount = char_count(v, ' ');

  elDisplay.innerHTML =
    '<div data-splitting>' +
    Splitting.html({ content: elInput.value + carrot, whitespace: true }) +
    '</div>'

  splitChars = Splitting('.data-splitting .datasplitting')
  $('.splitting .char').css('color', colorFont)
  $('.whitespace').css('margin-left', '2vw')
  wornum = 1
  words = document.getElementsByClassName('words')
}

function sliderHover() {
  var isOver = false;
  if (winMouseY > windowHeight - 200 && winMouseY < windowHeight - 100 && winMouseX < windowWidth / 2 + 200 && winMouseX > windowWidth / 2 - 200) {
    isOver = true;
  }
  if (winMouseY > windowHeight - 200 && winMouseY < windowHeight && winMouseX < windowWidth / 2 - 160 && winMouseX > windowWidth / 2 - 230) {
    isOver = true;
  }

  if (isMic && isTool && isOver) {
    micOpacity = constrain(lerp(micOpacity, 1, .2), .00001, 1);
    micSliderContainer.style.opacity = micOpacity;
  } else {
    micOpacity = constrain(lerp(micOpacity, 0, .2), .00001, 1);
    micSliderContainer.style.opacity = micOpacity;
  }
}

function draw() {
  if (!isMobile) {
    sliderHover();
  }

  // split text each loop
  $('.splitting .char').css('color', colorFont)
  $('.splitting .whitespace').css('color', colorFont)

  // calculate font size
  charnum = splitChars[wornum].chars.length;
  var max = map(charnum, 0, 15, 1.8, 1)

  fontSize = constrain((windowWidth / 8) * max, 20, windowHeight * .12);

  if (isMic && !isReady) {
    // get volume from adding height
    vol = 0

    for (var f = 0; f < smoothH.length; f++) {
      vol += smoothH[f];
    }
    vol = map(vol, -750, 2300, 0, 1);

    var volmap = 1;
    // calibration
    switch (charnum) {
      case 1: volmap = 3.1; break;
      case 2: volmap = 2.6; break;
      case 3: volmap = 2.3; break;
      case 4: volmap = 2; break;
      case 5: volmap = 1.79; break;
      case 6: volmap = 1.63; break;
      case 7: volmap = 1.5; break;
      case 8: volmap = 1.4; break;
      case 9: volmap = 1.3; break;
      case 10: volmap = 1.2; break;
      case 11: volmap = 1.1; break;
      case 12: volmap = 1.05; break;
      default: volmap = 1; break;
    }
    vol = vol * volmap;

    // Calculate First Stage Italics
    if (vol > .82) {
      smoothI = lerp(smoothI, EaseOut(vol) * 40, 0.15)
    } else {
      smoothI = lerp(smoothI, 0, 0.15)
    }

    // Calculate Second Stage Skew and Scale
    if (vol > .98) {
      smoothSkew = lerp(smoothSkew, -0.9, 0.18)
      loudSize = lerp(loudSize, 4, 0.18)
    } else {
      smoothSkew = lerp(smoothSkew, 0, 0.18)
      loudSize = lerp(loudSize, 1, 0.18)
    }

    // Get Audio Spectrum and normalize the bands
    spectrum = fft.analyze()
    for (var i = 0; i < spectrum.length; i++) {
      smoothSpectrum[i] = EaseOut(Normalize(spectrum[i]) * micThreshold * 1.1)
    }
  }

  for (var i = 0; i < charnum; i++) {
    if (isMic && !isReady) {
      try {
        var charnummod;
        if(!isReplaced) {
          charnummod = 15;
        } else {
          charnummod = charnum + spacesCount;
        }
        var band;
        if(charnum < 10){
          band = int(map(charnummod, 2, 12, 150, 64));
        } else {
          band = int(map(charnummod, 0, 14, 512, 64));
        }
        smoothH[i] = lerp(smoothH[i], map(fft.getEnergy(int(i * band + 400), int(i * band + band + 400)), 0, 255, 0, 400) - 100 * (micThreshold * 1.1), 0.3);
      }
      catch (err) {
        console.error("isMic :" + err.message);
      }
    }
    // mouse control
    if (!isMic) {
      var segment = windowWidth / charnum + 1
      var xx = map(charnum, 1, 15, -6, 6)
      var mx = map(
        mouseX - segment * 1.5,
        0,
        windowWidth + segment * xx,
        0,
        windowWidth
      )
      var d = dist(mx, 0, segment * 0.5 * (i + 1), 0)
      he = map(d, 0, segment * 1.5, 100, 0)
      it = map(winMouseY, 200, windowHeight - 200, 30, 0)

      smoothH[i] = lerp(smoothH[i], he, 0.3)
      smoothI = lerp(smoothI, it, 0.3)
      smoothSkew = lerp(smoothSkew, 0, 0.07)
    }

    // set font properties for each letter
    try {
      splitChars[wornum].chars[i].style.fontSize = fontSize + 'px';
      var ytuValue = constrain(smoothH[i], 10, 100);
      splitChars[wornum].chars[i].style.fontVariationSettings = "'YTUC'" + ytuValue + '';
      splitChars[wornum].chars[i].style.transform = 'skew(' + smoothSkew + 'rad)';
    } catch (err) {
      console.error("splitChars :" + err.message);
    }
  }

  // set the scale to words
  for (var h = 0; h < words.length; h++) {
    words[h].style.transform = 'scale(' + loudSize + ')'
  }

  if (windowWidth < 900 && windowHeight < 400) {
    top = -5;
  }
}

// Elements
var btn_play = document.getElementById('btn_play')
var loadingtype = document.getElementById('loadingscreen')
var tutorialscreen = document.getElementById('tutorialscreen')
var tooltips = document.getElementById('tooltips')
var toggle = document.getElementsByClassName('toggle')
var menuBar = document.getElementsByClassName('menu')
var nav = document.getElementById('nav')

var isMobile = (function isMobile() {
  var userAgentInfo = navigator.userAgent
  var mobileAgents = [
    'Android',
    'iPhone',
    'SymbianOS',
    'Windows Phone',
    'iPad',
    'iPod',
  ]

  var mobile_flag = false

  for (var v = 0; v < mobileAgents.length; v++) {
    if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
      mobile_flag = true
      break
    }
  }
  var screen_width = window.screen.width
  var screen_height = window.screen.height

  if (screen_width < 500 && screen_height < 800) {
    mobile_flag = true
  }

  return mobile_flag
})()

if (isMobile) {
  micThreshold = 2.2;
  window.addEventListener('pagehide', btn_color_3);

  btn_1.ontouchmove = function () { isScroll = false; }
  btn_1.ontouchstart = function () { isScroll = true; }
  btn_1.ontouchend = function () {
    if (isScroll) {
      btn_color_1()
      btn_1.className = ''
      btn_1.style.backgroundColor = colorBG
      btn_1.childNodes[1].style.fill = colorFont
      btn_4.className = ''
      btn_4.style.backgroundColor = colorBG
      btn_4.childNodes[1].style.fill = colorFont
      btn_5.className = ''
      btn_5.style.backgroundColor = colorBG
      btn_5.childNodes[1].style.fill = colorFont
    }
  }
  btn_2.ontouchmove = function () { isScroll = false; }
  btn_2.ontouchstart = function () { isScroll = true; }
  btn_2.ontouchend = function () { if (isScroll) btn_color_2() }

  btn_3.ontouchmove = function () { isScroll = false; }
  btn_3.ontouchstart = function () { isScroll = true; }
  btn_3.ontouchend = function () { if (isScroll) btn_color_3() }

  btn_4.ontouchmove = function () { isScroll = false; }
  btn_4.ontouchstart = function () { isScroll = true; }
  btn_4.ontouchend = function () { if (isScroll) btn_color_4() }

  btn_5.ontouchmove = function () { isScroll = false; }
  btn_5.ontouchstart = function () { isScroll = true; }
  btn_5.ontouchend = function () { if (isScroll) btn_color_5() }

  btn_6.ontouchmove = function () { isScroll = false; }
  btn_6.ontouchstart = function () { isScroll = true; }
  btn_6.ontouchend = function () { if (isScroll) btn_color_6() }

  btn_7.ontouchmove = function () { isScroll = false; }
  btn_7.ontouchstart = function () { isScroll = true; }
  btn_7.ontouchend = function () { if (isScroll) btn_color_7() }

  btn_8.ontouchmove = function () { isScroll = false; }
  btn_8.ontouchstart = function () { isScroll = true; }
  btn_8.ontouchend = function () { if (isScroll) btn_color_8() }

  btn_9.ontouchmove = function () { isScroll = false; }
  btn_9.ontouchstart = function () { isScroll = true; }
  btn_9.ontouchend = function () {
    if (isScroll) {
      $('#nav').show().find('.nav').css('animation', 'none')
      $('.menu-box').scrollLeft(0)
      btn_color_9()
    }
  }
} else {
  micThreshold = 1.25;
  btn_1.onmousedown = function () { btn_color_1() }
  btn_2.onclick = function () { btn_color_2() }
  btn_3.onclick = function () { btn_color_3() }
  btn_4.onmousedown = function () { btn_color_4() }
  btn_5.onmousedown = function () { btn_color_5() }
  btn_6.onmousedown = function () { btn_color_6() }
  btn_7.onmousedown = function () { btn_color_7() }
  btn_8.onmousedown = function () { btn_color_8() }
  btn_9.onmousedown = function () {
    $('#nav').show().find('.nav').css('animation', 'none')
    $('.menu-box').scrollLeft(0)
    btn_color_9()
  }
}

btn_1.onmouseup = function () {
  btn_1.className = ''
  btn_1.style.backgroundColor = colorBG
  btn_1.childNodes[1].style.fill = colorFont
  btn_4.className = ''
  btn_4.style.backgroundColor = colorBG
  btn_4.childNodes[1].style.fill = colorFont
  btn_5.className = ''
  btn_5.style.backgroundColor = colorBG
  btn_5.childNodes[1].style.fill = colorFont
}

function btn_color_1() {
  colorPicker.style.pointerEvents = 'none'
  bgColorPickerDiv.style.display = 'none'
  fontColorPickerDiv.style.display = 'none'
  slider.style.display = 'inline'

  swapColor(btn_2)
  if(isTop == 1){
    setCur('btn_8')
    swapColor(btn_8)
  } else {
    setCur('btn_7')
    swapColor(btn_7)
  }

  swapColor(btn_1)
  toggleToolbar()
}

function btn_color_2() {
  colorPicker.style.pointerEvents = 'none'
  bgColorPickerDiv.style.display = 'none'
  fontColorPickerDiv.style.display = 'none'
  swapColor(btn_2)
  startAudio()
  micSliderContainer.style.opacity = '1'
  slider.style.display = 'inline'
  micSliderContainer.style.display = 'flex'
  slider.style.animation = 'none'
  micSliderContainer.style.animation = 'none'
}

function btn_color_3() {
  colorPicker.style.pointerEvents = 'none'
  bgColorPickerDiv.style.display = 'none'
  fontColorPickerDiv.style.display = 'none'
  micSliderContainer.style.display = 'none'
  slider.style.display = 'none'
  swapColor(btn_3)
  mic.stop()
  isMic = false
  smoothSkew = 0
}

function btn_color_4() {
  colorPicker.style.pointerEvents = 'auto'
  slider.style.display = 'none'
  micSliderContainer.style.display = 'none'

  swapColor(btn_4)
  if (fontColorPickerDiv.style.display !== 'none') {
    fontColorPickerDiv.style.display = 'none'
    btn_4.className = ''
    btn_4.style.backgroundColor = colorBG
    btn_4.childNodes[1].style.fill = colorFont
  } else {
    fontColorPickerDiv.style.display = 'inline'
    bgColorPickerDiv.style.display = 'none'
  }
  $('.color-picker-wrap ul').css('border-color', colorFont)
  $('.color-picker-wrap li').removeClass('disabled')
  $('#color-picker-font-div [title="' + colorFont + '"')
    .addClass('active')
    .find('span')
    .css('background-color', colorBG)
  $('#color-picker-font-div [title="' + colorBG + '"')
    .addClass('disabled')
    .find('.st0')
    .css('fill', colorBG)
  $('#color-picker-font-div [title="' + colorBG + '"')
    .addClass('disabled')
    .find('.st1')
    .css('fill', colorFont)
}

function btn_color_5() {
  colorPicker.style.pointerEvents = 'auto'
  slider.style.display = 'none'
  micSliderContainer.style.display = 'none'

  swapColor(btn_5)

  if (bgColorPickerDiv.style.display !== 'none') {
    bgColorPickerDiv.style.display = 'none'
    btn_5.className = ''
    btn_5.style.backgroundColor = colorBG
    btn_5.childNodes[1].style.fill = colorFont
  } else {
    bgColorPickerDiv.style.display = 'inline'
    fontColorPickerDiv.style.display = 'none'
  }

  $('.color-picker-wrap ul').css('border-color', colorFont)
  $('.color-picker-wrap li').removeClass('disabled')
  $('#color-picker-bg-div [title="' + colorBG + '"')
    .addClass('active')
    .find('span')
    .css('background-color', colorFont)
  $('#color-picker-bg-div [title="' + colorFont + '"').addClass('disabled')

  $('#color-picker-bg-div [title="' + colorFont + '"')
    .addClass('disabled')
    .find('.st0')
    .css('fill', colorFont)
  $('#color-picker-bg-div [title="' + colorFont + '"')
    .addClass('disabled')
    .find('.st1')
    .css('fill', colorBG)
}

function btn_color_6() {
  colorPicker.style.pointerEvents = 'none'
  randomColor();
}

btn_6.onmouseup = function () {
  btn_6.className = ''
  btn_6.style.backgroundColor = colorBG
  btn_6.childNodes[1].style.fill = colorFont
}

function btn_color_7() {
  $('#display').removeClass('displaytop')
  colorPicker.style.pointerEvents = 'none'
  bgColorPickerDiv.style.display = 'none'
  fontColorPickerDiv.style.display = 'none'

  swapColor(btn_7)
  this.className += ' active'
  isTop = 0
}

function btn_color_8() {
  colorPicker.style.pointerEvents = 'none'
  bgColorPickerDiv.style.display = 'none'
  fontColorPickerDiv.style.display = 'none'

  swapColor(btn_8)
  this.className += ' active'
  isTop = 1
  $('#display').addClass('displaytop')
}

btn_9.onmouseup = function () {
  btn_9.className = ''
  btn_9.style.backgroundColor = colorBG
  btn_9.childNodes[1].style.fill = colorFont
  btn_4.className = ''
  btn_4.style.backgroundColor = colorBG
  btn_4.childNodes[1].style.fill = colorFont
  btn_5.className = ''
  btn_5.style.backgroundColor = colorBG
  btn_5.childNodes[1].style.fill = colorFont
}

function btn_color_9() {
  if (!isMobile) {
    var disablemenu = document.getElementById("disablemenu");
    disablemenu.style.backgroundColor = colorBG;
    disablemenu.style.height = '300px';
  }

  toggle[0].style.transform = 'rotate(45deg)'
  slider.style.display = 'none'
  micSliderContainer.style.display = 'none'

  colorPicker.style.pointerEvents = 'none'
  bgColorPickerDiv.style.display = 'none'
  fontColorPickerDiv.style.display = 'none'

  swapColor(btn_9)
  toggleInfo()

  btn_2.className = ''
  btn_3.className = ''
  btn_7.className = ''
  btn_8.className = ''
  btn_2.style.backgroundColor = colorBG
  btn_2.childNodes[1].style.fill = colorFont
  btn_3.style.backgroundColor = colorBG
  btn_3.childNodes[1].style.fill = colorFont
  btn_7.style.backgroundColor = colorBG
  btn_7.childNodes[1].style.fill = colorFont
  btn_8.style.backgroundColor = colorBG
  btn_8.childNodes[1].style.fill = colorFont

  $('.menu-btns li svg').show()
  $('#tooltips').css({ opacity: 1, animation: 'none' })
  $('.st6').css('fill', colorFont)
  $('.st7').css('stroke', colorFont)
  $('#btn_play').css('color', colorFont)
}

function toggleInfo() {
  if (infoMode) {
    enableButtons()
    $('#tutorial').modal('hide')
    if (windowWidth > 900) {
      tooltips.style.opacity = '0'
      nav.style.opacity = 0
    } else {
      tooltips.style.opacity = '1'
    }
    container.style.opacity = '1'
  } else {
    disableButtons()
    if (windowWidth > 900) {
      nav.style.opacity = 1
      tooltips.style.opacity = '1'
    } else {
      menuBar[0].style.animation = 'normal forwards 1 fadeout'
      tooltips.style.opacity = '0'
    }
    container.style.opacity = '0'
    $('#tutorial').modal('show')
  }

  infoMode = !infoMode
}

function toggleToolbar() {
  if (isTool) {
    toggle[0].style.transform = 'rotate(45deg)'
    btn_1.style.position = 'absolute'
    btn_1.style.left = '40px'
    btn_1.style.bottom = '0px'
    nav.style.opacity = 0
    btn_2.style.opacity = '0'
    btn_3.style.opacity = '0'
    btn_4.style.opacity = '0'
    btn_5.style.opacity = '0'
    btn_6.style.opacity = '0'
    btn_7.style.opacity = '0'
    btn_8.style.opacity = '0'
    btn_9.style.opacity = '0'
    micSliderContainer.style.display = 'none'
    slider.style.display = 'none'
    setTimeout(function () {
      btn_2.style.display = 'none'
      btn_3.style.display = 'none'
      btn_4.style.display = 'none'
      btn_5.style.display = 'none'
      btn_6.style.display = 'none'
      btn_7.style.display = 'none'
      btn_8.style.display = 'none'
      btn_9.style.display = 'none'
    }, 200)
  } else {
    toggle[0].style.transform = 'rotate(0deg)'

    if (windowWidth > 900) {
      btn_1.style.position = 'absolute'
      btn_1.style.left = '40px'
      btn_1.style.bottom = '0px'
    } else {
      btn_1.style.position = 'relative'
      btn_1.style.left = '0px'
      btn_1.style.bottom = '0px'
    }
    btn_2.style.display = 'block'
    btn_3.style.display = 'initial'
    btn_4.style.display = 'inline'
    btn_5.style.display = 'inline'
    btn_6.style.display = 'inline'
    btn_7.style.display = 'inline'
    btn_8.style.display = 'inline'
    btn_9.style.display = 'inline'

    btn_2.style.opacity = '1'
    btn_3.style.opacity = '1'
    btn_4.style.opacity = '1'
    btn_5.style.opacity = '1'
    btn_6.style.opacity = '1'
    btn_7.style.opacity = '1'
    btn_8.style.opacity = '1'
    btn_9.style.opacity = '1'

    micSliderContainer.style.opacity = '1'
    slider.style.display = 'inline'
    micSliderContainer.style.display = 'flex'
    slider.style.animation = 'none'
    micSliderContainer.style.animation = 'none'
  }
  isTool = !isTool
}

function checkSize() {
  var titleText = document.getElementById('tutorialscreen')
  var subText1 = document.getElementById('subText1')
  var subText2 = document.getElementById('subText2')

  if (windowWidth < 900) {
    titleText.innerHTML =
      "<p>TURN ON YOUR MIC. <br> TYPE SOMETHING. <br> MAKE SOME NOISE. <p> <button type='button'class='btn_play' id='btn_play' data-dismiss='modal'>PLAY</button>"
    tooltips.style.opacity = '0'
    $('.menu-btns li>svg').css('opacity', 0)
    nav.style.opacity = 0
  } else {
    if (infoMode) {
      nav.style.opacity = 1
    }
    if (tooltips.style.opacity == 0) {
      tooltips.style.opacity = '1'
      $('.menu-btns li>svg').css('opacity', 1)
    }
    titleText.innerHTML =
      "TURN ON YOUR MIC. <br> TYPE SOMETHING. <br> MAKE SOME NOISE.<button type='button'class='btn_play' id='btn_play' data-dismiss='modal'>PLAY</button>"
  }

  if (windowWidth < 1100) {
    subText1.innerHTML =
      'SOUND ACTIVATED<br> TYPOGRAPHIC INSTRUMENT'
    subText2.innerHTML =
      'CREATED BY COLLINS WITH <br>IVAN CRUZ, DINAMO AND SF SYMPHONY'
  } else {
    subText1.innerHTML =
      'SOUND ACTIVATED<br> TYPOGRAPHIC INSTRUMENT'
    subText2.innerHTML =
      'CREATED BY COLLINS WITH <br>IVAN CRUZ, DINAMO AND SF SYMPHONY'
  }

  btn_play = document.getElementById('btn_play')
  btn_play.onclick = function () {
    if (!isMobile) {
      var disablemenu = document.getElementById("disablemenu");
      disablemenu.style.backgroundColor = colorBG;
      disablemenu.style.height = '0px';
    } else {
      $('.disablemenu').removeClass();
    }

    $('#nav').hide()
    isInitial = false
    toggleToolbar()
    startAudio()
    enableButtons()
    infoMode = false
    if(isTop == 1){
      btn_color_8();
    } else {
      btn_color_7();
    }

    const modal = document.getElementsByClassName('modal-dialog')
    modal[0].style.transition = 'transform .3s ease-out'

    btn_1.className = ''
    btn_1.style.backgroundColor = colorBG
    btn_1.childNodes[1].style.fill = colorFont

    btn_9.className = ''
    btn_9.style.backgroundColor = colorBG
    btn_9.childNodes[1].style.fill = colorFont
    $('.menu-btns li>svg').hide()

    container.style.opacity = '1'
    loadingtype.style.display = 'none'
    loadingtype.remove()
    tutorialscreen.style.animation = '100ms ease 0s normal forwards 1 fadein'

    tooltips.style.animation = 'normal forwards 1 fadeout'

    setTimeout(function () {
      btn_9.style.zIndex = 1300
    }, 200)
  }

  $('#btn_play').css('color', colorFont)
  $('#btn_play').css('border-color', colorFont)
}

function startAudio() {
  userStartAudio()
  mic.start()
  fft = new p5.FFT(0.9, 1024)
  fft.setInput(mic)
  isMic = true
}

function randomColor() {
  colorpicker.style.pointerEvents = 'none'
  bgColorPickerDiv.style.display = 'none'
  fontColorPickerDiv.style.display = 'none'

  $('#colorpicker li').removeClass('active').removeClass('disabled')
  var randomColorCombination = getRandomColorCombination(colors)
  colorFont = randomColorCombination[0]
  colorBG = randomColorCombination[1]

  $('html').css('background', randomColorCombination[1])
  $('body').css('background', randomColorCombination[1])
  $('::selection').css('color', randomColorCombination[1])
  $('.btn_play ').css('background-color', randomColorCombination[1])
  $('svg').css('fill', randomColorCombination[0])
  $('.nav').css('color', randomColorCombination[0])
  $('.splitting .char').css('color', randomColorCombination[0])
  $('button').css('border-color', randomColorCombination[0])
  $('#Layer_2').css('fill', randomColorCombination[0])
  $('#tutorialscreen').css('color', randomColorCombination[0])
  $('.st1').css('fill', randomColorCombination[0])
  $('.st0').css('stroke', randomColorCombination[0])
  $('.micSliderBox').css('border', '1px solid' + randomColorCombination[0])
  $('#micSlider').css('background', randomColorCombination[0])

  var slider = document.getElementById('micSlider')
  slider.style.setProperty('--SliderColor', '' + randomColorCombination[0])

  swapColor(btn_6)
}

function setCur(el) {
  $('#' + el).addClass('cur')
}

function swapColor(btn) {
  let id = btn.id
  let btns = document.querySelectorAll('.menu button')

  setCur(id)
  if (id == 'btn_2') {
    $(btn_3).removeClass('cur')
  } else if (id == 'btn_3') {
    $(btn_2).removeClass('cur')
  } else if (id == 'btn_7') {
    $(btn_8).removeClass('cur')
  } else if (id == 'btn_8') {
    $(btn_7).removeClass('cur')
  } else if (id == 'btn_4') {
    $(btn_5).removeClass('cur')
    $(btn_6).removeClass('cur')
  } else if (id == 'btn_5') {
    $(btn_4).removeClass('cur')
    $(btn_6).removeClass('cur')
  } else if (id == 'btn_6') {
    $(btn_4).removeClass('cur')
    $(btn_5).removeClass('cur')
  } else if (id == 'btn_9') {
    $(btn_9).removeClass('cur')
    $(btn_4).removeClass('cur')
    $(btn_5).removeClass('cur')
  }

  btns.forEach(function(el) {
    if (el.className.indexOf('cur') > -1) {
      el.style.backgroundColor = colorFont
      el.childNodes[1].style.fill = colorBG
    } else {
      el.style.backgroundColor = colorBG
      el.childNodes[1].style.fill = colorFont
    }
  })
}

// micslider
micSlider.oninput = function () {
  if (isMobile) {
    micThreshold = map(this.value, 0, 100, 2.2 + 1.5, 2.2 - 2.5);
  } else {
    micThreshold = map(this.value, 0, 100, 1.8 + 1.5, 1.8 - 1.5);
  }
}

micSliderContainer.onmouseenter = function () {
  isSliderActive = false;
}
micSliderContainer.onmouseleave = function () {
  if (!isSliderActive) {
  }
}

// Easing Functions
function EaseIn(t) {
  return t * t
}

function Flip(x) {
  return 1 - x
}

function EaseOut(t) {
  return Flip(EaseIn(Flip(t)))
}

function Normalize(n) {
  return map(n, 0, 1024, 0, 1)
}

// character counter
function char_count(str, letter) {
  var letter_Count = 0;
  for (var position = 0; position < str.length; position++) {
    if (str.charAt(position) == letter) {
      letter_Count += 1;
    }
  }
  return letter_Count;
}
