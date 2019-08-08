import Component from '@ember/component';
import layout from '../templates/components/es-aside';

/**
  EsAside Usage:
  @class EsAside
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,
  attributeBindings: ['ariaLabel:aria-label'],
  classNames: ['es-aside'],
  tagName: 'aside',

  /**
  * ariaDescribedby
  *
  * @field ariaDescribedby
  * @type null
  * @public
  */
  ariaDescribedby: null,
  /**
  * ariaLabel
  *
  * @field ariaLabel
  * @type null
  * @public
  */
  ariaLabel: null,
  /**
  * ariaRole
  *
  * @field ariaRole
  * @type undefined
  * @public
  */
  ariaRole: 'complementary',
  /**
  * title
  *
  * @field title
  * @type null
  * @public
  */
  title: null
});
