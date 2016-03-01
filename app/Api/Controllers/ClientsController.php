<?php

namespace Api\Controllers;

use App\Client;
use App\Http\Requests;
use Illuminate\Http\Request;
use Api\Requests\ClientRequest;
use Api\Transformers\ClientTransformer;

/**
 * @Resource('Clients', uri='/clients')
 */
class ClientsController extends BaseController
{

    public function __construct() 
    {
        $this->middleware('jwt.auth');
    }

    /**
     * Show all clients
     *
     * Get a JSON representation of all the clients
     * 
     * @Get('/')
     */
    public function index()
    {
        return $this->collection(Client::all(), new ClientTransformer);
    }

    /**
     * Store a new client in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ClientRequest $request)
    {
        return Client::create($request->only(['company', 'contact', 'telephone','email', 'hourly']));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->item(Client::findOrFail($id), new ClientTransformer);
    }

    /**
     * Update the client in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ClientRequest $request, $id)
    {
        $client = Client::findOrFail($id);
        $client->update($request->only(['company', 'contact', 'telephone','email', 'hourly']));
        return $client;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Client::destroy($id);
    }
}
