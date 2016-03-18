<?php

namespace Api\Transformers;

use App\Timelog;
use League\Fractal\TransformerAbstract;

class TimelogTransformer extends TransformerAbstract
{
	public function transform(Timelog $timelog)
	{



		$return =  [
            'id' => (int) $timelog->id,
            'user_id' => (int) $timelog->user_id, 
            'startdate' => $timelog->startdate, 
            'enddate' => $timelog->enddate,
            'minutes' => (int) $timelog->minutes, 
            'client_id' => (int) $timelog->minutes, 
            'project_id' => (int) $timelog->project_id, 
            'task_id' => (int) $timelog->task_id, 
            'billable' => (boolean) $timelog->billable, 
            'visible' => (boolean) $timelog->visible
		];

            if(isset($timelog->client->company)) $return['company'] = $timelog->client->company;

            return $return;
	}
}