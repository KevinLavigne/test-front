import {
	useAddCountryMutation,
	useContinentsLazyQuery,
	useCountriesLazyQuery,
} from '@/types/graphql';
import { Button, Card, Col, Form, Input, Row, Select, Space } from 'antd';
import { useForm, useWatch } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Home = () => {
	const [CountryForm] = useForm();
	const values = useWatch([], CountryForm);
	const [countries, setCountries] = useState<any>([]);
	const [continents, setContinents] = useState<any>([]);
	const array = [{ name: 'france', img: '🇫🇷' }];

	const [getCountry] = useCountriesLazyQuery({
		fetchPolicy: 'no-cache',
		onCompleted(data) {
			data?.countries && setCountries(data?.countries);
		},
	});

	const [getContinent] = useContinentsLazyQuery({
		fetchPolicy: 'no-cache',
		onCompleted(data) {
			data?.continents && setContinents(data?.continents);
		},
	});

	const [addCountry, { data: NewCountryInput }] = useAddCountryMutation({
		fetchPolicy: 'no-cache',
		variables: {
			data: {
				name: values?.name,
				emoji: values?.emoji,
				code: values?.code,
				continent: { id: values?.continentId },
			},
		},
		onCompleted() {
			CountryForm.resetFields();
			getCountry();
		},
	});

	useEffect(() => {
		getCountry();
		getContinent();
	}, []);

	const finish = (value: any) => addCountry(value);

	return (
		<Space direction="vertical" style={{ width: '100%' }}>
			<Form
				form={CountryForm}
				onFinish={finish}
				layout="vertical"
				style={{
					margin: '2% 5%',
					padding: '1%',
					border: 'black solid 1px',
					borderRadius: '8px',
				}}
			>
				<Row gutter={16} wrap>
					<Col span={8}>
						<Form.Item label="Name" name="name" rules={[{ required: true }]}>
							<Input />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label="Emoji" name="emoji" rules={[{ required: true }]}>
							<Input />
						</Form.Item>
					</Col>
					<Col span={8}>
						<Form.Item label="Code" name="code" rules={[{ required: true }]}>
							<Input />
						</Form.Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={8}>
						<Form.Item
							label="continent"
							name="continentId"
							rules={[{ required: true }]}
						>
							<Select
								options={continents.map((el) => ({
									value: el.id,
									label: el.name,
								}))}
							/>
						</Form.Item>
					</Col>
					<Col span={4}>
						<Form.Item htmlFor="submit" label="Valider">
							<Button htmlType="submit">Add</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
			<Space
				direction="horizontal"
				align="center"
				wrap
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
