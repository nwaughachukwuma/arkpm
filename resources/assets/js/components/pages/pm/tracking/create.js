module.exports = {
  data: function () {
    return {
      timelog: {
        userid: '',
        startdate: '',
        enddate: '',
        minutes: 0,
        client_id: null,
        project_id: null,
        task_id: null,
        billable: false,
        visible: false
      },
      messages: []
    }
  },
  ready: function() {
      $("#startdate").inputmask('datetime', {greedy: false});
      $("#enddate").inputmask('datetime', {greedy: false});
  },
  methods: {
    createTimelog: function (e) {
      e.preventDefault()
      var that = this
      client({path: 'tracking', entity: this.timelog}).then(
        function (response, status) {
          that.timelog.client_id = ''
          that.timelog.project_id = ''
          that.messages = [ {type: 'success', message: 'The timelog has been created successfully'} ]
          Vue.nextTick(function () {
            document.getElementById('startdate').focus()
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
