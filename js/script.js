
	$(document).ready(function() {

	  $.getJSON("https://api.nbp.pl/api/exchangerates/tables/C/?format=json", function(result) {
	    var date = result[0].effectiveDate;
	    $('#effectiveDate').append("<h4>" + date + "</h4>");

	    var table = "<table><thead><tr><th>Ask</th><th>Bid</th><th>Code</th><th>Currency</th></tr></thead>"
	    var tableRow = "";
	    $.each(result[0].rates, function(i, field) {
	      var ask = field.ask;
	      var bid = field.bid;
	      var code = field.code;
	      var currency = field.currency;
	      if (code != "XDR") {

	        table += "<tbody><tr><td>" + ask + "</td><td>" + bid + "</td><td>" + code + "</td><td>" + currency + "</td></tr>";

	        var optionString = '<option value="' + ask + '" >' + code + '</option>';
	        var optionString2 = '<option value="' + bid + '" >' + code + '</option>';
	        $('#currencySelect').append(optionString);
	        $('#currencySelect2').append(optionString2);
	      }

	    });
	    table += "</tbody></table>"

	    //console.log(result);
	    $('#currencyTable').append(table);
	  });

	  $('#count_to_foreign').click(function() {
	    var plnCount = document.getElementById('pln_count').value;
	    var kurs = $('#currencySelect').val();
	    var result = plnCount / kurs;
	    var forgein_code = $('#currencySelect').find(":selected").text();
	    $('.result p').html(result.toFixed(2) + " " + forgein_code);
	  });

	  $('#count_to_pln').click(function() {
	    var forCount = document.getElementById('forgein_count').value;
	    var kurs = $('#currencySelect2').val();
	    var result = forCount * kurs;
	    $('.result p').html(result.toFixed(2) + " PLN");
	  });

	  showFromDate(); 
	  $('#btn1').click(function() {
	    showFromDate();
	  });

	  function showFromDate() {
		var data = $('#submit_date').val();
	    var str = "https://api.nbp.pl/api/exchangerates/tables/C/" + data + "/";
	    console.log(str);

	    $.getJSON(str, function(result_date) {

	      var table = "<table><thead><tr><th>Ask</th><th>Bid</th><th>Code</th><th>Currency</th></tr></thead>"
	      var tableRow = "";
	      $.each(result_date[0].rates, function(i, field) {
	        var ask = field.ask;
	        var bid = field.bid;
	        var code = field.code;
	        var currency = field.currency;
	        if (code != "XDR") {

	          table += "<tbody><tr><td>" + ask + "</td><td>" + bid + "</td><td>" + code + "</td><td>" + currency + "</td></tr>";

	        }

	      });
	      table += "</tbody></table>"

	      $('#div1').html(table);
	    });
	  }
	})