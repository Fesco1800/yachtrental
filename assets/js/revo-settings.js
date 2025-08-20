/* https://learn.jquery.com/using-jquery-core/document-ready/ */
jQuery(document).ready(function() {

  /* initialize the slider based on the Slider's ID attribute from the wrapper above */
  jQuery('#rev_slider_1').show().revolution({
    sliderType:"standard",
    fullScreenAlignForce: 'off',
    responsiveLevels: [1201,1200, 992, 768, 576],
    //gridwidth:[1180, 992, 768, 550, 290],   // for floating head
    gridwidth:[1180, 992, 890, 720, 610],
    gridheight:[700, 650, 600, 500, 440],
    //fullScreenOffsetContainer: '.header',
    sliderLayout:"fullscreen",
    autoHeight:"on",
    viewPort: {
      enable: true,
      outof: 'wait',
      visible_area: '80%',
      presize: true
    },
    navigation: {
      arrows: {
        enable: false,
        style: 'hesperiden',
        hide_onleave: true,
        hide_onmobile: true,
        tmp: ''
      },
      bullets: {
        enable: false,
        style: 'hesperiden',
        hide_onleave: false,
        h_align: 'left',
        v_align: 'center',
        h_offset: 0,
        v_offset: 25,
        space: 5
      }
    },
    //debugMode: true
  });
});
