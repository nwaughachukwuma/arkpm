// Import requirements using browserify
window.Vue = require('vue')
window.VueRouter = require('vue-router')

// Insert vue-router and vue-resource into Vue

// Import the actual routes, aliases, ...
import { configRouter } from './routes'

// Create our router object and set options on it
const router = new VueRouter()

// Inject the routes into the VueRouter object
configRouter(router)

// Configure the application
window.config = require('./config')
Vue.config.debug = true

// Configure our HTTP client
var rest = require('rest')
var pathPrefix = require('rest/interceptor/pathPrefix')
var mime = require('rest/interceptor/mime')
var defaultRequest = require('rest/interceptor/defaultRequest')
var errorCode = require('rest/interceptor/errorCode')
var interceptor = require('rest/interceptor')
var jwtAuth = require('./interceptors/jwtAuth')

window.client = rest.wrap(pathPrefix, { prefix: config.api.base_url })
                    .wrap(mime)
                    .wrap(defaultRequest, config.api.defaultRequest)
                    .wrap(errorCode, { code: 400 })
                    .wrap(jwtAuth);

// Bootstrap the app

//Components
Vue.component('header-component', require('./compiled/header.vue'))
Vue.component('sidebar-component', require('./compiled/sidebar.vue'))
Vue.component('sidebarright-component', require('./compiled/sidebarright.vue'))
Vue.component('nav-component', require('./compiled/nav.vue'))
Vue.component('footer-component', require('./compiled/footer.vue'))
Vue.component('login-component', require('./compiled/login.vue'))
Vue.component('maintemplate-component', require('./compiled/maintemplate.vue'))

Vue.component('vue-select', require('vue-select2'))


//Services
//window.timetracker = require('./services/timetracker');



//transitions
Vue.transition('zoomInLoad', {
    type:'animation',
    enter: function (el, done) {
      // element is already inserted into the DOM
      // call done when animation finishes.
      $(el).hide();
      setTimeout(function() {
        $(el).addClass('flipInX').show()
        .animate({ opacity: 1 }, 1, done)
      },500)
      
    },
    leave: function (el, done) {
      // same as enter
      
      $(el).removeClass('flipInX')
      $(el).addClass('zoomOut')

      setTimeout(function() {
        $(el).hide()
        .animate({ opacity: 0 }, 500, done)
      },650)
    },
})

Vue.transition('zoomFade', {
    type:'animation',
    enter: function (el, done) {
      // element is already inserted into the DOM
      // call done when animation finishes.
      $(el).hide();
      setTimeout(function() {
        $(el).addClass('fadeIn').show()
        .animate({ opacity: 1 }, 1, done)
      },600)
      
    },
    leave: function (el, done) {
      // same as enter
      
      $(el).removeClass('fadeIn')
      $(el).addClass('fadeOut')

      setTimeout(function() {
        $(el).hide()
        .animate({ opacity: 0 }, 10, done)
      },300)
    },
})


Vue.transition('bounce', {
    type:'animation'
})

Vue.transition('fade', {
  css: false,
  enter: function (el, done) {
    $(el)
      .css('opacity', 0)
    setTimeout(function() {
      $(el)
      .css('opacity', 0)
      .animate({ opacity: 1 }, 1000, done)
    },500)
    
  },
  enterCancelled: function (el) {
    $(el).stop()
  },
  leave: function (el, done) {
    // same as enter
    $(el).animate({ opacity: 0 }, 1000, done)
  },
  leaveCancelled: function (el) {
    $(el).stop()
  }
})

const App = Vue.extend(require('./compiled/app.vue'))
router.start(App, '#app')
window.router = router
