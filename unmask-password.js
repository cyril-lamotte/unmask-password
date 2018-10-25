

/**
 * Unmask/Mask password fields.
 *
 * @param {String} trigger_selector - CSS selector for the trigger
 * @param {Object} options - Settings.
 */
var unmaskPassword = function(trigger_selector, options) {

  // Default options
  var defaults = {
    'title': true,
    'unmask_label': 'Unmask password',
    'mask_label': 'Mask password',
    'prefix': 'unmask'
  }

  var p = {}; // Plugin.
  p.settings = {};

  // Get triggers and add events listeners.
  var triggers = document.querySelectorAll(trigger_selector);

  /**
   * Plugin initialisation.
   *
   * @param {Element} el - trigger
   */
  p.init = function(el) {

    // Merge user's options.
    p.settings = Object.assign(defaults, options);
    p.trigger = el;

    // Add base class on trigger.
    p.trigger.classList.add(p.settings.prefix);

    // Define visible class.
    p.settings.visible_class = p.settings.prefix + '--pwd-is-visible';

    // Get related password input.
    var input_id = p.trigger.getAttribute('data-unmask');
    p.settings.input = document.querySelector('#' + input_id);

    // Get text wrapper.
    p.settings.text_tag = p.trigger.querySelector('span');

    // Update label.
    updateLabel(p.settings.unmask_label);

    // Add event listeners.
    addListeners();

  };


  /**
   * Update title & button text.
   *
   * @param {String} label - New label
   */
  var updateLabel = function(label) {

    if (p.settings.title) {
      p.trigger.setAttribute('title', label);
    }

    p.settings.text_tag.innerHTML = label;

  };


  /**
   * Add event listeners.
   */
  var addListeners = function() {

    // Add events.
    p.trigger.addEventListener('click', function(event) {

      event.preventDefault();

      this.classList.toggle(p.settings.visible_class);
      if (this.classList.contains(p.settings.visible_class)) {

        // Unmask password.
        p.settings.input.setAttribute('type', 'text');
         updateLabel(p.settings.mask_label);

      } else {

        // Mask password.
        p.settings.input.setAttribute('type', 'password');
        updateLabel(p.settings.unmask_label);

      }

    });

  };

  // Init plugin for each element.
  triggers.forEach(function(el) {
    p.init(el);
  });

};
