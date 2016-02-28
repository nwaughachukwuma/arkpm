## Ark Project Management

This application is current under development. It is is no way ready for testing yet.

I spent a long time looking for a modern, open source, web based project management system only to find a lot of "freemium" projects or opensource projects which have now been closed. ArkPM is my attempt to build something from scratch which implements the features of the other projects out there.

The system is buit using VueJS for the frontend and laravel for the backend so will run nicely on any LAMP stack. I used the following starter pack which saved me a lot of time in the initial set up:
[vue-starter Frontend App](https://github.com/layer7be/vue-starter)

##Features

* Single Page Application (SPA)
* Full API as the site is driven from laravel
* TODO: Tasks, Projects, and clients
* TODO: Time Tracking - log against a Task, Project or Client
* TODO: Kanban View of tasks by status
* TODO: Customisable statuses per project (Icebox, Development etc)
* TODO: Milestones (Tag anything as a milestone)
* TODO: Reports for tasks closed and time tracked.

## Installation

This is not ready yet. Get in touch if you would like to help out and I can add you to the project.

update your .env file to connect to a database of your choice. I use mysql but you can edit that config/databases.php.

```
composer install
php artisan migrate
php artisan db:seed
php artisan key:generate
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
php artisan jwt:secret
```

In resources/assets/js/config you will find configuration files for the various environments you may have. By default, the "development" environment file will be loaded. You just need to make sure the URL points to your API endpoint. This allows you to use a different endpoint or URL than the one the website is sat on. If you want to load another configuration, you need to export the environment variable APP_ENV to be what you want to want the configuration to be. To do so easily you can precede the command gulp (or gulp watch) from the next step with APP_ENV=production if you want to build for production.

* If you are installing the node modules yourself so you can upgrade them, then make sure your Node Version is greater than 3.0.0 by typing 'node -v'. If it isn;t then you can use the following to upgrade it.
```
matt@silverark:$ npm -v
1.3.10
matt@silverark:$ sudo npm install -g npm
matt@silverark:$ npm -v
3.7.3
```

```
npm install
bower install
gulp    (or APP_ENV=production gulp)

```

### Note about Apache
If you use Apache to serve this, you will need to add the following 2 lines to your .htaccess (or your virtualhost configuration):
```
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule .* - [e=HTTP_AUTHORIZATION:%1]
```


