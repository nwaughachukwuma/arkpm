<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Timelog extends Model
{
    protected $fillable = ['user_id', 'startdate', 'enddate','minutes', 
                    'client_id', 'project_id', 'task_id', 'billable', 'visible'];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    use SoftDeletes;
    
    //Set one-to-one relationship between timelog and a client
    public function client()
    {
        return $this->belongsTo('App\Client');
    }

    public function getUsersLogs($user_id)
    {
        $logs = Timelog::leftJoin('clients', 'clients.id', '=', 'timelogs.client_id')->get();
        return $logs;
    }

}
