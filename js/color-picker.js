var colorFont = '#FFFFFF'
var colorBG = '#000000'
jQuery(document).ready(function ($) {
  $color_list = [
    { color: '#FFFFFF' },
    { color: '#000000' },
    { color: '#F0E6E0' },
    { color: '#D2BEAA' },
    { color: '#502827' },
    { color: '#8B6945' },
    { color: '#B19563' },
    { color: '#FCE74D' },
    { color: '#F09135' },
    { color: '#EB4B26' },
    { color: '#970632' },
    { color: '#E93DE0' },
    { color: '#D89BD8' },
    { color: '#AA8AE5' },
    { color: '#B4B3E5' },
    { color: '#4F96DC' },
    { color: '#68C1DC' },
    { color: '#D4E3DE' },
    { color: '#5F6F3C' },
    { color: '#183F25' },
    { color: '#63D13E' },
    { color: '#AECDB3' },
  ]

  $('.color-picker').wrap('<div class="color-picker-wrap"></div>')
  $('.color-picker-wrap').each(function () {
    var self = $(this)

    if (self.children('.color-picker').hasClass('cp-sm')) {
      self.addClass('cp-sm')
    } else if (self.children('.color-picker').hasClass('cp-lg')) {
      self.addClass('cp-lg')
    }

    self.append('<ul></ul><input type="color" style="display:none;" />')

    var $foundactive = false

    for (var i = 0; i < $color_list.length; i++) {
      var $active = ''

      if (self.children('.color-picker').val() == $color_list[i].color) {
        $active = 'class="active"'
        $foundactive = true

        if (self.children('.color-picker').hasClass('cp-show')) {
          self.children('small').remove()
          self.append(
            '<small>Selected Color: <code>' +
              $color_list[i].color +
              '</code></small>'
          )
        }
      }

      self
        .children('ul')
        .append(
          '<li ' +
            $active +
            ' style="background-color:' +
            $color_list[i].color +
            '" title="' +
            $color_list[i].color +
            '"><span></span><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve"><style type="text/css"></style><g><g><polygon class="st0" points="500.6,0.2 385.8,0.2 500.6,115 "/><polygon class="st0" points="0.6,385 0.6,500.2 115.9,500.2 "/><polygon class="st0" points="304.8,500.2 0.6,196 0.6,370.8 130,500.2 "/><polygon class="st0" points="500.6,318.1 182.7,0.2 7.9,0.2 500.6,492.9 "/><polygon class="st0" points="500.6,129.2 371.6,0.2 196.8,0.2 500.6,304 "/><polygon class="st0" points="493.7,500.2 0.6,7.1 0.6,181.9 318.9,500.2 "/><polygon class="st1" points="130,500.2 0.6,370.8 0.6,385 115.9,500.2 "/><polygon class="st1" points="318.9,500.2 0.6,181.9 0.6,196 304.8,500.2 "/><polygon class="st1" points="500.6,500.2 500.6,492.9 7.9,0.2 0.6,0.2 0.6,7.1 493.7,500.2 "/><polygon class="st1" points="500.6,304 196.8,0.2 182.7,0.2 500.6,318.1 "/><polygon class="st1" points="500.6,115 385.8,0.2 371.6,0.2 500.6,129.2 "/></g></g></svg></li>'
        )
    }

    if (!$foundactive && self.children('.color-picker').val() != '') {
      self
        .children('ul')
        .append(
          '<li class="active" title="Custom Color ' +
            self.children('.color-picker').val() +
            '" style="background-color:' +
            self.children('.color-picker').val() +
            '"><span></span></li>'
        )

      if (self.children('.color-picker').hasClass('cp-show')) {
        self.children('small').remove()
        self.append(
          '<small>Selected Color: <code>' +
            self.children('.color-picker').val() +
            '</code></small>'
        )
      }
    }
  })

  $('.color-picker-wrap ul').on('click', 'li', function () {
    const fontColorPickerDiv = document.getElementById('color-picker-font-div')
    const bgColorPickerDiv = document.getElementById('color-picker-bg-div')
    var self = $(this)
    if (!self.hasClass('add_new')) {
      if (!self.hasClass('active')) {
        self.siblings().removeClass('active')
        var color = rgb2hex(self.css('backgroundColor'))
        const pickerDivId = self
          .parents('.color-picker-wrap')
          .parent()
          .attr('id')

        if (pickerDivId == 'color-picker-bg-div') {
          $('html').css('background', color)
          $('body').css('background', color)
          $('button').css('background-color', color)
          $('::selection').css('color', color)
          $('.btn_play ').css('background-color', color)
          self.find('span').css('background-color', colorFont)
          $('.st1').css('fill', colorFont)
          $('.st0').css('stroke', colorFont)

          bgColorPickerDiv.style.display = 'none'
          colorBG = color
          btn_5.className = ''
          btn_5.style.backgroundColor = colorBG
          btn_5.childNodes[1].style.fill = colorFont
        } else if (pickerDivId == 'color-picker-font-div') {
          $('.nav').css('color', color)
          $('.splitting .char').css('color', color)
          $('.splitting .whitespace').css('color', color)
          $('button').css('border-color', color)
          $('button').css('color', color)
          $('svg').css('fill', color)
          $('#Layer_2').css('fill', color)
          $('.tutorialToolTip').css('color', color)
          $('.st1').css('fill', color)
          $('.st0').css('stroke', color)

          $('.st6').css('fill', color)
          $('.st7').css('stroke', color)

          $('.tutorial').css('color', color)

          $('.micSliderBox').css('border', '1px solid' + color)
          $('#micSlider').css('background', color)

          var slider = document.getElementById('micSlider')
          slider.style.setProperty('--SliderColor', '' + color)

          self.find('span').css('background-color', colorBG)
          fontColorPickerDiv.style.display = 'none'
          colorFont = color

          btn_4.className = ''
          btn_4.style.backgroundColor = colorBG
          btn_4.childNodes[1].style.fill = colorFont
        }
        swapColor('')
        self.parents('.color-picker-wrap').children('.color-picker').val(color)
        self.addClass('active')
        if (
          self
            .parents('.color-picker-wrap')
            .children('.color-picker')
            .hasClass('cp-show')
        ) {
          self.parents('.color-picker-wrap').children('small').remove()
          self
            .parents('.color-picker-wrap')
            .append('<small>Selected Color: <code>' + color + '</code></small>')
        }
      }
    } else {
      self
        .parents('.color-picker-wrap')
        .children("input[type='color']")
        .trigger('click')
    }
  })

  $(".color-picker-wrap input[type='color']").on('change', function () {
    var self = $(this)
    self
      .parents('.color-picker-wrap')
      .children('ul')
      .children('li')
      .removeClass('active')

    self
      .parents('.color-picker-wrap')
      .children('ul')
      .append(
        '<li class="active" title="Custom Color ' +
          self.val() +
          '" style="background-color:' +
          self.val() +
          '"></li>'
      )

    self.parents('.color-picker-wrap').children('.color-picker').val(self.val())

    if (
      self
        .parents('.color-picker-wrap')
        .children('.color-picker')
        .hasClass('cp-show')
    ) {
      self.parents('.color-picker-wrap').children('small').remove()
      self
        .parents('.color-picker-wrap')
        .append(
          '<small>Selected Color: <code>' + self.val() + '</code></small>'
        )
    }
  })

  var hexDigits = new Array(
    '0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'
  )

  function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
    return (
      '#' +
      hex(rgb[1]).toLocaleUpperCase() +
      hex(rgb[2]).toLocaleUpperCase() +
      hex(rgb[3]).toLocaleUpperCase()
    )
  }

  function hex(x) {
    return isNaN(x) ? '00' : hexDigits[(x - (x % 16)) / 16] + hexDigits[x % 16]
  }
})
