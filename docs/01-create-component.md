# Create Foo component

1. Create the directory for the component:

    ```sh
    mkdir -p src/Components/Foo
    ```

1. Create the style-sheets file at `src/Components/Foo/foo.scss`:

    ```typescript
    import "~@redhat-cloud-services/frontend-components-utilities/styles/variables";

    .foo-component {
    font-size: \$ins-fontSize;
    margin: \$ins-margin;
    display: block;
    }
    ```

1. Create the typescript code at `src/Components/Foo/foo.tsx`:

    ```typescript
    import './foo-component.scss';
    import React from 'react';

    /**
     * Foo component
     *
     * @param props the props given by the smart component.
     */
    const FooComponent: React.FC = (props) => {
    return <span className="foo-component"> {props.children} </span>;
    };

    FooComponent.displayName = 'FooComponent';

    export default FooComponent;
    ```

1. Create the unit test file for the component:

    ```typescript
    import React from 'react';
    import { render, screen } from '@testing-library/react';
    import FooComponent from './foo-component';
    import '@testing-library/jest-dom';

    test('expect foo-component to render children', () => {
    const children = <h1>Hello</h1>;

    render(<FooComponent>{children}</FooComponent>);
    expect(screen.getByRole('heading')).toHaveTextContent('Hello');
    });
    ```

1. Check the unit tests for your component by `npm run test`.
