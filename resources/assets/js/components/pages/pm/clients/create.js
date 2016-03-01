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
    createClient: function (e) {
      e.preventDefault()
      var that = this
      client({path: 'clients', entity: this.client}).then(
        function (response, status) {
          that.client.company = ''
          that.client.contact = ''
          that.messages = [ {type: 'success', message: 'The client has been created successfully'} ]
          Vue.nextTick(function () {
            document.getElementById('company').focus()
          })
        },
        function (response, status) {
          that.messages = []
          for (var key in response.entity) {
            that.messages.push({type: 'danger', message: response.entity[key]})
          }
        }
      )
    }
  }
}
