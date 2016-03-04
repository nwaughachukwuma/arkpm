module.exports = {
  data: function () {
    return {
      timelog: {
        company: '',
        contact: '',
        email: '',
        telephone: '',
        hourly: '',
      },
      messages: []
    }
  },
  ready: function() {
      $("#logdate").inputmask('datetime', {greedy: false});
  },
  methods: {
    createTimelog: function (e) {
      e.preventDefault()
      var that = this
      client({path: 'tracking', entity: this.timelog}).then(
        function (response, status) {
          that.timelog.company = ''
          that.timelog.contact = ''
          that.messages = [ {type: 'success', message: 'The timelog has been created successfully'} ]
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
