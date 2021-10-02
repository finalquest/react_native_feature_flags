_Feature Flags for React_


## Install:
```
npm install --save react-feature-flags
```

## Usage:
- Add FFProvider on top of the react application with the flag that should be turned off.
- Create feature controlled components using FF high order component.

```jsx
import {FFProvider, FF} from 'react-feature-flags';
const FFComponent = FF(Component, ['f1']);

 <FFProvider restrictions={['f1', 'f2']}>
  <FFComponent/>
 </FFProvider>
```

## API

### FFProvider
React component used for provide feature restrictions through an app.
```jsx
<FFProvider auto restrictions={['flag']} replacement={<div/>}>
```

Prop | Type | Required | Description
--- | --- | --- | ---
restrictions | array[string] | false | string flags to be turned off on featured components
replacement | React.Element | false | Element which will be used for replacement when feature matches a restriction
hideall | boolean | false | switch for disabling all featured elements.
auto | boolean | false | switch for auto applying feature flags through all inner components (still in progress)

### FF
High order component function for feature flag controlled components creation.
```jsx
const FFComponent = FF(Component, ['flag']);
```

Param | type | Description
--- | --- | ---
component | React.Component | react component to be controlled by feature flags
flags | array[string] | string flags to be controlled for this component

## Easy use (Still in Progress):
- FFProvider's prop "auto" will apply feature flags control over all inner components.
- Add "features" prop on the Components you need to control will be enough.

```jsx
import {FFProvider} from 'react-feature-flags';

 <FFProvider auto restrictions={['f1', 'f2']}>
  <Component features={['f1']}/>
 </FFProvider>
```
