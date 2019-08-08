import Component from '@ember/component';
import layout from '../templates/components/es-heading';

/**
  EsHeading Usage:
  @class EsHeading
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,
  classNames: ['es-heading'],
  classNameBindings: ['isPageHeading:page-heading', 'isCentered:text-center'],
  attributeBindings: ['ariaLabel:aria-label', 'title'],

  tagName: 'h1', //acceptable values should be h1-h6
  /**
  * headingText
  *
  * @field headingText
  * @type null
  * @public
  */
  headingText: null,

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
  ariaRole: 'heading',
  /**
  * title
  *
  * @field title
  * @type null
  * @public
  */
  title: null,

  /**
  * hasIcon
  *
  * @field hasIcon
  * @type undefined
  * @public
  */
  hasIcon: false,
  /**
  * iconUrl
  *
  * @field iconUrl
  * @type null
  * @public
  */
  iconUrl: null,
  /**
  * iconLeft
  *
  * @field iconLeft
  * @type undefined
  * @public
  */
  iconLeft: false,

  /**
  * isPageHeading
  *
  * @field isPageHeading
  * @type undefined
  * @public
  */
  isPageHeading: false,
  /**
  * isCentered
  *
  * @field isCentered
  * @type undefined
  * @public
  */
  isCentered: false
});
