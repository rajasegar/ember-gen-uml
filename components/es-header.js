import Component from '@ember/component';
import layout from '../templates/components/es-header';

/**
  EsHeader Usage:
  @class EsHeader
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,
  attributeBindings: ['ariaLabel:aria-label'],
  classNames: ['es-header'],
  tagName: 'header',

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
  ariaRole: 'banner',
  /**
  * title
  *
  * @field title
  * @type null
  * @public
  */
  title: null
});
