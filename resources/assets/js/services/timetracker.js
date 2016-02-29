/**
* VueJS mixin to control timeTracking across the app
*
* Usage:
*
* new Vue({
* mixin: [timeTracker],
*
*/

 window.timetracker = {
        created: function () {
            this.hello()
        },
        ready: function () {
            this.hello()
        },
        methods: {
            hello: function () {
                console.log('hello from mixin!')
            }
        }
    }

console.log('called')