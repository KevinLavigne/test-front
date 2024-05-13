import { useAddCountryMutation, useCountriesLazyQuery } from '@/types/graphql';
import { Button, Card, Col, Form, Input, Row, Space } from 'antd';
import { useForm, useWatch } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { NewCountryInput } from '../types/graphql';
import Link from 'next/link';

const Home = () => {
	const [CountryForm] = useForm();
	const values = useWatch([], CountryForm);
	const [countries, setCountries] = useState<any>([]);
	const array = [{ name: 'france', img: '🇫🇷' }];

	const [getCountry] = useCountriesLazyQuery({
		fetchPolicy: 'no-cache',
		onCompleted(data) {
			data?.countries && setCountries(data?.countries);
		},
	});

	const [addCountry, { data: NewCountryInput }] = useAddCountryMutation({
		fetchPolicy: 'no-cache',
		variables: {
			data: { name: values?.name, emoji: values?.emoji, code: values?.code },
		},
	});

	useEffect(() => {
		getCountry();
	}, []);

	const finish = (value: any) => addCountry(value);

	return (
		<Space direction="vertical" style={{ width: '100%' }}>
			<Form
				form={CountryForm}
				onFinish={finish}
				layout="vertical"
				style={{
					margin: '2% 10%',
					padding: '1%',
					border: 'black solid 1px',
					borderRadius: '8px',
				}}
			>
				<Row gutter={16}>
					<Col span={7}>
						<Form.Item label="Name" name="name">
							<Input />
						</Form.Item>
					</Col>
					<Col span={7}>
						<Form.Item label="Emoji" name="emoji">
							<Input />
						</Form.Item>
					</Col>
					<Col span={7}>
						<Form.Item label="Code" name="code">
							<Input />
						</Form.Item>
					</Col>
					<Col span={3}>
						<Form.Item htmlFor="submit">
							<Button htmlType="submit">Add</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
			<Space
				direction="horizontal"
				align="center"
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignContent: 'center',
				}}
			>
				{countries?.map((el) => (
					<Link href={`/country/${el.code}`}>
						<Card title={el.name}>{el.emoji}</Card>
					</Link>
				))}
			</Space>
		</Space>
	);
};

export default Home;
