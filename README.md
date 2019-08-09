# ember-gen-uml
[![npm](https://img.shields.io/npm/dm/ember-gen-uml.svg)](https://www.npmjs.com/package/ember-gen-uml)
[![npm version](http://img.shields.io/npm/v/ember-gen-uml.svg?style=flat)](https://npmjs.org/package/ember-gen-uml "View this project on npm")
[![dependencies Status](https://david-dm.org/rajasegar/ember-gen-uml/status.svg)](https://david-dm.org/rajasegar/ember-gen-uml)
[![devDependencies Status](https://david-dm.org/rajasegar/ember-gen-uml/dev-status.svg)](https://david-dm.org/rajasegar/ember-gen-uml?type=dev)

A CLI to generate PlantUML compatible diagrams from Ember Components source

## Usage

### 1. Install CLI
```sh
npm i -g ember-gen-uml
```

### 2. Generate UML files
```sh
ember-gen-uml app/components --out=/Users/user/Desktop/uml-folder
```

or using npx:
```sh
npx ember-gen-uml app/components --out=/Users/user/Desktop/uml-folder
```

If you are using PODS layout for components, you need to pass `--pods` flag:

```sh
ember-gen-uml app/components --out=/Users/user/Desktop/uml-folder --pods
```

### 3. Generate PNG files or SVG files using plantuml.jar
```sh
java -jar ~/plantuml.jar /User/user/Desktop/uml-folder/**.pu
```
This will generate PNG files with UML diagrams in the same folder.

To generate in SVG format

```sh
java -jar ~/plantuml.jar -tsvg /User/user/Desktop/uml-folder/**.pu
```



## From
For example, this is the [es-accordion](https://github.com/ember-learn/ember-styleguide/blob/master/addon/components/es-accordion.js) component from [ember-style-guide](https://github.com/ember-learn/ember-styleguide)

```js
import Component from '@ember/component';
import layout from '../templates/components/es-accordion';
import {
  get,
  getProperties,
  set,
} from '@ember/object';
import {
  isPresent,
} from '@ember/utils';
import { computed } from '@ember/object';
import {
  A,
} from '@ember/array';


export default Component.extend({
  layout,

  classNames: ['accordion-group'],
  activeItem: null,
  focusIndex: null,
  accordionItemIndexes: null,

  accordionState: computed('activeItem', 'focusIndex', function() {
    const {
      activeItem,
      focusIndex,
      actions,
    } = getProperties(this, [
      'activeItem',
      'focusIndex',
      'actions',
    ]);

    return {
      activeItem,
      focusIndex,
      setActiveItem: actions.setActiveItem.bind(this),
      setFocusIndex: actions.setFocusIndex.bind(this),
      registerIndex: actions.registerIndex.bind(this),
    };
  }),

  init() {
    this._super(...arguments);

    set(this, 'accordionItemIndexes', []);
  },


  keyDown(e) {
    const keyCode = get(e, 'keyCode');
    const focusIndex = get(this, 'focusIndex');

    if (isPresent(focusIndex)) {
      const targetIndex = this._resolveTargetItemIndex(keyCode);

      set(this, 'activeItem', targetIndex);
    }
  },


  _resolveTargetItemIndex(keyCode) {
    const {
      accordionItemIndexes,
      activeItem,
      focusIndex,
    } = getProperties(this, [
      'accordionItemIndexes',
      'activeItem',
      'focusIndex',
    ]);
    const first = Math.min(...accordionItemIndexes);
    const last = Math.max(...accordionItemIndexes);
    let itemIndexOfIndex = A(accordionItemIndexes).indexOf(activeItem);
    let targetIndex;

    switch (keyCode) {
      case 38:
        if (activeItem === null || itemIndexOfIndex === -1) {
          targetIndex = focusIndex;
        } else if (activeItem === first) {
          targetIndex = last;
        } else {
          itemIndexOfIndex--
          targetIndex = accordionItemIndexes[itemIndexOfIndex];
        }
        break;
      case 40:
        if (activeItem === null || itemIndexOfIndex === -1) {
          targetIndex = focusIndex;
        } else if (activeItem === last) {
          targetIndex = first;
        } else {
          itemIndexOfIndex++
          targetIndex = accordionItemIndexes[itemIndexOfIndex];
        }
        break;
      case 36:
        targetIndex = first;
        break;
      case 35:
        targetIndex = last;
        break;
      case 13:
      case 32:
        if (activeItem !== focusIndex) {
          targetIndex = focusIndex;
        } else {
          targetIndex = null;
        }
        break;
      default:
        targetIndex = activeItem;
    }

    return targetIndex;
  },

  actions: {
    setActiveItem(accordionItemIndex) {
      return set(this, 'activeItem', accordionItemIndex);
    },

    setFocusIndex(accordionItemIndex) {
      set(this, 'focusIndex', accordionItemIndex);
    },

    registerIndex(accordionItemIndex) {
      get(this, 'accordionItemIndexes').push(accordionItemIndex);
    },
  },
});
```

## To
![sample uml diagram](https://github.com/rajasegar/ember-gen-uml/blob/master/images/sample.png)

## CLI Options/Usage
Usage: ember-gen-uml [path...] [options]

Options:
*  -v, --version     CLI Version
*  -o, --out <path>  Store PlantUML definitions (.pu files) in <path>
*  --pods            Enable support for POD style components
*  -h, --help        output usage information

## References
* [PlantUML](http://plantuml.com)
* [PlantUML Class Diagrams](http://plantuml.com/class-diagram)
