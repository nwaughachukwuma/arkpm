module.exports = {

  configRouter: function (router) {

    router.map({
      '/auth': {
        component: require('./compiled/pages/auth.vue'),
        subRoutes: {
          '/login': {
            component: require('./compiled/pages/auth/login.vue'),
            guest: true
          },
          '/register': {
            component: require('./compiled/pages/auth/register.vue'),
            guest: true
          },
          '/profile': {
            component: require('./compiled/pages/auth/profile.vue'),
            auth: true
          },
          '/logout': {
            component: require('./compiled/pages/auth/logout.vue'),
            auth: true
          }
        }
      },
      '/home': {
        component: require('./compiled/pages/pm.vue'),
        subRoutes: {
          '/': {
            component: require('./compiled/pages/home/home.vue')
          },
          '/welcome': {
            component: require('./compiled/pages/home/welcome.vue')
          },
          '/about': {
            component: require('./compiled/pages/home/about.vue')
          }
        }
      },
      '/pm': {
        component: require('./compiled/pages/pm.vue'),
        auth: true,
        subRoutes: {
          '/dashboard': {
            component: require('./compiled/pages/pm/dashboard.vue')
          },
          '/clients': {
            component: require('./compiled/pages/pm/clients.vue')
          },
          '/clients/create': {
            component: require('./compiled/pages/pm/clients/create.vue')
          },
          '/tracking': {
            component: require('./compiled/pages/pm/tracking.vue')
          }
        }
      },
      '/dogs': {
        component: require('./compiled/pages/dogs.vue'),
        auth: true,
        subRoutes: {
          '/': {
            component: require('./compiled/pages/dogs/index.vue')
          },
          '/:id': {
            component: require('./compiled/pages/dogs/show.vue')
          },
          '/create': {
            component: require('./compiled/pages/dogs/create.vue')
          }
        }
      },
      '/terms': {
        component: require('./compiled/pages/terms.vue')
      },
      '*': {
        component: require('./compiled/pages/404.vue')
      }
    })

    router.alias({
      '' : '/pm',
      '/auth': '/auth/login',
      '/pm': '/pm/dashboard'
    })

    router.beforeEach(function (transition) {

      var token = localStorage.getItem('jwt-token')
      if (transition.to.auth) {
        if (!token || token === null) {
          transition.redirect('/auth/login')
        }
      }
      if (transition.to.guest) {
        if (token) {
          transition.redirect('/pm/dashboard')
        }
      }
      transition.next()
    })
  }
}
