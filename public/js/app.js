
if(window.location.pathname=="/Admin/showProperties.html"||window.location.hrepathnamef=="/Admin/addProperties.html"||window.location.pathname=="/Admin/editProperty.html")
{
  if(sessionStorage['email']!='admin@svsb.com'){
    window.location.href="login.html"
  }
}
if (sessionStorage['email']){
  $('#loggedIn').html('<a class="waves-effect waves-dark" href="javascript:void(0)" style="cursor:default;">Welcome '+sessionStorage['username']+'!</a>')
}


function filterProperties(type){
  var investmentTypeArray=[];
  var investmentStrategyArray=[];
  var propertyTypeArray=[];

   if($('#openForInvestment').prop('checked')==true){
   investmentTypeArray.push('Open For Investment');     
   }
   if($('#openForPledging').prop('checked')==true){
    investmentTypeArray.push('Open For Pledging');     
   }
   if($('#waitlist').prop('checked')==true){
    investmentTypeArray.push('Waitlist');     
   }
   if($('#funded').prop('checked')==true){
    investmentTypeArray.push('Funded');     
   }

   if($('#multifamily').prop('checked')==true){
    propertyTypeArray.push('Multifamily');     
   }
   if($('#retail').prop('checked')==true){
    propertyTypeArray.push('Retail');     
   }
   if($('#office').prop('checked')==true){
    propertyTypeArray.push('Office');     
   }
   if($('#hospitality').prop('checked')==true){
    propertyTypeArray.push('Hospitality');     
   }
   if($('#industrial').prop('checked')==true){
    propertyTypeArray.push('Industrial');     
   }
   if($('#mixedUse').prop('checked')==true){
    propertyTypeArray.push('Mixed Use');     
   }
   if($('#specialPurpose').prop('checked')==true){
    propertyTypeArray.push('Special Purpose');     
   }
   if($('#all').prop('checked')==true){
    propertyTypeArray.push('All');     
   }
   if($('#land').prop('checked')==true){
    propertyTypeArray.push('Land');     
   }
   if($('#noteLoan').prop('checked')==true){
    propertyTypeArray.push('Note/Loan');     
   }

   if($('#reits').prop('checked')==true){
    investmentStrategyArray.push('REITs');     
   }
   if($('#development').prop('checked')==true){
    investmentStrategyArray.push('Development');     
   }
   if($('#value-add').prop('checked')==true){
    investmentStrategyArray.push('Value-Add');     
   }
   if($('#corePlus').prop('checked')==true){
    investmentStrategyArray.push('Core Plus');     
   }
   if(propertyTypeArray.length<1){
propertyTypeArray=['All','Retail','Multifamily','Office','Industrial','Hospitality','Mixed Use','Land','Special Purpose','Note/Loan']
   }
   if(investmentStrategyArray.length<1){
     investmentStrategyArray=['REITs','Development','Value-Add','Core Plus']
   }
   if(investmentTypeArray.length<1){
    investmentTypeArray=['Open For Investment','Open For Pledging','Waitlist','Funded']
  }

   propertyTypeArray=JSON.stringify(propertyTypeArray)
   investmentStrategyArray=JSON.stringify(investmentStrategyArray)
   investmentTypeArray=JSON.stringify(investmentTypeArray)
   var sortBy=$('input[name="sortBy"]:checked').val();
    if(!sortBy){
      sortBy="none"
    }
    var url;
    if(type=='user'){
      url='/filterProperties';
    }
    else{
      url='/filterPropertiesAdmin';
    }
   		$.ajax({
    type: 'POST',
    url: url,
    data:{propertyType:propertyTypeArray,
          investmentType:investmentTypeArray,
          investmentStrategy:investmentStrategyArray,
          sortBy:sortBy},
    success: function(res){ 
        if(res!='failed'){
          $('#propertiesContainer').html(res)
        }
        else{
           alert('Please check your credentials')
        }
     
    }
  });
}

function setEditProperty(property){
  sessionStorage['editProperty']=JSON.stringify(property);
  window.location.href="editProperty.html"
}
function setProperty(property){
  sessionStorage['propertyDetails']=JSON.stringify(property);
  window.location.href="propertyDetails.html"
}

