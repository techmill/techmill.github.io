$(function() {
  function updateMemberCosts() {
    var monthlyCosts = parseInt($('#monthlyCost').val());
    var dayPasses = parseInt($('#dayPasses').val());
    var memberCount = parseInt($('#memberCount').val());

    $('#monthlyCost-group').toggleClass('has-error', Number.isNaN(monthlyCosts));
    $('#dayPasses-group').toggleClass('has-error', Number.isNaN(dayPasses));
    $('#memberCount-group').toggleClass('has-error', Number.isNaN(memberCount));

    if (Number.isNaN(monthlyCosts) || Number.isNaN(dayPasses) || Number.isNaN(memberCount)) {
      return;
    }

    var avgMemberCost = (monthlyCosts - (25 * dayPasses)) / memberCount;
    var regularCost = avgMemberCost * 0.65;
    var startupCost = avgMemberCost * 2;

    $('#regularMembership').text(sprintf('$%0.2f/mo', regularCost));
    $('#townieMembership').text(sprintf('$%0.2f/mo', avgMemberCost));
    $('#startupMembership').text(sprintf('$%0.2f/mo', startupCost));
  }

  $('#monthlyCost,#dayPasses,#memberCount').keyup(updateMemberCosts);
  updateMemberCosts();
});
