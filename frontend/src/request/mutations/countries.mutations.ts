import { gql } from '@apollo/client';

export const REGISTER = gql`
	mutation addCountry($data: NewCountryInput!) {
		addCountry(data: $data) {
			code
			emoji
			name
		}
	}
`;
