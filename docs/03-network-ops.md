# Network communications

## Oveview

The content of this section are related about the current patterns that are
used into the repository for communicating with the backend service, and
try to provide solutions to different scenarios.

## Generating API client

The communication layer is built on top of axio library, and it is generated
by running `make generate-api`, which launch a code generator. So given an
openapi specification, we get the interfaces and hooks created for us. The
API is a git submodule that remains on `./api` directory, and the generated
client code is at `./src/Api`.

TODO Indicate that two api are generated, resources and action.
FIXME From UI we only need resources no action, maybe the generated code
could be simplified with some option for the code generator.

## TODO How I fetch data from my component?

FIXME We are using useEffect hook; this section need to be updated.

In react+typescript, and given the generated code client, we will set up
the client by:

```typescript
import { ResourcesApiFactory } from '/src/Api/api';

const MyComponent = () => {
  useEffect(()=>{
    resources_api
      .listDomains(undefined, offset, perPage, undefined)
      .then((res) => {
        // ...
      .catch((error) => {
        console.log(error);
      })
  }, []);
  return (
    <>
    </>
  );
}
```

See: https://stackoverflow.com/questions/70185507/how-to-use-generated-openapi-client-inside-react
