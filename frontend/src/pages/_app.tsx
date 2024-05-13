import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

import React from 'react';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';
import Header from '@/components/Header';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const client = new ApolloClient({
		uri: 'http://localhost:4000',
		cache: new InMemoryCache(),
	});
	const getLayout = Component.getLayout ?? ((page) => page);
	return (
		<ApolloProvider client={client}>
			<StyleProvider hashPriority="high">
				<ConfigProvider>
					<Header />
					{getLayout(<Component {...pageProps} />)}
				</ConfigProvider>
			</StyleProvider>
		</ApolloProvider>
	);
}
