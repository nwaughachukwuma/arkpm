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
	    	'contact' => 'max:100',
	    	'email' => 'email',
	    	'telephone' => 'max:30',
	    	'hourly' => 'numeric|max:3000'
    	];
	}
}