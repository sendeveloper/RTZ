$(document).ready(function () {
  init();
  function setSVGColor() {
    document.getElementById("svg1").addEventListener("load", function() {
      var doc = this.getSVGDocument();
      var rect = doc.querySelectorAll("path"); // suppose our image contains a <rect>
      $(rect).attr('fill', '#716b97');
    });
    document.getElementById("svg2").addEventListener("load", function() {
      var doc = this.getSVGDocument();
      var rect1 = doc.querySelectorAll("path");
      $(rect1).attr('fill', '#716b97');
    });
  }
  function init() {
    setSVGColor();
  }
  $('.next-post, .next-title').on('click', function(e) {
    var title;
    e.preventDefault();
    title = $('.next-title').html();
    $('.blog-title').html($('.next-title').html());
    $("html, body").animate({ scrollTop: 0 }, "fast");
    $('.next-title').html(title);
    $('.normal1-1').html("In the majority of cases, a business starts with a good idea and a basic action plan. As it progresses forward and gains traction, the day to day management can often take over pretty quickly. Let’s face it – addressing the daily demands of your business is daunting enough. Starting small and with limited resources, MDs often end up carrying the lion’s share of the responsibility and workload - representing the business, promoting it, driving sales, networking, marketing, motivating and managing the team. There are rarely enough hours in the day to cover every challenge that needs tackling. Therefore, the last thing any entrepreneur wants to hear from a mentor/investor is ‘Do you have a strategy, and more importantly, do you actually use it to govern your business activity?’.");
    $('.img-container img').attr('src', 'img/img2.jpg');
  })
})