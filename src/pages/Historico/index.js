import React from 'react';
import Paciente from './patient';
import Profissional from './professional';
import Auth from '../../shared/auth';

export default function Home() {
    
	const role = parseInt(Auth.getRoleId(), 10);

	return (
		<div>
			{ (role === 1) && (
				<Profissional />
			)}

			{ (role === 2) && (
				<Paciente />
			)}
		</div>
  	);
}