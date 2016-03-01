<?php

namespace Api\Requests;

use Dingo\Api\Http\FormRequest;

class ClientRequest extends FormRequest
{
	public function authorize()
	{
		return true;
	}

	public function rules()
	{
		return [
	    	'company' => 'required|max:100',
	    	'contact' => 'trim|max:100',
	    	'email' => 'trim|email',
	    	'telephone' => 'trim|max:30',
	    	'hourly' => 'decimal|max:9'
    	];
	}
}