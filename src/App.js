import logo from './logo.svg';
import './App.css';
import React from 'react';
import {
  createInstance,
  OptimizelyFeature,
  OptimizelyProvider,
  withOptimizely
} from '@optimizely/react-sdk';


const optimizely = createInstance({
  sdkKey: 'xxxxx'
});

class PurchaseButton extends React.Component {
  onClick = () => {
    const { optimizely } = this.props
    // after we’ve confirmed purchase completed
    optimizely.track('purchase')
  }

  render() {
    return (
      <button onClick={this.onClick}>
        Purchase
      </button>
    )
  }
}

const WrappedPurchaseButton = withOptimizely(PurchaseButton)

function App() {
  return (
     <OptimizelyProvider
        optimizely={optimizely}
        user={{
          id: 'user123',
        }}
      >
    <div className="App">
      <header className="App-header">
        <OptimizelyFeature feature="discount">
        {(enabled, variables) => (
        `Got a discount of $${variables.amount}`
              )}
          </OptimizelyFeature>
          <WrappedPurchaseButton></WrappedPurchaseButton>
      </header>
    </div>
    </OptimizelyProvider>
  );
}

export default App;
