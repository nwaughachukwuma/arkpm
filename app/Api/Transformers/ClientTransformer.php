<?php

namespace Api\Transformers;

use App\Client;
use League\Fractal\TransformerAbstract;

class ClientTransformer extends TransformerAbstract
{
	public function transform(Client $client)
	{
		return [
			'id' 	=> (int) $client->id,
			'company'  => $client->company,
			'contact'	=> $client->contact,
            'email'   => $client->email,
            'telephone'   => $client->telephone,
            'hourly'   => (float) $client->hourly
		];
	}
}