

module.exports = {
    data: function () {
        return {
          timelogs: [],
          messages: []
        }
    },
    methods: {
    // Let's fetch some clients
    fetch: function (successHandler) {
      var that = this
      client({ path: '/tracking' }).then(
        function (response) {
          //Set the timelogs
          that.$set('timelogs', response.entity.data)
          successHandler(response.entity.data)
        },
        function (response, status) {
          if (_.contains([401, 500], status)) {
            that.$dispatch('userHasLoggedOut')
          }
        }
      )
    },

    deleteTimelog: function (index) {
      var that = this
      client({ path: '/tracking/' + this.timelogs[index].id, method: 'DELETE' }).then(
        function (response) {
          that.timelogs.splice(index, 1)
          that.messages = [{type: 'success', message: 'The time log has been deleted'}]
        },
        function (response) {
          that.messages.push({type: 'danger', message: 'There was a problem deleting the time log'})
        }
      )
    }

  },

  route: {
    // fetch the list of clients
    data: function (transition) {

        transition.next

      /*this.fetch(function (data) {
        transition.next({timelogs: data})
      })
      */
    }
  }
}