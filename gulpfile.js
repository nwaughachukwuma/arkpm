// Disable notify
process.env.DISABLE_NOTIFIER = true

// I need some magic
var elixir = require('laravel-elixir')
require('elixir-vuemaker')
require('laravel-elixir-vueify');
var del = require('del');

elixir.config.js.browserify.transformers.push({ name: 'envify' })

// Generate source map for easier debugging in dev tools
elixir.config.js.browserify.options.debug = true

//Extend elixir to add remove function
elixir.extend('remove', function(path) {
    new elixir.Task('remove', function() {
        del(path);
    });
});

elixir(function (mix) {
    mix
    .less('theme.less')
    .styles([
        "theme.css",
      ],'public/css/arkpm.css' ,'public/css')
    .vuemaker([
       'resources/assets/js/components/**/*.+(js|css|html)',
       'resources/assets/js/app.+(js|css|html)'
     ], 'resources/assets/js/compiled')
    .browserify('bootstrap.js', 'resources/assets/js/transit.js')
    .scripts(['theme.js','transit.js', '../bower/moment/moment.js'] )
    .remove([ 'public/css/theme.*', 'resources/assets/js/transit.*'])
})



