# Create a component

- Is the component used only in the current page?

  Yes: Then add the component to your src/Routes/MyPage/Components
  directory.

  No: Then add the component to your src/Components directory.

  > This keep the components close to where they are used and the
  > code organized.

The next steps are for creating the Foo component in the case it
is shared in different views; for a component used only in one page
change `./src/Components` to `./src/Routes/*Page/Components`.

---

1. Create the directory for the component:

    ```sh
    mkdir -p src/Components/Foo
    ```

2. Create the style-sheets file at `src/Components/Foo/foo.scss`:

    ```typescript
    import "~@redhat-cloud-services/frontend-components-utilities/styles/variables";

    .foo-component {
    font-size: \$ins-fontSize;
    margin: \$ins-margin;
    display: block;
    }
    ```

3. Create the typescript code at `src/Components/Foo/foo.tsx`:

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

4. Create the unit test file for the component:

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

5. Check the unit tests for your component by `npm run test`.
