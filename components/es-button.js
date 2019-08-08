import Component from '@ember/component';
import layout from '../templates/components/es-button';
import { computed } from '@ember/object';

/**
  EsButton Usage:
  @class EsButton
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
    layout,
    tagName: 'button',

    classNames: ['es-button'],
    classNameBindings: [
      'buttonIcon',
      'isDark:button-dark:button-light',
      'isBlock:button-block',
      'isDense:button-dense',
      'isTiny:button-tiny',
      'isLink:button-link',
      'icon:button-icon',
      'isDisabled:disabled'
    ],
    attributeBindings: [
      'ariaDisabled:aria-disabled',
      'ariaLabel:aria-label',
      'ariaPressed:aria-pressed',
      'dataRole:data-role',
      'isDisabled:disabled',
      'title',
      'type'
    ],

    /**
    * dataRole
    *
    * @field dataRole
    * @type null
    * @public
    */
    dataRole: null,
    /**
    * label
    *
    * @field label
    * @type null
    * @public
    */
    label: null,
    /**
    * type
    *
    * @field type
    * @type null
    * @public
    */
    type: null,

    /**
    * isBlock
    *
    * @field isBlock
    * @type undefined
    * @public
    */
    isBlock: false,
    /**
    * isDense
    *
    * @field isDense
    * @type undefined
    * @public
    */
    isDense: false,
    /**
    * isLink
    *
    * @field isLink
    * @type undefined
    * @public
    */
    isLink: false,
    /**
    * isTiny
    *
    * @field isTiny
    * @type undefined
    * @public
    */
    isTiny: false,

    /**
    * isDark
    *
    * @field isDark
    * @type undefined
    * @public
    */
    isDark: true,
    /**
    * isDisabled
    *
    * @field isDisabled
    * @type undefined
    * @public
    */
    isDisabled: false,

    /**
    * ariaDisabled
    *
    * @field ariaDisabled
    * @type undefined
    * @public
    */
    ariaDisabled: false,
    /**
    * ariaLabel
    *
    * @field ariaLabel
    * @type null
    * @public
    */
    ariaLabel: null,
    /**
    * ariaPressed
    *
    * @field ariaPressed
    * @type null
    * @public
    */
    ariaPressed: null,
    /**
    * title
    *
    * @field title
    * @type null
    * @public
    */
    title: null,

    /**
    * icon
    *
    * @field icon
    * @type null
    * @public
    */
    icon: null,

    /**
    * buttonIcon
    *
    * @computed buttonIcon
    */
    buttonIcon: computed('icon', function() {
      const icon = this.get('icon');

      if (icon) {
        return `fa ${this.get('icon')}`;
      }

      return null;
    }),

    /**
    * click
    *
    * @method click
    * @public
    *
    */
    click() {
      const onClicked = this.get('onClicked');

      if (typeof(onClicked) === 'function') {
        onClicked();
      }
    },
});
