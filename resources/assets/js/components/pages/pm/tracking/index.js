

module.exports = {
    data: function () {
        return {
          timelog: {
            userid: '',
            startdate: '',
            enddate: '',
            minutes: 0,
            client_id: '',
            project_id: '',
            task_id: '',
            billable: false,
            visible: false
          },
          messages: [],
          messagessave: [],
          duration: 0,
          clients: [],
          timelogs: []
        }
    },
    methods: {
      saveTimelog: function (e) {
        e.preventDefault()
        var that = this
        client({path: 'tracking', entity: this.timelog}).then(
          function (response, status) {
            
            that.messagessave = [ {type: 'success', message: 'The timelog has been created successfully'} ]
            Vue.nextTick(function () {
              document.getElementById('startdate').focus()
            })
          },
          function (response, status) {
            that.messagessave = []
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
      // get the timelogs
      fetch: function (successHandler) {
        var that = this
        client({ path: '/tracking' }).then(
          function (response) {
            //Set the timelogs
            that.$set('timelogs', response.entity.data)
          },
          function (response, status) {
            if (_.contains([401, 500], status)) {
              that.$dispatch('userHasLoggedOut')
            }
          }
        )
        //Get the clients
        client({ path: '/clients' }).then(
          function (response) {
            //Set the clients
            that.$set('clients', response.entity.data)
            //Call success handler to let them know we have finished
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
    watch: {
      'timelog.enddate': function (val, oldVal) {
        //try {
          console.log('end changed to ' + val)
          var start = moment(this.timelog.startdate, 'DD/MM/YYYY HH:mm')
          var end = moment(this.timelog.enddate, 'DD/MM/YYYY HH:mm')
          var diff = moment.duration(end.diff(start));
          this.timelog.minutes = diff.asMinutes()
          var hours = Math.floor(diff.asHours())
          var fullminutes = diff.minutes();

          if(hours > 0) {
            this.duration = hours + "H " + fullminutes + "m";
          } else {
            this.duration = fullminutes + " minutes";
          }
          
        //} catch ($exception) {

        //}
      },
      'duration': function(val, oldval) {

        var totalMinutes = 0;
        var newduration = val.toLowerCase();

        //split by H to see if there is a hour in there.
        var parts = newduration.split('h');
        console.log(parts.length)
        if(parts.length == 1) {
          var minutes = parts[0].replace(/\D/g,'');
          totalMinutes = minutes;
        }

        if(parts.length == 2) {

          var hours = parts[0];
          hours = hours.replace(/\D/g,'');
          totalMinutes = hours *60;

          var minutes = parts[1];
          
          minutes = minutes.replace(/\D/g,'');
          if(minutes == "") {
              minutes = 0;
          }
          console.log("minutes: " + minutes);
          totalMinutes = parseInt(totalMinutes) + parseInt(minutes);

        }


        this.timelog.minutes = totalMinutes
        console.log("Total minutes = " + totalMinutes );
      }
    },
    route: {
      // fetch the list of clients
      data: function (transition) 
        {
          this.fetch(function (data) {
              transition.next()
        }
      )
      
    }
  }
}