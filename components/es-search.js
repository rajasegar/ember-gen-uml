import Component from '@ember/component';
import layout from '../templates/components/es-search';

/**
  EsSearch Usage:
  @class EsSearch
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,
  classNames: ['es-search'],
  /**
  * ariaRole
  *
  * @field ariaRole
  * @type undefined
  * @public
  */
  ariaRole: 'search'
});
