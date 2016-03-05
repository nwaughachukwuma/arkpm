<?php

namespace Api\Requests;

use Dingo\Api\Http\FormRequest;

class TimelogRequest extends FormRequest
{
	public function authorize()
	{
		return true;
	}

	public function rules()
	{
		return [
	    	'user_id' => 'numeric|max:100',
	    	'startdate' => 'max:16',
	    	'enddate' => 'max:16',
	    	'minutes' => 'numeric',
    	];
	}
}