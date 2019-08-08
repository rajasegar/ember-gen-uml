import Component from '@ember/component';
import layout from '../templates/components/es-blog-heading';

/**
  EsBlogHeading Usage:
  @class EsBlogHeading
  @namespace Components
  @extends Ember.Component
  @public
*/
export default Component.extend({
  layout,
  classNames: ['es-blog-heading'],
  /**
  * author
  *
  * @field author
  * @type null
  * @public
  */
  author: null,
  /**
  * postDate
  *
  * @field postDate
  * @type null
  * @public
  */
  postDate: null,
  /**
  * postTitle
  *
  * @field postTitle
  * @type null
  * @public
  */
  postTitle: null,
  /**
  * postUrl
  *
  * @field postUrl
  * @type null
  * @public
  */
  postUrl: null,
  /**
  * isGuestPost
  *
  * @field isGuestPost
  * @type undefined
  * @public
  */
  isGuestPost: false,  
});
