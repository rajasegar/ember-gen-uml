import Component from '@ember/component';
import layout from '../templates/components/es-pagewrapper';

/**
  EsPagewrapper Usage:
  @class EsPagewrapper
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,
  classNameBindings: ['hasAside:pagewrapper-aside:pagewrapper'],
  /**
  * hasAside
  *
  * @field hasAside
  * @type undefined
  * @public
  */
  hasAside: false,
  /**
  * ariaRole
  *
  * @field ariaRole
  * @type undefined
  * @public
  */
  ariaRole: 'presentation',
  tagName: 'div'
});
