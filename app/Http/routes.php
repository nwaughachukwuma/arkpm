<?php

Route::get('/', function () {
    return view('arkpm');
});


$api = app('Dingo\Api\Routing\Router');

// Version 1 of our API
$api->version('v1', function ($api) {

	// Set our namespace for the underlying routes
	$api->group(['namespace' => 'Api\Controllers', 'middleware' => 'cors'], function ($api) {

		// Login route
		$api->post('login', 'AuthController@authenticate');
		$api->post('register', 'AuthController@register');

		// Dogs! All routes in here are protected and thus need a valid token
		//$api->group( [ 'protected' => true, 'middleware' => 'jwt.refresh' ], function ($api) {
		$api->group( [ 'middleware' => 'jwt.auth' ], function ($api) {

			$api->get('users/me', 'AuthController@me');
			$api->get('validate_token', 'AuthController@validateToken');

			//Client endpoints
			$api->get('clients', 'ClientsController@index');
			$api->post('clients', 'ClientsController@store');
			$api->get('clients/{id}', 'ClientsController@show');
			$api->delete('clients/{id}', 'ClientsController@destroy');
			$api->put('clients/{id}', 'ClientsController@update');

			//Time Logging Functions
			$api->get('tracking', 'TrackingController@index');
			$api->post('tracking', 'TrackingController@store');
			$api->get('tracking/{id}', 'TrackingController@show');
			$api->delete('tracking/{id}', 'TrackingController@destroy');
			$api->put('tracking/{id}', 'TrackingController@update');

		});

	});

});