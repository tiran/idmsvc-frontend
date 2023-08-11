# Using contexts

During developing the list of domains page, a couple of situations justified the
creation of a context for the micro-frontend.

- Avoid property drilling by passing list of domains through every component
  towards the ListDomains.
- Provide the same data information for the different impacted objects.

## Defining the context

For using a context, we need to define the context (in this case it is defined
at `src/AppContext.tsx`, but we could define a context in a deeper component if
it were required).

```typescript
import { createContext } from 'react';
import { Domain } from './Api';

export interface IAppContext {
  domains: Domain[];
  setDomains: (domains: Domain[]) => void;
}

export const AppContext = createContext<IAppContext>({
  domains: [],
  setDomains: (domains: Domain[]) => {
    throw new Error('Function "setDomains" not implemented: domains=' + domains);
  },
});
```

Let's see what we have here:

- IAppContext define an interface with properties to be shared and some
  callbacks to update the properties above.
- The callbacks will use some state associated to a root component, so
  when we change the state from a deeper component, the view is properly
  rendered.

We will define the callbacks at `src/AppEntry.tsx`:

## Referencing the context in the root component

```typescript
import React, { useState } from 'react';

// ...

const AppEntry = () => {
  // Declare the state
  const [domains, setDomains] = useState<Domain[]>([]);
  const cbSetDomains = (domains: Domain[]) => {
    setDomains(domains);
  };
  return (
    <Provider store={init(...(process.env.NODE_ENV !== 'production' ? [logger] : [])).getStore()}>
      <Router basename={getBaseName(window.location.pathname)}>
        <AppContext.Provider value={{ domains: domains, setDomains: cbSetDomains }}>
          <App />
        </AppContext.Provider>
      </Router>
    </Provider>
  );
};
```

As we see the callback is invoking the setter for the state, which raise the
render mechanism for the view.

See that we inject the domains value and the setter callback into the `value` property
for the `AppContext.Provider` tag.

## Use the context form other inner components

Using the context from any component nested in our App would be kind of the below:

```typescript
const appContext = useContext(AppContext);

const domains = appContext.domains;  // Retrieving the value from the context

const myEvent = () => {
  appContext.setDomains(newDomain);  // This will fire from the root component the render
};
```

What is happening here?
- I get the reference to the context.
- I read a value from the context.
- I set a value into the context by using the injected callback when we
  used the context into the root component; recall that it is calling a setDomain state,
  which is the one that trigger the render of the view.

