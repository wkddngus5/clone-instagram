import { ApolloProvider } from '@apollo/client';
import { useEffect } from 'react';
import { useApollo } from '../apollo/client';

export default function App({ Component, pageProps }) {
	const apolloClient = useApollo(pageProps.initialApolloState);

	useEffect(() => {
		if (process.browser) {
			initializeRootClassName();
			initializeBuffers();
		}
	}, []);

	return (
		<ApolloProvider client={apolloClient}>
			<Component {...pageProps} />
		</ApolloProvider>
	);
}

// class name no-js와 js에 따라 다른 css를 적용
function initializeRootClassName() {
	// document.documentElement: 읽기전용, 문서의 루트 요소를 반환함
	const docElement = document.documentElement;

	// 정규 표현식 생성자. 런타임에 컴파일하여 외부 소스(html)에서 가져오는 표현식을 평가함
	const classRE = new RegExp('(^|\\s)no-js(\\s|$)');
	const { className } = docElement;
	docElement.className = className.replace(classRE, '$1js$2');
}

function initializeBuffers() {
	// paint event가 발생하면 __bufferedPerformance 저장
	if ('PerformanceObserver' in window && 'PerformancePaintTiming' in window) {
		window.__bufferedPerformance = [];
		const ob = new PerformanceObserver((e) => {
			window.__bufferedPerformance.push.apply(
				window.__bufferedPerformance,
				e.getEntries(),
			);
		});
		ob.observe({ entryTypes: ['paint'] });
	}

	// errpr가 발생하면 __bufferedErrors에 저장
	window.__bufferedErrors = [];
	window.onerror = function (message, url, line, column, error) {
		window.__bufferedErrors.push({
			message,
			url,
			line,
			column,
			error,
		});
		return false;
	};

	// window에 __initialData, __initialDataLoaded, __pendingAdditionalData를 저장함.
	// 각 데이터가 load되거나 error가 발생하면 notifiy
	window.__initialData = {
		pending: true,
		waiting: [],
	};
	function asyncFetchSharedData(extra) {
		const sharedDataReq = new XMLHttpRequest();
		sharedDataReq.onreadystatechange = function () {
			if (sharedDataReq.readyState === 4) {
				if (sharedDataReq.status === 200) {
					const sharedData = JSON.parse(sharedDataReq.responseText);
					window.__initialDataLoaded(sharedData, extra);
				}
			}
		};
		sharedDataReq.open('GET', '/data/shared_data/', true);
		sharedDataReq.send(null);
	}
	function notifyLoaded(item, data) {
		item.pending = false;
		item.data = data;
		for (let i = 0; i < item.waiting.length; ++i) {
			item.waiting[i].resolve(item.data);
		}
		item.waiting = [];
	}
	function notifyError(item, msg) {
		item.pending = false;
		item.error = new Error(msg);
		for (let i = 0; i < item.waiting.length; ++i) {
			item.waiting[i].reject(item.error);
		}
		item.waiting = [];
	}
	window.__initialDataLoaded = function (initialData, extraData) {
		if (extraData) {
			for (const key in extraData) {
				initialData[key] = extraData[key];
			}
		}
		notifyLoaded(window.__initialData, initialData);
	};
	window.__initialDataError = function (msg) {
		notifyError(window.__initialData, msg);
	};
	window.__additionalData = {};
	window.__pendingAdditionalData = function (paths) {
		for (let i = 0; i < paths.length; ++i) {
			window.__additionalData[paths[i]] = {
				pending: true,
				waiting: [],
			};
		}
	};
	window.__additionalDataLoaded = function (path, data) {
		if (path in window.__additionalData) {
			notifyLoaded(window.__additionalData[path], data);
		} else {
			console.error(`Unexpected additional data loaded "${path}"`);
		}
	};
	window.__additionalDataError = function (path, msg) {
		if (path in window.__additionalData) {
			notifyError(window.__additionalData[path], msg);
		} else {
			console.error(
				`Unexpected additional data encountered an error "${path}": ${msg}`,
			);
		}
	};
}
