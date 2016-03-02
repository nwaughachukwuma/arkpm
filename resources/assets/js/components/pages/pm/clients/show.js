module.exports = {
  data: function () {
    return {
      client: {
        company: '',
        contact: '',
        email: '',
        telephone: '',
        hourly: '',
      },
      messages: []
    }
  },

  methods: {
    fetch: function (id, successHandler) {
      var that = this
      client({ path: '/clients/' + id }).then(
        function (response) {
          that.$set('client', response.entity.data)
          successHandler(response.entity.data)
        },
        function (response, status, request) {
          // Go tell your parents that you've messed up somehow
          if (status === 401) {
            self.$dispatch('userHasLoggedOut')
          } else {
            console.log(response)
          }
        }
      )
    },
    updateClient: function (e) {
      e.preventDefault()
      var self = this
      client({ path: '/clients/' + this.client.id, entity: this.client, method: 'PUT'}).then(
        function (response) {
          self.messages = []
          self.messages.push({type: 'success', message: 'The client has been updated'})
        },
        function (response) {
          self.messages = []
          for (var key in response.entity) {
            self.messages.push({type: 'danger', message: response.entity[key]})
          }
        }
      )
    }
  },
  route: {
    // Ooh, ooh, are there any new puppies yet?
    data: function (transition) {
      this.fetch(this.$route.params.id, function (data) {
        transition.next({client: data})
      })
    }
  }
}
