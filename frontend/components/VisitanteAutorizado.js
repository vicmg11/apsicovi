import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { DateInput, TimeInput, DateTimeInput, DatesRangeInput } from 'semantic-ui-calendar-react';
import 'semantic-ui-css/semantic.min.css';
import { Icon } from 'semantic-ui-react';
import FotoVisitor from './styles/FotoVisitor';

const CREATE_VISIT_AUTH_MUTATION = gql`
	mutation CREATE_VISIT_AUTH_MUTATION(
		$name: String!
		$userType: String
		$status: String
		$image: String
		$largeImage: String
		$description: String
		$expectedStartDate: String
		$expectedStartTime: String
		$expectedEndTime: String
	) {
		createVisitor(
			name: $name
			userType: $userType
			status: $status
			image: $image
			largeImage: $largeImage
			description: $description
			expectedStartDate: $expectedStartDate
			expectedStartTime: $expectedStartTime
			expectedEndTime: $expectedEndTime
		) {
			id
		}
	}
`;

class VisitaAutorizada extends Component {
	state = {
		name: '',
		userType: 'PREAUTORIZADO',
		status: 'ACTIVO',
		image: '',
		largeImage: '',
		description: '',
		expectedStartDate: '',
		expectedStartTime: '',
		expectedEndTime: ''
	};

	handleChange = (e) => {
		const { name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) : value;
		this.setState({ [name]: val });
	};

	handleChangeDt = (event, { name, value }) => {
		if (this.state.hasOwnProperty(name)) {
			this.setState({ [name]: value });
		}
	};

	uploadFile = async (e) => {
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'sicovi');

		const res = await fetch('https://api.cloudinary.com/v1_1/ddltr8h2k/image/upload', {
			method: 'POST',
			body: data
		});
		const file = await res.json();
		this.setState({
			image: file.secure_url,
			largeImage: file.eager[0].secure_url
		});
	};

	render() {
		return (
			<Mutation mutation={CREATE_VISIT_AUTH_MUTATION} variables={this.state}>
				{(createVisitor, { loading, error }) => (
					<Form
						className="ui form"
						onSubmit={async (e) => {
							// Stop de form from submitting
							e.preventDefault();
							// call the mutation
							const res = await createVisitor();
							// Change them to the single visitor page
							// Router.push({
							// 	pathname: '/visita',
							// 	query: { id: res.data.createVisitor.id }
							// });
							// Display list of visitors
							Router.push({
								pathname: '/lista'
							});
						}}
					>
						<Error error={error} />
						<h2>Visitantes Preautorizados</h2>
						<fieldset className="fields" disabled={loading} aria-busy={loading}>
							<label htmlFor="file">
								Foto
								<input
									type="file"
									id="file"
									name="file"
									placeholder="Foto del Visitante"
									onChange={this.uploadFile}
								/>
								<img
									className="ui circular bordered image"
									width="100"
									height="100"
									src={this.state.image || '../static/user_gray.png'}
									alt="Agrega una foto"
								/>
								<FotoVisitor>
									<Icon name="camera" />
								</FotoVisitor>
							</label>
							<label htmlFor="name">
								Nombre
								<input
									type="text"
									id="name"
									name="name"
									placeholder="Nombre"
									required
									value={this.state.name}
									onChange={this.handleChange}
								/>
							</label>

							<label htmlFor="expectedStartDate">
								Fecha de Visita
								<DateInput
									name="expectedStartDate"
									placeholder="Fecha de Visita"
									required
									value={this.state.expectedStartDate}
									iconPosition="left"
									onChange={this.handleChangeDt}
								/>
							</label>

							<label htmlFor="expectedStartTime">
								Hora Inicial de Visita
								<TimeInput
									name="expectedStartTime"
									placeholder="Hora Inicial de Visita"
									required
									value={this.state.expectedStartTime}
									iconPosition="left"
									onChange={this.handleChangeDt}
								/>
							</label>

							<label htmlFor="expectedEndTime">
								Hora Final de Visita
								<TimeInput
									name="expectedEndTime"
									placeholder="Hora final de visita"
									required
									value={this.state.expectedEndTime}
									iconPosition="left"
									onChange={this.handleChangeDt}
								/>
							</label>

							<label htmlFor="description">
								Motivo de Visita
								<textarea
									id="description"
									name="description"
									rows="2"
									placeholder="Motivo de Visita"
									required
									value={this.state.description}
									onChange={this.handleChange}
								/>
							</label>
							<button className="ui positive button" type="submit">
								Guardar
							</button>
						</fieldset>
					</Form>
				)}
			</Mutation>
		);
	}
}

export default VisitaAutorizada;
export { CREATE_VISIT_AUTH_MUTATION };