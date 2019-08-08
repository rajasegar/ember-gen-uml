import Component from '@ember/component';
import layout from '../templates/components/es-buttonbar';

/**
  EsButtonbar Usage:
  @class EsButtonbar
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,
  classNames: ['es-buttonbar'],


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
  ariaRole: 'group',
  /**
  * title
  *
  * @field title
  * @type null
  * @public
  */
  title: null
});
