import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import { BurgerBuilder } from './BurgerBuilder';
import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredientType';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <BurgerBuilder
        /* Router props */
        history={{} as any}
        location={{} as any}
        match={{} as any}

        /* Dispatch props */
        addIngredient={{} as any}
        removeIngredient={{} as any}
        initializeIngredients={(() => {}) as any}
        purchaseInit={{} as any}

        /* State props */
        isAuthenticated={false}
        ingredients={{[BurgerIngredientType.SALAD]: 0}}
        totalPrice={3}
        error={{} as any}
      />
    );
  });

  it('should render <BuildControls /> when receiving ingredients', () => {
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
