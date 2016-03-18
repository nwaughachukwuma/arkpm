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
      messages: [],
      duration: 0,
      clients: [],
      options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
    }
  },
  ready: function() {
      

      
      $(".select2").select2({theme: "bootstrap"}).on("change", null, {that: this}, function(e) {
          //Manually bind the result to the model as select 2 deosn;t fire a real event
          e.data.that.timelog.client_id = $(".select2").find(":selected").val();
      });

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
    },
    clockIn: function() {
      this.timelog.startdate = moment().format('DD/MM/YYYY HH:mm');   
    },
    clockOut: function() {
      this.timelog.enddate = moment().format('DD/MM/YYYY HH:mm');   
    },
    // Let's get the clients
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
  },

  watch: {
    'timelog.enddate': function (val, oldVal) {
      //try {
        console.log('end changed to ' + val)
        var start = moment(this.timelog.startdate, 'DD/MM/YYYY HH:mm')
        var end = moment(this.timelog.enddate, 'DD/MM/YYYY HH:mm')
        var diff = moment.duration(end.diff(start));
        this.timelog.minutes = diff.asMinutes()
        var hours = Math.floor(diff.asHours())
        var minutes = diff.minutes();

        if(hours > 0) {
          this.duration = hours + "H " + minutes + "m";
        } else {
          this.duration = minutes + " minutes";
        }
        
      //} catch ($exception) {

      //}
    },
    'duration': function(val, oldval) {
      this.timelog.minutes = val
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
