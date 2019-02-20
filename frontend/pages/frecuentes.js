import Visitantes from '../components/Visitantes';
import PleaseSignIn from '../components/PleaseSigning';

const Frecuentes = (props) => (
	<div>
		<PleaseSignIn>
			<Visitantes visitorType="frecuente" />
		</PleaseSignIn>
	</div>
);

export default Frecuentes;
