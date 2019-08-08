import Component from '@ember/component';
import layout from '../templates/components/es-card';

/**
  EsCard Usage:
  @class EsCard
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,
  classNames: ['es-card'],
  classNameBindings: ['hasBorder:border'],

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
  * @type null
  * @public
  */
  ariaRole: null,
  /**
  * title
  *
  * @field title
  * @type null
  * @public
  */
  title: null,

  /**
  * hasBorder
  *
  * @field hasBorder
  * @type undefined
  * @public
  */
  hasBorder: false
});
