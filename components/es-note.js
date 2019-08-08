import Component from '@ember/component';
import { get } from '@ember/object';
import layout from '../templates/components/es-note';
import {
  DefaultMessage as defaultMessage,
  Mascots as mascots,
 } from '../constants/mascots';

/**
  EsNote Usage:
  @class EsNote
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,

  classNames: ['cta'],

  /**
  * imageUrl
  *
  * @field imageUrl
  * @type null
  * @public
  */
  imageUrl: null,
  /**
  * mascots
  *
  * @field mascots
  * @type undefined
  * @public
  */
  mascots,
  /**
  * nameTitle
  *
  * @field nameTitle
  * @type null
  * @public
  */
  nameTitle: null,
  /**
  * defaultMessage
  *
  * @field defaultMessage
  * @type undefined
  * @public
  */
  defaultMessage,

  /**
  * init
  *
  * @method init
  * @public
  *
  */
  init() {
    this._super(...arguments);

    this._randomMascot();
  },

  /**
  * _randomMascot
  *
  * @method _randomMascot
  * @private
  *
  */
  _randomMascot() {
    const random = Math.random();
    const mascots = get(this, 'mascots');
    let randomIndex, mascot = mascots[0];

    if (mascots.length > 1) {
      randomIndex = Math.floor(random * Math.floor(2));
      mascot = mascots[randomIndex];
    }

    this.setProperties({
      imageUrl: get(mascot, 'image'),
      nameTitle: `${get(mascot, 'name')} says...`,
    });
  },
});
