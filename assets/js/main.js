/* -------------------- END User functions --------------------  */
function headerAffixate(mainMenu) {
  $(mainMenu).affix({
    offset: {
      top: function(){return $(mainMenu).outerHeight();}
    }
  });
}

function scrollAnimation(scroller) {
  $(scroller).on('click',function (e) {
    e.preventDefault();

    if(typeof $(this.hash).offset() !== "undefined") {
      $("html, body").animate({ 
        scrollTop: $(this.hash).offset().top 
      }, 300);
    }
  });
}

function datepickers(fields) {
  $(fields.field).datepicker(fields.setting);
}

function initIsotope(isotope) {
  var filters = [];

  // filter functions
  var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function() {
      var number = $(this).find('.number').text();
      return parseInt( number, 10 ) > 50;
    },
    // show if name ends with -ium
    ium: function() {
      var name = $(this).find('.name').text();
      return name.match( /ium$/ );
    }
  };

  var $grid = $(isotope.grid).isotope({
    itemSelector: isotope.item,
    layoutMode: isotope.layout,
    cellsByRow: {
      rowHeight: isotope.cellsbyrow_height
    }
  });

  if(isotope.selectType === 'button') {
    $(isotope.tabButtons).on('click', function() {
      $('.options li a.active').removeClass('active');

      $(this).toggleClass('active');
      var filter = $(this).attr('data-filter');

      $grid.isotope({ filter: '.'+filter });
    });
  }
  else if(isotope.selectType === 'select') {
    $(isotope.selector).on( 'change', function() {
      // get filter value from option value
      var filterValue = this.value;
      // use filterFn if matches value
      filterValue = filterFns[ filterValue ] || filterValue;
      $grid.isotope({ filter: '.'+filterValue });
    });
  }

}

function initTimePicker(fields) {
  $(fields).timepicker({
    minuteStep: 1
  });
}

function initContactForm(contactForms) {
  $(contactForms).removeAttr("novalidate");
  $(contactForms).submit(function (e) {
    e.preventDefault();

    $.post( baseURL+"cf/submit/", $(this).serializeArray(), function( data ) {
      if (data.status == "error" ) {
        $.toast({
          heading: 'Warning',
          text: data.message,
          showHideTransition: 'plain',
          icon: 'warning'
        });
      }
      else {
        $.toast({
          heading: 'Success',
          text: 'Your message has been sent!',
          showHideTransition: 'plain',
          icon: 'success'
        });

        $(contactForms)[0].reset();
      }
    });
  });
}

function initCheckboxRadio(checkboxes) {
  $( checkboxes ).checkboxradio();
}

function initProgressBar(bar) {
  bar.forEach(function(element) {
    $(element.hook).progressbar({
      value: element.rate
    });
  });
}

function initRangeSlider(ranges) {
  ranges.forEach(function(range) {
    $( range.className ).slider({
      range: range.range,
      min: range.min,
      max: range.max,
      values: range.values,
      slide: range.slide
    });
    $( range.input ).val( "$" + $( range.className ).slider( "values", 0 ) + " - $" + $( range.className ).slider( "values", 1 ) );
  });
}

function scrollSpyInit(scrollSpy) {
  ScrollPosStyler.init({
    scrollOffsetY: scrollSpy.scrollOffsetY
  });
}

function resizer(resizeDiv) {
  var referElem = document.getElementsByClassName(resizeDiv.referenceDiv);
  var element = document.getElementsByClassName(resizeDiv.changedDiv);

  new ResizeSensor(referElem, function(){
    element[0].style.height = referElem[0].clientHeight;
  });
}
/* -------------------- END User functions --------------------  */

$(document).ready(function () {
  const settings = {
    scrollSpy: {
      scrollOffsetY: $('.header .top').height()
    },
    resizeDiv: {
      referenceDiv: 'navbar-collapse',
      changedDiv: 'header'
    },
    datefields: {
      field: '#datein, #dateout',
      settings: {
        'format': 'MM d, yyyy'
      }
    },
    isotope: [
      {
        selectType: 'button',
        tabButtons: '.btn.all, .btn.sports, .btn.express, .btn.flybridge',
        itemSelector: '.blog .post',
        layout: 'fitRows',
        //cellsbyrow_height: 215,
        grid: '.grid'
        //selector: '#select-accomodation',
        //item: '.blog .post',
      },
      {
        selectType: 'select',
        //tabButtons: '.btn.all, .btn.install, .btn.repair',
        //itemSelector: '.item',
        selector: '#select-accomodation',
        item: '.accomodations .item',
        layout: 'fitRows',
        //cellsbyrow_height: 215,
        grid: '.grid'
      }
    ],
    bars: [
      {
        hook: '.pricerange',
        rate: 75
      },
      {
        hook: '.arearange',
        rate: 90
      }
    ],
    checkboxes: "#ac, #internet, #parking, #pool, #wheelchair",
    range: [
      {
        input: "#pricerange",
        className: ".pricerange",
        range: true,
        min: 45,
        max: 150,
        values: [ 80, 100 ],
        slide: function( event, ui ) {
          $( "#pricerange" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        }
      },
      {
        input: "#arearange",
        className: ".arearange",
        range: true,
        min: 100,
        max: 514,
        values: [ 150, 200 ],
        slide: function( event, ui ) {
          $( "#arearange" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        }
      }
    ]
    /*
    datefields: {
      field: '#datein, #dateout',
      setting: {
        showOtherMonths: true,
        selectOtherMonths: true,
        dayNamesMin: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]
      }
    }
    ,
    */
  };

  scrollSpyInit(settings.scrollSpy);
  datepickers(settings.datefields);
  initIsotope(settings.isotope[0]);
  initIsotope(settings.isotope[1]);
  initCheckboxRadio(settings.checkboxes);
  initRangeSlider(settings.range);
  resizer(settings.resizeDiv);

  //initProgressBar(settings.bars);
  //initTimePicker(settings.timeFields);
  //initProgressBar(settings.bars);
  //headerAffixate(settings.menuDiv);
  //initContactForm(settings.contactForms);
  //scrollAnimation(settings.scroller);
  //headerAffixate(settings.menuDiv);

});