function propertyDetails(){
  var property=JSON.parse(sessionStorage['propertyDetails']);
  $('#propertyName').html(property.propertyName)
  $('#propertyPlace').html(property.city+", "+property.state+", "+property.region)
  $('#propertyType').html(property.propertyType)
  $('#propertySubType').html(property.propertySubType)
  $('#investmentType').html(property.investmentType)
  $('#estimateHoldPeriod').html(property.estimateHoldPeriod+" years")
  $('#minimumInvestmentAmount').html("$ "+property.minimumInvestmentAmount)
  $('#longDescription').html(property.longDescription)
  $('#targetIRR').html(property.targetIRR+"%")
  $('#targetARR').html(property.targetARR+"%")
  $('#targetEquityMultiple').html(property.targetEquityMultiple+"X")
  $('#targetCashOnCash').html(property.targetCashOnCash)
  $('#image1').attr('src',property.image1)
  $('#image2').attr('src',property.image2)
  $('#image3').attr('src',property.image3)
  $('#image4').attr('src',property.image4)
  $('#image5').attr('src',property.image5)



}

function editProperty(){
   var property=JSON.parse(sessionStorage['editProperty']);
   var textImage1='<a class="AdminDownloadButton" href="'+property.image1+'"><i class="fa fa-download" style="cursor:pointer" aria-hidden="true"></i></a>'
   var textImage2='<a class="AdminDownloadButton" href="'+property.image2+'"><i class="fa fa-download" style="cursor:pointer" aria-hidden="true"></i></a>'
   var textImage3='<a class="AdminDownloadButton" href="'+property.image3+'"><i class="fa fa-download" style="cursor:pointer" aria-hidden="true"></i></a>'
   var textImage4='<a class="AdminDownloadButton" href="'+property.image4+'"><i class="fa fa-download" style="cursor:pointer" aria-hidden="true"></i></a>'
   var textImage5='<a class="AdminDownloadButton" href="'+property.image5+'"><i class="fa fa-download" style="cursor:pointer" aria-hidden="true"></i></a>'





  text='<p><label for="propertyName">Property Name</label></p> <input value="'+property.propertyName+'" required class="signinForm" id="propertyName" type="text" placeholder="Property Name"> <p><label for="offeringPrice">Offering Price</label></p> <input value="'+property.offeringPrice+'" required onkeypress="return IsNumeric(event)" class="signinForm" id="offeringPrice" type="text" placeholder="Offering Price"> <p><label for="holdPeriod">Hold Period</label></p> <input value="'+property.holdPeriod+'" required class="signinForm" id="holdPeriod" type="text" placeholder="Hold Period"> <p><label for="shortDescription">Short description</label></p> <input value="'+property.shortDescription+'" required class="signinForm" id="shortDescription" type="text" placeholder="Short Description"> <p><label for="longDescription">Long description</label></p> <input value="'+property.longDescription+'" required class="signinForm" id="longDescription" type="text" placeholder="Long Description"> <p><label for="propertyType">Property Type</label></p> <select value="'+property.propertyType+'" onchange="propertySubType()" id="propertyType"> <option value="All" selected>All</option> <option value="Retail">Retail</option> <option value="Multifamily">Multifamily</option> <option value="Office">Office</option> <option value="Industrial">Industrial</option> <option value="Hospitality">Hospitality</option> <option value="Mixed Use">Mixed Use</option> <option value="Land">Land</option> <option value="Special Purpose">Special Purpose</option> <option value="Note/Loan">Note/Loan</option> </select> <p class="propertySubType"><label for="propertySubType">Property Sub Type</label></p> <select value="'+property.propertySubType+'" id="propertySubType"></select> <p><label for="address">Address</label></p> <input value="'+property.address+'" required class="signinForm" id="address" type="text" placeholder="Address"> <p><label for="city">City</label></p> <input value="'+property.city+'" required class="signinForm" id="city" type="text" placeholder="City"> <p><label for="state">State</label></p> <input value="'+property.state+'" required class="signinForm" id="state" type="text" placeholder="State"> <p><label for="region">Region</label></p> <input value="'+property.region+'" required class="signinForm" id="region" type="text" placeholder="Region"> <p><label for="investmentOpeningDate">Investment Opening Date</label></p> <input value="'+property.investmentOpeningDate+'"required class="signinForm" id="investmentOpeningDate" type="date"> <p><label for="investmentClosingDate">Investment Closing Date</label></p> <input value="'+property.investmentClosingDate+'"required class="signinForm" id="investmentClosingDate" type="date"> <p><label for="lotSize">Lot Size</label></p> <input value="'+property.lotSize+'"required class="signinForm" id="lotSize" type="number" placeholder="1.0" step="0.01"> <p><label for="investmentStrategy">Investment Strategy</label></p> <select value="'+property.investmentStrategy+'" class="signinForm" id="investmentStrategy" > <option value="REITs">REITs</option> <option value="Development">Development</option> <option value="Value-Add">Value-Add</option> <option value="Core Plus">Core Plus</option> </select> <p><label for="investmentType">Investment Type</label></p> <select value="'+property.investmentType+'" class="signinForm" id="investmentType"> <option value="Open For Investment">Open For Investment</option> <option value="Open For Pledging">Open For Pledging</option> <option value="Waitlist">Waitlist</option> <option value="Funded">Funded</option> </select> <p><label for="targetIRR">Target IRR</label></p> <input value="'+property.targetIRR+'" required class="signinForm" id="targetIRR" type="text" placeholder="Target IRR"> <p><label for="targetARR">Target ARR</label></p> <input value="'+property.targetARR+'" required class="signinForm" id="targetARR" type="text" placeholder="Target ARR"> <p><label for="targetCashOnCash">Target Cash on cash</label></p> <input value="'+property.targetCashOnCash+'" required class="signinForm" id="targetCashOnCash" type="text" placeholder="Target Cash On Cash"> <p><label for="targetEquityMultiple">Target equity multiple</label></p> <input value="'+property.targetEquityMultiple+'" required class="signinForm" id="targetEquityMultiple" type="text" placeholder="Target equity multiple"> <p><label for="averageCashYield">Average Cash Yield</label></p> <input value="'+property.averageCashYield+'" required class="signinForm" id="averageCashYield" type="text" placeholder="Average Cash Yield"> <p><label for="preferredReturn">Preferred Return</label></p> <input value="'+property.preferredReturn+'" required class="signinForm" id="preferredReturn" type="text" placeholder="Preferred Return"> <p><label for="projectedPassiveReturn">Projected Passive Return</label></p> <input value="'+property.projectedPassiveReturn+'" required class="signinForm" id="projectedPassiveReturn" type="text" placeholder="Projected Passive Return"> <p><label for="estimateHoldPeriod">Estimate Hold Period</label></p> <input value="'+property.estimateHoldPeriod+'" required class="signinForm" id="estimateHoldPeriod" type="text" placeholder="Estimate Hold Period"> <p><label for="minimumInvestmentAmount">Minimum Investment Amount</label></p> <input value="'+property.minimumInvestmentAmount+'" required onkeypress="return IsNumeric(event)" class="signinForm" id="minimumInvestmentAmount" type="text" placeholder="Minimum Investment Amount"> <p><label for="loanToCost">Loan to Cost</label></p> <input value="'+property.loanToCost+'" required class="signinForm" id="loanToCost" type="text" placeholder="Loan to Cost"> <p><label for="distributionPeriod">Distribution Period</label></p> <select value="'+property.distributionPeriod+'" id="distributionPeriod"> <option value="Monthly" selected>Monthly</option> <option value="Quarterly">Quarterly</option> <option value="Semi Annually">Semi Annually</option> <option value="Annually">Annually</option> <option value="Upon Sale">Upon Sale</option> </select> <p><label for="sponsorSplit">Sponsor Split</label></p> <input value="'+property.sponsorSplit+'" required class="signinForm" id="sponsorSplit" type="text" placeholder="Sponsor Split"> <p><label for="investorSplit">Investor Split</label></p> <input value="'+property.investorSplit+'" required class="signinForm" id="investorSplit" type="text" placeholder="Investor Split"> <p><label for="acquisitionFee">Acquisition Fee</label></p> <input value="'+property.acquisitionFee+'" required class="signinForm" id="acquisitionFee" type="text" placeholder="Acquisition Fee"> <p><label for="assetManagementFee">Asset Management Fee</label></p> <input value="'+property.assetManagementFee+'" required class="signinForm" id="assetManagementFee" type="text" placeholder="Asset Management Fee"> <p><label for="propertyManagementFee">Property Management Fee</label></p> <input value="'+property.propertyManagementFee+'" required class="signinForm" id="propertyManagementFee" type="text" placeholder="Property Management Fee"> <p><label for="purchaseSaleAgreementDate">Purchase Sale Agreement Date</label></p> <input value="'+property.purchaseSaleAgreementDate+'" required class="signinForm" id="purchaseSaleAgreementDate" type="date"> <p><label for="dueDiligenceCompletionDate">Due Diligence Completion Date</label></p> <input value="'+property.dueDiligenceCompletionDate+'" required class="signinForm" id="dueDiligenceCompletionDate" type="date"> <p><label for="privatePlacementMemorandumsDate">Private Placement Memorandums Date</label></p> <input value="'+property.privatePlacementMemorandumsDate+'" required class="signinForm" id="privatePlacementMemorandumsDate" type="date"> <p><label for="capitalRiseEndDate">Capital Raise End Date</label></p> <input value="'+property.capitalRiseEndDate+'" required class="signinForm" id="capitalRiseEndDate" type="date"> <p><label for="closingDate">Closing Date</label></p> <input value="'+property.closingDate+'" required class="signinForm" id="closingDate" type="date"> <p><label for="refinanceSaleFee">Refinance/Sale Fee</label></p> <input value="'+property.refinanceSaleFee+'" required onkeypress="return IsNumeric(event)" class="signinForm" id="refinanceSaleFee" type="text" placeholder="Refinance/Sale Fee"> <p><label for="capRateAtThePurchase">Cap Rate at the purchase</label></p> <input value="'+property.capRateAtThePurchase+'" required class="signinForm" id="capRateAtThePurchase" type="text" placeholder="Cap Rate at the purchase"> <p><label for="targetExitCapRate">Target Exit Cap Rate </label></p> <input value="'+property.targetExitCapRate+'" required class="signinForm" id="targetExitCapRate" type="text" placeholder="Target Exit Cap Rate "> <p><label for="investorAccreditation">Investor Accreditation</label></p> <input value="'+property.investorAccreditation+'" required class="signinForm" id="investorAccreditation" type="text" placeholder="Investor Accreditation"> <p><label for="1031ExchangEligible">1031 Exchange Eligible</label></p> <input value="'+property._1031ExchangEligible+'" required class="signinForm" id="1031ExchangEligible" type="text" placeholder="1031 Exchange Eligible"> <p><label for="oppurtunityZone">Opportunity Zone</label></p> <input value="'+property.oppurtunityZone+'" required class="signinForm" id="oppurtunityZone" type="text" placeholder="Opportunity Zone"><p><label for="image1">Image 1(tile image)</label>'+textImage1+'</p> <input required type="file" id="image1" class="signinFormFile"> <p><label for="image2">Image 2</label>'+textImage2+'</p> <input required type="file" id="image2" class="signinFormFile">  <p><label for="image3">Image 3</label>'+textImage3+'</p> <input required type="file" id="image3" class="signinFormFile">  <p><label for="image4">Image 4</label>'+textImage4+'</p> <input required type="file" id="image4" class="signinFormFile"> <p><label for="image5">Image 5</label>'+textImage5+'</p> <input required type="file" id="image5" class="signinFormFile"> </div>'
  $('#editProperty').html(text)
  $('#propertyType').val(property.propertyType)
  $('#propertySubType').val(property.propertySubType)
  $('#investmentType').val(property.investmentType)
  $('#investmentStrategy').val(property.investmentStrategy)
  $('#distributionPeriod').val(property.distributionPeriod)

}

function setTileData(){
  var tileDataArray=[];
	$("input:checkbox[name=tileData]:checked").each(function(){
    tileDataArray.push($(this).val());
});

$.ajax({
  type: 'POST',
  url: '/setTileData',
  data:{tileDataArray:tileDataArray},
  success: function(res){ 
      if(res!='failed'){
        alert('Tile Data Updated');
        window.location.reload();
      }
      else{
         alert('Please check your credentials')
      }
   
  }
});



}

