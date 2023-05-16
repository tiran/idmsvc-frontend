# Create a view page

Let's add the Bar page.

1. We add the route by editing the `Routes.tsx` file and add the changes for the `bar` view:

    ```typescript
    import React, { Suspense, lazy } from 'react';
    import { Redirect, Route, Switch } from 'react-router-dom';

    import { Bullseye, Spinner } from '@patternfly/react-core';

    const SamplePage = lazy(() => import(/* webpackChunkName: "SamplePage" */ './Routes/SamplePage/SamplePage'));
    const OopsPage = lazy(() => import(/* webpackChunkName: "OopsPage" */ './Routes/OopsPage/OopsPage'));
    const NoPermissionsPage = lazy(() => import(/* webpackChunkName: "NoPermissionsPage" */ './Routes/NoPermissionsPage/NoPermissionsPage'));
    const BarPage = lazy(() => import(/* webpackChunkName: "BarPage" */ './Routes/BarPage/BarPage'));

    /**
     * the Switch component changes routes depending on the path.
     *
     * Route properties:
     *      exact - path must match exactly,
     *      path - https://prod.foo.redhat.com:1337/insights/advisor/rules
     *      component - component to be rendered when a route has been chosen.
     */
    const Routes = () => (
    <Suspense
        fallback={
        <Bullseye>
            <Spinner />
        </Bullseye>
        }
    >
        <Switch>
        <Route path="/sample" component={SamplePage} />
        <Route path="/oops" component={OopsPage} />
        <Route path="/no-permissions" component={NoPermissionsPage} />
        <Route path="/bar" component={BarPage} />
        {/* Finally, catch all unmatched routes */}
        <Route>
            <Redirect to="/sample" />
        </Route>
        </Switch>
    </Suspense>
    );

    export default Routes;
    ```

1. Add your bar page by creating `src/Routes/BarPage/BarPage.tsx` file:

    ```typescript
    import React, { Suspense, lazy, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import { useDispatch } from 'react-redux';

    import { Button, Spinner, Stack, StackItem, Title } from '@patternfly/react-core';
    import { Main } from '@redhat-cloud-services/frontend-components/Main';
    import { PageHeader, PageHeaderTitle } from '@redhat-cloud-services/frontend-components/PageHeader';
    import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';

    const FooComponent = lazy(() => import('../../Components/FooComponent/foo-component'));

    /**
     * A smart component that handles all the api calls and data needed by the dumb components.
     * Smart components are usually classes.
     *
     * https://reactjs.org/docs/components-and-props.html
     * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
     */
    const BarPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        insights?.chrome?.appAction?.('bar-page');
    }, []);

    const handleAlert = () => {
        dispatch(
        addNotification({
            variant: 'success',
            title: 'Notification title',
            description: 'notification description',
        })
        );
    };

    return (
        <React.Fragment>
        <PageHeader>
            <PageHeaderTitle title="Bar Insights App" />
            <p> This is page header text </p>
        </PageHeader>
        <Main>
            <Stack hasGutter>
            <StackItem>
                <Foo></Foo>
            </StackItem>
            </Stack>
        </Main>
        </React.Fragment>
    );
    };

    export default BarPage;
    ```
