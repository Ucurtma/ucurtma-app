/* eslint-disable no-underscore-dangle */
/* eslint-env jest */
import React from 'react';
import { render } from 'test-utils';
import { withApollo } from '../../utils/apollo';

// eslint-disable-next-line react/prop-types
function MockApp() {
  return <p>Hello from Uçurtma!</p>;
}

const Component = withApollo(MockApp);
describe('Apollo Tests', () => {
  let mockInfo;
  beforeEach(() => {
    mockInfo = jest.spyOn(global.console, 'warn').mockImplementation(() => {});
  });

  test('Renders Content with Apollo Provider', () => {
    const { getByText } = render(<Component />);
    expect(getByText('Hello from Uçurtma!')).toBeInTheDocument();
  });

  test('Should warn if component name is App', () => {
    function App() {
      return <p>Hello from Uçurtma!</p>;
    }
    const AppComponent = withApollo(App);
    render(<AppComponent />);
    expect(mockInfo).toHaveBeenCalled();
  });

  test('Displayname should be Component if it isnt defined', () => {
    const AppComponent = withApollo('');
    expect(AppComponent.displayName).toEqual('withApollo(Component)');
  });

  test('SSR component should have getInitialProps', () => {
    const SSRComponent = withApollo(MockApp, { ssr: true });
    expect(SSRComponent.getInitialProps).not.toEqual(undefined);
    expect(Component.getInitialProps).toEqual(undefined);
  });

  test('Page components should have getInitialProps if it is defined', () => {
    function Initialize() {
      return <p>Hello from Uçurtma!</p>;
    }

    Initialize.getInitialProps = ctx => {
      return ctx;
    };

    const InitializedComp = withApollo(Initialize);
    expect(InitializedComp.getInitialProps).not.toEqual(undefined);
  });
});
