import Component from '@ember/component';
import layout from '../templates/components/es-footer';
import {
  socialLinks,
  infoLinks,
  contributorLinks,
  tagline
} from '../constants/es-footer';


/**
  EsFooter Usage:
  @class EsFooter
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,
  attributeBindings: ['ariaLabel:aria-label'],
  classNames: ['es-footer'],
  tagName: 'footer',
  /**
  * currentYear
  *
  * @field currentYear
  * @type null
  * @public
  */
  currentYear: null,
  /**
  * init
  *
  * @method init
  * @public
  *
  */
  init() {
    this._super(...arguments);
    this.currentYear = new Date().getUTCFullYear();
  },

  /**
  * socialLinks
  *
  * @field socialLinks
  * @type undefined
  * @public
  */
  socialLinks,
  /**
  * tagline
  *
  * @field tagline
  * @type undefined
  * @public
  */
  tagline,
  /**
  * contributorLinks
  *
  * @field contributorLinks
  * @type undefined
  * @public
  */
  contributorLinks,
  /**
  * infoLinks
  *
  * @field infoLinks
  * @type undefined
  * @public
  */
  infoLinks,

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
  ariaRole: 'contentinfo',
  /**
  * title
  *
  * @field title
  * @type null
  * @public
  */
  title: null
});
