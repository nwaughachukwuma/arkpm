module.exports = {

  data: function () {
    return {
      clients: [],
      messages: []
    }
  },

  methods: {
    // Let's fetch some clients
    fetch: function (successHandler) {
      var that = this
      client({ path: '/clients' }).then(
        function (response) {
          //Set the clients
          that.$set('clients', response.entity.data)
          successHandler(response.entity.data)
        },
        function (response, status) {
          if (_.contains([401, 500], status)) {
            that.$dispatch('userHasLoggedOut')
          }
        }
      )
    },

    deleteClient: function (index) {
      var that = this
      client({ path: '/clients/' + this.clients[index].id, method: 'DELETE' }).then(
        function (response) {
          that.clients.splice(index, 1)
          that.messages = [{type: 'success', message: 'The client has been deleted'}]
        },
        function (response) {
          that.messages.push({type: 'danger', message: 'There was a problem deleting the client'})
        }
      )
    }

  },

  route: {
    // fetch the list of clients
    data: function (transition) {
      this.fetch(function (data) {
        transition.next({clients: data})
      })
    }
  }

}
