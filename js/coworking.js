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

    var regularShares = 0.5;
    var townieShares = 1.0;
    var startupShares = 2.0;

    var regularCount = Math.floor(memberCount * 0.625);
    var townieCount = Math.floor(memberCount * 0.25);
    var startupCount = memberCount - (regularCount + townieCount);

    var totalShares = (regularCount * regularShares) + (townieCount * townieShares) + (startupCount * startupShares)
    var shareCost = (monthlyCosts - (25 * dayPasses)) / totalShares;

    //var avgMemberCost = (monthlyCosts - (25 * dayPasses)) / memberCount;
    var regularCost = shareCost * regularShares;
    var startupCost = shareCost * startupShares;

    $('#regularMembership').text(sprintf('$%0.2f/mo', regularCost));
    $('#townieMembership').text(sprintf('$%0.2f/mo', shareCost));
    $('#startupMembership').text(sprintf('$%0.2f/mo', startupCost));
  }

  $('#monthlyCost,#dayPasses,#memberCount').keyup(updateMemberCosts);
  updateMemberCosts();
});
