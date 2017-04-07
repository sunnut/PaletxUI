;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="px-icon-calendar" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M819.2 204.8v51.2h51.2v102.4H153.6V256h51.2V204.8H102.4v716.8h819.2V204.8h-102.4z m51.2 665.6H153.6V409.6h716.8v460.8z" fill="" ></path>' +
    '' +
    '<path d="M358.4 204.8h307.2v51.2H358.4zM819.2 460.8H204.8v358.4h614.4V460.8z m-460.8 307.2H256v-51.2h102.4v51.2z m0-102.4H256v-51.2h102.4v51.2z m0-102.4H256v-51.2h102.4v51.2z m256 204.8H409.6v-51.2h204.8v51.2z m0-102.4H409.6v-51.2h204.8v51.2z m0-102.4H409.6v-51.2h204.8v51.2z m153.6 204.8h-102.4v-51.2h102.4v51.2z m0-102.4h-102.4v-51.2h102.4v51.2z m0-102.4h-102.4v-51.2h102.4v51.2zM256 102.4h51.2v153.6H256zM716.8 102.4h51.2v153.6h-51.2z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="px-icon-plus" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M870.4 471.04h-317.44V153.6H471.04v317.44H153.6v81.92h317.44V870.4h81.92v-317.44H870.4z" fill="#333333" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="px-icon-caret-down" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 588.8l-153.6-153.6h307.2z" fill="#666666" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="px-icon-arrow-left" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M716.8 839.68L276.48 512 716.8 184.32l30.72 40.96L363.52 512l384 286.72z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="px-icon-arrow-right" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M307.2 184.32l440.32 327.68L307.2 839.68l-30.72-40.96 384-286.72-384-286.72z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="px-icon-arrow-down" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M839.68 307.2L512 747.52 184.32 307.2l40.96-30.72 286.72 384 286.72-384z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="px-icon-arrow-up" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M184.32 716.8L512 276.48l327.68 440.32-40.96 30.72L512 363.52l-286.72 384z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="px-icon-circle-o-notch" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 870.4c-199.68 0-358.4-158.72-358.4-358.4 0-15.36 10.24-25.6 25.6-25.6s25.6 10.24 25.6 25.6c0 168.96 138.24 307.2 307.2 307.2s307.2-138.24 307.2-307.2-138.24-307.2-307.2-307.2c-15.36 0-25.6-10.24-25.6-25.6s10.24-25.6 25.6-25.6c199.68 0 358.4 158.72 358.4 358.4s-158.72 358.4-358.4 358.4z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="px-icon-close" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M865.28 199.68l-40.96-40.96L512 476.16 199.68 158.72l-40.96 40.96L476.16 512l-317.44 312.32 40.96 40.96 312.32-317.44 312.32 317.44 40.96-40.96-317.44-312.32z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="px-icon-exclamation-circle" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M512 30.117647C245.458824 30.117647 30.117647 245.458824 30.117647 512s215.341176 481.882353 481.882353 481.882353 481.882353-215.341176 481.882353-481.882353S778.541176 30.117647 512 30.117647z m0 903.529412C280.094118 933.647059 90.352941 743.905882 90.352941 512S280.094118 90.352941 512 90.352941s421.647059 189.741176 421.647059 421.647059-189.741176 421.647059-421.647059 421.647059z" fill="" ></path>' +
    '' +
    '<path d="M512 621.929412c18.070588 0 31.623529-13.552941 31.623529-31.62353l6.02353-334.305882c0-21.082353-16.564706-37.647059-37.647059-37.647059s-37.647059 16.564706-37.647059 37.647059l4.517647 332.8c1.505882 18.070588 15.058824 33.129412 33.129412 33.129412z" fill="" ></path>' +
    '' +
    '<path d="M512 772.517647m-45.176471 0a45.176471 45.176471 0 1 0 90.352942 0 45.176471 45.176471 0 1 0-90.352942 0Z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)