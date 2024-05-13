import { useRouter } from 'next/router';
import { useCountryLazyQuery, Continent } from '../../types/graphql';
import { useEffect, useState } from 'react';
import { Col, Space, Typography } from 'antd';

const { Title } = Typography;

const AppoloLaMerde = () => {
	const router = useRouter();
	const countryCode = router.query?.slug as string;
	const [country, setCountry] = useState<any>({});

	const [getCountry, { data: data }] = useCountryLazyQuery({
		fetchPolicy: 'no-cache',
		variables: {
			code: countryCode,
		},
		onCompleted(data) {
			setCountry(data.country);
		},
	});

	useEffect(() => {
		getCountry(country);
	}, [country]);

	return (
		<Space
			align="center"
			direction="vertical"
			style={{ display: 'flex', alignContent: 'center', paddingTop: '1%' }}
		>
			<Col>
				<Title>{country?.emoji}</Title>
			</Col>
			<Col>
				Name :{country?.name} {`(${country?.code})`}
			</Col>
			<Col>Continent : {country?.continent?.name}</Col>
		</Space>
	);
};

export default AppoloLaMerde;
