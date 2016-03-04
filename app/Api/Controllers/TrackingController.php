<?php

namespace Api\Controllers;

use App\Timelog;
use App\Http\Requests;
use Illuminate\Http\Request;
use Api\Requests\TimelogRequest;
use Api\Transformers\TimelogTransformer;

/**
 * @Resource('Clients', uri='/clients')
 */
class TrackingController extends BaseController
{

    public function __construct() 
    {
        $this->middleware('jwt.auth');
    }

    /**
     * Show all timelogs
     *
     * Get a JSON representation of all the timelog
     * 
     * @Get('/')
     */
    public function index()
    {
        return $this->collection(Timelog::all(), new TimelogTransformer);
    }

    /**
     * Store a new timelog in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TimelogRequest $request)
    {
        $timeLog = new Timelog();
        return Timelog::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->item(Timelog::findOrFail($id), new TimelogTransformer);
    }

    /**
     * Update the timelog in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(TimelogRequest $request, $id)
    {
        $timelog = Timelog::findOrFail($id);
        $timelog->update($request->all());
        return $timelog;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return Timelog::destroy($id);
    }
}
