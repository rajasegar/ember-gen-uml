import Component from '@ember/component';
import layout from '../templates/components/es-ulist';
import { computed } from '@ember/object';


/**
  EsUlist Usage:
  @class EsUlist
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,
  classNames: ['es-ulist'],
  classNameBindings: ['hasBorder:bordered'],

  
  /**
  * listId
  *
  * @computed listId
  */
  listId: computed(function() {
    return ('list-' + this.get('elementId'));
  }),

  /**
  * ariaLabelledby
  *
  * @field ariaLabelledby
  * @type null
  * @public
  */
  ariaLabelledby: null,
  /**
  * ariaLabel
  *
  * @field ariaLabel
  * @type null
  * @public
  */
  ariaLabel: null,
  /**
  * listItems
  *
  * @field listItems
  * @type null
  * @public
  */
  listItems: null,
  /**
  * listTitle
  *
  * @field listTitle
  * @type null
  * @public
  */
  listTitle: null,
  
  /**
  * hasImage
  *
  * @field hasImage
  * @type undefined
  * @public
  */
  hasImage: false,
  /**
  * hasLink
  *
  * @field hasLink
  * @type undefined
  * @public
  */
  hasLink: false,
  /**
  * hasBorder
  *
  * @field hasBorder
  * @type undefined
  * @public
  */
  hasBorder: false,

  /**
  * isUnorderedList
  *
  * @field isUnorderedList
  * @type undefined
  * @public
  */
  isUnorderedList: true,
  /**
  * isTitleVisible
  *
  * @field isTitleVisible
  * @type undefined
  * @public
  */
  isTitleVisible: true,


});
